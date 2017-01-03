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

SuperMap.Web.Realspace.Volume3D = function(innerVolume3D) {
    /// <summary>体对象类</summary>
    /// <returns type="SuperMap.Web.Realspace.Volume3D">体对象类。</returns>

    SuperMap.Web.Realspace.Volume3D.initializeBase(this);

    //Com对象
    if(innerVolume3D != null)
    {
        this._innerVolume3D = innerVolume3D;
    }
   else if (this._innerVolume3D == null)
    {
        return null;
    }
};
SuperMap.Web.Realspace.Volume3D.prototype = {

    /*
     *设置体对象高度顶部值
     */
    set_top:function(dTop){
        /// <summary>设置体对象高度顶部值</summary>
        if (typeof (dTop) != "number") {
            return;
        }
        if (this._innerVolume3D != null) {
            this._innerVolume3D.Top = dTop;
        }
    },

    /*
     *获取体对象高度顶部值
     */
    get_top:function(){
        ///<value type="number">返回体对象高度顶部值</value>
        if (this._innerVolume3D != null) {
            return this._innerVolume3D.Top;
        }
    },

    /*
     *设置体对象高度底部值
     */
    set_bottom:function(dBottom){
        /// <summary>设置体对象高度底部值</summary>
        if (typeof (dBottom) != "number") {
            return;
        }
        if (this._innerVolume3D != null) {
            this._innerVolume3D.Bottom = dBottom;
        }
    },

    /*
     *获取体对象高度底部值
     */
    get_bottom:function(){
         ///<value type="number">返回体对象高度底部值</value>
        if (this._innerVolume3D != null) {
            this._innerVolume3D.Bottom;
        }
    },

    /*
     *设置体对象地理范围
     */
    set_bounds:function(recBounds){
        /// <summary>设置体对象地理范围</summary>
        if (typeof (recBounds) != "object") {
            return;
        }
        if (this._innerVolume3D != null) {
            var recSRBounds = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(recBounds);
            this._innerVolume3D.Bounds = recSRBounds;
        }
    },

    /*
     *获取体对象地理范围
     */
    get_bounds:function(){
        /// <value type="SuperMap.Bounds">获取体对象地理范围</value>
        if (this._innerVolume3D != null) {
            var recSRBounds = this._innerVolume3D.Bounds;
            return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(recSRBounds,"Rectangle2D");
        }
    },

    /*
     *设置体对象纹理文件数组名
     */
    set_fileNames:function(arrayFileNames)
    {
        ///<param name="arrayFileNames" type="Object">体对象纹理文件数组名</param>
        if (this._innerVolume3D != null) {
            this._innerVolume3D.FileNames = arrayFileNames;
        }
    },

    /*
     *获取体对象纹理文件数组名
     */
    get_fileNames:function()
    {
        /// <value type="Object">获取体对象纹理文件数组名</value>
        if (this._innerVolume3D != null) {
            return this._innerVolume3D.FileNames;
        }
    }
}
SuperMap.Web.Realspace.Volume3D.registerClass('SuperMap.Web.Realspace.Volume3D',  Sys.Component, Sys.IDisposable);

