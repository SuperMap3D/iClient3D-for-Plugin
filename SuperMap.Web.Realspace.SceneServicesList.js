//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.SceneServicesList
// 功能：			场景服务列表类
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.SceneServicesList = function (scenecontrol)
{  

  SuperMap.Web.Realspace.SceneServicesList.initializeBase(this);
  
  this._innerSceneServicesList = scenecontrol._get_innerSceneControl().SceneServicesList;
  
};



SuperMap.Web.Realspace.SceneServicesList.prototype ={	
 	/*
	*属性:获取场景列表中场景服务数目
	*/
	get_count:function()
	{
		///<returns type="number" integer="true">返回场景列表中场景服务数目</returns>
		if (this._innerSceneServicesList == null) 
        {
              return null;
        }
		return this._innerSceneServicesList.Count;
	},		
	
	/*
	*属性,获取服务端url地址
	*/
	get_serverRootAddress:function()
	{
		///<returns type="string" >返回场服务列表的URL</returns>
		if (this._innerSceneServicesList == null) 
        {
              return null;
        }
		return this._innerSceneServicesList.ServerRootAddress;
	},
	
	/*
	*属性,获取指定场景名字或索引号的场景服务信息
	*/
	get_item:function(index)
	{

		///<param name="index" type="string/number" integer="true">场景名或索引</param> 
		///<returns type="SceneServiceInfo" >场景服务信息</returns>
		if (this._innerSceneServicesList == null) 
        {
              return null;
        }
		if((index==0) || index)
		{
		    var innerSceneServiceInfo = this._innerSceneServicesList.get_Item(index);
		    
		    if(innerSceneServiceInfo != null)
		    {
		        var sceneServiceInfo = SuperMap.Web.Core.Conversion._ConvertSRObject2Object(innerSceneServiceInfo,"SceneServiceInfo");
		    
		        return sceneServiceInfo;
		    }
		}
		return null;
	},
	
    /*
	* 方法:获取场景服务列表
	*/
	load:function(strServerRootUrl)
	{
		///<param name="strServerRootUrl" type="string">服务器地址</param> 
        ///<returns type="boolean">是否成功</returns>
        if (this._innerSceneServicesList == null) 
        {
              return false;
        }
        if(typeof(strServerRootUrl) != "string")
        {
            return false;
        }
        var bSucceed = this._innerSceneServicesList.Load(strServerRootUrl);
        return bSucceed;
    
	},

    /*
	*方法,移除场景服务列表中所有场景服务信息
	*/
	removeAll:function()
	{
       ///<returns type="void"></returns>
       if (this._innerSceneServicesList == null) 
       {
              return;
       }
       this._innerSceneServicesList.RemoveAll();
	}
	
//	/*
//	*方法
//	*/
//	removeAt:function(index)
//	{
//		///<param name="index" type="string/number" integer="true"></param> 
//        ///<returns type="void"></returns>

//	},	
//	
//	/*
//	*方法
//	*/
//	indexOf:function(strServiceName)
//	{
//		///<param name="strServiceName" type="string"></param> 
//       ///<returns type="number" integer="true"></returns>

//	}
	


};
SuperMap.Web.Realspace.SceneServicesList.registerClass('SuperMap.Web.Realspace.SceneServicesList', Sys.Component, Sys.IDisposable);
