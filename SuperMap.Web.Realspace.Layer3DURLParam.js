//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.Layer3DURLParam
// 功能：			 初始化网络图层所需的各种参数，便于后期扩展
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Layer3DURLParam = function(innerLayer3DURL) {
    /// <summary>图片配置文件对象</summary>
    /// <returns type="SuperMap.Web.Realspace.Layer3DURLParam">返回配置文件对象。</returns>

    SuperMap.Web.Realspace.Layer3DURLParam.initializeBase(this);

    //Com对象
    if(innerLayer3DURL != null)
    {
        this._innerLayer3DURL = innerLayer3DURL;
    }
    else
    {
        this._innerLayer3DURL = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateLayer3DURLParam();
    }
    if (this._innerLayer3DURL == null)
    {
        return null;
    }
};
SuperMap.Web.Realspace.Layer3DURLParam.prototype = {

    /*
     *网络图层的URL地址属性
     */
    _set_layerURL:function(strServerRootUrl){
        ///<param name="strServerRootUrl" type="string">服务器地址</param>
        if (typeof (strServerRootUrl) != "string") {
            return;
        }
        if (this._innerLayer3DURL != null) {
            this._innerLayer3DURL.LayerURL = strServerRootUrl;
        }
    },

    _get_layerURL:function(){
        ///<value type="String">返回服务器地址</value>
        if (this._innerLayer3DURL != null) {
            return this._innerLayer3DURL.LayerURL;
        }
    },

    /*
     *图层类型属性
     */
    _set_layerType:function(l3dType){
        /// <summary>设置图层类型，"</summary>
        if (this._innerLayer3DURL != null) {
            this._innerLayer3DURL.LayerType = l3dType;
        }
    },

    _get_layerType:function(){
        /// <value type="SuperMap.Web.Realspace.Layer3DType">获取图层类型</value>
        if (this._innerLayer3DURL != null) {
            return this._innerLayer3DURL.LayerType;
        }
    },

    /*
     *图层数据名称属性
     */
    _set_dataName:function(strDataName){
        /// <summary>设置图层真实数据名称</summary>
        if (this._innerLayer3DURL != null) {
            this._innerLayer3DURL.DataName = strDataName;
        }
    },

    _get_dataName:function(){
        /// <value type="String">获取图层数据名称</value>
        if (this._innerLayer3DURL != null) {
            return this._innerLayer3DURL.DataName;
        }
    },

    /*
     *图层用户定义名称属性
     */
    _set_layerName:function(strLayerName){
        /// <summary>设置用户定义的图层名称</summary>
        if (this._innerLayer3DURL != null) {
            this._innerLayer3DURL.LayerName = strLayerName;
        }
    },

    _get_layerName:function(){
        /// <value type="String">获取用户定义的图层名称</value>
        if (this._innerLayer3DURL != null) {
            return this._innerLayer3DURL.LayerName;
        }
    },

    /*
     *图层配置文件参数属性
     */
    _set_cacheConfigue:function(cacheConfigue){
        /// <summary>设置图层配置文件参数</summary>
        if (this._innerLayer3DURL != null && cacheConfigue != null) {
            this._innerLayer3DURL.CacheConfigue = cacheConfigue._innerCacheFile;
        }
    },

    _get_cacheConfigue:function(){
        /// <value type="SuperMap.Web.Realspace.CacheConfigue">设置图层配置文件参数</value>
        if (this._innerLayer3DURL != null) {
            return SuperMap.Web.Core.Conversion._CreateObjectBySRObject(this._innerLayer3DURL.CacheConfigue, "Layer3DURLParam");
        }
    },

    /*
     *二维地图临时图层ID属性
     */
    _set_layersID:function(strLayersID){
        /// <summary>设置二维地图临时图层ID</summary>
        if (this._innerLayer3DURL != null) {
             this._innerLayer3DURL.LayersID = strLayersID;
        }
    },

    _get_layersID:function(){
        /// <value type="String">获取二维地图临时图层ID</value>
        if (this._innerLayer3DURL != null) {
            this._innerLayer3DURL.LayersID;
        }
    },

    /**
     *设置设备分辨率
     */
    _set_dpi:function(dDPI){
        /// <summary>设置二维地图临时图层ID</summary>
        if (this._innerLayer3DURL != null) {
            this._innerLayer3DURL.SetDPI(dDPI);
        }
    },

    /**
     *设置图片格式
     */
    _set_imageType:function(nImageType){
        /// <summary>设置二维地图临时图层ID</summary>
        if (this._innerLayer3DURL != null) {
            this._innerLayer3DURL.SetImageType(nImageType);
        }
    },

    /**
     *设置xml信息
     */
    _set_xml: function (strXml) {
        /// <summary>设置XML信息</summary>
        if (this._innerLayer3DURL != null) {
            this._innerLayer3DURL.SetXml(strXml);
        }
    }
}
SuperMap.Web.Realspace.Layer3DURLParam.registerClass('SuperMap.Web.Realspace.Layer3DURLParam',  Sys.Component, Sys.IDisposable);

