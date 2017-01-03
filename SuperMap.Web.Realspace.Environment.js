//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Environment.js  
// 功能：			 辅助类库  
// 最后修改时间：
//==========================================================================
Type.registerNamespace("SuperMap.Web.Realspace");
SuperMap.Web.Realspace.Environment = function(){
	// <summary>公用函数集合。</summary>
	// <returns type="object">返回一个 object 对象。</returns>
};
SuperMap.Web.Realspace.Environment.registerClass('SuperMap.Web.Realspace.Environment', null, Sys.IDisposable);

// 全局变量，内部使用不必公开
SuperMap.Web.Realspace.Environment._IsSceneAntialias = null;
SuperMap.Web.Realspace.Environment._SceneAntialiasValue = null;

SuperMap.Web.Realspace.Environment._IsInitialized = false;

/*
*IsSceneAntialias属性
*/
SuperMap.Web.Realspace.Environment.get_IsSceneAntialias = function()
{
    if(SuperMap.Web.Realspace.Utility._SceneControl != null)
    {
        SuperMap.Web.Realspace.Environment._IsSceneAntialias = SuperMap.Web.Realspace.Utility._SceneControl._get_innerSceneControl().IsSceneAntialias;
    }
    return SuperMap.Web.Realspace.Environment._IsSceneAntialias;
};

SuperMap.Web.Realspace.Environment.set_IsSceneAntialias = function(IsSceneAntialias)
{
    if (typeof (IsSceneAntialias) == "boolean") 
    {
        if(SuperMap.Web.Realspace.Environment._IsInitialized)
        {
            SuperMap.Web.Realspace.Utility._SceneControl._get_innerSceneControl().IsSceneAntialiasEffectNext = IsSceneAntialias;
        }
        else
        {
            SuperMap.Web.Realspace.Environment._IsSceneAntialias = IsSceneAntialias;
        }
    }
};

/*
*SceneAntialiasValue属性
*/
SuperMap.Web.Realspace.Environment.get_SceneAntialiasValue = function()
{
    if(SuperMap.Web.Realspace.Utility._SceneControl != null)
    {
        SuperMap.Web.Realspace.Environment._SceneAntialiasValue = SuperMap.Web.Realspace.Utility._SceneControl._get_innerSceneControl().SceneAntialiasValue;
    }
    return SuperMap.Web.Realspace.Environment._SceneAntialiasValue;
};

SuperMap.Web.Realspace.Environment.set_SceneAntialiasValue = function(SceneAntialiasValue)
{
    var n_SceneAntialiasValue = parseInt(SceneAntialiasValue);
    if (!isNaN(n_SceneAntialiasValue)) 
    {
        if(n_SceneAntialiasValue > 16)
        {
            n_SceneAntialiasValue = 16
        }
        if(n_SceneAntialiasValue < 0)
        {
            n_SceneAntialiasValue = 0
        }
        
        if(SuperMap.Web.Realspace.Environment._IsInitialized)
        {
            SuperMap.Web.Realspace.Utility._SceneControl._get_innerSceneControl().SceneAntialiasValueEffectNext = n_SceneAntialiasValue;
        }
        else
        {
            SuperMap.Web.Realspace.Environment._SceneAntialiasValue = n_SceneAntialiasValue;
        }
    }
}





	
	