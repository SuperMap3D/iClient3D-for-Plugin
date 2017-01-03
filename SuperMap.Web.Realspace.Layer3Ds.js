//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.Layer3Ds
// 功能：			 三维图层集合类，负责三维图层的管理
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Layer3Ds = function (scenecontrol)
{

    SuperMap.Web.Realspace.Layer3Ds.initializeBase(this);

    this._innerLayer3Ds = scenecontrol._get_innerSceneControl().Scene.Layer3Ds;

    this._layer3DArray = [];

    this._attachEvent();

};

SuperMap.Web.Realspace.Layer3Ds.prototype ={

	/*
	*innerLayer3Ds对象，com层Layer3Ds，不对外开发
	*/
//	_get_innerLayer3Ds:function()
//	{
//		///<value type="number" integer="true"></value>
//		return this._innerLayer3Ds;
//	},

	/*
	*获得脚本层的图层列表，不开放给外部使用
	*/
	_get_layer3DArray:function()
	{
	    return this._layer3DArray;
	},

	/*
	*获得三维图层集中图层个数
	*/
	get_count:function()
	{
		///<return type="number" integer="true">图层个数</return>
	    if ((this._innerLayer3Ds == null))
        {
            return ;
        }
		return this._layer3DArray.length;

	},

	/*
	*获得三维图层集中指定图层
	*/
	get_item:function(index)
	{
		///<param name="index" type="string/number">名称或索引</param>
		//<returns type="SuperMap.Web.Realspace.Layer3D">指定图层</returns>
		///<value type="SuperMap.Web.Realspace.Layer3D">指定图层</value>
		if ((this._innerLayer3Ds == null) || index == null)
        {
            return null;
        }
        var innerLayer3D = this._innerLayer3Ds.get_Item(index);
        if (innerLayer3D == null)
        {
            return null;
        }
        var layerName = innerLayer3D.Name;

		for(var i=0; i<this._layer3DArray.length; i++)
		{
		    if (this._layer3DArray[i].get_name() == layerName)
		    {
		        return this._layer3DArray[i];
		    }
		}
	},

	/*
	*属性：设置和获取场景的可见不可见
	*/
	get_isVisible:function()
	{
		///<value type="bool"></value>
	    if ((this._innerLayer3Ds == null))
        {
            return ;
        }
		return this._innerLayer3Ds.IsVisible;

	},
	set_isVisible:function(bVisible)
	{
		///<value type="bool"></value>
	    if ((this._innerLayer3Ds == null))
        {
            return ;
        }
		this._innerLayer3Ds.IsVisible = bVisible;

	},

	/*
	*添加图层
	*/
	add:function(strServerRootUrl, strLayerName, strDataName, l3dType, addToHead )
	{
	///<param name="strServerRootUrl" type="string">服务器地址</param>
	///<param name="strLayerName" type="string">图层名</param>
	///<param name="strDataName" type="string">数据名</param>
	///<param name="l3dType" type="SuperMap.Web.Realspace.Layer3DType">图层类型</param>
	///<param name="addToHead" type="boolean">是否添加到头部</param>
    ///<returns type="SuperMap.Web.Realspace.Layer3D">添加的图层</returns>
        if ((this._innerLayer3Ds == null))
        {
            return null;
        }
        // 首先到列表里去判断如果有,就不new了。add by zhaozhe
        var layer3D;
        if(l3dType === SuperMap.Web.Realspace.Layer3DType.OSGB){
          layer3D = new SuperMap.Web.Realspace.Layer3DOSGB(strServerRootUrl, strLayerName, strDataName);
        }else if(l3dType === SuperMap.Web.Realspace.Layer3DType.VolumeFile) {
          layer3D = new SuperMap.Web.Realspace.Layer3DVolumeFile(strServerRootUrl, strLayerName, strDataName);
        }else{
          layer3D = new SuperMap.Web.Realspace.Layer3D(strServerRootUrl, strLayerName, strDataName, l3dType);
        }
        if (layer3D.initialized()){
    			if(addToHead||(null==addToHead))
    			{
    				if (this.insert(layer3D))
    				{
    					return layer3D;
    				}
    			}
    			else
    			{
    				var index = this.get_count();
    				if (this.insert(layer3D,index))
    				{
    					return layer3D;
    				}
    			}
        }
        return null;
	},

  /*
  *添加在线图层
  */
  addOnlineMap:function(strLayerName, l3dType, strUsername, strPassWord, addToHead)
  {
    ///<param name="strLayerName" type="string">图层名</param>
  	///<param name="l3dType" type="SuperMap.Web.Realspace.Layer3DType">图层类型</param>
    ///<param name="strUsername" type="string">用户名</param>
    ///<param name="strPassWord" type="string">密码</param>
  	///<param name="addToHead" type="boolean">是否添加到头部</param>
    ///<returns type="SuperMap.Web.Realspace.Layer3D">添加的图层</returns>
      if ((this._innerLayer3Ds === null)){
            return ;
      }
      var innerLayer3D = this._innerLayer3Ds.AddOnlineMap(strLayerName, l3dType, strUsername, strPassWord, addToHead);

      var layer3D = new SuperMap.Web.Realspace.Layer3D("", "", "", "", innerLayer3D);

      this._layer3DArray.push(layer3D);

      return layer3D;
  },

  /*
	*添加图层服务
	*/
	addLayerService:function(strServerRootUrl, strSceneName, strLayerName, strDataName, l3dType)
	{
	    ///<param name="strServerRootUrl" type="string">服务器地址</param>
	    ///<param name="strSceneName" type="string">场景名</param>
	    ///<param name="strLayerName" type="string">图层名</param>
	    ///<param name="strDataName" type="string">数据名</param>
        ///<param name="l3dType" type="SuperMap.Web.Realspace.Layer3DType">图层类型</param>
        ///<returns type="SuperMap.Web.Realspace.Layer3D">添加的图层</returns>
	    if ((this._innerLayer3Ds == null))
	    {
	        return null;
	    }
	    var pLayer3DURLParam = new SuperMap.Web.Realspace.Layer3DURLParam();

	    var strLayerName = encodeURI(strLayerName);
	    var strSceneName = encodeURI(strSceneName);
	    var temLayerName = strLayerName;

	    if (strLayerName.search("#") != -1) {
	        temLayerName = strLayerName.replace("#", "%23");
	    }
	    var strRequestUrl = strServerRootUrl + "/scenes/" + strSceneName + "/layers/" + temLayerName + "/extendxml.xml";
	    var httpRequest = new XMLHttpRequest();
	    httpRequest.open("GET", strRequestUrl, false);
	    httpRequest.send();
	    var response ;
	    if (httpRequest.readyState == 4) {
	        response = httpRequest.responseText;
	    }
	    if (response) {
	        pLayer3DURLParam._set_xml(response);
	    }
	    else {
	        alert("图层信息不存在！请检查参数是否正确");
	        return;
	    }

	    pLayer3DURLParam._set_layerURL(strServerRootUrl);
	    pLayer3DURLParam._set_layerType(l3dType);
	    pLayer3DURLParam._set_dataName(strDataName);
	    pLayer3DURLParam._set_layerName(strLayerName);

	    var layer3D = new SuperMap.Web.Realspace.Layer3D(pLayer3DURLParam);
        layer3D.fromXML(response);
	    var addToHead = false;
	    if (layer3D.initialized()) {
	        if (addToHead || (null == addToHead)) {
	            if (this.insert(layer3D)) {
	                return layer3D;
	            }
	        }
	        else {
	            var index = this.get_count();
	            if (this.insert(layer3D, index)) {
	                return layer3D;
	            }
	        }
	    }
	    return null;
	},

	addTheme3D:function(strServerRootUrl, strLayerName, strDataName, l3dType, theme3d)
	{
	///<param name="strServerRootUrl" type="string">服务器地址</param>
	///<param name="strLayerName" type="string">图层名</param>
	///<param name="strDataName" type="string">数据名</param>
	///<param name="l3dType" type="SuperMap.Web.Realspace.Layer3DType">图层类型</param>
	///<param name="addToHead" type="boolean">是否添加到头部</param>
    ///<returns type="SuperMap.Web.Realspace.Layer3D">添加的图层</returns>
        if ((this._innerLayer3Ds == null))
        {
            return null;
        }
        // 首先到列表里去判断如果有,就不new了。add by zhaozhe
        var layer3D = new SuperMap.Web.Realspace.Layer3D(strServerRootUrl, strLayerName, strDataName, l3dType,null,theme3d);
        if (layer3D.initialized())
		{

				if (this.insert(layer3D))
				{
					return layer3D;
				}
        }
        return null;
	},


    /*
     *添加专题图图层
     */
    _createTheme3D:function(strServerRootUrl, strLayerName, strDataName, l3dType, theme3d)
    {
        ///<param name="strServerRootUrl" type="string">服务器地址</param>
        ///<param name="strLayerName" type="string">图层名</param>
        ///<param name="strDataName" type="string">数据名</param>
        ///<param name="l3dType" type="SuperMap.Web.Realspace.Layer3DType">图层类型</param>
        ///<param name="addToHead" type="boolean">是否添加到头部</param>
        ///<returns type="SuperMap.Web.Realspace.Layer3D">添加的图层</returns>
        if ((this._innerLayer3Ds !=null))
        {
            return this._innerLayer3Ds.CreateLayer3DWithTheme3D(strServerRootUrl, strLayerName, strDataName, l3dType, theme3d._get_innerTheme3D());
        }
    },

    /*
     *添加OGC图层
     */
    addOGC:function(strServerRootUrl, strLayerName, l3dType, addToHead)
    {
        ///<param name="strServerRootUrl" type="string">服务器地址</param>
        ///<param name="strLayerName" type="string">图层名</param>
        ///<param name="l3dType" type="SuperMap.Web.Realspace.Layer3DType">图层类型</param>
        ///<param name="addToHead" type="boolean">是否添加到头部</param>
        ///<returns type="SuperMap.Web.Realspace.Layer3D">添加的图层</returns>
        if ((this._innerLayer3Ds == null))
        {
            return null;
        }

        var layer3DOGC;
        if(l3dType == SuperMap.Web.Realspace.Layer3DType.WMS)
        {
            layer3DOGC = new SuperMap.Web.Realspace.Layer3DWMS(strServerRootUrl, strLayerName);
        }
        else if(l3dType == SuperMap.Web.Realspace.Layer3DType.WMTS)
        {
            layer3DOGC = new SuperMap.Web.Realspace.Layer3DWMTS(strServerRootUrl, strLayerName);
        }

        if (layer3DOGC.initialized())
        {
            if(addToHead||(null==addToHead))
            {
                if (this.insert(layer3DOGC))
                {
                    return layer3DOGC;
                }
            }
            else
            {
                var index = this.get_count();
                if (this.insert(layer3DOGC,index))
                {
                    return layer3DOGC;
                }
            }
        }
        return null;
    },

    /*
     *创建图层方法，需用insert函数加入图层集
     */
    _createLayer3D:function(pLayer3DURLParam)
    {
        if ((this._innerLayer3Ds == null || pLayer3DURLParam == null))
        {
            return null;
        }
        var innerLayer3D = this._innerLayer3Ds.get_Item(pLayer3DURLParam._get_layerName());
        if (innerLayer3D != null)
        {
            return innerLayer3D;
        }
        else
        {
            return this._innerLayer3Ds.CreateLayer3D(pLayer3DURLParam._innerLayer3DURL);
        }

    },

	/*
	*方法:移除所有图层
	*/
	removeAll:function()
	{
		///<returns type="void"></returns>
        if ((this._innerLayer3Ds == null))
        {
            return ;
        }
        Array.clear(this._layer3DArray);
		this._innerLayer3Ds.RemoveAll();

	},

	/*
	*方法:移除指定图层
	*/
	removeAt:function(index)
	{
		///<param name="index" type="string/number">要移除的图层索引或名称</param>
		///<returns type="boolean">是否成功</returns>
		if ((this._innerLayer3Ds == null))
        {
            return false;
        }
		if((index==0) || index)
		{

		    var layer = this.get_item(index);

		    if (layer != null)
		    {
		        Array.remove(this._layer3DArray,layer);
		        return this._innerLayer3Ds.RemoveAt(index);
		    }

		}
		return false;

	},

	/*
	*方法:向三维图层集合中的指定位置插入图层
	*/
	insert:function(layer3D, nIndex)
	{
		///<param name="layer3D" type="SuperMap.Web.Realspace.Layer3D">要插入的图层</param>
		///<param name="nIndex" type="number" integer="true" optional="true">插入位置</param>
		///<returns type="boolean">是否成功</returns>
		if ((this._innerLayer3Ds == null))
        {
            return false;
        }

        if(!SuperMap.Web.Realspace.Layer3DWMS.isInstanceOfType(layer3D)
        && !SuperMap.Web.Realspace.Layer3DWMTS.isInstanceOfType(layer3D)
        && !SuperMap.Web.Realspace.Layer3D.isInstanceOfType(layer3D)
        && !SuperMap.Web.Realspace.Layer3DCustom.isInstanceOfType(layer3D)
        && !SuperMap.Web.Realspace.Layer3DTianditu.isInstanceOfType(layer3D)
        && !SuperMap.Web.Realspace.Layer3DOSGB.isInstanceOfType(layer3D)
        && !SuperMap.Web.Realspace.Layer3DVolumeFile.isInstanceOfType(layer3D))
        {
            return false;
        }

		var bInsert = null;
		if((!isNaN(nIndex) && (nIndex !== "")) && (nIndex>=0))
		{
            //根据zhaozhe的思想，这里加进去就行了，脚本层列表不维护图层的顺序。
            bInsert = this._innerLayer3Ds.Insert(layer3D._get_innerLayer3D(), nIndex);
		}
		else
		{
			bInsert =  this._innerLayer3Ds.Insert(layer3D._get_innerLayer3D(), 0);
		}
		if (bInsert)
		{
			this._layer3DArray.push(layer3D);
			return true;
		}
		else
		{
            return false;
		}

	},

	/*
	*方法:返回指定名称的图层索引号
	*/
	indexOf:function(strLayerName)
	{
		///<param name="strLayerName" type="string">图层名</param>
		///<returns type="number" integer="true">索引</returns>
		if ((this._innerLayer3Ds == null))
		{
			return -1;
		}
        if(strLayerName)
        {
			return this._innerLayer3Ds.IndexOf(strLayerName);
        }
        else
        {
    	    return -1;
        }
	},


	/*
	*移动图层，将图层序号为nFromIndex移动到nToIndex处，其余图层序号依次往下移
	*/
	moveTo:function(nFromIndex, nToIndex)
	{
		///<param name="nFromIndex" type="number" integer="true">待移动图层索引号</param>
		///<param name="nToIndex" type="number" integer="true">目标图层索引号</param>
		///<returns type="boolean">是否成功</returns>
        if ((this._innerLayer3Ds == null))
        {
            return false;
        }
        if((!isNaN(nFromIndex)) && (nFromIndex>=0) && (nFromIndex<this.get_count()) && (!isNaN(nToIndex)) && (nToIndex>=0)  && (nToIndex<this.get_count()))
        {
			return this._innerLayer3Ds.MoveTo(nFromIndex, nToIndex);
		}

		return false;

	},

	/*
	*移动图层至链表顶部
	*/
	moveToTop:function(nIndex)
	{
		///<param name="nIndex" type="number">待移动图层索引号</param>
		///<returns type="boolean">是否成功</returns>
        if ((this._innerLayer3Ds == null))
        {
            return false;
        }
        if(!isNaN(nIndex) && (nIndex !== "") && nIndex>=0 && (nIndex<this.get_count()))
        {

			return this._innerLayer3Ds.MoveToTop(nIndex);
		}
		return false;

	},

	/*
	*移动图层至链表底部
	*/
	moveToBottom:function(nIndex)
	{
		///<param name="nIndex" type="number">待移动图层索引号</param>
		///<returns type="boolean">是否成功</returns>
        if ((this._innerLayer3Ds == null))
        {
            return false;
        }
        if(!isNaN(nIndex) && (nIndex !== "") && nIndex>=0 && (nIndex<this.get_count()))
        {

			return this._innerLayer3Ds.MoveToBottom(nIndex);
		}

		return false;
	},

	/*
	*图层往下移动一层，即图层序号+1
	*/
	moveDown:function(nIndex)
	{
		///<param name="nIndex" type="number">待移动图层索引号</param>
		///<returns type="boolean">是否成功</returns>
        if ((this._innerLayer3Ds == null))
        {
            return false;
        }
        if(!isNaN(nIndex) && (nIndex !== "") && nIndex>=0 && (nIndex<this.get_count()))
        {

			return this._innerLayer3Ds.MoveDown(nIndex);
		}

		return false;

	},

	/*
	*图层往上移动一层，即图层序号-1
	*/
	moveUp:function(nIndex)
	{
    ///<param name="nIndex" type="number">待移动图层索引号</param>
    ///<returns type="boolean">是否成功</returns>
        if ((this._innerLayer3Ds == null))
        {
            return false;
        }
        if(!isNaN(nIndex) && (nIndex !== "") && nIndex>=0 && (nIndex<this.get_count()))
        {

           return this._innerLayer3Ds.MoveUp(nIndex);
	    }

        return false;

	},

	//响应generateURL事件
    _generateURL: function(innerLayer3D, dScale, nRow, nCol, layer3Ds ) {
        //selection3Ds是选择集的数组
        var layer3D = SuperMap.Web.Core.Conversion._CreateObjectBySRObject(innerLayer3D,"Layer3DCustom");
        var urlArray = [dScale, nRow, nCol];
        layer3Ds._raiseEvent("generateURL", urlArray, layer3D);

    },

    addExploreEvent: function(obj, name, func){
        if (obj.attachEvent) {
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

    //绑定控件事件，并转化为脚本事件
    _attachEvent: function() {
        // 考虑用全局的代替
        var mlayers = this;

        var getURLHandler = this._generateURL;
        this.addExploreEvent(this._innerLayer3Ds, 'GenerateURL', function(innerLayer3D, dScale, nRow, nCol) { return getURLHandler(innerLayer3D, dScale, nRow, nCol, mlayers); });
    }

};
SuperMap.Web.Realspace.Layer3Ds.registerClass('SuperMap.Web.Realspace.Layer3Ds', Sys.Component, Sys.IDisposable);
