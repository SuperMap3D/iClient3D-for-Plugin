//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.SceneServiceInfo
// 功能：			场景服务信息 
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.SceneServiceInfo = function()
{
  
  SuperMap.Web.Realspace.SceneServiceInfo.initializeBase(this);

//  this._innersceneServiceInfo = null;
    this._name = "";
    this._serverRootAddress = "";
  
};

SuperMap.Web.Realspace.SceneServiceInfo.prototype ={	
	/*
	*设置com层的SceneServiceInfo对象,不对外开放
	*/
// 	_set_innerSceneServiceInfo:function(innerSceneServiceInfo)
// 	{
// 		this._innersceneServiceInfo = innerSceneServiceInfo;
// 	},
	
	/*
	*属性:场景服务信息名称
	*/
	get_name:function()
	{
		///<returns type="string">返回场景服务信息名称</returns>
		return this._name;
	},
	set_name:function(name)
	{
		/// <summary>设置场景服务信息名称</summary>
		///<param name="name" type="string">场景服务信息名称</param>
	   if (typeof(name) == "string") 
	   {
	        this._name = name;
	   }
	},
	
	/*
	*属性:服务器地址
	*/
	get_serverRootAddress:function()
	{
		///<returns type="string">返回服务器地址</returns>
	    return this._serverRootAddress;
	},
	set_serverRootAddress:function(path)
	{
		/// <summary>设置服务器地址</summary>
		///<param name="path" type="string">服务器地址</param>
	   if (typeof(path) == "string") 
	   {
	        this._serverRootAddress = path;
	   }
	}
	
//	/*
//	*方法
//	*/
//	isValid:function()
//	{		
//    ///<returns type="boolean"></returns>
//  
//	}
	
};

SuperMap.Web.Realspace.SceneServiceInfo.registerClass('SuperMap.Web.Realspace.SceneServiceInfo', Sys.Component, Sys.IDisposable);
