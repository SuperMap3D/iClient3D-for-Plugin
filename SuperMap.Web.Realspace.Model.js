//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.Model
// 功能：
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Model = function () {
    /// <summary></summary>
    SuperMap.Web.Realspace.Model.initializeBase(this);
    this._innerModel = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateSRModel();
};

SuperMap.Web.Realspace.Model.prototype = {
    /*
    *
    */
    fromFile: function (url) {
        ///<return type="Boolean">返回是否成功</value>
        if (this._innerModel != null) {
            return this._innerModel.FromFile(url);
        }
    }
};
SuperMap.Web.Realspace.Model.registerClass('SuperMap.Web.Realspace.Model', Sys.Component, Sys.IDisposable);
