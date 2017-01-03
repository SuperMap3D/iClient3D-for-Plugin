//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Layer3DWMTSServicesList  
// 功能：			 WMTS图层服务列表 
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Layer3DWMTSServicesList = function()
{
 
  SuperMap.Web.Realspace.Layer3DWMTSServicesList.initializeBase(this);

  this._innerLayer3DWMTSServicesList = SuperMap.Web.Realspace.Utility._SceneControl._get_innerSceneControl().Layer3DWMTSServicesList;
};

SuperMap.Web.Realspace.Layer3DWMTSServicesList.prototype ={	
	
	get_count:function()
	{
		/// <summary>获取图层列表中图层服务数目</summary>
		///<value type="number" integer="true"></value>
		return this._innerLayer3DWMTSServicesList.Count;
	},
	
	/*
	*属性:服务器地址
	*/
	get_serverRootAddress:function()
	{
		///<value type="string" ></value>
		return this._innerLayer3DWMTSServicesList.ServerRootAddress;
	},
	
	
	get_item:function(index)
	{
		/// <summary>获取指定索引的图层服务信息</summary>
		///<param name="index" type="number" integer="true">索引值</param> 
		/// <returns type="SuperMap.Web.Realspace.Layer3DWMTSServiceInfo">返回图层服务信息</returns>
		if((index==0) || index)
		{
		    var innerLayer3DWMTSServiceInfo = this._innerLayer3DWMTSServicesList.get_Item(index);
    		
		    if(innerLayer3DWMTSServiceInfo != null)
		    {
		        var layer3DWMTSServiceInfo = new SuperMap.Web.Realspace.Layer3DWMTSServiceInfo(innerLayer3DWMTSServiceInfo);

		        return layer3DWMTSServiceInfo;
		    }
  		    
		}
		return null;
		
	},

	/*
	*方法,获取指定场景的图层服务列表
	*/
	load:function(strServerRootUrl)
	{
		/// <summary>获取指定地址的WMTS图层服务列表</summary>
		///<param name="strServerRootUrl" type="string">服务器地址</param> 
		///<returns type="boolean">是否成功</returns>
        if(typeof(strServerRootUrl) != "string")
        {
            return false;
        }
        return this._innerLayer3DWMTSServicesList.Load(strServerRootUrl);
	}
};
SuperMap.Web.Realspace.Layer3DWMTSServicesList.registerClass('SuperMap.Web.Realspace.Layer3DWMTSServicesList', Sys.Component, Sys.IDisposable);
