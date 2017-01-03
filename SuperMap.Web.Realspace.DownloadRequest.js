//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.DownloadRequest
// 功能：			 服务下载请求
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.DownloadRequest = function(innerRequest3D) {
    /// <summary>图片下载请求对象</summary>
    /// <returns type="SuperMap.Web.Realspace.DownloadRequest">返回请求对象。</returns>

    SuperMap.Web.Realspace.DownloadRequest.initializeBase(this);

    //Com对象
    if(innerRequest3D != null)
    {
        this._innerRequest = innerRequest3D;
    }
    else
    {
        this._innerRequest = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateDownRequest();
    }
    if (this._innerRequest == null)
    {
        return null;
    }
};
SuperMap.Web.Realspace.DownloadRequest.prototype = {

    /*
     *图片URL地址属性
     */
    set_tileURL: function(strURL){
        /// <summary>设置瓦片URL地址</summary>
        if (typeof (strURL) != "string") {
            return;
        }
        if (this._innerRequest != null) {
            this._innerRequest.TileURL = strURL;
        }
    },

    /*
     *瓦片比例尺属性
     */
    set_tileScale: function(dScale){
        /// <summary>设置瓦片比例尺</summary>
        if (typeof (dScale) != "number") {
            return;
        }
        if (this._innerRequest != null) {
            this._innerRequest.TileScale = dScale;
        }
    },

    /*
     *瓦片行号属性
     */
    set_tileRow: function(nRow){
        /// <summary>设置瓦片所在行号</summary>
        if (typeof (nRow) != "number") {
            return;
        }
        if (this._innerRequest != null) {
             this._innerRequest.TileRow = nRow;
        }
    },

    /*
     *瓦片列号属性
     */
    set_tileCol: function(nCol){
        /// <summary>设置瓦片所在列号</summary>
        if (typeof (nCol) != "number") {
            return;
        }
        if (this._innerRequest != null) {
            this._innerRequest.TileCol = nCol;
        }
    }
}
SuperMap.Web.Realspace.DownloadRequest.registerClass('SuperMap.Web.Realspace.DownloadRequest',  Sys.Component, Sys.IDisposable);