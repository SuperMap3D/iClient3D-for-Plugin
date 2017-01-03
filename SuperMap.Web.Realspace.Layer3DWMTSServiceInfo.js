//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Layer3DWMTSServiceInfo 
// 功能：			图层服务信息类 
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Layer3DWMTSServiceInfo = function(innerLayer3DWMTSServiceInfo)
{
	/// <summary>图层服务信息对象</summary>
	/// <returns type="SuperMap.Web.Realspace.Layer3DWMTSServiceInfo">返回WMTS图层服务信息对象。</returns>
	SuperMap.Web.Realspace.Layer3DWMTSServiceInfo.initializeBase(this);
  
    this._innerLayer3DWMTSServiceInfo = null;
    
    this._style3D = null;
    
    if (innerLayer3DWMTSServiceInfo != null) 
    {
        this._innerLayer3DWMTSServiceInfo = innerLayer3DWMTSServiceInfo;
    }
};

SuperMap.Web.Realspace.Layer3DWMTSServiceInfo.prototype = {

    /*
    * 属性：图层名称
    */
    get_name: function() 
    {///<value type="String">返回图层名</value>
        if(this._innerLayer3DWMTSServiceInfo != null)
        {
            return this._innerLayer3DWMTSServiceInfo.Name;
        }
    }
};
SuperMap.Web.Realspace.Layer3DWMTSServiceInfo.registerClass('SuperMap.Web.Realspace.Layer3DWMTSServiceInfo', Sys.Component, Sys.IDisposable);
