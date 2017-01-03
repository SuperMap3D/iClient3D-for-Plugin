//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Layer3DServicesList  
// 功能：			 图层服务列表 
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Layer3DServicesList = function (scenecontrol)
{
 
  SuperMap.Web.Realspace.Layer3DServicesList.initializeBase(this);

  this._innerLayer3DServicesList = scenecontrol._get_innerSceneControl().Layer3DServicesList;
};

SuperMap.Web.Realspace.Layer3DServicesList.prototype ={	
	
	get_count:function()
	{
		/// <summary>获取图层列表中图层服务数目</summary>
		///<value type="number" integer="true"></value>
		return this._innerLayer3DServicesList.Count;
	},
	
	/*
	*属性:服务器地址
	*/
	get_serverRootAddress:function()
	{
		///<value type="string" ></value>
		return this._innerLayer3DServicesList.ServerRootAddress;
	},
	set_serverRootAddress:function(path)
	{
		///<value type="string" ></value>
        if(typeof(path) != "string")
        {
            return;
        }
		this._innerLayer3DServicesList.ServerRootAddress = path;
	},
	
	/*
	*属性:场景名
	*/
	get_sceneName:function()
	{
		///<value type="string" ></value>
		return this._innerLayer3DServicesList.SceneName;
	},
	set_sceneName:function(sceneName)
	{
		///<value type="string" ></value>
        if(typeof(sceneName) != "string")
        {
            return;
        }
		this._innerLayer3DServicesList.SceneName =sceneName;
	},
	
	get_item:function(index)
	{
		/// <summary>获取指定索引的图层服务信息</summary>
		///<param name="index" type="string/number" integer="true">索引值</param> 
		/// <returns type="SuperMap.Web.Realspace.Layer3DServiceInfo">返回图层服务信息</returns>
		if((index==0) || index)
		{
		    var innerLayer3DServiceInfo = this._innerLayer3DServicesList.get_Item(index);
    		
		    if(innerLayer3DServiceInfo != null)
		    {
		        var layer3DServiceInfo = new SuperMap.Web.Realspace.Layer3DServiceInfo(innerLayer3DServiceInfo);

		        return layer3DServiceInfo;
		    }
  		    
		}
		return null;
		
	},

	/*
	*方法,获取指定场景的图层服务列表
	*/
	load:function(strServerRootUrl, strSceneName)
	{
		/// <summary>获取指定场景的图层服务列表</summary>
		///<param name="strServerRootUrl" type="string">服务器地址</param> 
		///<param name="strSceneName" type="string">场景名称</param> 
		///<returns type="boolean">是否成功</returns>
//       var e = Function._validateParams(arguments, [{name: "strServerUrl", type: String},{name: "strSceneName", type: String}]);
//         if (e) throw e;
        if((typeof(strServerRootUrl) != "string") || (typeof(strSceneName) != "string"))
        {
            return false;
        }
        return this._innerLayer3DServicesList.Load(strServerRootUrl, strSceneName);
	},

	/*
	*方法,移除列表中所有图层服务信息
	*/
	removeAll:function()
	{
		/// <summary>移除列表中所有图层服务信息</summary>
		///<returns type="void"></returns>
		this._innerLayer3DServicesList.RemoveAll();
	}
	
//	/*
//	*方法
//	*/
//	removeAt:function(index)
//	{
//		///<param name="index" type="string/number" integer="true"></param> 
//    ///<returns type="void"></returns>
//    this._innerLayer3DServicesList.RemoveAt(index);
//	},	
//	
//	/*
//	*方法
//	*/
//	indexOf:function(strServiceName)
//	{
//		///<param name="strServiceName" type="string"></param> 
//    ///<returns type="number" integer="true"></returns>
//    return this._innerLayer3DServicesList.IndexOf(strServiceName);

//	}
};
SuperMap.Web.Realspace.Layer3DServicesList.registerClass('SuperMap.Web.Realspace.Layer3DServicesList', Sys.Component, Sys.IDisposable);
