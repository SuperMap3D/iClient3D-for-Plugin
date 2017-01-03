//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.UI.Controls.SceneControl.js
// 功能：			 ActiveX控件
// 最后修改时间：
//==========================================================================
// 脚本非线程安全。
Type.registerNamespace('SuperMap.Web.UI.Controls');

/// <param name="container" type="" domElement="true"> </param>
SuperMap.Web.UI.Controls.SceneControl = function(container, initCallBack, failedCallBack) {

    /// <summary>ActiveX控件</summary>
    ///<param name="container" type="" domElement="true">Dom元素</param>
    ///<param name="initCallBack" type="Function">初始化成功回调函数</param>
    ///<param name="failedCallBack" type="Function">初始化失败回调函数</param>
    ///<returns type="SuperMap.Web.UI.Controls.SceneControl">返回三维控件对象</returns>

   // 一份脚本只能有一个全局变量。
   // if (SuperMap.Web.Realspace.Utility._SceneControl != null) {
   //     return;
   // }

    //初始化SceneControl为全局变量
    SuperMap.Web.Realspace.Utility._SceneControl = this;

    //判断浏览器是否为ie
    //this._isBrowserSupported();

	//调用判断浏览器函数，分别安装不同插件

    //参数container是否为 domElement,参数initCallBack和failedCallBack是否为Function
    var e = Function._validateParams(arguments,
    [
        { name: "container", domElement: true, mayBeNull: false, optional: false },
        { name: "initCallBack", type: Function, mayBeNull: false, optional: false },
        { name: "failedCallBack", type: Function, mayBeNull: false, optional: false }
    ]);
    if (e) {
        var ex = SuperMap.Web.Realspace.Utility._ConvertSysEx2Realspace(e);
        throw ex;
    }
    SuperMap.Web.UI.Controls.SceneControl.initializeBase(this, [container]);

    this._id = container.id;
    this._container = container;

    this._initCallBack = initCallBack;
    this._failedCallBack = failedCallBack;

    //脚本层Scene
    this._scene = null;

    //脚本层的Action
    this._sceneAction = null;

    //场景服务列表对象
    this._sceneServicesList = null;

    //图层服务列表对象
    this._layer3DServicesList = null;

    this._innerObjectManager == null;

    this._currentAsyncHelper = null;

    //将初始化的工作抽取出来
    this._initialize();
};

SuperMap.Web.UI.Controls.SceneControl.prototype = {

    /*
    *	初始化SceneControl类
    */

    _initialize: function() {
        /// <returns type="void"> </returns>
        //var ex = new Error(SuperMap.Web.Resources.Resource.getMessage("SuperMap.Web.Realspace.Resources", "Realspace_PlugIn_Is_Not_Installed"));
		var ex=new Error(SuperMap.Lang.translate("在查看三维场景之前, 您必须安装Realspace三维场景插件到您的计算机上"));
        ex.name = SuperMap.Web.Realspace.ExceptionName.PlugInNotInstalled;

        try
        {
            //为控件创建dom元素，加入container中
            this._innerSceneCtrl = document.createElement("object");
            //IE必须放在前面，否则事件不可用
            if (window.navigator.appName == "Microsoft Internet Explorer") {
                this._container.appendChild(this._innerSceneCtrl);
            }
            this._innerSceneCtrl.id = "SuperMapRealspace";
            this._innerSceneCtrl.name = "SuperMapRealspace";
            this._innerSceneCtrl.width = "100%";
            this._innerSceneCtrl.height = "100%";
            this._innerSceneCtrl.BorderStyle = 0;
            this._innerSceneCtrl.type = "application/x-supermaprealspace";

            //firefox必须放在后面，否则球出不来
            if (window.navigator.appName != "Microsoft Internet Explorer") {
                this._container.appendChild(this._innerSceneCtrl);

                if (this._innerSceneCtrl.IsFPSVisible != false) {
                    throw ex;
                }
            }
            this._IsInitialized = false;

            // 判断是否有插件安装
            //这里还是改用这种方式判断，因为如果container为iframe的话，原先的判断方式无效
            if (window.navigator.appName == "Microsoft Internet Explorer") {
                if (this._innerSceneCtrl.object == null) {
                    throw ex;
                }
            }
        }
        catch (e) {
            throw ex;
        }


        //保证body设置了overflow属性值为hidden或visible，解决方向键消息的缺陷
        var oBody = document.body;
        if ((oBody.style.overflow != "hidden") && (oBody.style.overflow != "visible")) {
            oBody.style.overflow = "hidden";
        }

        SuperMap.Web.Realspace.Utility._SceneControlMap.put(this._innerSceneCtrl.Identifier, this);
        //先绑定初始化完成事件，其他事件等初始化完之后再绑定
        var sceneInitializedHandler = this._sceneInitialized;
        this.addExploreEvent(this._innerSceneCtrl, 'SceneInitialized', function (identifier) { return sceneInitializedHandler(SuperMap.Web.Realspace.Utility._SceneControlMap.get(identifier)); });
        this.addEvent("sceneInitialized", this._initCallBack);

        //绑定初始化失败事件
        var sceneInitializeFailedHandler = this._sceneInitializeFailed;
        this.addExploreEvent(this._innerSceneCtrl, 'SceneInitializeFailed', function (identifier) { return sceneInitializeFailedHandler(SuperMap.Web.Realspace.Utility._SceneControlMap.get(identifier)); });
        this.addEvent("sceneInitializeFailed", this._failedCallBack);

        //设置全屏反走样
        if(SuperMap.Web.Realspace.Environment._IsSceneAntialias != null)
        {
            this._innerSceneCtrl.IsSceneAntialias = SuperMap.Web.Realspace.Environment._IsSceneAntialias;
        }

        if(SuperMap.Web.Realspace.Environment._SceneAntialiasValue != null)
        {
            this._innerSceneCtrl.SceneAntialiasValue = SuperMap.Web.Realspace.Environment._SceneAntialiasValue;
        }
        //反走样设置失败
		this.addExploreEvent(this._innerSceneCtrl, 'SceneAntialiasFailed',
			function()
            {
                var ex = new Error(SuperMap.Lang.translate("设置场景反走样失败，可能是用户账户控制导致，请尝试关闭UAC"));
                ex.name = SuperMap.Web.Realspace.ExceptionName.RenderSystemIsNotSupported;
                throw ex;
            });
        //初始化结束，后面再设置全屏反走样需要重新打开窗口生效
		SuperMap.Web.Realspace.Environment._IsInitialized = true;

        //firefox必须放在后面，否则球出不来
		if (window.navigator.appName != "Microsoft Internet Explorer") {
		    this.set_sceneAction(new SuperMap.Web.UI.Action3Ds.PanSelect(this));

		    //绑定其他事件
		    this._attachEvent();
			this.clock = setInterval(this.count, 10);
		}
    },
    count: function () {

        for (i = 0; i < SuperMap.Web.Realspace.Utility._SceneControlMap.size() ; i++) {

            var sceneControl = SuperMap.Web.Realspace.Utility._SceneControlMap.element(i).value;

            if (!sceneControl._IsInitialized) {

                sceneControl._raiseEvent("sceneInitialized");
            }
			window.clearInterval(sceneControl.clock);
        }

    },
    /**
    *释放资源
    */
    dispose: function() {
        /// <returns type="void"> </returns>
        this._innerSceneCtrl = null;
        this._container = null;
        this._initCallBack = null;
        this._failedCallBack = null;

    },

    /**
    *释放资源
    */
    _isBrowserSupported: function() {
        /// <returns type="void"> </returns>
        if (window.navigator.appName != "Microsoft Internet Explorer") {
            var ex = new Error(SuperMap.Lang.translate("该浏览器版本当前不支持，请更换为Internet Explorer 6.0及其以上版本"));
            ex.name = SuperMap.Web.Realspace.ExceptionName.BrowserNotSupport;
            throw ex;
        }
    },


	    /**
    *判断浏览器版本是32位，还是64位
    */
    _get_BrowserVersion: function() {
        // 判断IE版本为32位，返回x86，若为64位，返回x64
		if (window.navigator.platform =="Win32"){
			return  "x86";
        }
		if (window.navigator.platform =="Win64"){
			return  "x64";
        }
    },

    /**
    *innerSceneControl对象,不对外开放，通过全局变量来调用该接口
    */
    _get_innerSceneControl: function() {
        return this._innerSceneCtrl;
    },

    /*
    * 设置当前所使用的异步助手
    */
    get_asyncHelper: function() {
        if (this._currentAsyncHelper == null) {
           this._currentAsyncHelper = new SuperMap.Web.Realspace.AsyncHelper(this);
        }
        return this._currentAsyncHelper;
    },

    /*
    * innerObjectManager对象,该对象不对外开放,供全局变量调用,主要用来进行com对象的创建
    */
    _get_innerObjectManager: function() {
        if (this._innerObjectManager == null) {
            this._innerObjectManager = this._innerSceneCtrl.ObjectManager;
        }

        return this._innerObjectManager;
    },

    /**
    *Scene对象
    */
    get_scene: function() {
        /// <value type="SuperMap.Web.Realspace.Scene"> </value>
        if (this._scene == null) {
            this._scene = new SuperMap.Web.Realspace.Scene(this);
        }
        return this._scene;
    },

    /*
    * SceneAction对象,这是纯脚本对象，com层没有对应的对象。
    */
    get_sceneAction: function() {
        ///<value type="SuperMap.Web.UI.Action3Ds.SceneAction"></value>
        return this._sceneAction;
    },

    set_sceneAction: function(sceneAction) {
        if (!SuperMap.Web.UI.Action3Ds.SceneAction.isInstanceOfType(sceneAction)) {
            return;
        }

        this._sceneAction = sceneAction;
        this._innerSceneCtrl.SceneUserAction = sceneAction.get_type();
    },


    /*
    * 场景服务列表对象
    */
    get_sceneServicesList: function() {
        ///<value type="SuperMap.Web.Realspace.SceneServicesList"></value>
        if (this._sceneServicesList == null) {
            this._sceneServicesList = new SuperMap.Web.Realspace.SceneServicesList(this);
        }
        return this._sceneServicesList;
    },


    /*
    * 图层服务列表对象
    */
    get_layer3DServicesList: function() {
        ///<value type="SuperMap.Web.Realspace.Layer3DServicesList"></value>
        if (this._layer3DServicesList == null) {
            this._layer3DServicesList = new SuperMap.Web.Realspace.Layer3DServicesList(this);
        }
        return this._layer3DServicesList;
    },

	/*
	*controlOffsetX属性:SceneConrol控件的左上角与浏览器客户区左上角的X轴偏移量
	*/
	get_controlOffsetX:function()
	{
       ///<value type="Number"></value>
	   if (this._innerSceneCtrl != null) {
			if(window.navigator.appName == "Microsoft Internet Explorer")
			{
				var zoom=96/window.screen.deviceXDPI;
				return this._innerSceneCtrl.ControlOffsetX*zoom;
			}else{
				return this._container.offsetLeft;
			}
	   }
	},

	/*
	*controlOffsetX属性:SceneConrol控件的左上角与浏览器客户区左上角的Y轴偏移量
	*/
	get_controlOffsetY:function()
	{
        ///<value type="Number"></value>

		if (this._innerSceneCtrl != null) {
            if(window.navigator.appName == "Microsoft Internet Explorer")
			{
				var zoom=96/window.screen.deviceXDPI;
				return this._innerSceneCtrl.ControlOffsetY*zoom;
			}else{
				return this._container.offsetTop;
			}
        }
	},

	/**
	*获得场景气泡列表
	*/
	get_bubbles: function() {
		///<returns type="SuperMap.Web.Realspace.Bubbles"></returns>
	    if (this._Bubbles == null) {
	        this._Bubbles = new SuperMap.Web.Realspace.Bubbles(this._innerSceneCtrl.Bubbles);
	    }
	    return this._Bubbles;
	},

  /**
  *获取/设置顶点捕捉模式
  */
  get_snapMode: function() {
    ///<returns type="SuperMap.Web.Realspace.SnapMode"></returns>
      if (this._innerSceneCtrl != null) {
          return this._innerSceneCtrl.SnapMode;
      }
  },
  set_snapMode: function(snapMode) {
    ///<params name="snapMode" type="SuperMap.Web.Realspace.SnapMode"></params>
      if (this._innerSceneCtrl != null) {
          this._innerSceneCtrl.SnapMode = snapMode;
      }
  },

	/*
   	*场景数据是否始终更新
  	*/
    get_isAlwaysUpdate: function() {
        ///<value type="Boolean">返回是否始终更新数据</value>
	    if(this._innerSceneCtrl != null)
	    {
       	    return this._innerSceneCtrl.IsAlwaysUpdate;
	    }
    },

    set_isAlwaysUpdate: function(isAlwaysUpdate) {
  	    if(this._innerSceneCtrl != null && typeof (isAlwaysUpdate) == "boolean")
	    {
		    this._innerSceneCtrl.IsAlwaysUpdate = isAlwaysUpdate;
	    }
    },



    /*
     *OSGB缓存是否动态高亮
     */
    get_isDynamicSelection: function() {
        ///<value type="Boolean">返回是否动态高亮</value>
        if(this._innerSceneCtrl != null)
        {
            return this._innerSceneCtrl.IsDynamicSelection;
        }
    },

    set_isDynamicSelection: function(isDynamicSelection) {
        if(this._innerSceneCtrl != null && typeof (isDynamicSelection) == "boolean")
        {
            this._innerSceneCtrl.IsDynamicSelection = isDynamicSelection;
        }
    },


    /*
   	*场景是否始终处于激活状态
  	*/
    get_isAlwaysActive: function () {
        ///<value type="Boolean">返回是否始终处于激活状态</value>
        if (this._innerSceneCtrl != null) {
            return this._innerSceneCtrl.IsAlwaysActive;
        }
    },

    set_isAlwaysActive: function (isAlwaysActive) {
        if (this._innerSceneCtrl != null && typeof (isAlwaysActive) == "boolean") {
            this._innerSceneCtrl.IsAlwaysActive = isAlwaysActive;
        }
    },

   	/*
   	*FPS
  	*/
    get_isFPSVisible: function() {
        ///<value type="Boolean">返回是否始终更新数据</value>
	    if(this._innerSceneCtrl != null)
	    {
       	    return this._innerSceneCtrl.IsFPSVisible;
	    }
    },

    set_isFPSVisible: function(isFPSVisible) {
  	    if(this._innerSceneCtrl != null && typeof (isFPSVisible) == "boolean")
	    {
		    this._innerSceneCtrl.IsFPSVisible = isFPSVisible;
	    }
   	},

    /*
    * 检查更新
    */
    checkPluginUpdate: function(strServerUrl) {
        ///<param name="strServerUrl" type="String"></param>
        ///<returns type="String" ></returns>
        if (typeof (strServerUrl) != "string") {
            return "";
        }
        var UpdateUrl = this._innerSceneCtrl.CheckPluginUpdate(strServerUrl);

        if (UpdateUrl == "") {
            UpdateUrl = SuperMap.Lang.translate("当前无可用的更新");
        }

        return UpdateUrl;
    },

    /*
    * 获取插件版本
    */
    getPluginVersion: function() {
        ///<returns type="String"></returns>
        var versioninfo = this._innerSceneCtrl.GetPluginVersion();
        if (versioninfo !== "") {
            versioninfo = SuperMap.Lang.translate("当前安装的插件版本为:") + versioninfo;
        }
        else {
            versioninfo = SuperMap.Lang.translate("无法获取到版本信息");
        }

        return versioninfo;

    },

    /*
    * 二维像素点转换为三维点
    */
    pixelToGlobe: function(point, pixelToGlobeMode) {
         ///<param name="point" type="SuperMap.Web.Core.Point"></param>
        ///<returns type="SuperMap.Web.Core.Point3D"></returns>
		if (!SuperMap.Pixel.isInstanceOfType(point)) {
				return null;
		}
		if(typeof(pixelToGlobeMode) == "undefined"){
			var innerPnt2D = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(point);

			var innerPnt3D = this._innerSceneCtrl.PixelToGlobe(innerPnt2D, SuperMap.Web.Realspace.PixelToGlobeMode.Terrain);
			var pnt3D = new SuperMap.Web.Core.Point3D(innerPnt3D.X, innerPnt3D.Y, innerPnt3D.Z);

			return pnt3D;
		}else{
			var innerPnt2D = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(point);

			var innerPnt3D = this._innerSceneCtrl.PixelToGlobe(innerPnt2D, pixelToGlobeMode);
			var pnt3D;
			if (innerPnt3D.X == Number.MAX_VALUE) {
			    pnt3D = new SuperMap.Web.Core.Point3D(Number.NaN, Number.NaN, Number.NaN);
			}
			else {
			    pnt3D = new SuperMap.Web.Core.Point3D(innerPnt3D.X, innerPnt3D.Y, innerPnt3D.Z);
			}
			return pnt3D;
		}
    },

    /*
    * 三维像素点转换为二维点
    */
    globeToPixel: function(point3d) {
        ///<param name="point" type="SuperMap.Web.Core.Point3D"></param>
        ///<returns type="SuperMap.Web.Core.Point"></returns>

        if (!SuperMap.Web.Core.Point3D.isInstanceOfType(point3d)) {
            return null;
        }

        var innerPnt3D = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(point3d);

        var innerPnt2D = this._innerSceneCtrl.GlobeToPixel(innerPnt3D);
        var pnt2D = new SuperMap.LonLat(innerPnt2D.X, innerPnt2D.Y);

        return pnt2D;
    },

    //响应mouseDown事件
    _mouseDown: function(x, y, button, sceneControl) {

        var e = sceneControl._getEventObject(x, y, button, sceneControl);

        if (sceneControl._sceneAction && sceneControl._sceneAction.onMouseDown) {
            sceneControl._sceneAction.onMouseDown(e);
        }
    },

    //响应mouseUp事件
    _mouseUp: function(x, y, button, sceneControl) {
         var e = sceneControl._getEventObject(x, y, button, sceneControl);

        if (sceneControl._sceneAction && sceneControl._sceneAction.onMouseUp) {
            sceneControl._sceneAction.onMouseUp(e);
        }
    },

    //响应mouseWheel事件
    _mouseWheel: function(x, y, zDelta, button, sceneControl) {
        var e = sceneControl._getEventObject(x, y, button, sceneControl, zDelta);

        if (sceneControl._sceneAction && sceneControl._sceneAction.onMouseWheel) {
            sceneControl._sceneAction.onMouseWheel(e);
        }
    },

    //响应Click事件，这里将底层的onLButtonUp事件转化为脚本层的onClick事件
    _click: function(x, y, button, sceneControl) {
        var e = sceneControl._getEventObject(x, y, button, sceneControl);

        if (sceneControl._sceneAction && sceneControl._sceneAction.onClick) {
            sceneControl._sceneAction.onClick(e);
        }
    },

    //响应dbClick事件
    _dbClick: function(x, y, button, sceneControl) {
        var e = sceneControl._getEventObject(x, y, button, sceneControl);

        if (sceneControl._sceneAction && sceneControl._sceneAction.onDbClick) {
            sceneControl._sceneAction.onDbClick(e);
        }

    },

    //响应mouseOver事件
    _mouseOver: function(x, y, button, sceneControl) {
        var e = sceneControl._getEventObject(x, y, button, sceneControl);

        if (sceneControl._sceneAction && sceneControl._sceneAction.onMouseOver) {
            sceneControl._sceneAction.onMouseOver(e);
        }

    },

    //响应mouseMove事件
    _mouseMove: function(x, y, button, sceneControl) {
        var e = sceneControl._getEventObject(x, y, button, sceneControl);

        if (sceneControl._sceneAction && sceneControl._sceneAction.onMouseMove) {
            sceneControl._sceneAction.onMouseMove(e);
        }

    },


	_keyDown: function(button, sceneControl) {

        var e = sceneControl._getEventObject(0, 0, button, sceneControl);

        if (sceneControl._sceneAction && sceneControl._sceneAction.onKeyDown) {
            sceneControl._sceneAction.onKeyDown(e);
        }
    },

	_keyUp: function(button, sceneControl) {

        var e = sceneControl._getEventObject(0, 0, button, sceneControl);

        if (sceneControl._sceneAction && sceneControl._sceneAction.onKeyUp) {
            sceneControl._sceneAction.onKeyUp(e);
        }
    },

    //响应objectSelected事件
    _objectSelected: function(nSelectedCount, sceneControl) {

        var selection3Ds = SuperMap.Web.Realspace.Utility._SceneControl.get_scene().findSelection3Ds(true);

        //selection3Ds是选择集的数组
        sceneControl._raiseEvent("objectSelected", selection3Ds);

    },

    //响应focusChanged事件
    _focusChanged: function (sceneControl) {
        SuperMap.Web.Realspace.Utility._SceneControl = sceneControl;
    },

    //响应measureDistance事件
    _measureDistance: function(dCurrentDis, dTotalDis, srLine3D, sceneControl) {
        var dDisArray = [dCurrentDis,dTotalDis];
        if(srLine3D)
        {
            var line3D = new SuperMap.Web.Core.GeoLine3D();
            line3D._set_innerGeometry(srLine3D);
            sceneControl._raiseEvent("measureDistance", dDisArray, line3D);
        }
        else
        {
            sceneControl._raiseEvent("measureDistance", dDisArray);
        }
    },

    //响应measureArea事件
    _measureArea: function(dArea, srRegion3D, sceneControl) {
        if(srRegion3D)
        {
            var region3D = new SuperMap.Web.Core.GeoRegion3D();
            region3D._set_innerGeometry(srRegion3D);
            sceneControl._raiseEvent("measureArea", dArea,region3D);
        }
        else
        {
            sceneControl._raiseEvent("measureArea", dArea);
        }

    },

    //响应measureHeight事件
    _measureHeight: function(dHeight, srLine3D, sceneControl) {
        if(srLine3D)
        {
            var line3D = new SuperMap.Web.Core.GeoLine3D();
            line3D._set_innerGeometry(srLine3D);
            sceneControl._raiseEvent("measureHeight", dHeight, line3D);
        }
        else
        {
            sceneControl._raiseEvent("measureHeight", dHeight);
        }
    },

    //响应measureDistanceFinished事件
    _measureDistanceFinished: function(dTotalDis, srLine3D, sceneControl) {
        //显示量算范围
        if(srLine3D)
        {
            var line3D = new SuperMap.Web.Core.GeoLine3D();
            line3D._set_innerGeometry(srLine3D);
            sceneControl._raiseEvent("measureDistanceFinished", dTotalDis, line3D);
        }
        else
        {
            sceneControl._raiseEvent("measureDistanceFinished", dTotalDis);
        }
    },

    //响应measureAreaFinished事件
    _measureAreaFinished: function(dArea, srRegion3D, sceneControl) {
        //添加挖方区域
        //显示量算范围
        if(srRegion3D)
        {
            var region3D = new SuperMap.Web.Core.GeoRegion3D();
            region3D._set_innerGeometry(srRegion3D);
            sceneControl._raiseEvent("addExcavationRegion", region3D);
            sceneControl._raiseEvent("measureAreaFinished", dArea,region3D);
        }
        else
        {
            sceneControl._raiseEvent("measureAreaFinished", dArea);
        }
    },

    //响应measureHeightFinished事件
    _measureHeightFinished: function(dHeight, srLine3D, sceneControl) {
        //显示量算范围
        if(srLine3D)
        {
            var line3D = new SuperMap.Web.Core.GeoLine3D();
            line3D._set_innerGeometry(srLine3D);
            sceneControl._raiseEvent("measureHeightFinished", dHeight, line3D);
        }
        else
        {
            sceneControl._raiseEvent("measureHeightFinished", dHeight);
        }
    },


    ///响应sceneInitialized事件，等该事件响应后才能加载数据
    _sceneInitialized: function(sceneControl) {

		sceneControl.set_sceneAction(new SuperMap.Web.UI.Action3Ds.PanSelect(sceneControl));

        //绑定其他事件
        sceneControl._attachEvent();
        //抛出“sceneInitialized”事件
        sceneControl._raiseEvent("sceneInitialized");
        sceneControl._IsInitialized = true;
        if (sceneControl._get_innerSceneControl().IsRenderSystemSupported == false) {
            var ex = new Error(SuperMap.Lang.translate("您的系统的OpenGL版本较低，请更新显卡驱动"));
            ex.name = SuperMap.Web.Realspace.ExceptionName.RenderSystemIsNotSupported;
            throw ex;
        }
        var pluginver = sceneControl._get_innerSceneControl().GetPluginVersion();
        var libver = SuperMap.Web.Realspace.Utility._getLibVersion();
        if (pluginver < libver)
        {
            var ex = new Error(SuperMap.Lang.translate("您当前使用的插件版本与脚本库版本出现不兼容，为了保证您的正常使用请将插件升级到:")+libver);
            ex.name = SuperMap.Web.Realspace.ExceptionName.PluginVersionLower;
            throw ex;
        }
        else if (pluginver > libver)
        {
            var ex = new Error(SuperMap.Lang.translate("您当前使用的插件版本与脚本库版本出现不兼容，为了保证您的正常使用请将插件还原到:")+libver);
            ex.name = SuperMap.Web.Realspace.ExceptionName.LibVersionLower;
            throw ex;
        }

    },

    ///响应sceneInitializeFailed事件
    _sceneInitializeFailed: function(sceneControl) {

        sceneControl._raiseEvent("sceneInitializeFailed");
        if (sceneControl._get_innerSceneControl().IsRenderSystemSupported == false) {
        		alert("OpenGl版本低，请更新最新显卡驱动");
            var ex = new Error(SuperMap.Lang.translate("您的系统的OpenGL版本较低，请更新显卡驱动"));
            ex.name = SuperMap.Web.Realspace.ExceptionName.RenderSystemIsNotSupported;
            throw ex;
        }

    },

    ///响应飞行开始事件，保留接口
    _flownStart: function(nflyoperator, sceneControl) {
        var e = new SuperMap.Web.Realspace.EventObject();
        e._set_camera(sceneControl.get_scene().get_camera());

        sceneControl._raiseEvent("flownStart", e, nflyoperator);
    },

    ///响应飞行结束事件
    _flownEnd: function(sceneControl) {
        var e = new SuperMap.Web.Realspace.EventObject();
        e._set_camera(sceneControl.get_scene().get_camera());
        sceneControl._raiseEvent("flownEnd", e);
    },

    ///响应飞行浏览事件，保留接口
    _flownTour: function(sceneControl) {
        sceneControl._raiseEvent("flownTour");
    },

    _modelFetchedHandler: function(innerGeoModel, sceneControl) {
        if (sceneControl.get_asyncHelper()) {
            sceneControl.get_asyncHelper()._asyncFetchModelFinished(innerGeoModel, sceneControl);
        }
    },

    _pictureFetchedHandler: function(innerGeoPicture3D, sceneControl) {
        if (sceneControl.get_asyncHelper()) {
            sceneControl.get_asyncHelper()._asyncFetchPicture3DFinished(innerGeoPicture3D, sceneControl);
        }
    },

    _layer3DFetchedHandler: function(innerLayer3D, sceneControl) {
        if (sceneControl.get_asyncHelper()) {
            sceneControl.get_asyncHelper()._asyncFetchLayer3DFinished(innerLayer3D, sceneControl);
        }
    },

	///响应气泡位置变化事件
	_bubbleEvent: function(nEventType, bubble, sceneControl) {

        var e = new SuperMap.Web.Realspace.Bubble(bubble);
		switch (nEventType)
		{
		case 0:
			sceneControl._raiseEvent("bubbleInitialize", e);
			break;
		case 1:
			sceneControl._raiseEvent("bubbleResize", e);
			break;
		case 2:
			sceneControl._raiseEvent("bubbleClose", e);
			break;
		}
	},

    //响应frameStarted事件
	_frameStarted: function (sceneControl) {
	    sceneControl._raiseEvent("frameStarted");
	},

    //响应frameEnded事件
	_frameEnded: function (sceneControl) {
	    sceneControl._raiseEvent("frameEnded");
	},
    //编辑结束事件
	_geometryModified: function (nGeometryID, layerName, sceneControl) {
	    var layer3D = sceneControl.get_scene().get_layer3Ds().get_item(layerName);

	    if (layer3D == null) {
	        layer3D = sceneControl.get_scene().get_trackingLayer3D();
	    }
	    sceneControl._raiseEvent("geometryModified", nGeometryID, layer3D);
	},

    //绑定控件事件，并转化为脚本事件
    _attachEvent: function() {
        // 考虑用全局的代替
        var sceneControl = this;

		var keyDownHandler = this._keyDown;
		this.addExploreEvent(this._innerSceneCtrl, 'KeyDown', function(button) { return keyDownHandler(button, sceneControl); });

		var keyUpHandler = this._keyUp;
		this.addExploreEvent(this._innerSceneCtrl, 'KeyUp', function(button) { return keyUpHandler(button, sceneControl); });

        var downHandler = this._mouseDown;
		this.addExploreEvent(this._innerSceneCtrl, 'LButtonDown', function(x, y, button) {  return downHandler(x, y, button, sceneControl); });
		this.addExploreEvent(this._innerSceneCtrl, 'MButtonDown', function(x, y, button) {  return downHandler(x, y, button, sceneControl); });
		this.addExploreEvent(this._innerSceneCtrl, 'RButtonDown', function(x, y, button) {  return downHandler(x, y, button, sceneControl); });

        var upHandler = this._mouseUp;
		this.addExploreEvent(this._innerSceneCtrl, 'MButtonUp', function(x, y, button) {  return upHandler(x, y, button, sceneControl); });
		this.addExploreEvent(this._innerSceneCtrl, 'RButtonUp', function(x, y, button) {  return upHandler(x, y, button, sceneControl); });
		this.addExploreEvent(this._innerSceneCtrl, 'LButtonUp', function(x, y, button) {  return upHandler(x, y, button, sceneControl); });

        var wheelHandler = this._mouseWheel;
		this.addExploreEvent(this._innerSceneCtrl, 'MouseWheel', function(x, y, zDelta, button) {  return wheelHandler(x, y, zDelta, button, sceneControl); });

        var dbClickHandler = this._dbClick;
		this.addExploreEvent(this._innerSceneCtrl, 'LButtonDblClick', function(x, y, button) {  return dbClickHandler(x, y, button, sceneControl); });
		this.addExploreEvent(this._innerSceneCtrl, 'RButtonDblClick', function(x, y, button) {  return dbClickHandler(x, y, button, sceneControl); });

        var overHandler = this._mouseOver;
		this.addExploreEvent(this._innerSceneCtrl, 'MouseHover', function(x, y, button) {  return overHandler(x, y, button, sceneControl); });

        var moveHandler = this._mouseMove;
		this.addExploreEvent(this._innerSceneCtrl, 'MouseMove', function(x, y, button) { return moveHandler(x, y, button, sceneControl); });

		var focusChangedHandler = this._focusChanged;
		this.addExploreEvent(this._innerSceneCtrl, 'FocusChanged', function () { return focusChangedHandler(sceneControl); });

        var selectHandler = this._objectSelected;
		this.addExploreEvent(this._innerSceneCtrl, 'ObjectSelected', function(nSelectedCount) { return selectHandler(nSelectedCount, sceneControl); });

        var measureDisHandler = this._measureDistance;
		this.addExploreEvent(this._innerSceneCtrl, 'MeasureDistance', function(dCurrentDis, dTotalDis, srLine3D) { return measureDisHandler(dCurrentDis, dTotalDis, srLine3D, sceneControl); });

        var measureAreaHandler = this._measureArea;
		this.addExploreEvent(this._innerSceneCtrl, 'MeasureArea', function(dArea, srRegion3D) { return measureAreaHandler(dArea, srRegion3D, sceneControl); });

        var measureHeightHandler = this._measureHeight;
		this.addExploreEvent(this._innerSceneCtrl, 'MeasureHeight', function(dHeight, srLine3D) { return measureHeightHandler(dHeight, srLine3D, sceneControl); });

        var measureDisFinishedHandler = this._measureDistanceFinished;
		this.addExploreEvent(this._innerSceneCtrl, 'MeasureDistanceFinished', function(dTotalDis, srLine3D) { return measureDisFinishedHandler(dTotalDis, srLine3D, sceneControl); });

        //添加挖方
        var measureAreaFinishedHandler = this._measureAreaFinished;
		this.addExploreEvent(this._innerSceneCtrl, 'MeasureAreaFinished', function(dArea, srRegion3D) { return measureAreaFinishedHandler(dArea, srRegion3D, sceneControl); });

        var measureHeightFinishedHandler = this._measureHeightFinished;
		this.addExploreEvent(this._innerSceneCtrl, 'MeasureHeightFinished', function(dHeight, srLine3D) { return measureHeightFinishedHandler(dHeight, srLine3D, sceneControl); });

        var flownStartHandler = this._flownStart;
		this.addExploreEvent(this._innerSceneCtrl, 'FlownStart',function(nflyoperator) { return flownStartHandler(nflyoperator, sceneControl);  });

        var flownEndHandler = this._flownEnd;
		this.addExploreEvent(this._innerSceneCtrl, 'FlownEnd',function() { return flownEndHandler(sceneControl);  });

        var flownTourHandler = this._flownTour;
		this.addExploreEvent(this._innerSceneCtrl, 'FlownTour',function() { return flownTourHandler(sceneControl);  });

        var modelFetchedHandler = this._modelFetchedHandler;
		this.addExploreEvent(this._innerSceneCtrl, 'FetchModelFinished',function(innerGeoModel) { return modelFetchedHandler(innerGeoModel, sceneControl);  });

        var pictureFetchedHandler = this._pictureFetchedHandler;
		this.addExploreEvent(this._innerSceneCtrl, 'FetchPicture3DFinished',function(innerGeoPicture3D) { return pictureFetchedHandler(innerGeoPicture3D, sceneControl);  });

        var layer3DFetchedHandler = this._layer3DFetchedHandler;
		this.addExploreEvent(this._innerSceneCtrl, 'FetchLayer3DFinished',function(innerLayer3D) { return layer3DFetchedHandler(innerLayer3D, sceneControl);  });

		var bubbleEventHandler = this._bubbleEvent;
		this.addExploreEvent(this._innerSceneCtrl, 'BubbleEvent',function(nEventType, bubble) { return bubbleEventHandler(nEventType, bubble, sceneControl); });

		var frameStartedHandler = this._frameStarted;
		this.addExploreEvent(this._innerSceneCtrl, 'FrameStarted', function () { return frameStartedHandler(sceneControl); });

		var frameEndedHandler = this._frameEnded;
		this.addExploreEvent(this._innerSceneCtrl, 'FrameEnded', function () { return frameEndedHandler(sceneControl); });

		var geometryModifiedHandler = this._geometryModified;
		this.addExploreEvent(this._innerSceneCtrl, 'GeometryModified', function (nGeometryID, layerName) { return geometryModifiedHandler(nGeometryID, layerName, sceneControl); });

    },

	addExploreEvent: function(obj, name, func){
        if (window.attachEvent) {
                obj.attachEvent("on"+name, func);
            } else {
                obj.addEventListener(name, func, false);
            }
    },

    //添加事件
    addEvent: function(eventName, handler) {
        ///<param name="eventName" type="String"></param>
        ///<param name="handler" type="Object"></param>
        ///<returns type="Boolean" ></returns>
        this.get_events().addHandler(eventName, handler);
    },

	//删除事件
    removeEvent: function(eventName, handler) {
        ///<param name="eventName" type="String"></param>
        ///<param name="handler" type="Object"></param>
        ///<returns type="Boolean" ></returns>
        this.get_events().removeHandler(eventName, handler);
    },

    //触发绑定事件，不对外开放
    _raiseEvent: function(eventName, arguments, userContext) {
        var handler = this.get_events().getHandler(eventName);
        if (handler) {
            handler(arguments, userContext);
        }
    },

/*
    //松绑事件(暂时没有用到)
	_detachEvent:function()
	{
		this._innerSceneCtrl.detachEvent("onLButtonDown", this._mouseDown);
		this._innerSceneCtrl.detachEvent("onMButtonDown", this._mouseDown);
		this._innerSceneCtrl.detachEvent("onRButtonDown", this._mouseDown);
		this._innerSceneCtrl.detachEvent("onLButtonUp", this._click);
		this._innerSceneCtrl.detachEvent("onMButtonUp", this._mouseUp);
		this._innerSceneCtrl.detachEvent("onRButtonUp", this._mouseUp);
		this._innerSceneCtrl.detachEvent("onMouseWheel", this._mouseWheel);
		this._innerSceneCtrl.detachEvent("onLButtonDblClick", this._dbClick);
		this._innerSceneCtrl.detachEvent("onRButtonDblClick", this._dbClick);
		this._innerSceneCtrl.detachEvent("onMouseHover", this._mouseOver);
		this._innerSceneCtrl.detachEvent("onMouseMove", this._mouseMove);

		this._innerSceneCtrl.detachEvent("onObjectSelected", this._objectSelected);
	},
*/

    // 组装EventObject对象
    _getEventObject: function(x, y, button, sceneControl, zDelta) {
        var pnt = new SuperMap.Pixel(x, y);
        var pnt3D = sceneControl.pixelToGlobe(pnt);

        var e = new SuperMap.Web.Realspace.EventObject();
        e._set_clientX(x);
        e._set_clientY(y);
        e._set_longitude(pnt3D.x);
        e._set_latitude(pnt3D.y);
        e._set_altitude(pnt3D.z);
        e._set_camera(sceneControl.get_scene().get_camera());
        e._set_flagType(button);

        if (zDelta) {
            e._set_zDelta(zDelta);
        }
        return e;
    }
};
SuperMap.Web.UI.Controls.SceneControl.registerClass('SuperMap.Web.UI.Controls.SceneControl', Sys.UI.Control, Sys.IDisposable);
