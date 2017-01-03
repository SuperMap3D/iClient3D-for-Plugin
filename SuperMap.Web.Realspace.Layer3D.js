//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.Layer3D
// 功能：			 三维图层类
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Layer3D = function(strServerRootUrl, strLayerName, strDataName, l3dType, innerLayer3D ,theme3D) {
    /// <summary>3D图层对象</summary>
    ///<param name="strServerRootUrl" type="String">服务器地址</param>
    ///<param name="strLayerName" type="String">图层名</param>
    ///<param name="strDataName" type="String">数据名</param>
    ///<param name="l3dType" type="SuperMap.Web.Realspace.Layer3DType">图层类型</param>
    /// <returns type="SuperMap.Web.Realspace.Layer3D">返回3D图层对象。</returns>

    SuperMap.Web.Realspace.Layer3D.initializeBase(this);

    // 没有自己的成员，完全依赖COM
    this._innerLayer = null;
    this._selection3D = null;
    this._feature3ds = null;

    this._style3D = null;
    this._selectStyle = null;
    this._transparentColor = null;
    this._fieldInfos = null;

    if (arguments.length == 1 && arguments[0] instanceof SuperMap.Web.Realspace.Layer3DURLParam)
    {
        //变相重载，此处strServerRootUrl为SuperMap.Web.Realspace.Layer3DURLParam对象
        this._innerLayer = SuperMap.Web.Realspace.Utility._SceneControl.get_scene().get_layer3Ds()._createLayer3D(strServerRootUrl);
        if (this._innerLayer == null) {
            var ex = new Error(SuperMap.Lang.translate("操作失败"));
            ex.name = SuperMap.Web.Realspace.ExceptionName.OperationFailed;
            throw ex;
        }
        return;
    }
    if ( innerLayer3D != null) {
        this._innerLayer = innerLayer3D;
    }
    else {

        if (theme3D != undefined)
        {
            this._innerLayer = SuperMap.Web.Realspace.Utility._SceneControl.get_scene().get_layer3Ds()._createTheme3D(strServerRootUrl, strLayerName, strDataName, l3dType, theme3D);
        }
        else
        {
            var pLayer3DURLParam = new SuperMap.Web.Realspace.Layer3DURLParam();
            pLayer3DURLParam._set_layerURL(strServerRootUrl);
            pLayer3DURLParam._set_layerType(l3dType);
            pLayer3DURLParam._set_dataName(strDataName);
            pLayer3DURLParam._set_layerName(strLayerName);
            this._innerLayer = SuperMap.Web.Realspace.Utility._SceneControl.get_scene().get_layer3Ds()._createLayer3D(pLayer3DURLParam);
        }
    }
    if (this._innerLayer == null) {
        var ex = new Error(SuperMap.Lang.translate("操作失败"));
        ex.name = SuperMap.Web.Realspace.ExceptionName.OperationFailed;
        throw ex;
    }

};

SuperMap.Web.Realspace.Layer3D.prototype = {
    /*
    *innerLayer3D对象，不对外开放
    */
    _get_innerLayer3D: function() {
        return this._innerLayer;
    },

    _set_innerLayer3D: function(innerLayer3D) {
        this._innerLayer = innerLayer3D;
    },

    /*
    *initialized方法
    */
    initialized: function() {
        ///<returns type="Boolean">判断图层对象是否被创建</returns>
        if (this._innerLayer != null) {
            return true;
        }
        else {
            return false;
        }

    },

    /*
    *name属性
    */
    get_name: function() {
        ///<value type="String">返回图层名</value>
        if (this._innerLayer != null) {
            return this._innerLayer.Name;
        }
    },

    /*
    *caption属性
    */
    get_caption: function() {
        ///<value type="String">返回图层标题</value>
        if (this._innerLayer != null) {
            return this._innerLayer.Caption;
        }

    },
    set_caption: function(caption) {
        /// <summary>设置图层标题</summary>
        if (typeof (caption) != "string") {
            return;
        }
        if (this._innerLayer != null) {
            this._innerLayer.Caption = caption;
        }

    },

    /*
     *updatesize属性
     */
    get_updateSize:function() {

        ///<value type="int">返回图层更新块大小</value>
        if (this._innerLayer != null) {
            return this._innerLayer.UpdateSize;
        }
},

    set_updateSize:function(value) {

        ///<value type="int">设置图层更新块大小</value>
        if (this._innerLayer != null) {
            this._innerLayer.UpdateSize = value;
        }
    },
    /*
    *description属性
    */
    get_description: function() {
        ///<value type="String">返回图层描述信息</value>
        if (this._innerLayer != null) {
            return this._innerLayer.Description;
        }
    },
    set_description: function(description) {
        /// <summary>设置图层描述信息</summary>
        if (typeof (description) != "string") {
            return;
        }
        if (this._innerLayer != null) {
            this._innerLayer.Description = description;
        }
    },

    /*
    *数据存储路径
    */
     get_dataName: function()
     {///<value type="String">返回图层数据存储路径</value>
         if (this._innerLayer != null)
         {
             return this._innerLayer.DataName;
         }
     },

    /*
    *图层可见性属性
    */
    get_isVisible: function() {
        ///<value type="Boolean">返回图层是否可见</value>
        if (this._innerLayer != null) {
            return this._innerLayer.IsVisible;
        }
    },

    set_isVisible: function(isVisible) {
        ///<summary>设置图层可见性</summary>
        if (this._innerLayer != null) {
            this._innerLayer.IsVisible = isVisible;
        }

    },

    /*
    *图层类型属性
    */
    get_type: function() {
        ///<value type="SuperMap.Web.Realspace.Layer3DType">返回图层类型</value>
        if (this._innerLayer != null) {
            return this._innerLayer.Type;
        }
    },

    /*
     *图层类型属性
     */
    get_theme: function() {
        ///<value type="SuperMap.Web.Realspace.Layer3DType">返回图层类型</value>
        if (this._innerLayer != null) {
            return this._innerLayer.Type;
        }
    },

    /*
    *三维图层的数据类型属性
    */
    get_dataType: function() {
        ///<value type="SuperMap.Web.Realspace.Layer3DDataType">返回三维图层包含的数据类型</value>
        if (this._innerLayer != null) {
            return this._innerLayer.DataType;
        }
    },

    /*
    *图层是否可选择
    */
    get_isSelectable: function() {
        ///<value type="Boolean">返回图层是否可选择</value>
        if (this._innerLayer != null) {
            return this._innerLayer.IsSelectable;
        }

    },

    set_isSelectable: function(isSelectable) {
        ///<summary>设置图层是否可选择</summary>
        if (this._innerLayer != null) {
            this._innerLayer.IsSelectable = isSelectable;
        }

    },

    /*
    *图层是否可编辑
    */
    get_isEditable: function() {
        ///<value type="Boolean">返回图层是否可编辑</value>
        if (this._innerLayer != null) {
            return this._innerLayer.IsEditable;
        }

    },

    set_isEditable: function(iseditalbe) {
        ///<summary>设置图层是否可编辑</summary>
        if (this._innerLayer != null) {
            this._innerLayer.IsEditable = iseditalbe;
        }

    },

    /*
     *图层是否显示阴影
     */
    get_isShadowEnable: function() {
        ///<value type="Boolean">返回图层是否显示阴影</value>
        if (this._innerLayer != null) {
            return this._innerLayer.IsShadowEnable;
        }
    },

    set_isShadowEnable: function(value) {
        ///<summary>设置图层是否可显示阴影</summary>
        if (this._innerLayer != null) {
            this._innerLayer.IsShadowEnable = value;
        }
    },

    /*
    *图层是否始终进行渲染
    */
    get_isAlwaysRender: function() {
        ///<value type="Boolean">返回图层是否始终进行渲染</value>
        if (this._innerLayer != null) {
            return this._innerLayer.IsAlwaysRender;
        }

    },

    set_isAlwaysRender: function(isalbe) {
        ///<summary>设置图层是否始终进行渲染</summary>
        if (this._innerLayer != null) {
            this._innerLayer.IsAlwaysRender = isalbe;
        }

    },

    /*
    *图层选择集属性
    */
    get_selection3D: function() {
        ///<value type="SuperMap.Web.Realspace.Selection3D">返回图层选择集属性</value>
        if (this._selection3D == null && this._innerLayer != null) {
            this._selection3D = new SuperMap.Web.Realspace.Selection3D(this._innerLayer.Selection3D, this);
            this._selection3D.get_style3D().set_lineWidth(0.1);
        }
        return this._selection3D;

    },
    /*
     *IsExcavation属性
     * OSGB图层是否参与开挖，默认不参与
     */
    get_isExcavation: function()
    {
        ///<value type="Boolean">返回OSGB图层是否参与开挖</value>
        if (this._innerLayer != null)
        {
            return this._innerLayer.IsExcavation;
        }
    },
    set_isExcavation: function(isExcavation)
    {
        ///<summary>设置OSGB图层是否参与开挖</summary>
        if (this._innerLayer != null)
        {
            this._innerLayer.IsExcavation = isExcavation;
        }
    },


    /*
    *图层对象的最大可见距离(矢量、模型)
    */
    get_maxObjectVisibleDistance: function() {
        ///<value type="Number">返回图层对象的最大可见距离</value>
        if (this._innerLayer != null) {
            return this._innerLayer.MaxObjectVisibleDistance;
        }
    },

    set_maxObjectVisibleDistance: function(maxVisibleDistance) {
        ///<summary>设置图层对象的最大可见距离</summary>
        if (!isNaN(maxVisibleDistance)) {
            if (this._innerLayer != null) {
                this._innerLayer.MaxObjectVisibleDistance = maxVisibleDistance;
            }

        }
    },

    /*
    *图层对象的最小可见距离(矢量、模型)
    */
    get_minObjectVisibleDistance: function() {
        ///<value type="Number">返回图层对象的最小可见距离</value>
        if (this._innerLayer != null) {
            return this._innerLayer.MinObjectVisibleDistance;
        }
    },

    set_minObjectVisibleDistance: function(minVisibleDistance) {
        ///<summary>设置图层对象的最小可见距离</summary>
        if (!isNaN(minVisibleDistance)) {
            if (this._innerLayer != null) {
                this._innerLayer.MinObjectVisibleDistance = minVisibleDistance;
            }

        }
    },

    /*
    *属性三维图层的最大可见高程值
    */
    get_maxVisibleAltitude: function() {
        ///<value type="Number">返回图层的最大可见高程值</value>
        if (this._innerLayer != null) {
            return this._innerLayer.MaxVisibleAltitude;
        }

    },

    set_maxVisibleAltitude: function(maxVisibleAltitude) {
        ///<summary>设置图层的最大可见高程值</summary>
        var n_maxVisibleAltitude = parseFloat(maxVisibleAltitude);
        if (!isNaN(n_maxVisibleAltitude)) {
            if (this._innerLayer != null) {
                this._innerLayer.MaxVisibleAltitude = n_maxVisibleAltitude;
            }
        }
    },


    /*
    *属性三维图层的最小可见高程值
    */
    get_minVisibleAltitude: function() {
        ///<value type="Number">返回图层的最小可见高程值</value>
        if (this._innerLayer != null) {
            return this._innerLayer.MinVisibleAltitude;
        }

    },

    set_minVisibleAltitude: function(minVisibleAltitude) {
        ///<summary>设置图层的最小可见高程值</summary>
        var n_minVisibleAltitude = parseFloat(minVisibleAltitude);
        if (!isNaN(n_minVisibleAltitude)) {
            if (this._innerLayer != null) {
                this._innerLayer.MinVisibleAltitude = n_minVisibleAltitude;
            }

        }
    },

    /*
    *获取三维渲染要素集合对象
    */
    get_feature3Ds: function() {
        ///<value type="SuperMap.Web.Core.Feature3Ds"></value>
        if (this._innerLayer == null) {
            return;
        }
        if (this.get_type() == SuperMap.Web.Realspace.Layer3DType.KML || this.get_type() == SuperMap.Web.Realspace.Layer3DType.KMZ) {
            if (this._feature3ds == null) {
                this._feature3ds = new SuperMap.Web.Core.Feature3Ds();
                this._feature3ds._set_innerFeature3Ds(this._innerLayer.Feature3Ds);
                this._feature3ds._makelist();
            }
            return this._feature3ds;
        }
        return null;
    },

    /*
    *图层的范围
    */
    get_bounds: function() {
        ///<value type="SuperMap.Web.Core.Rectangle2D">返回图层的范围</value>
        if (this._innerLayer != null) {
            var innerBounds = this._innerLayer.Bounds;
            return new SuperMap.Bounds(innerBounds.Left, innerBounds.Bottom, innerBounds.Right, innerBounds.Top);

        }
    },


    /*
     *剖切查看
     */
    clipByBox: function(geometry,part) {
        ///<value type="SuperMap.Web.Core.Box">设置剖切面</value>
        ///<param name="part" type="SuperMap.Web.Realspace.BoxClipPart">裁剪模式</param>

                if(this._innerLayer != null)
            {
                var geobox = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(geometry);
                this._innerLayer.ClipByBox(geobox,part);
            }

    },


    /*
    *设置图层中指定的批量对象可见状态,只对模型图层有效。
    */
    setObjectVisible: function(objectIds, bVisible) {
        ///<param name="objectIds" type="Array" elementType="Number" integer="true">对象Id数组</param>
        ///<param name="bVisible" type="Boolean">是否可见</param>
        ///<returns type="boolean">是否成功</returns>
        var e = Function._validateParams(arguments, [{ name: "objectIds", type: Array, elementType: Number }, { name: "objectIds", type: Boolean}]);
        if (e) {
            var ex = SuperMap.Web.Realspace.Utility._ConvertSysEx2Realspace(e);
            throw ex;
        }
        if (this._innerLayer != null) {
            return this._innerLayer.SetObjectVisible(objectIds, bVisible);
        }

    },


    /*
    *Style3D属性
    */
    get_style3D: function()
    {
        ///<value type="SuperMap.Web.Core.Style3D">返回矢量类型图层的风格属性</value>
    if (this._innerLayer != null)
    {
       if(this._innerLayer.Type == SuperMap.Web.Realspace.Layer3DType.VECTOR ||this._innerLayer.Type == SuperMap.Web.Realspace.Layer3DType.OSGB)
        {
            if(null == this._style3D)
            {
                this._style3D = new SuperMap.Web.Core.Style3D();
                this._style3D._set_innerStyle3D(this._innerLayer.Style3D);
            }
            return this._style3D;
        }
      }
    },
    set_style3D: function(style3D)
    {
        ///<summary>设置矢量类型图层的显示风格</summary>
        if (this._innerLayer == null)
        {
            return;
        }
        if (SuperMap.Web.Core.Style3D.isInstanceOfType(style3D))
        {
          if(this._innerLayer.Type == SuperMap.Web.Realspace.Layer3DType.VECTOR ||this._innerLayer.Type == SuperMap.Web.Realspace.Layer3DType.OSGB)
          {
            this._innerLayer.Style3D = style3D._get_innerStyle3D();
            this._style3D = style3D;
          }
        }
    },


    /*
     *是否开启卷帘效果
     */
    get_swipeEnabled: function() {
        ///<value type="Boolean">返回图层是否开启卷帘效果</value>
        if (this._innerLayer != null) {
            return this._innerLayer.SwipeEnabled;
        }
    },

    set_swipeEnabled: function(isswipeEnabled) {
        ///<summary>设置图层是否开启卷帘</summary>
        if (this._innerLayer != null) {
            this._innerLayer.SwipeEnabled = isswipeEnabled;
        }

    },



    /*
     *SwipeRegion属性
     */
    get_swipeRegion: function()
    {
        ///<value type="SuperMap.Web.Core.Rectangle2D">返回卷帘范围</value>
        if (this._innerLayer != null )
        {
            var innerBounds = this._innerLayer.SwipeRegion;
            return new SuperMap.Bounds(innerBounds.Left, innerBounds.Bottom, innerBounds.Right, innerBounds.Top);
        }
    },
    set_swipeRegion: function(rec2d)
    {
        ///<summary>设置卷帘范围</summary>
        if (this._innerLayer != null) {
            var recInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(rec2d);
            this._innerLayer.SwipeRegion = recInner;
        }
    },


    /*
    *SelectStyle属性
    */
    get_selectStyle: function()
    {
        ///<value type="SuperMap.Web.Core.Style3D">返回矢量类型图层的选择风格属性</value>
        if (this._innerLayer != null)
        {
            if(null == this._selectStyle)
            {
                this._selectStyle = new SuperMap.Web.Core.Style3D();
                this._selectStyle._set_innerStyle3D(this._innerLayer.SelectStyle);
            }
            return this._selectStyle;
        }
    },
    set_selectStyle: function(selectStyle)
    {
        ///<summary>设置矢量类型图层的选择风格</summary>
        if (this._innerLayer == null)
        {
            return;
        }
        if (SuperMap.Web.Core.Style3D.isInstanceOfType(selectStyle))
        {
            this._innerLayer.SelectStyle = selectStyle._get_innerStyle3D();
            this._selectStyle = selectStyle;
        }
    },


    /*
    *IsTransparent属性
    */
    get_isTransparent: function()
    {
        if (this._innerLayer != null)
        {
            return this._innerLayer.IsTransparent;
        }

    },
    set_isTransparent: function(isTransparent)
    {
        if (typeof (isTransparent) != "boolean")
        {
            return;
        }
        if (this._innerLayer != null)
        {
            this._innerLayer.IsTransparent = isTransparent;
        }
    },


    /*
     *OpaqueRate属性:影像图层的透明度
     */
    get_opaqueRate: function()
    {
        if (this._innerLayer != null)
        {
            return this._innerLayer.OpaqueRate;
        }

    },
    set_opaqueRate: function(nOpaque)
    {
        if (this._innerLayer != null && typeof (nOpaque) == "number")
        {
            this._innerLayer.OpaqueRate = nOpaque;
        }
    },

    /*
     *SelectionFiltrateByTransparency属性:透明不选择
     */
    get_selectionFiltrateByTransparency: function()
    {
        if (this._innerLayer != null)
        {
            return this._innerLayer.SelectionFiltrateByTransparency;
        }

    },
    set_SelectionFiltrateByTransparency: function(value)
    {
        if (this._innerLayer != null && typeof (value) == "number")
        {
            this._innerLayer.SelectionFiltrateByTransparency = value;
        }
    },

    /*
    *TransparentColor属性
    */
    get_transparentColor: function()
    {
        if (this._innerLayer == null) {
            return null;
        }
        if (this._transparentColor == null) {
            this._transparentColor = new SuperMap.Web.Core.Color();
        }
        this._transparentColor.fromLongABGR(this._innerLayer.TransparentColor);
        return this._transparentColor;
    },
    set_transparentColor: function(transparentColor)
    {
        if (this._innerLayer == null) {
            return;
        }
        if (SuperMap.Web.Core.Color.isInstanceOfType(transparentColor)) {
            this._innerLayer.TransparentColor = transparentColor.toLongABGR();
        }
        else if (!isNaN(parseFloat(transparentColor))) {
            this._innerLayer.TransparentColor = parseFloat(transparentColor);
        }
    },

    /*
    *TransparentColorTolerance属性
    */
    get_transparentColorTolerance: function()
    {
        if (this._innerLayer != null)
        {
            return this._innerLayer.TransparentColorTolerance;
        }
    },
    set_transparentColorTolerance: function(transparentColorTolerance)
    {
		if(transparentColorTolerance>255 || transparentColorTolerance<0)
		{
				return;
		}
        if (this._innerLayer != null)
        {
            this._innerLayer.TransparentColorTolerance = transparentColorTolerance;
        }
    },

    /*
    *findFeature3DByID方法
    */
    findFeature3DByID: function(id)
    {
        ///<param name="id" type="Int" elementType="Number" integer="true">对象Id</param>
        ///<returns type="SuperMap.Web.Core.Feature3D">若查找成功返回根据ID查找到三维要素对象，否则返回null</returns>
        var n_id = parseInt(id);
        if (!isNaN(n_id))
        {
            var innerobj = this._innerLayer.FindFeature3DByID(id);
            if (innerobj != null) {
               var feature3d = new SuperMap.Web.Core.Feature3D();
               feature3d._set_innerFeature3D(innerobj);
               feature3d._make(innerobj.Geometry);
               return feature3d;
            }
        }
        return null;
    },
    /**
    *删除该图层属性缓存数据
    */
    updateAttributeCacheFile:function()
    {
        return this._innerLayer.UpdateAttributeCacheFile();
    },

     /**
    *删除该图层属性缓存数据
    */
    updateCacheFile:function()
    {
        return this._innerLayer.UpdateCacheFile();
    },

    /*
    * 更新选择集
    */
    updateSelection:function()
    {
        if (this._innerLayer == null) {
            return;
        }
        this._innerLayer.UpdateSelection();
    },
    /**
    *更新该图层缓存数据
    */
    updateData: function () {
        return this._innerLayer.UpdateData();
    },
    /*
    * 释放选择集，包括清除选择集里面的id，以及高亮效果
    */
    releaseSelection:function()
    {
        if (this._innerLayer == null) {
            return;
        }
        this._innerLayer.ReleaseSelection();
    },

    /*
    *矢量文件缓存属性字段信息
    */
    get_fieldInfos:function()
    {
		///<value type="SuperMap.Web.Realspace.FieldInfos">返回属性字段信息集合</value>
        if (this._innerLayer == null) {
            return;
        }

        if (this._fieldInfos == null) {
           if (this._innerLayer.FieldInfos == null) {
               return;
           }
           this._fieldInfos = new SuperMap.Web.Realspace.FieldInfos(this._innerLayer.FieldInfos);
        }
        return this._fieldInfos;
    },

    /*
    *获取矢量文件缓存属性字段值
    */
    getFieldValue:function(index)
    {
        if (this._innerLayer == null|| index==null) {
            return;
        }
        if(typeof index=="string")
        {
            return this._innerLayer.GetFieldValue(index);
        }
        if(typeof index=="number")
        {
            var intValue = parseInt(index);
            if((intValue>=0)&&(intValue<=0xFFFFFFFF))
            {
                return this._innerLayer.GetFieldValue(intValue);
            }
        }
        return;
    },

    refresh:function()
    {
        if (this._innerLayer == null) {
            return;
        }
        this._innerLayer.Refresh();
    },

    /*
    *获取图层数据下载进度
    */
    getDataStreamingProgress:function()
    {
        if (this._innerLayer == null) {
            return;
        }
        return this._innerLayer.GetDataStreamingProgress();
    },

    setLoadTextureLOD:function(bLoadLOD0, bLoadLOD1, bLoadLOD2)
    {
		///<param name="bLoadLOD0" type="Boolean">精细</param>
		///<param name="bLoadLOD1" type="Boolean">普通</param>
		///<param name="bLoadLOD2" type="Boolean">粗糙</param>
        if (this._innerLayer == null) {
            return;
        }
        if((typeof bLoadLOD0=="boolean")&&(typeof bLoadLOD1=="boolean")&&(typeof bLoadLOD2=="boolean"))
        {
            return this._innerLayer.SetLoadTextureLOD(bLoadLOD0, bLoadLOD1, bLoadLOD2);
        }
    },

    renderWithoutTexture:function(bLoad)
    {
		///<param name="bLoad" type="Boolean">是否加载无纹理模型</param>
        if (this._innerLayer == null) {
            return;
        }
        if(typeof bLoad=="boolean")
        {
            return this._innerLayer.RenderWithoutTexture(bLoad);
        }
    },


    fromXML:function(xml)
    {
        if (typeof (xml) != "string" || this._innerLayer == null)
		{
            return;
        }

        this._innerLayer.FromXML(xml);
    },

    /*
    *获取图层数据下载进度
    */
    toXML:function()
    {
        if (this._innerLayer == null) {
            return;
        }
        return this._innerLayer.ToXML();
    },
    /**
     *添加一个压平对象，指定对象标签
     * @returns bool
     */
    addFlattenRegion:function(geometry,index)
    {
        var geoInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(geometry);
        if(this._innerLayer != null && geoInner != null)
        {
            this._innerLayer.AddFlattenRegion(geoInner,index);
        }
    },

    /*
     *清空压平
     */
    clearFlattenRegions:function()
    {
        if(this._innerLayer != null)
        {
            this._innerLayer.ClearFlattenRegions();
        }
    },

    /*
     *osgb图层压平对象总数
     */
    get_flattenRegionCount:function()
    {
        if(this._innerLayer!=null){
            this._innerLayer.FlattenRegionCount;
        }
    },

    /*
     *osgb图层设置指定索引的压平对象
     */
    getFlattenRegion:function(index){

        if(this._innerLayer!=null){
            var geoInner = this._innerLayer.GetFlattenRegion(index);
            var region = SuperMap.Web.Core.Conversion._ConvertSRObject2Object(index,"GeoRegion3D");
            return region;
        }
    },

    /*
     *osgb图层设置指定索引的压平对象标签
     */
    getFlattenRegionTag:function(index){
        if(this._innerLayer!=null){
            return this._innerLayer.GetFlattenRegionTag(index);
        }
    },

    /*
     *osgb图层设置指定标签的压平对象索引
     */
    getIndexOfFlattenRegion:function(strTag){
        if(this._innerLayer!=null){
            return this._innerLayer.IndexOfFlattenRegion(strTag);
        }
    },

    /*
     *osgb图层删除指定索引的压平对象
     */
    removeFlattenRegion:function(index){
        if(this._innerLayer!=null){
            return this._innerLayer.RemoveFlattenRegion(index);
        }
    },

    /*
     *osgb图层设置指定索引的压平对象标签
     */
    setFlattenRegionTag:function(index,tag){
        if(this._innerLayer!=null){
            return this._innerLayer.SetFlattenRegionTag(index,tag);
        }
    },

    /*
	 * 裁剪面分析
	 */
    SetCustomClipPlane:function(firstPoint,secondPoint,thirdPoint){
    	var first_geoInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(firstPoint);
    	var second_geoInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(secondPoint);
    	var third_geoInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(thirdPoint);
        if(this._innerLayer != null && first_geoInner != null && second_geoInner != null && third_geoInner != null)
        {
            return this._innerLayer.SetCustomClipPlane(first_geoInner,second_geoInner,third_geoInner);
        }
    },

    /*
     * 设置颜色表
     */
    setObjectsColor:function (keys,color) {
        var intColor = color.toLongABGR();
        if(this._innerLayer != null)
        {

            return this._innerLayer.SetObjectsColor(keys,intColor);
        }
    },

    /*
     * 获取颜色表对应的ID值
     */
    getObjectsColorIDs:function () {
        ///<value type="Boolean">返回颜色表对应的ID值</value>
        if(this._innerLayer != null)
        {
            return this._innerLayer.GetObjectsColorIDs();
        }
    },

    /*
     * 获取颜色表
     */
    getObjectsColor:function () {
        ///<value type="Boolean">返回颜色表</value>
        if(this._innerLayer != null)
        {
            var color = new SuperMap.Web.Core.Color();
            var intColor = this._innerLayer.GetObjectsColorValues();
            return color.fromLongABGR(intColor);

        }
    },

    /*
     * 移出指定IDs的颜色表
     */
    removeObjectsColor:function (objectIds) {

        if(this._innerLayer != null)
        {
            return this._innerLayer.RemoveObjectsColor(objectIds);
        }
    },

    /*
     * 清除颜色表
     */
    ClearObjectsColor:function () {

        if(this._innerLayer != null)
        {
            return this._innerLayer.ClearObjectsColor();
        }
    },

    /**
     *设置图层对某个视口的可见性
     *
     */
    setViewportVisible:function(index,value)
    {

        if(this._innerLayer != null && index != null)
        {
            this._innerLayer.SetViewportVisible(index,value);
        }
    },

    /*
     * 获取图层对某个视口的可见性
     */
    getViewportVisible:function (index) {

        if(this._innerLayer != null && index != null)
        {
            return this._innerLayer.GetViewportVisible(index);
        }
    },

    /*
     * 清除裁剪面
     */
    ClearCustomClipPlane:function(){
    	return this._innerLayer.ClearCustomClipPlane();
    },

    /*
     * 获取体对象
     */
    getVolume3D:function()
    {
        if (this._innerLayer != null) {
            var recSRVolume3D = this._innerLayer.GetVolume3D();
            return SuperMap.Web.Core.Conversion._CreateObjectBySRObject(recSRVolume3D,"Volume3D");
        }
    },

    /*
     * 返回/设置如果不可见时是否图层自动释放,可以减少内存占用。目前只对SCV图层和OSGB图层起作用其他图层设了也没用
     */
    get_autoRelease:function()
    {
        ///<returns type="Boolean">判断图层是否自动释放</returns>
        if (this._innerLayer != null){
            var value = this._innerLayer.getAutoRelease;
            if ( value === "undefined") {
                value = false;
            }
            return value;
        }
    },

    set_autoRelease:function(value)
    {
        ///<param name="value" type="Boolean">设置图层是否自动释放</param>
        if(this._innerLayer != null && typeof value === "boolean"){
            this._innerLayer.getAutoRelease = value;
        }
    },

    /*
     *获取所选中OSGB的属性信息
     */
    getAllFieldValueOfLastSelectedObject: function()
    {
        ///<returns type="Array">返回包含OSGB各项属性的数组</returns>
        if(this._innerLayer.GetAllFieldValueOfLastSelectedObject().length === 0)
        {
            alert("none!");
            return;
        }
        return this._innerLayer.GetAllFieldValueOfLastSelectedObject();
    },

    /*
     * 返回/设置是否开启顶点捕捉
     */
    get_snap:function()
    {
        ///<returns type="Boolean">是否开启顶点捕捉</returns>
        if (this._innerLayer != null) {
            return this._innerLayer.Snap;
        }
    },

    set_snap:function(value)
    {
        ///<param name="value" type="Boolean">设置图层是否自动释放</param>
        if (this._innerLayer != null && typeof value === "boolean") {
            this._innerLayer.Snap = value;
        }
    }

};
SuperMap.Web.Realspace.Layer3D.registerClass('SuperMap.Web.Realspace.Layer3D', Sys.Component, Sys.IDisposable);



SuperMap.Web.Realspace.Layer3DWMS = function(strServerRootUrl, strLayerName, innerLayer3D) {
    /// <summary>WMS图层对象</summary>
    ///<param name="strServerRootUrl" type="String">服务器地址</param>
    ///<param name="strLayerName" type="String">图层名</param>
    /// <returns type="SuperMap.Web.Realspace.Layer3DWMS">返回3D图层对象。</returns>

    SuperMap.Web.Realspace.Layer3DWMS.initializeBase(this);

    // 没有自己的成员，完全依赖COM
    this._innerLayer = null;

    this._style3D = null;
    this._transparentColor = null;

    if ( innerLayer3D != null) {
        this._innerLayer = innerLayer3D;
    }
    else {
        var pLayer3DURLParam = new SuperMap.Web.Realspace.Layer3DURLParam();
        pLayer3DURLParam._set_layerURL(strServerRootUrl);
        pLayer3DURLParam._set_layerType(SuperMap.Web.Realspace.Layer3DType.WMS);
        pLayer3DURLParam._set_dataName(strLayerName);
        pLayer3DURLParam._set_layerName(strLayerName);
        this._innerLayer = SuperMap.Web.Realspace.Utility._SceneControl.get_scene().get_layer3Ds()._createLayer3D(pLayer3DURLParam);
    }
    if (this._innerLayer == null) {
        var ex = new Error(SuperMap.Lang.translate("操作失败"));
        ex.name = SuperMap.Web.Realspace.ExceptionName.OperationFailed;
        throw ex;
    }

};

SuperMap.Web.Realspace.Layer3DWMS.prototype = {
    /*
    *innerLayer3D对象，不对外开放
    */
    _get_innerLayer3D: function() {
        return this._innerLayer;
    },

    _set_innerLayer3D: function(innerLayer3D) {
        this._innerLayer = innerLayer3D;
    },

    /*
    *initialized方法
    */
    initialized: function() {
        ///<returns type="Boolean">判断图层对象是否被创建</returns>
        if (this._innerLayer != null) {
            return true;
        }
        else {
            return false;
        }

    },

    /*
    *name属性
    */
    get_name: function() {
        ///<value type="String">返回图层名</value>
        if (this._innerLayer != null) {
            return this._innerLayer.Name;
        }
    },

    /*
    *caption属性
    */
    get_caption: function() {
        ///<value type="String">返回图层标题</value>
        if (this._innerLayer != null) {
            return this._innerLayer.Caption;
        }

    },
    set_caption: function(caption) {
        /// <summary>设置图层标题</summary>
        if (typeof (caption) != "string") {
            return;
        }
        if (this._innerLayer != null) {
            this._innerLayer.Caption = caption;
        }

    },

    /*
    *description属性
    */
    get_description: function() {
        ///<value type="String">返回图层描述信息</value>
        if (this._innerLayer != null) {
            return this._innerLayer.Description;
        }
    },
    set_description: function(description) {
        /// <summary>设置图层描述信息</summary>
        if (typeof (description) != "string") {
            return;
        }
        if (this._innerLayer != null) {
            this._innerLayer.Description = description;
        }
    },

    /*
    *图层可见性属性
    */
    get_isVisible: function() {
        ///<value type="Boolean">返回图层是否可见</value>
        if (this._innerLayer != null) {
            return this._innerLayer.IsVisible;
        }
    },

    set_isVisible: function(isVisible) {
        ///<summary>设置图层可见性</summary>
        if (this._innerLayer != null) {
            this._innerLayer.IsVisible = isVisible;
        }

    },

    /*
    *图层是否始终进行渲染
    */
    get_isAlwaysRender: function() {
        ///<value type="Boolean">返回图层是否始终进行渲染</value>
        if (this._innerLayer != null) {
            return this._innerLayer.IsAlwaysRender;
        }

    },

    set_isAlwaysRender: function(isalbe) {
        ///<summary>设置图层是否始终进行渲染</summary>
        if (this._innerLayer != null) {
            this._innerLayer.IsAlwaysRender = isalbe;
        }

    },

    /*
    *属性三维图层的最大可见高程值
    */
    get_maxVisibleAltitude: function() {
        ///<value type="Number">返回图层的最大可见高程值</value>
        if (this._innerLayer != null) {
            return this._innerLayer.MaxVisibleAltitude;
        }

    },

    set_maxVisibleAltitude: function(maxVisibleAltitude) {
        ///<summary>设置图层的最大可见高程值</summary>
        var n_maxVisibleAltitude = parseFloat(maxVisibleAltitude);
        if (!isNaN(n_maxVisibleAltitude)) {
            if (this._innerLayer != null) {
                this._innerLayer.MaxVisibleAltitude = n_maxVisibleAltitude;
            }
        }
    },

    /*
    *属性三维图层的最小可见高程值
    */
    get_minVisibleAltitude: function() {
        ///<value type="Number">返回图层的最小可见高程值</value>
        if (this._innerLayer != null) {
            return this._innerLayer.MinVisibleAltitude;
        }

    },

    set_minVisibleAltitude: function(minVisibleAltitude) {
        ///<summary>设置图层的最小可见高程值</summary>
        var n_minVisibleAltitude = parseFloat(minVisibleAltitude);
        if (!isNaN(n_minVisibleAltitude)) {
            if (this._innerLayer != null) {
                this._innerLayer.MinVisibleAltitude = n_minVisibleAltitude;
            }

        }
    },

    /*
    *图层的范围
    */
    get_bounds: function() {
        ///<value type="SuperMap.Web.Core.Rectangle2D">返回图层的范围</value>
        if (this._innerLayer != null) {
            var innerBounds = this._innerLayer.Bounds;
            return new SuperMap.Bounds(innerBounds.Left, innerBounds.Bottom, innerBounds.Right, innerBounds.Top);

        }
    },

    /*
    *Style3D属性
    */
    get_style3D: function()
    {
        ///<value type="SuperMap.Web.Core.Style3D">返回矢量类型图层的风格属性</value>
        if (this._innerLayer != null && this._innerLayer.Type == SuperMap.Web.Realspace.Layer3DType.VECTOR)
        {
            if(null == this._style3D)
            {
                this._style3D = new SuperMap.Web.Core.Style3D();
                this._style3D._set_innerStyle3D(this._innerLayer.Style3D);
            }
            return this._style3D;
        }
    },
    set_style3D: function(style3D)
    {
        ///<summary>设置矢量类型图层的显示风格</summary>
        if (this._innerLayer == null)
        {
            return;
        }
        if (SuperMap.Web.Core.Style3D.isInstanceOfType(style3D) && this._innerLayer.Type == SuperMap.Web.Realspace.Layer3DType.VECTOR)
        {
            this._innerLayer.Style3D = style3D._get_innerStyle3D();
            this._style3D = style3D;
        }
    },

    /*
    *IsTransparent属性
    */
    get_isTransparent: function()
    {
        if (this._innerLayer != null)
        {
            return this._innerLayer.IsTransparent;
        }

    },
    set_isTransparent: function(isTransparent)
    {
        if (typeof (isTransparent) != "boolean")
        {
            return;
        }
        if (this._innerLayer != null)
        {
            this._innerLayer.IsTransparent = isTransparent;
        }
    },

    /*
    *TransparentColor属性
    */
    get_transparentColor: function()
    {
        if (this._innerLayer == null) {
            return null;
        }
        if (this._transparentColor == null) {
            this._transparentColor = new SuperMap.Web.Core.Color();
        }
        this._transparentColor.fromLongABGR(this._innerLayer.TransparentColor);
        return this._transparentColor;
    },
    set_transparentColor: function(transparentColor)
    {
        if (this._innerLayer == null) {
            return;
        }
        if (SuperMap.Web.Core.Color.isInstanceOfType(transparentColor)) {
            this._innerLayer.TransparentColor = transparentColor.toLongABGR();
        }
        else if (!isNaN(parseFloat(transparentColor))) {
            this._innerLayer.TransparentColor = parseFloat(transparentColor);
        }
    },

    /*
    *TransparentColorTolerance属性
    */
    get_transparentColorTolerance: function()
    {
        if (this._innerLayer != null)
        {
            return this._innerLayer.TransparentColorTolerance;
        }
    },
    set_transparentColorTolerance: function(transparentColorTolerance)
    {
		if(transparentColorTolerance>255 || transparentColorTolerance<0)
		{
				return;
		}
        if (this._innerLayer != null)
        {
            this._innerLayer.TransparentColorTolerance = transparentColorTolerance;
        }
    },

    /*
    *RenderingWithMultiResolution属性
    */
    get_renderingWithMultiResolution: function()
    {
        if (this._innerLayer != null)
        {
            return this._innerLayer.RenderingWithMultiResolution;
        }
    },
    set_renderingWithMultiResolution: function(renderingWithMultiResolution)
    {
        if (this._innerLayer != null)
        {
            this._innerLayer.RenderingWithMultiResolution = renderingWithMultiResolution;
        }
    },

    /*
    *IsBackgroundTransparent属性
    */
    get_isBackgroundTransparent: function()
    {
        if (this._innerLayer != null)
        {
            return this._innerLayer.IsBackgroundTransparent;
        }
    },
    set_isBackgroundTransparent: function(isBackgroundTransparent)
    {
        if (this._innerLayer != null)
        {
            this._innerLayer.IsBackgroundTransparent = isBackgroundTransparent;
        }
    },

    /*
    *AllSubLayers属性
    */
    get_allSubLayers: function()
    {
        if (this._innerLayer != null)
        {
            var cont = this._innerLayer.GetSubLayerCount();
            var allSubLayers = [];
            for(var i = 0; i<cont; i++)
            {
                allSubLayers.push(this._innerLayer.GetSubLayer(i));
            }
            return allSubLayers;
        }
    },

    /*
    *VisibleSubLayers属性
    */
    get_visibleSubLayers: function()
    {
        if (this._innerLayer != null)
        {
            var cont = this._innerLayer.GetVisibleSubLayerCount();
            var visibleSubLayers = [];
            for(var i = 0; i<cont; i++)
            {
                visibleSubLayers.push(this._innerLayer.GetVisibleSubLayer(i));
            }
            return visibleSubLayers;
        }
    },

    set_visibleSubLayers: function(visibleSubLayers)
    {
        if (this._innerLayer != null)
        {
            if (Function._validateParams(arguments, [{ name: "visibleSubLayers", type: Array, elementType: String}]) == null)
            {
                this._innerLayer.ClearVisibleSubLayers();
                for(var i = 0; i<visibleSubLayers.length; i++)
                {
                    this._innerLayer.AddVisibleSubLayer(visibleSubLayers[i]);
                }
                this._innerLayer.CommitVisibleSubLayers();
            }
        }
    },

    /**
    *删除该图层缓存数据
    */
    updateCacheFile:function()
    {
        return this._innerLayer.UpdateCacheFile();
    },

    refresh:function()
    {
        if (this._innerLayer == null) {
            return;
        }
        this._innerLayer.Refresh();
    },

    /*
    *获取图层数据下载进度
    */
    getDataStreamingProgress:function()
    {
        if (this._innerLayer == null) {
            return;
        }
        return this._innerLayer.GetDataStreamingProgress();
    }

};
SuperMap.Web.Realspace.Layer3DWMS.registerClass('SuperMap.Web.Realspace.Layer3DWMS', Sys.Component, Sys.IDisposable);


SuperMap.Web.Realspace.Layer3DWMTS = function(strServerRootUrl, strLayerName, innerLayer3D) {
    /// <summary>WMTS图层对象</summary>
    ///<param name="strServerRootUrl" type="String">服务器地址</param>
    ///<param name="strLayerName" type="String">图层名</param>
    /// <returns type="SuperMap.Web.Realspace.Layer3D">返回3D图层对象。</returns>

    SuperMap.Web.Realspace.Layer3DWMTS.initializeBase(this);

    // 没有自己的成员，完全依赖COM
    this._innerLayer = null;

    this._style3D = null;
    this._transparentColor = null;

    if ( innerLayer3D != null) {
        this._innerLayer = innerLayer3D;
    }
    else {
        var pLayer3DURLParam = new SuperMap.Web.Realspace.Layer3DURLParam();
        pLayer3DURLParam._set_layerURL(strServerRootUrl);
        pLayer3DURLParam._set_layerType(SuperMap.Web.Realspace.Layer3DType.WMTS);
        pLayer3DURLParam._set_dataName(strLayerName);
        pLayer3DURLParam._set_layerName(strLayerName);
        this._innerLayer = SuperMap.Web.Realspace.Utility._SceneControl.get_scene().get_layer3Ds()._createLayer3D(pLayer3DURLParam);
    }
    if (this._innerLayer == null) {
        var ex = new Error(SuperMap.Lang.translate("操作失败"));
        ex.name = SuperMap.Web.Realspace.ExceptionName.OperationFailed;
        throw ex;
    }

};

SuperMap.Web.Realspace.Layer3DWMTS.prototype = {
    /*
    *innerLayer3D对象，不对外开放
    */
    _get_innerLayer3D: function() {
        return this._innerLayer;
    },

    _set_innerLayer3D: function(innerLayer3D) {
        this._innerLayer = innerLayer3D;
    },

    /*
    *initialized方法
    */
    initialized: function() {
        ///<returns type="Boolean">判断图层对象是否被创建</returns>
        if (this._innerLayer != null) {
            return true;
        }
        else {
            return false;
        }

    },

    /*
    *name属性
    */
    get_name: function() {
        ///<value type="String">返回图层名</value>
        if (this._innerLayer != null) {
            return this._innerLayer.Name;
        }
    },

    /*
    *caption属性
    */
    get_caption: function() {
        ///<value type="String">返回图层标题</value>
        if (this._innerLayer != null) {
            return this._innerLayer.Caption;
        }

    },
    set_caption: function(caption) {
        /// <summary>设置图层标题</summary>
        if (typeof (caption) != "string") {
            return;
        }
        if (this._innerLayer != null) {
            this._innerLayer.Caption = caption;
        }

    },

    /*
    *description属性
    */
    get_description: function() {
        ///<value type="String">返回图层描述信息</value>
        if (this._innerLayer != null) {
            return this._innerLayer.Description;
        }
    },
    set_description: function(description) {
        /// <summary>设置图层描述信息</summary>
        if (typeof (description) != "string") {
            return;
        }
        if (this._innerLayer != null) {
            this._innerLayer.Description = description;
        }
    },

    /*
    *图层可见性属性
    */
    get_isVisible: function() {
        ///<value type="Boolean">返回图层是否可见</value>
        if (this._innerLayer != null) {
            return this._innerLayer.IsVisible;
        }
    },

    set_isVisible: function(isVisible) {
        ///<summary>设置图层可见性</summary>
        if (this._innerLayer != null) {
            this._innerLayer.IsVisible = isVisible;
        }

    },

    /*
    *图层是否始终进行渲染
    */
    get_isAlwaysRender: function() {
        ///<value type="Boolean">返回图层是否始终进行渲染</value>
        if (this._innerLayer != null) {
            return this._innerLayer.IsAlwaysRender;
        }

    },

    set_isAlwaysRender: function(isalbe) {
        ///<summary>设置图层是否始终进行渲染</summary>
        if (this._innerLayer != null) {
            this._innerLayer.IsAlwaysRender = isalbe;
        }

    },

    /*
    *属性三维图层的最大可见高程值
    */
    get_maxVisibleAltitude: function() {
        ///<value type="Number">返回图层的最大可见高程值</value>
        if (this._innerLayer != null) {
            return this._innerLayer.MaxVisibleAltitude;
        }

    },

    set_maxVisibleAltitude: function(maxVisibleAltitude) {
        ///<summary>设置图层的最大可见高程值</summary>
        var n_maxVisibleAltitude = parseFloat(maxVisibleAltitude);
        if (!isNaN(n_maxVisibleAltitude)) {
            if (this._innerLayer != null) {
                this._innerLayer.MaxVisibleAltitude = n_maxVisibleAltitude;
            }
        }
    },

    /*
    *属性三维图层的最小可见高程值
    */
    get_minVisibleAltitude: function() {
        ///<value type="Number">返回图层的最小可见高程值</value>
        if (this._innerLayer != null) {
            return this._innerLayer.MinVisibleAltitude;
        }

    },

    set_minVisibleAltitude: function(minVisibleAltitude) {
        ///<summary>设置图层的最小可见高程值</summary>
        var n_minVisibleAltitude = parseFloat(minVisibleAltitude);
        if (!isNaN(n_minVisibleAltitude)) {
            if (this._innerLayer != null) {
                this._innerLayer.MinVisibleAltitude = n_minVisibleAltitude;
            }

        }
    },

    /*
    *图层的范围
    */
    get_bounds: function() {
        ///<value type="SuperMap.Web.Core.Rectangle2D">返回图层的范围</value>
        if (this._innerLayer != null) {
            var innerBounds = this._innerLayer.Bounds;
            return new SuperMap.Bounds(innerBounds.Left, innerBounds.Bottom, innerBounds.Right, innerBounds.Top);

        }
    },

    /*
    *Style3D属性
    */
    get_style3D: function()
    {
        ///<value type="SuperMap.Web.Core.Style3D">返回矢量类型图层的风格属性</value>
        if (this._innerLayer != null && this._innerLayer.Type == SuperMap.Web.Realspace.Layer3DType.VECTOR)
        {
            if(null == this._style3D)
            {
                this._style3D = new SuperMap.Web.Core.Style3D();
                this._style3D._set_innerStyle3D(this._innerLayer.Style3D);
            }
            return this._style3D;
        }
    },
    set_style3D: function(style3D)
    {
        ///<summary>设置矢量类型图层的显示风格</summary>
        if (this._innerLayer == null)
        {
            return;
        }
        if (SuperMap.Web.Core.Style3D.isInstanceOfType(style3D) && this._innerLayer.Type == SuperMap.Web.Realspace.Layer3DType.VECTOR)
        {
            this._innerLayer.Style3D = style3D._get_innerStyle3D();
            this._style3D = style3D;
        }
    },

    /*
    *IsTransparent属性
    */
    get_isTransparent: function()
    {
        if (this._innerLayer != null)
        {
            return this._innerLayer.IsTransparent;
        }

    },
    set_isTransparent: function(isTransparent)
    {
        if (typeof (isTransparent) != "boolean")
        {
            return;
        }
        if (this._innerLayer != null)
        {
            this._innerLayer.IsTransparent = isTransparent;
        }
    },

    /*
     *OpaqueRate属性:影像图层的透明度
     */
    get_opaqueRate: function()
    {
        if (this._innerLayer != null)
        {
            return this._innerLayer.OpaqueRate;
        }

    },
    set_opaqueRate: function(nOpaque)
    {
        if (this._innerLayer != null && typeof (nOpaque) == "number")
        {
            this._innerLayer.OpaqueRate = nOpaque;
        }
    },

    /*
    *TransparentColor属性
    */
    get_transparentColor: function()
    {
        if (this._innerLayer == null) {
            return null;
        }
        if (this._transparentColor == null) {
            this._transparentColor = new SuperMap.Web.Core.Color();
        }
        this._transparentColor.fromLongABGR(this._innerLayer.TransparentColor);
        return this._transparentColor;
    },
    set_transparentColor: function(transparentColor)
    {
        if (this._innerLayer == null) {
            return;
        }
        if (SuperMap.Web.Core.Color.isInstanceOfType(transparentColor)) {
            this._innerLayer.TransparentColor = transparentColor.toLongABGR();
        }
        else if (!isNaN(parseFloat(transparentColor))) {
            this._innerLayer.TransparentColor = parseFloat(transparentColor);
        }
    },

    /*
    *TransparentColorTolerance属性
    */
    get_transparentColorTolerance: function()
    {
        if (this._innerLayer != null)
        {
            return this._innerLayer.TransparentColorTolerance;
        }
    },
    set_transparentColorTolerance: function(transparentColorTolerance)
    {
		if(transparentColorTolerance>255 || transparentColorTolerance<0)
		{
				return;
		}
        if (this._innerLayer != null)
        {
            this._innerLayer.TransparentColorTolerance = transparentColorTolerance;
        }
    },

    /*
    *RenderingWithMultiResolution属性
    */
    get_renderingWithMultiResolution: function()
    {
        if (this._innerLayer != null)
        {
            return this._innerLayer.RenderingWithMultiResolution;
        }
    },
    set_renderingWithMultiResolution: function(renderingWithMultiResolution)
    {
        if (this._innerLayer != null)
        {
            this._innerLayer.RenderingWithMultiResolution = renderingWithMultiResolution;
        }
    },

    /*
    *IsBackgroundTransparent属性
    */
    get_isBackgroundTransparent: function()
    {
        if (this._innerLayer != null)
        {
            return this._innerLayer.IsBackgroundTransparent;
        }
    },
    set_isBackgroundTransparent: function(isBackgroundTransparent)
    {
        if (this._innerLayer != null)
        {
            this._innerLayer.IsBackgroundTransparent = isBackgroundTransparent;
        }
    },



    /**
    *删除该图层缓存数据
    */
    updateCacheFile:function()
    {
        return this._innerLayer.UpdateCacheFile();
    },

    refresh:function()
    {
        if (this._innerLayer == null) {
            return;
        }
        this._innerLayer.Refresh();
    },

    /*
    *获取图层数据下载进度
    */
    getDataStreamingProgress:function()
    {
        if (this._innerLayer == null) {
            return;
        }
        return this._innerLayer.GetDataStreamingProgress();
    }
};
SuperMap.Web.Realspace.Layer3DWMTS.registerClass('SuperMap.Web.Realspace.Layer3DWMTS', Sys.Component, Sys.IDisposable);

SuperMap.Web.Realspace.Layer3DTianditu = function(strServerRootUrl, strLayerName, strDataName, nDpi, nImageType, innerLayer3D) {
    /// <summary>天地图图层对象</summary>
    ///<param name="strServerRootUrl" type="String">服务器地址</param>
    ///<param name="strLayerName" type="String">图层名</param>
    ///<param name="strDataName" type="String">图层数据名</param>
    ///<param name="nDpi" type="Number">设备分辨率</param>
    ///<param name="nImageType" type="SuperMap.Web.Realspace.ImageType">图层瓦片存储格式</param>
    /// <returns type="SuperMap.Web.Realspace.Layer3DTianditu">返回天地图图层对象</returns>

    SuperMap.Web.Realspace.Layer3DTianditu.initializeBase(this,["","","",1,this]);

    // 没有自己的成员，完全依赖COM
    this._innerLayer = null;

    this._style3D = null;
    this._transparentColor = null;

    if ( innerLayer3D != null) {
        this._innerLayer = innerLayer3D;
    }
    else {

        var pLayer3DURLParam = new SuperMap.Web.Realspace.Layer3DURLParam();
        pLayer3DURLParam._set_layerURL(strServerRootUrl);
        pLayer3DURLParam._set_layerType(SuperMap.Web.Realspace.Layer3DType.WMTS);
        pLayer3DURLParam._set_dataName(strDataName);
        pLayer3DURLParam._set_layerName(strLayerName);
        pLayer3DURLParam._set_dpi(nDpi);
        pLayer3DURLParam._set_imageType(nImageType);

        this._innerLayer = SuperMap.Web.Realspace.Utility._SceneControl.get_scene().get_layer3Ds()._createLayer3D(pLayer3DURLParam);
    }
    if (this._innerLayer == null) {
        var ex = new Error(SuperMap.Lang.translate("操作失败"));
        ex.name = SuperMap.Web.Realspace.ExceptionName.OperationFailed;
        throw ex;
    }

};

SuperMap.Web.Realspace.Layer3DTianditu.prototype = {
    /*
     *RenderingWithMultiResolution属性
     */
    get_renderingWithMultiResolution: function()
    {
        if (this._innerLayer != null)
        {
            return this._innerLayer.RenderingWithMultiResolution;
        }
    },
    set_renderingWithMultiResolution: function(renderingWithMultiResolution)
    {
        if (this._innerLayer != null)
        {
            this._innerLayer.RenderingWithMultiResolution = renderingWithMultiResolution;
        }
    },

    /*
     *IsBackgroundTransparent属性
     */
    get_isBackgroundTransparent: function()
    {
        if (this._innerLayer != null)
        {
            return this._innerLayer.IsBackgroundTransparent;
        }
    },
    set_isBackgroundTransparent: function(isBackgroundTransparent)
    {
        if (this._innerLayer != null)
        {
            this._innerLayer.IsBackgroundTransparent = isBackgroundTransparent;
        }
    }
};
SuperMap.Web.Realspace.Layer3DTianditu.registerClass('SuperMap.Web.Realspace.Layer3DTianditu', SuperMap.Web.Realspace.Layer3D, Sys.IDisposable);


/*
 *二维地图临时图层
 */
SuperMap.Web.Realspace.Layer3DDynamicRESTMap = function(strServerRootUrl, strLayerName, strDataName, strLayersID, innerLayer3D) {
    /// <summary>二维地图临时图层对象</summary>
    ///<param name="strServerRootUrl" type="String">服务器地址</param>
    ///<param name="strLayerName" type="String">图层名</param>
    ///<param name="strDataName" type="String">数据名</param>
    ///<param name="strLayersID" type="String">临时图层名</param>
    /// <returns type="SuperMap.Web.Realspace.Layer3DDynamicRESTMap">二维地图临时图层对象。</returns>

    SuperMap.Web.Realspace.Layer3DDynamicRESTMap.initializeBase(this,["","","",1,this]);

    // 没有自己的成员，完全依赖COM
    this._innerLayer = null;
    this._selection3D = null;
    this._feature3ds = null;

    this._style3D = null;
    this._selectStyle = null;
    this._transparentColor = null;
    this._fieldInfos = null;

    if ( innerLayer3D != null) {
        this._innerLayer = innerLayer3D;
    }
    else {
        var pLayer3DURLParam = new SuperMap.Web.Realspace.Layer3DURLParam();
        pLayer3DURLParam._set_layerURL(strServerRootUrl);
        pLayer3DURLParam._set_layerType(SuperMap.Web.Realspace.Layer3DType.Map);
        pLayer3DURLParam._set_dataName(strDataName);
        pLayer3DURLParam._set_layerName(strLayerName);
        pLayer3DURLParam._set_layersID(strLayersID);
        this._innerLayer = SuperMap.Web.Realspace.Utility._SceneControl.get_scene().get_layer3Ds()._createLayer3D(pLayer3DURLParam);
    }
    if (this._innerLayer == null) {
        var ex = new Error(SuperMap.Lang.translate("操作失败"));
        ex.name = SuperMap.Web.Realspace.ExceptionName.OperationFailed;
        throw ex;
    }

};

SuperMap.Web.Realspace.Layer3DDynamicRESTMap.registerClass('SuperMap.Web.Realspace.Layer3DDynamicRESTMap', SuperMap.Web.Realspace.Layer3D, Sys.IDisposable);

//自定义图层
SuperMap.Web.Realspace.Layer3DCustom = function(strServerRootUrl, pCacheConfigue, innerLayer3D) {
    /// <summary>WMTS图层对象</summary>
    ///<param name="strServerRootUrl" type="String">服务器地址</param>
    ///<param name="pCacheConfigue" type="SuperMap.Web.Realspace.CacheConfigue">图片配置文件信息</param>
    /// <returns type="SuperMap.Web.Realspace.Layer3DCustom">返回3DCustom图层对象。</returns>

    SuperMap.Web.Realspace.Layer3DCustom.initializeBase(this,["","","",1,this]);

    // 没有自己的成员，完全依赖COM
    this._innerLayer = null;

    this._style3D = null;
    this._transparentColor = null;

    if ( innerLayer3D != null) {
        this._innerLayer = innerLayer3D;
    }
    else {
        var pLayer3DURLParam = new SuperMap.Web.Realspace.Layer3DURLParam();
        pLayer3DURLParam._set_layerURL(strServerRootUrl);
        pLayer3DURLParam._set_layerType(SuperMap.Web.Realspace.Layer3DType.Custom);
        //pLayer3DURLParam._set_dataName(pCacheConfigue.get_dataName());
        pLayer3DURLParam._set_layerName(pCacheConfigue.get_layerName());
        pLayer3DURLParam._set_cacheConfigue(pCacheConfigue);
        this._innerLayer = SuperMap.Web.Realspace.Utility._SceneControl.get_scene().get_layer3Ds()._createLayer3D(pLayer3DURLParam);
    }
    if (this._innerLayer == null) {
        var ex = new Error(SuperMap.Lang.translate("操作失败"));
        ex.name = SuperMap.Web.Realspace.ExceptionName.OperationFailed;
        throw ex;
    }

};

SuperMap.Web.Realspace.Layer3DCustom.prototype = {

    /**
     *设置图片请求对象
     */
    setDownloadRequest:function(request)
    {
        if (this._innerLayer != null)
        {
            return this._innerLayer.SetDownloadRequest(request._innerRequest);
        }
    }
};

SuperMap.Web.Realspace.Layer3DCustom.registerClass('SuperMap.Web.Realspace.Layer3DCustom', SuperMap.Web.Realspace.Layer3D, Sys.IDisposable);

SuperMap.Web.Realspace.Layer3DOSGB = function(strServerRootUrl, strLayerName, strDataName, innerLayer3D) {
    /// <summary>OSGB图层对象</summary>
    ///<param name="strServerRootUrl" type="String">服务器地址</param>
    ///<param name="strLayerName" type="String">图层名</param>
    ///<param name="strDataName" type="String">数据名</param>
    /// <returns type="SuperMap.Web.Realspace.Layer3D">返回OSGB图层对象。</returns>

    SuperMap.Web.Realspace.Layer3DOSGB.initializeBase(this);

    // 没有自己的成员，完全依赖COM
    this._innerLayer = null;

    this._style3D = null;
    this._transparentColor = null;

    if ( innerLayer3D != null) {
        this._innerLayer = innerLayer3D;
    }
    else {
        var pLayer3DURLParam = new SuperMap.Web.Realspace.Layer3DURLParam();
        pLayer3DURLParam._set_layerURL(strServerRootUrl);
        pLayer3DURLParam._set_layerType(SuperMap.Web.Realspace.Layer3DType.OSGB);
        pLayer3DURLParam._set_dataName(strDataName);
        pLayer3DURLParam._set_layerName(strLayerName);
        this._innerLayer = SuperMap.Web.Realspace.Utility._SceneControl.get_scene().get_layer3Ds()._createLayer3D(pLayer3DURLParam);
    }
    if (this._innerLayer == null) {
        var ex = new Error(SuperMap.Lang.translate("操作失败"));
        ex.name = SuperMap.Web.Realspace.ExceptionName.OperationFailed;
        throw ex;
    }

};

SuperMap.Web.Realspace.Layer3DOSGB.prototype = {
    /*
    *innerLayer3D对象，不对外开放
    */
    _get_innerLayer3D: function() {
        return this._innerLayer;
    },

    _set_innerLayer3D: function(innerLayer3D) {
        this._innerLayer = innerLayer3D;
    },

    /*
    *initialized方法
    */
    initialized: function() {
        ///<returns type="Boolean">判断图层对象是否被创建</returns>
        if (this._innerLayer != null) {
            return true;
        }
        else {
            return false;
        }

    },

    /*
    *name属性
    */
    get_name: function() {
        ///<value type="String">返回图层名</value>
        if (this._innerLayer != null) {
            return this._innerLayer.Name;
        }
    },

    /*
    *caption属性
    */
    get_caption: function() {
        ///<value type="String">返回图层标题</value>
        if (this._innerLayer != null) {
            return this._innerLayer.Caption;
        }

    },
    set_caption: function(caption) {
        /// <summary>设置图层标题</summary>
        if (typeof (caption) != "string") {
            return;
        }
        if (this._innerLayer != null) {
            this._innerLayer.Caption = caption;
        }

    },

    /*
     *updatesize属性
     */
    get_updateSize:function() {

        ///<value type="int">返回图层更新块大小</value>
        if (this._innerLayer != null) {
            return this._innerLayer.UpdateSize;
        }
  },

    set_updateSize:function(value) {

        ///<value type="int">设置图层更新块大小</value>
        if (this._innerLayer != null) {
            this._innerLayer.UpdateSize = value;
        }
    },
    /*
    *description属性
    */
    get_description: function() {
        ///<value type="String">返回图层描述信息</value>
        if (this._innerLayer != null) {
            return this._innerLayer.Description;
        }
    },
    set_description: function(description) {
        /// <summary>设置图层描述信息</summary>
        if (typeof (description) != "string") {
            return;
        }
        if (this._innerLayer != null) {
            this._innerLayer.Description = description;
        }
    },

    /*
    *数据存储路径
    */
     get_dataName: function()
     {///<value type="String">返回图层数据存储路径</value>
         if (this._innerLayer != null)
         {
             return this._innerLayer.DataName;
         }
     },

    /*
    *图层可见性属性
    */
    get_isVisible: function() {
        ///<value type="Boolean">返回图层是否可见</value>
        if (this._innerLayer != null) {
            return this._innerLayer.IsVisible;
        }
    },

    set_isVisible: function(isVisible) {
        ///<summary>设置图层可见性</summary>
        if (this._innerLayer != null) {
            this._innerLayer.IsVisible = isVisible;
        }

    },

    /*
    *图层类型属性
    */
    get_type: function() {
        ///<value type="SuperMap.Web.Realspace.Layer3DType">返回图层类型</value>
        return SuperMap.Web.Realspace.Layer3DType.OSGB;
    },

    /*
    *三维图层的数据类型属性
    */
    get_dataType: function() {
        ///<value type="SuperMap.Web.Realspace.Layer3DDataType">返回三维图层包含的数据类型</value>
        if (this._innerLayer != null) {
            return this._innerLayer.DataType;
        }
    },

    /*
    *图层是否可选择
    */
    get_isSelectable: function() {
        ///<value type="Boolean">返回图层是否可选择</value>
        if (this._innerLayer != null) {
            return this._innerLayer.IsSelectable;
        }

    },

    set_isSelectable: function(isSelectable) {
        ///<summary>设置图层是否可选择</summary>
        if (this._innerLayer != null) {
            this._innerLayer.IsSelectable = isSelectable;
        }

    },

    /*
    *图层是否可编辑
    */
    get_isEditable: function() {
        ///<value type="Boolean">返回图层是否可编辑</value>
        if (this._innerLayer != null) {
            return this._innerLayer.IsEditable;
        }

    },

    set_isEditable: function(iseditalbe) {
        ///<summary>设置图层是否可编辑</summary>
        if (this._innerLayer != null) {
            this._innerLayer.IsEditable = iseditalbe;
        }

    },

    /*
     *图层是否显示阴影
     */
    get_isShadowEnable: function() {
        ///<value type="Boolean">返回图层是否显示阴影</value>
        if (this._innerLayer != null) {
            return this._innerLayer.IsShadowEnable;
        }
    },

    set_isShadowEnable: function(value) {
        ///<summary>设置图层是否可显示阴影</summary>
        if (this._innerLayer != null) {
            this._innerLayer.IsShadowEnable = value;
        }
    },

    /*
    *图层是否始终进行渲染
    */
    get_isAlwaysRender: function() {
        ///<value type="Boolean">返回图层是否始终进行渲染</value>
        if (this._innerLayer != null) {
            return this._innerLayer.IsAlwaysRender;
        }

    },

    set_isAlwaysRender: function(isalbe) {
        ///<summary>设置图层是否始终进行渲染</summary>
        if (this._innerLayer != null) {
            this._innerLayer.IsAlwaysRender = isalbe;
        }

    },

    /*
    *图层选择集属性
    */
    get_selection3D: function() {
        ///<value type="SuperMap.Web.Realspace.Selection3D">返回图层选择集属性</value>
        if (this._selection3D == null && this._innerLayer != null) {
            this._selection3D = new SuperMap.Web.Realspace.Selection3D(this._innerLayer.Selection3D, this);
            this._selection3D.get_style3D().set_lineWidth(0.1);
        }
        return this._selection3D;

    },
    /*
     *IsExcavation属性
     * OSGB图层是否参与开挖，默认不参与
     */
    get_isExcavation: function()
    {
        ///<value type="Boolean">返回OSGB图层是否参与开挖</value>
        if (this._innerLayer != null)
        {
            return this._innerLayer.IsExcavation;
        }
    },
    set_isExcavation: function(isExcavation)
    {
        ///<summary>设置OSGB图层是否参与开挖</summary>
        if (this._innerLayer != null)
        {
            this._innerLayer.IsExcavation = isExcavation;
        }
    },


    /*
    *属性三维图层的最大可见高程值
    */
    get_maxVisibleAltitude: function() {
        ///<value type="Number">返回图层的最大可见高程值</value>
        if (this._innerLayer != null) {
            return this._innerLayer.MaxVisibleAltitude;
        }

    },

    set_maxVisibleAltitude: function(maxVisibleAltitude) {
        ///<summary>设置图层的最大可见高程值</summary>
        var n_maxVisibleAltitude = parseFloat(maxVisibleAltitude);
        if (!isNaN(n_maxVisibleAltitude)) {
            if (this._innerLayer != null) {
                this._innerLayer.MaxVisibleAltitude = n_maxVisibleAltitude;
            }
        }
    },


    /*
    *属性三维图层的最小可见高程值
    */
    get_minVisibleAltitude: function() {
        ///<value type="Number">返回图层的最小可见高程值</value>
        if (this._innerLayer != null) {
            return this._innerLayer.MinVisibleAltitude;
        }

    },

    set_minVisibleAltitude: function(minVisibleAltitude) {
        ///<summary>设置图层的最小可见高程值</summary>
        var n_minVisibleAltitude = parseFloat(minVisibleAltitude);
        if (!isNaN(n_minVisibleAltitude)) {
            if (this._innerLayer != null) {
                this._innerLayer.MinVisibleAltitude = n_minVisibleAltitude;
            }

        }
    },

    /*
    *获取三维渲染要素集合对象
    */
    get_feature3Ds: function() {
        ///<value type="SuperMap.Web.Core.Feature3Ds"></value>
        if (this._innerLayer == null) {
            return;
        }
        if (this.get_type() == SuperMap.Web.Realspace.Layer3DType.KML || this.get_type() == SuperMap.Web.Realspace.Layer3DType.KMZ) {
            if (this._feature3ds == null) {
                this._feature3ds = new SuperMap.Web.Core.Feature3Ds();
                this._feature3ds._set_innerFeature3Ds(this._innerLayer.Feature3Ds);
                this._feature3ds._makelist();
            }
            return this._feature3ds;
        }
        return null;
    },

    /*
    *图层的范围
    */
    get_bounds: function() {
        ///<value type="SuperMap.Web.Core.Rectangle2D">返回图层的范围</value>
        if (this._innerLayer != null) {
            var innerBounds = this._innerLayer.Bounds;
            return new SuperMap.Bounds(innerBounds.Left, innerBounds.Bottom, innerBounds.Right, innerBounds.Top);

        }
    },


    /*
     *剖切查看
     */
    clipByBox: function(geometry,part) {
        ///<value type="SuperMap.Web.Core.Box">设置剖切面</value>
        ///<param name="part" type="SuperMap.Web.Realspace.BoxClipPart">裁剪模式</param>

            if(this._innerLayer != null){
                var geobox = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(geometry);
                this._innerLayer.ClipByBox(geobox,part);
            }

    },


    /*
    *图层风格
    */
    get_style3D: function()
    {
        ///<value type="SuperMap.Web.Core.Style3D">返回图层的风格属性</value>
        if (this._innerLayer != null)
        {
            if(null == this._style3D)
            {
              this._style3D = new SuperMap.Web.Core.Style3D();
              this._style3D._set_innerStyle3D(this._innerLayer.Style3D);
            }
            return this._style3D;
        }
    },
    set_style3D: function(style)
    {
        ///<summary>设置矢量类型图层的显示风格</summary>
        if (this._innerLayer == null)
        {
            return;
        }
        if (SuperMap.Web.Core.Style3D.isInstanceOfType(style))
        {
            this._innerLayer.Style3D = style._get_innerStyle3D();
            this._style3D = style;
        }
    },


    /*
     *是否开启卷帘效果
     */
    get_swipeEnabled: function() {
        ///<value type="Boolean">返回图层是否开启卷帘效果</value>
        if (this._innerLayer != null) {
            return this._innerLayer.SwipeEnabled;
        }
    },

    set_swipeEnabled: function(isswipeEnabled) {
        ///<summary>设置图层是否开启卷帘</summary>
        if (this._innerLayer != null) {
            this._innerLayer.SwipeEnabled = isswipeEnabled;
        }

    },



    /*
     *SwipeRegion属性
     */
    get_swipeRegion: function()
    {
        ///<value type="SuperMap.Web.Core.Rectangle2D">返回卷帘范围</value>
        if (this._innerLayer != null )
        {
            var innerBounds = this._innerLayer.SwipeRegion;
            return new SuperMap.Bounds(innerBounds.Left, innerBounds.Bottom, innerBounds.Right, innerBounds.Top);
        }
    },
    set_swipeRegion: function(rec2d)
    {
        ///<summary>设置卷帘范围</summary>
        if (this._innerLayer != null) {
            var recInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(rec2d);
            this._innerLayer.SwipeRegion = recInner;
        }
    },


    /*
    *IsTransparent属性
    */
    get_isTransparent: function()
    {
        if (this._innerLayer != null)
        {
            return this._innerLayer.IsTransparent;
        }

    },
    set_isTransparent: function(isTransparent)
    {
        if (typeof (isTransparent) != "boolean")
        {
            return;
        }
        if (this._innerLayer != null)
        {
            this._innerLayer.IsTransparent = isTransparent;
        }
    },


    /*
    *TransparentColor属性
    */
    get_transparentColor: function()
    {
        if (this._innerLayer == null) {
            return null;
        }
        if (this._transparentColor == null) {
            this._transparentColor = new SuperMap.Web.Core.Color();
        }
        this._transparentColor.fromLongABGR(this._innerLayer.TransparentColor);
        return this._transparentColor;
    },
    set_transparentColor: function(transparentColor)
    {
        if (this._innerLayer == null) {
            return;
        }
        if (SuperMap.Web.Core.Color.isInstanceOfType(transparentColor)) {
            this._innerLayer.TransparentColor = transparentColor.toLongABGR();
        }
        else if (!isNaN(parseFloat(transparentColor))) {
            this._innerLayer.TransparentColor = parseFloat(transparentColor);
        }
    },

    /*
    *TransparentColorTolerance属性
    */
    get_transparentColorTolerance: function()
    {
        if (this._innerLayer != null)
        {
            return this._innerLayer.TransparentColorTolerance;
        }
    },
    set_transparentColorTolerance: function(transparentColorTolerance)
    {
    if(transparentColorTolerance>255 || transparentColorTolerance<0)
    {
        return;
    }
        if (this._innerLayer != null)
        {
            this._innerLayer.TransparentColorTolerance = transparentColorTolerance;
        }
    },

    /*
    *findFeature3DByID方法
    */
    findFeature3DByID: function(id)
    {
        ///<param name="id" type="Int" elementType="Number" integer="true">对象Id</param>
        ///<returns type="SuperMap.Web.Core.Feature3D">若查找成功返回根据ID查找到三维要素对象，否则返回null</returns>
        var n_id = parseInt(id);
        if (!isNaN(n_id))
        {
            var innerobj = this._innerLayer.FindFeature3DByID(id);
            if (innerobj != null) {
               var feature3d = new SuperMap.Web.Core.Feature3D();
               feature3d._set_innerFeature3D(innerobj);
               feature3d._make(innerobj.Geometry);
               return feature3d;
            }
        }
        return null;
    },
    /**
    *删除该图层属性缓存数据
    */
    updateAttributeCacheFile:function()
    {
        return this._innerLayer.UpdateAttributeCacheFile();
    },

     /**
    *删除该图层属性缓存数据
    */
    updateCacheFile:function()
    {
        return this._innerLayer.UpdateCacheFile();
    },

    /*
    * 更新选择集
    */
    updateSelection:function()
    {
        if (this._innerLayer == null) {
            return;
        }
        this._innerLayer.UpdateSelection();
    },
    /**
    *更新该图层缓存数据
    */
    updateData: function () {
        return this._innerLayer.UpdateData();
    },
    /*
    * 释放选择集，包括清除选择集里面的id，以及高亮效果
    */
    releaseSelection:function()
    {
        if (this._innerLayer == null) {
            return;
        }
        this._innerLayer.ReleaseSelection();
    },

    /*
    *矢量文件缓存属性字段信息
    */
    get_fieldInfos:function()
    {
    ///<value type="SuperMap.Web.Realspace.FieldInfos">返回属性字段信息集合</value>
        if (this._innerLayer == null) {
            return;
        }

        if (this._fieldInfos == null) {
           if (this._innerLayer.FieldInfos == null) {
               return;
           }
           this._fieldInfos = new SuperMap.Web.Realspace.FieldInfos(this._innerLayer.FieldInfos);
        }
        return this._fieldInfos;
    },

    /*
    *获取矢量文件缓存属性字段值
    */
    getFieldValue:function(index)
    {
        if (this._innerLayer == null|| index==null) {
            return;
        }
        if(typeof index=="string")
        {
            return this._innerLayer.GetFieldValue(index);
        }
        if(typeof index=="number")
        {
            var intValue = parseInt(index);
            if((intValue>=0)&&(intValue<=0xFFFFFFFF))
            {
                return this._innerLayer.GetFieldValue(intValue);
            }
        }
        return;
    },

    refresh:function()
    {
        if (this._innerLayer == null) {
            return;
        }
        this._innerLayer.Refresh();
    },

    /*
    *获取图层数据下载进度
    */
    getDataStreamingProgress:function()
    {
        if (this._innerLayer == null) {
            return;
        }
        return this._innerLayer.GetDataStreamingProgress();
    },

    setLoadTextureLOD:function(bLoadLOD0, bLoadLOD1, bLoadLOD2)
    {
    ///<param name="bLoadLOD0" type="Boolean">精细</param>
    ///<param name="bLoadLOD1" type="Boolean">普通</param>
    ///<param name="bLoadLOD2" type="Boolean">粗糙</param>
        if (this._innerLayer == null) {
            return;
        }
        if((typeof bLoadLOD0=="boolean")&&(typeof bLoadLOD1=="boolean")&&(typeof bLoadLOD2=="boolean"))
        {
            return this._innerLayer.SetLoadTextureLOD(bLoadLOD0, bLoadLOD1, bLoadLOD2);
        }
    },

    renderWithoutTexture:function(bLoad)
    {
    ///<param name="bLoad" type="Boolean">是否加载无纹理模型</param>
        if (this._innerLayer == null) {
            return;
        }
        if(typeof bLoad=="boolean")
        {
            return this._innerLayer.RenderWithoutTexture(bLoad);
        }
    },


    fromXML:function(xml)
    {
        if (typeof (xml) != "string" || this._innerLayer == null)
    {
            return;
        }

        this._innerLayer.FromXML(xml);
    },

    /*
    *获取图层数据下载进度
    */
    toXML:function()
    {
        if (this._innerLayer == null) {
            return;
        }
        return this._innerLayer.ToXML();
    },
    /**
     *添加一个压平对象，指定对象标签
     * @returns bool
     */
    addFlattenRegion:function(geometry,index)
    {
        var geoInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(geometry);
        if(this._innerLayer != null && geoInner != null)
        {
            this._innerLayer.AddFlattenRegion(geoInner,index);
        }
    },

    /*
     *清空压平
     */
    clearFlattenRegions:function()
    {
        if(this._innerLayer != null)
        {
            this._innerLayer.ClearFlattenRegions();
        }
    },

    /*
     *osgb图层压平对象总数
     */
    get_flattenRegionCount:function()
    {
        if(this._innerLayer!=null){
            this._innerLayer.FlattenRegionCount;
        }
    },

    /*
     *osgb图层设置指定索引的压平对象
     */
    getFlattenRegion:function(index){

        if(this._innerLayer!=null){
            var geoInner = this._innerLayer.GetFlattenRegion(index);
            var region = SuperMap.Web.Core.Conversion._ConvertSRObject2Object(index,"GeoRegion3D");
            return region;
        }
    },

    /*
     *osgb图层设置指定索引的压平对象标签
     */
    getFlattenRegionTag:function(index){
        if(this._innerLayer!=null){
            return this._innerLayer.GetFlattenRegionTag(index);
        }
    },

    /*
     *osgb图层设置指定标签的压平对象索引
     */
    getIndexOfFlattenRegion:function(strTag){
        if(this._innerLayer!=null){
            return this._innerLayer.IndexOfFlattenRegion(strTag);
        }
    },

    /*
     *osgb图层删除指定索引的压平对象
     */
    removeFlattenRegion:function(index){
        if(this._innerLayer!=null){
            return this._innerLayer.RemoveFlattenRegion(index);
        }
    },

    /*
     *osgb图层设置指定索引的压平对象标签
     */
    setFlattenRegionTag:function(index,tag){
        if(this._innerLayer!=null){
            return this._innerLayer.SetFlattenRegionTag(index,tag);
        }
    },

    /*
   * 裁剪面分析
   */
    SetCustomClipPlane:function(firstPoint,secondPoint,thirdPoint){
      var first_geoInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(firstPoint);
      var second_geoInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(secondPoint);
      var third_geoInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(thirdPoint);
        if(this._innerLayer != null && first_geoInner != null && second_geoInner != null && third_geoInner != null)
        {
            return this._innerLayer.SetCustomClipPlane(first_geoInner,second_geoInner,third_geoInner);
        }
    },

    /*
     * 设置颜色表
     */
    setObjectsColor:function (keys,color) {
        var intColor = color.toLongABGR();
        if(this._innerLayer != null)
        {

            return this._innerLayer.SetObjectsColor(keys,intColor);
        }
    },

    /*
     * 获取颜色表对应的ID值
     */
    getObjectsColorIDs:function () {
        ///<value type="Boolean">返回颜色表对应的ID值</value>
        if(this._innerLayer != null)
        {
            return this._innerLayer.GetObjectsColorIDs();
        }
    },

    /*
     * 获取颜色表
     */
    getObjectsColor:function () {
        ///<value type="Boolean">返回颜色表</value>
        if(this._innerLayer != null)
        {
            var color = new SuperMap.Web.Core.Color();
            var intColor = this._innerLayer.GetObjectsColorValues();
            return color.fromLongABGR(intColor);

        }
    },

    /*
     * 移出指定IDs的颜色表
     */
    removeObjectsColor:function (objectIds) {

        if(this._innerLayer != null)
        {
            return this._innerLayer.RemoveObjectsColor(objectIds);
        }
    },

    /*
     * 清除颜色表
     */
    ClearObjectsColor:function () {

        if(this._innerLayer != null)
        {
            return this._innerLayer.ClearObjectsColor();
        }
    },

    /**
     *设置图层对某个视口的可见性
     *
     */
    setViewportVisible:function(index,value)
    {

        if(this._innerLayer != null && index != null)
        {
            this._innerLayer.SetViewportVisible(index,value);
        }
    },

    /*
     * 获取图层对某个视口的可见性
     */
    getViewportVisible:function (index) {

        if(this._innerLayer != null && index != null)
        {
            return this._innerLayer.GetViewportVisible(index);
        }
    },

    /*
     * 清除裁剪面
     */
    ClearCustomClipPlane:function(){
      return this._innerLayer.ClearCustomClipPlane();
    },

    /*
     * 获取体对象
     */
    getVolume3D:function()
    {
        if (this._innerLayer != null) {
            var recSRVolume3D = this._innerLayer.GetVolume3D();
            return SuperMap.Web.Core.Conversion._CreateObjectBySRObject(recSRVolume3D,"Volume3D");
        }
    },

    /*
     * 返回/设置如果不可见时是否图层自动释放,可以减少内存占用
     */
    get_autoRelease:function()
    {
        ///<returns type="Boolean">判断图层是否自动释放</returns>
        if (this._innerLayer != null){
            var value = this._innerLayer.getAutoRelease;
            if ( value === "undefined") {
                value = false;
            }
            return value;
        }
    },

    set_autoRelease:function(value)
    {
        ///<param name="value" type="Boolean">设置图层是否自动释放</param>
        if(this._innerLayer != null && typeof value === "boolean"){
            this._innerLayer.getAutoRelease = value;
        }
    },

    /*
     *获取所选中OSGB的属性信息
     */
    getAllFieldValueOfLastSelectedObject: function()
    {
        ///<returns type="Array">返回包含OSGB各项属性的数组</returns>
        if(this._innerLayer.GetAllFieldValueOfLastSelectedObject().length === 0)
        {
            alert("none!");
            return;
        }
        return this._innerLayer.GetAllFieldValueOfLastSelectedObject();
    },

    /*
     *夸张系数
     */
    get_exaggeration: function()
    {
        if(this._innerLayer === null){
            return;
        }
        return this._innerLayer.Exaggeration;
    },

    set_exaggeration: function(value)
    {
        if(this._innerLayer === null || typeof value !== "number"){
            return;
        }
        this._innerLayer.Exaggeration = value;
    },

    /*
     *LOD切换距离缩放系数
     */
    get_lodRangeScale: function()
    {
        if(this._innerLayer === null){
            return;
        }
        return this._innerLayer.LODRangeScale;
    },

    set_lodRangeScale: function(value)
    {
        if(this._innerLayer === null || typeof value !== "number"){
            return;
        }
        this._innerLayer.LODRangeScale = value;
    },

    /*
     *是否选中贴对象
     */
    get_isSelectClampToObject: function()
    {
        if(this._innerLayer === null){
            return;
        }
        return this._innerLayer.IsSelectClampToObject;
    },

    set_isSelectClampToObject: function(value)
    {
        if(this._innerLayer === null || typeof value !== "boolean"){
            return;
        }
        this._innerLayer.IsSelectClampToObject = value;
    },

    /*
     *多边形偏移量常量部分
     */
    get_constantPolygonOffset: function()
    {
        if(this._innerLayer === null){
            return;
        }
        return this._innerLayer.ConstantPolygonOffset;
    },

    set_constantPolygonOffset: function(value)
    {
        if(this._innerLayer === null || typeof value !== "number"){
            return;
        }
        this._innerLayer.ConstantPolygonOffset = value;
    },

    /*
     *多边形偏移量深度斜率因子部分
     */
    get_slopeScalePolygonOffset: function()
    {
        if(this._innerLayer === null){
            return;
        }
        return this._innerLayer.SlopeScalePolygonOffset;
    },

    set_slopeScalePolygonOffset: function(value)
    {
        if(this._innerLayer === null || typeof value !== "number"){
            return;
        }
        this._innerLayer.SlopeScalePolygonOffset = value;
    },

    /*
     *是否透明排序
     */
    get_transparentSorting: function()
    {
        if(this._innerLayer === null){
            return;
        }
        return this._innerLayer.TransparentSorting;
    },

    set_transparentSorting: function(value)
    {
        if(this._innerLayer === null || typeof value !== "boolean"){
            return;
        }
        this._innerLayer.TransparentSorting = value;
    },

    /*
     *获取数据的最小高度值/强度值
     */
    get_minDataValue: function()
    {
        if(this._innerLayer === null){
            return;
        }
        return this._innerLayer.MinDataValue;
    },

    /*
     *获取数据的最大高度值/强度值
     */
    get_maxDataValue: function()
    {
        if(this._innerLayer === null){
            return;
        }
        return this._innerLayer.MaxDataValue;
    },

    /*
     *分层设色对象
     */
    get_hypsometricSetting: function()
    {
        if(this._innerLayer === null){
            return;
        }
        var hypsometricSetting = new SuperMap.Web.Realspace.HypsometricSetting();
        hypsometricSetting._innerHypsometricSetting = this._innerLayer.HypsometricSetting;
        return hypsometricSetting;
    },

    set_hypsometricSetting: function(value)
    {
        if(this._innerLayer === null || !(value instanceof SuperMap.Web.Realspace.HypsometricSetting)){
            return;
        }

        if(value._innerHypsometricSetting === null){
            return;
        }
        this._innerLayer.HypsometricSetting = value._innerHypsometricSetting;
    },

    /*
     *透明过滤
     */
     get_selectionFiltrateByTransparency: function()
     {
         if(this._innerLayer === null){
             return;
         }
         return this._innerLayer.SelectionFiltrateByTransparency;
     },

     set_selectionFiltrateByTransparency: function(value)
     {
         if(this._innerLayer === null || typeof value !== "number"){
             return;
         }
         this._innerLayer.SelectionFiltrateByTransparency = value;
     },

     /*
      *设置指定ids的可见性
      */
      setObjectsVisible: function(ids, visible)
      {
          if(this._innerLayer === null){
              return;
          }

          if(ids instanceof Array && typeof visible === "boolean")
          {
              this._innerLayer.SetObjectsVisible(ids, visible);
          }
      },

      /*
       * 返回/设置是否开启顶点捕捉
       */
      get_snap:function()
      {
          ///<returns type="Boolean">是否开启顶点捕捉</returns>
          if (this._innerLayer != null) {
              return this._innerLayer.Snap;
          }
      },

      set_snap:function(value)
      {
          ///<param name="value" type="Boolean">设置图层是否开启顶点捕捉</param>
          if (this._innerLayer != null && typeof value === "boolean") {
              this._innerLayer.Snap = value;
          }
      }
};
SuperMap.Web.Realspace.Layer3DOSGB.registerClass('SuperMap.Web.Realspace.Layer3DOSGB', Sys.Component, Sys.IDisposable);

SuperMap.Web.Realspace.Layer3DVolumeFile = function(strServerRootUrl, strLayerName, strDataName, innerLayer3D) {
    /// <summary>三维栅格文件缓存数据图层对象</summary>
    ///<param name="strServerRootUrl" type="String">服务器地址</param>
    ///<param name="strLayerName" type="String">图层名</param>
    ///<param name="strDataName" type="String">数据名</param>
    /// <returns type="SuperMap.Web.Realspace.Layer3D">返回O>三维栅格文件缓存数据图层对象。</returns>

    SuperMap.Web.Realspace.Layer3DVolumeFile.initializeBase(this);

    // 没有自己的成员，完全依赖COM
    this._innerLayer = null;

    this._style3D = null;
    this._transparentColor = null;

    if ( innerLayer3D != null) {
        this._innerLayer = innerLayer3D;
    }
    else {
        var pLayer3DURLParam = new SuperMap.Web.Realspace.Layer3DURLParam();
        pLayer3DURLParam._set_layerURL(strServerRootUrl);
        pLayer3DURLParam._set_layerType(SuperMap.Web.Realspace.Layer3DType.VolumeFile);
        pLayer3DURLParam._set_dataName(strDataName);
        pLayer3DURLParam._set_layerName(strLayerName);
        this._innerLayer = SuperMap.Web.Realspace.Utility._SceneControl.get_scene().get_layer3Ds()._createLayer3D(pLayer3DURLParam);
    }
    if (this._innerLayer == null) {
        var ex = new Error(SuperMap.Lang.translate("操作失败"));
        ex.name = SuperMap.Web.Realspace.ExceptionName.OperationFailed;
        throw ex;
    }

};

SuperMap.Web.Realspace.Layer3DVolumeFile.prototype = {
    /*
    *innerLayer3D对象，不对外开放
    */
    _get_innerLayer3D: function() {
        return this._innerLayer;
    },

    _set_innerLayer3D: function(innerLayer3D) {
        this._innerLayer = innerLayer3D;
    },

    /*
    *initialized方法
    */
    initialized: function() {
        ///<returns type="Boolean">判断图层对象是否被创建</returns>
        if (this._innerLayer != null) {
            return true;
        }
        else {
            return false;
        }

    },

    /*
    *name属性
    */
    get_name: function() {
        ///<value type="String">返回图层名</value>
        if (this._innerLayer != null) {
            return this._innerLayer.Name;
        }
    },

    /*
    *caption属性
    */
    get_caption: function() {
        ///<value type="String">返回图层标题</value>
        if (this._innerLayer != null) {
            return this._innerLayer.Caption;
        }

    },
    set_caption: function(caption) {
        /// <summary>设置图层标题</summary>
        if (typeof (caption) != "string") {
            return;
        }
        if (this._innerLayer != null) {
            this._innerLayer.Caption = caption;
        }

    },

    /*
     *updatesize属性
     */
    get_updateSize:function() {

        ///<value type="int">返回图层更新块大小</value>
        if (this._innerLayer != null) {
            return this._innerLayer.UpdateSize;
        }
    },

    set_updateSize:function(value) {

        ///<value type="int">设置图层更新块大小</value>
        if (this._innerLayer != null) {
            this._innerLayer.UpdateSize = value;
        }
    },
    /*
    *description属性
    */
    get_description: function() {
        ///<value type="String">返回图层描述信息</value>
        if (this._innerLayer != null) {
            return this._innerLayer.Description;
        }
    },
    set_description: function(description) {
        /// <summary>设置图层描述信息</summary>
        if (typeof (description) != "string") {
            return;
        }
        if (this._innerLayer != null) {
            this._innerLayer.Description = description;
        }
    },

    /*
    *数据存储路径
    */
     get_dataName: function()
     {///<value type="String">返回图层数据存储路径</value>
         if (this._innerLayer != null)
         {
             return this._innerLayer.DataName;
         }
     },

    /*
    *图层可见性属性
    */
    get_isVisible: function() {
        ///<value type="Boolean">返回图层是否可见</value>
        if (this._innerLayer != null) {
            return this._innerLayer.IsVisible;
        }
    },

    set_isVisible: function(isVisible) {
        ///<summary>设置图层可见性</summary>
        if (this._innerLayer != null) {
            this._innerLayer.IsVisible = isVisible;
        }

    },

    /*
    *图层类型属性
    */
    get_type: function() {
        ///<value type="SuperMap.Web.Realspace.Layer3DType">返回图层类型</value>
        return SuperMap.Web.Realspace.Layer3DType.OSGB;
    },

    /*
    *三维图层的数据类型属性
    */
    get_dataType: function() {
        ///<value type="SuperMap.Web.Realspace.Layer3DDataType">返回三维图层包含的数据类型</value>
        if (this._innerLayer != null) {
            return this._innerLayer.DataType;
        }
    },

    /*
    *图层是否可选择
    */
    get_isSelectable: function() {
        ///<value type="Boolean">返回图层是否可选择</value>
        if (this._innerLayer != null) {
            return this._innerLayer.IsSelectable;
        }

    },

    set_isSelectable: function(isSelectable) {
        ///<summary>设置图层是否可选择</summary>
        if (this._innerLayer != null) {
            this._innerLayer.IsSelectable = isSelectable;
        }

    },

    /*
    *图层是否可编辑
    */
    get_isEditable: function() {
        ///<value type="Boolean">返回图层是否可编辑</value>
        if (this._innerLayer != null) {
            return this._innerLayer.IsEditable;
        }

    },

    set_isEditable: function(iseditalbe) {
        ///<summary>设置图层是否可编辑</summary>
        if (this._innerLayer != null) {
            this._innerLayer.IsEditable = iseditalbe;
        }

    },

    /*
     *图层是否显示阴影
     */
    get_isShadowEnable: function() {
        ///<value type="Boolean">返回图层是否显示阴影</value>
        if (this._innerLayer != null) {
            return this._innerLayer.IsShadowEnable;
        }
    },

    set_isShadowEnable: function(value) {
        ///<summary>设置图层是否可显示阴影</summary>
        if (this._innerLayer != null) {
            this._innerLayer.IsShadowEnable = value;
        }
    },

    /*
    *图层是否始终进行渲染
    */
    get_isAlwaysRender: function() {
        ///<value type="Boolean">返回图层是否始终进行渲染</value>
        if (this._innerLayer != null) {
            return this._innerLayer.IsAlwaysRender;
        }

    },

    set_isAlwaysRender: function(isalbe) {
        ///<summary>设置图层是否始终进行渲染</summary>
        if (this._innerLayer != null) {
            this._innerLayer.IsAlwaysRender = isalbe;
        }

    },

    /*
    *图层选择集属性
    */
    get_selection3D: function() {
        ///<value type="SuperMap.Web.Realspace.Selection3D">返回图层选择集属性</value>
        if (this._selection3D == null && this._innerLayer != null) {
            this._selection3D = new SuperMap.Web.Realspace.Selection3D(this._innerLayer.Selection3D, this);
            this._selection3D.get_style3D().set_lineWidth(0.1);
        }
        return this._selection3D;

    },

    /*
    *获取三维渲染要素集合对象
    */
    get_feature3Ds: function() {
        ///<value type="SuperMap.Web.Core.Feature3Ds"></value>
        if (this._innerLayer == null) {
            return;
        }
        if (this.get_type() == SuperMap.Web.Realspace.Layer3DType.KML || this.get_type() == SuperMap.Web.Realspace.Layer3DType.KMZ) {
            if (this._feature3ds == null) {
                this._feature3ds = new SuperMap.Web.Core.Feature3Ds();
                this._feature3ds._set_innerFeature3Ds(this._innerLayer.Feature3Ds);
                this._feature3ds._makelist();
            }
            return this._feature3ds;
        }
        return null;
    },

    /*
    *图层的范围
    */
    get_bounds: function() {
        ///<value type="SuperMap.Web.Core.Rectangle2D">返回图层的范围</value>
        if (this._innerLayer != null) {
            var innerBounds = this._innerLayer.Bounds;
            return new SuperMap.Bounds(innerBounds.Left, innerBounds.Bottom, innerBounds.Right, innerBounds.Top);

        }
    },


    /*
     *剖切查看
     */
    clipByBox: function(geometry,part) {
        ///<value type="SuperMap.Web.Core.Box">设置剖切面</value>
        ///<param name="part" type="SuperMap.Web.Realspace.BoxClipPart">裁剪模式</param>

            if(this._innerLayer != null){
                var geobox = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(geometry);
                this._innerLayer.ClipByBox(geobox,part);
            }

    },


    /*
    *图层风格
    */
    get_style3D: function()
    {
        ///<value type="SuperMap.Web.Core.Style3D">返回图层的风格属性</value>
        if (this._innerLayer != null)
        {
            if(null == this._style3D)
            {
              this._style3D = new SuperMap.Web.Core.Style3D();
              this._style3D._set_innerStyle3D(this._innerLayer.Style3D);
            }
            return this._style3D;
        }
    },
    set_style3D: function(style)
    {
        ///<summary>设置矢量类型图层的显示风格</summary>
        if (this._innerLayer == null)
        {
            return;
        }
        if (SuperMap.Web.Core.Style3D.isInstanceOfType(style))
        {
            this._innerLayer.Style3D = style._get_innerStyle3D();
            this._style3D = style;
        }
    },


    /*
     *是否开启卷帘效果
     */
    get_swipeEnabled: function() {
        ///<value type="Boolean">返回图层是否开启卷帘效果</value>
        if (this._innerLayer != null) {
            return this._innerLayer.SwipeEnabled;
        }
    },

    set_swipeEnabled: function(isswipeEnabled) {
        ///<summary>设置图层是否开启卷帘</summary>
        if (this._innerLayer != null) {
            this._innerLayer.SwipeEnabled = isswipeEnabled;
        }

    },



    /*
     *SwipeRegion属性
     */
    get_swipeRegion: function()
    {
        ///<value type="SuperMap.Web.Core.Rectangle2D">返回卷帘范围</value>
        if (this._innerLayer != null )
        {
            var innerBounds = this._innerLayer.SwipeRegion;
            return new SuperMap.Bounds(innerBounds.Left, innerBounds.Bottom, innerBounds.Right, innerBounds.Top);
        }
    },
    set_swipeRegion: function(rec2d)
    {
        ///<summary>设置卷帘范围</summary>
        if (this._innerLayer != null) {
            var recInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(rec2d);
            this._innerLayer.SwipeRegion = recInner;
        }
    },


    /*
    *IsTransparent属性
    */
    get_isTransparent: function()
    {
        if (this._innerLayer != null)
        {
            return this._innerLayer.IsTransparent;
        }

    },
    set_isTransparent: function(isTransparent)
    {
        if (typeof (isTransparent) != "boolean")
        {
            return;
        }
        if (this._innerLayer != null)
        {
            this._innerLayer.IsTransparent = isTransparent;
        }
    },


    /*
    *TransparentColor属性
    */
    get_transparentColor: function()
    {
        if (this._innerLayer == null) {
            return null;
        }
        if (this._transparentColor == null) {
            this._transparentColor = new SuperMap.Web.Core.Color();
        }
        this._transparentColor.fromLongABGR(this._innerLayer.TransparentColor);
        return this._transparentColor;
    },
    set_transparentColor: function(transparentColor)
    {
        if (this._innerLayer == null) {
            return;
        }
        if (SuperMap.Web.Core.Color.isInstanceOfType(transparentColor)) {
            this._innerLayer.TransparentColor = transparentColor.toLongABGR();
        }
        else if (!isNaN(parseFloat(transparentColor))) {
            this._innerLayer.TransparentColor = parseFloat(transparentColor);
        }
    },

    /*
    *TransparentColorTolerance属性
    */
    get_transparentColorTolerance: function()
    {
        if (this._innerLayer != null)
        {
            return this._innerLayer.TransparentColorTolerance;
        }
    },
    set_transparentColorTolerance: function(transparentColorTolerance)
    {
    if(transparentColorTolerance>255 || transparentColorTolerance<0)
    {
        return;
    }
        if (this._innerLayer != null)
        {
            this._innerLayer.TransparentColorTolerance = transparentColorTolerance;
        }
    },

    /*
    *findFeature3DByID方法
    */
    findFeature3DByID: function(id)
    {
        ///<param name="id" type="Int" elementType="Number" integer="true">对象Id</param>
        ///<returns type="SuperMap.Web.Core.Feature3D">若查找成功返回根据ID查找到三维要素对象，否则返回null</returns>
        var n_id = parseInt(id);
        if (!isNaN(n_id))
        {
            var innerobj = this._innerLayer.FindFeature3DByID(id);
            if (innerobj != null) {
               var feature3d = new SuperMap.Web.Core.Feature3D();
               feature3d._set_innerFeature3D(innerobj);
               feature3d._make(innerobj.Geometry);
               return feature3d;
            }
        }
        return null;
    },
    /**
    *删除该图层属性缓存数据
    */
    updateAttributeCacheFile:function()
    {
        return this._innerLayer.UpdateAttributeCacheFile();
    },

     /**
    *删除该图层属性缓存数据
    */
    updateCacheFile:function()
    {
        return this._innerLayer.UpdateCacheFile();
    },

    /*
    * 更新选择集
    */
    updateSelection:function()
    {
        if (this._innerLayer == null) {
            return;
        }
        this._innerLayer.UpdateSelection();
    },
    /**
    *更新该图层缓存数据
    */
    updateData: function () {
        return this._innerLayer.UpdateData();
    },
    /*
    * 释放选择集，包括清除选择集里面的id，以及高亮效果
    */
    releaseSelection:function()
    {
        if (this._innerLayer == null) {
            return;
        }
        this._innerLayer.ReleaseSelection();
    },

    /*
    *矢量文件缓存属性字段信息
    */
    get_fieldInfos:function()
    {
    ///<value type="SuperMap.Web.Realspace.FieldInfos">返回属性字段信息集合</value>
        if (this._innerLayer == null) {
            return;
        }

        if (this._fieldInfos == null) {
           if (this._innerLayer.FieldInfos == null) {
               return;
           }
           this._fieldInfos = new SuperMap.Web.Realspace.FieldInfos(this._innerLayer.FieldInfos);
        }
        return this._fieldInfos;
    },

    /*
    *获取矢量文件缓存属性字段值
    */
    getFieldValue:function(index)
    {
        if (this._innerLayer == null|| index==null) {
            return;
        }
        if(typeof index=="string")
        {
            return this._innerLayer.GetFieldValue(index);
        }
        if(typeof index=="number")
        {
            var intValue = parseInt(index);
            if((intValue>=0)&&(intValue<=0xFFFFFFFF))
            {
                return this._innerLayer.GetFieldValue(intValue);
            }
        }
        return;
    },

    refresh:function()
    {
        if (this._innerLayer == null) {
            return;
        }
        this._innerLayer.Refresh();
    },

    /*
    *获取图层数据下载进度
    */
    getDataStreamingProgress:function()
    {
        if (this._innerLayer == null) {
            return;
        }
        return this._innerLayer.GetDataStreamingProgress();
    },

    setLoadTextureLOD:function(bLoadLOD0, bLoadLOD1, bLoadLOD2)
    {
    ///<param name="bLoadLOD0" type="Boolean">精细</param>
    ///<param name="bLoadLOD1" type="Boolean">普通</param>
    ///<param name="bLoadLOD2" type="Boolean">粗糙</param>
        if (this._innerLayer == null) {
            return;
        }
        if((typeof bLoadLOD0=="boolean")&&(typeof bLoadLOD1=="boolean")&&(typeof bLoadLOD2=="boolean"))
        {
            return this._innerLayer.SetLoadTextureLOD(bLoadLOD0, bLoadLOD1, bLoadLOD2);
        }
    },

    renderWithoutTexture:function(bLoad)
    {
    ///<param name="bLoad" type="Boolean">是否加载无纹理模型</param>
        if (this._innerLayer == null) {
            return;
        }
        if(typeof bLoad=="boolean")
        {
            return this._innerLayer.RenderWithoutTexture(bLoad);
        }
    },


    fromXML:function(xml)
    {
        if (typeof (xml) != "string" || this._innerLayer == null)
    {
            return;
        }

        this._innerLayer.FromXML(xml);
    },

    /*
    *获取图层数据下载进度
    */
    toXML:function()
    {
        if (this._innerLayer == null) {
            return;
        }
        return this._innerLayer.ToXML();
    },

    /*
   * 裁剪面分析
   */
    setCustomClipPlane:function(firstPoint,secondPoint,thirdPoint){
      var first_geoInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(firstPoint);
      var second_geoInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(secondPoint);
      var third_geoInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(thirdPoint);
        if(this._innerLayer != null && first_geoInner != null && second_geoInner != null && third_geoInner != null)
        {
            return this._innerLayer.SetCustomClipPlane(first_geoInner,second_geoInner,third_geoInner);
        }
    },

    /*
     * 设置颜色表
     */
    setObjectsColor:function (keys,color) {
        var intColor = color.toLongABGR();
        if(this._innerLayer != null)
        {

            return this._innerLayer.SetObjectsColor(keys,intColor);
        }
    },

    /*
     * 获取颜色表对应的ID值
     */
    getObjectsColorIDs:function () {
        ///<value type="Boolean">返回颜色表对应的ID值</value>
        if(this._innerLayer != null)
        {
            return this._innerLayer.GetObjectsColorIDs();
        }
    },

    /*
     * 获取颜色表
     */
    getObjectsColor:function () {
        ///<value type="Boolean">返回颜色表</value>
        if(this._innerLayer != null)
        {
            var color = new SuperMap.Web.Core.Color();
            var intColor = this._innerLayer.GetObjectsColorValues();
            return color.fromLongABGR(intColor);

        }
    },

    /*
     * 移出指定IDs的颜色表
     */
    removeObjectsColor:function (objectIds) {

        if(this._innerLayer != null)
        {
            return this._innerLayer.RemoveObjectsColor(objectIds);
        }
    },

    /*
     * 清除颜色表
     */
    clearObjectsColor:function () {

        if(this._innerLayer != null)
        {
            return this._innerLayer.ClearObjectsColor();
        }
    },

    /**
     *设置图层对某个视口的可见性
     *
     */
    setViewportVisible:function(index,value)
    {

        if(this._innerLayer != null && index != null)
        {
            this._innerLayer.SetViewportVisible(index,value);
        }
    },

    /*
     * 获取图层对某个视口的可见性
     */
    getViewportVisible:function (index) {

        if(this._innerLayer != null && index != null)
        {
            return this._innerLayer.GetViewportVisible(index);
        }
    },


    /*
     * 获取体对象
     */
    getVolume3D:function()
    {
        if (this._innerLayer != null) {
            var recSRVolume3D = this._innerLayer.GetVolume3D();
            return SuperMap.Web.Core.Conversion._CreateObjectBySRObject(recSRVolume3D,"Volume3D");
        }
    },

    /*
     *获取数据的最小高度值/强度值
     */
    get_minDataValue: function()
    {
        if(this._innerLayer === null){
            return;
        }
        return this._innerLayer.MinDataValue;
    },

    /*
     *获取数据的最大高度值/强度值
     */
    get_maxDataValue: function()
    {
        if(this._innerLayer === null){
            return;
        }
        return this._innerLayer.MaxDataValue;
    },

    /*
     *分层设色对象
     */
    get_hypsometricSetting: function()
    {
        if(this._innerLayer === null){
            return;
        }
        var hypsometricSetting = new SuperMap.Web.Realspace.HypsometricSetting();
        hypsometricSetting._innerHypsometricSetting = this._innerLayer.HypsometricSetting;
        return hypsometricSetting;
    },

    set_hypsometricSetting: function(value)
    {
        if(this._innerLayer === null || !(value instanceof SuperMap.Web.Realspace.HypsometricSetting)){
            return;
        }

        if(value._innerHypsometricSetting === null){
            return;
        }
        this._innerLayer.HypsometricSetting = value._innerHypsometricSetting;
    },

    /*
     *顶部值
     */
    get_top: function()
    {
        if(this._innerLayer === null){
            return;
        }

        return this._innerLayer.Top;
    },

    set_top: function(value)
    {
        if(this._innerLayer === null || typeof value !== "number"){
            return;
        }

        this._innerLayer.Top = value;
    },

    /*
     *底部值
     */
    get_bottom: function()
    {
        if(this._innerLayer === null){
            return;
        }

        return this._innerLayer.Bottom;
    },

    set_bottom: function(value)
    {
        if(this._innerLayer === null || typeof value !== "number"){
            return;
        }

        this._innerLayer.Bottom = value;
    }


};
SuperMap.Web.Realspace.Layer3DVolumeFile.registerClass('SuperMap.Web.Realspace.Layer3DVolumeFile', Sys.Component, Sys.IDisposable);
