//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.CacheConfigue
// 功能：			 为自定义服务下载图片设置配置文件参数
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.CacheConfigue = function(innerCacheFile3D) {
    /// <summary>图片配置文件对象</summary>
    /// <returns type="SuperMap.Web.Realspace.CacheConfigue">返回配置文件对象。</returns>

    SuperMap.Web.Realspace.CacheConfigue.initializeBase(this);

    //Com对象
    if(innerCacheFile3D != null)
    {
        this._innerCacheFile = innerCacheFile3D;
    }
    else
    {
        this._innerCacheFile = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateCacheFile();
    }
    if (this._innerCacheFile == null)
    {
        return null;
    }
};
SuperMap.Web.Realspace.CacheConfigue.prototype = {

    /*
     *图层名字属性
     */
    set_layerName:function(strLayerName){
        /// <summary>设置图层名字</summary>
        if (typeof (strLayerName) != "string") {
            return;
        }
        if (this._innerCacheFile != null) {
            this._innerCacheFile.LayerName = strLayerName;
        }
    },

    get_layerName:function(){
        ///<value type="String">返回图层名字</value>
        if (this._innerCacheFile != null) {
            return this._innerCacheFile.LayerName;
        }
    },

    /*
     *投影信息属性
     */
    set_prjCoordSys:function(strPrjCoordSys){
        /// <summary>设置投影信息，可采用WKT形式表示，或者国际标准"ESPG:"</summary>
        if (typeof (strPrjCoordSys) != "string") {
            return;
        }
        if (this._innerCacheFile != null) {
            this._innerCacheFile.PrjCoordSys = strPrjCoordSys;
        }
    },
	
	get_prjCoordSys:function(){
         ///<value type="String">返回投影信息</value>
        if (this._innerCacheFile != null) {
            this._innerCacheFile.PrjCoordSys;
        }
    },

    /*
     *比例尺属性
     */
    set_mapScales:function(dScaleArray){
        /// <summary>设置图层比例尺数组</summary>
        if (typeof (dScaleArray) != "object") {
            return;
        }
        if (this._innerCacheFile != null) {
            this._innerCacheFile.MapScales = dScaleArray;
        }
    },

    get_mapScales:function(){
        /// <value type="object">获取图层比例尺数组</value>
        if (this._innerCacheFile != null) {
            return this._innerCacheFile.MapScales;
        }
    },

    /*
     *瓦片格式属性
     */
    set_imageType:function(nImageType){
        /// <summary>设置瓦片存储格式</summary>
        if (this._innerCacheFile != null) {
            this._innerCacheFile.ImageType = nImageType;
        }
    },

    get_imageType:function(){
        /// <value type="SuperMap.Web.Realspace.ImageType">获取瓦片存储格式</value>
        if (this._innerCacheFile != null) {
            return this._innerCacheFile.ImageType;
        }
    },

    /*
     *设备分辨率属性
     */
    set_dpi:function(dDpi){
        /// <summary>设置设备分辨率</summary>
        if (typeof (dDpi) != "number") {
            return;
        }
        if (this._innerCacheFile != null) {
            this._innerCacheFile.DPI = dDpi;
        }
    },

    get_dpi:function(){
        /// <value type="Number">获取设备分辨率</value>
        if (this._innerCacheFile != null) {
            return this._innerCacheFile.DPI;
        }
    },

    /*
     *缓存文件存储格式属性
     */
    set_storageType:function(bStorageType){
        /// <summary>设置是否存储为紧凑文件</summary>
        if (typeof (dDpi) != "boolean") {
            return;
        }
        if (this._innerCacheFile != null) {
             this._innerCacheFile.StorageType = bStorageType;
        }
    },

    get_storageType:function(){
        /// <value type="Boolean">获取设备分辨率</value>
        return this._innerCacheFile.StorageType;
    },

    /*
     *瓦片像素大小属性
     */
    set_imageSize:function(nImageSize){
        /// <summary>设置单个瓦片像素大小</summary>
        if (this._innerCacheFile != null) {
            this._innerCacheFile.ImageSize = nImageSize;
        }
    },

    get_ImageSize:function(){
        /// <value type="Number">获取瓦片像素大小</value>
        if (this._innerCacheFile != null) {
            return this._innerCacheFile.ImageSize;
        }
    },

    /*
     *图层bounds属性
     */
    set_mapBounds:function(recBounds){
        /// <summary>设置图层地理范围</summary>
        if (typeof (recBounds) != "object") {
            return;
        }
        if (this._innerCacheFile != null) {
            var recSRBounds = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(recBounds);
            this._innerCacheFile.MapBounds = recSRBounds;
        }
    },

    get_mapBounds:function(){
        /// <value type="SuperMap.Bounds">获取图层地理范围</value>
        if (this._innerCacheFile != null) {
            var recSRBounds = this._innerCacheFile.MapBounds;
            return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(recSRBounds,"Rectangle2D");
        }
    },

    /*
     *瓦片切分原点属性
     */
    set_originalPoint:function(ptOrigPoint){
        /// <summary>设置瓦片切分原点</summary>
        if (typeof (ptOrigPoint) != "object") {
            return;
        }
        if (this._innerCacheFile != null) {
		    var pntSROriginal = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(ptOrigPoint);
            this._innerCacheFile.OriginalPoint = pntSROriginal;
        }
    },

    get_originalPoint:function(){
        /// <value type="SuperMap.LonLat">获取图层地理范围</value>
        if (this._innerCacheFile != null) {
            var pntSROriginal = this._innerCacheFile.OriginalPoint;
            return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(pntSROriginal, "Point2D");
        }
    }
}
SuperMap.Web.Realspace.CacheConfigue.registerClass('SuperMap.Web.Realspace.CacheConfigue',  Sys.Component, Sys.IDisposable);

