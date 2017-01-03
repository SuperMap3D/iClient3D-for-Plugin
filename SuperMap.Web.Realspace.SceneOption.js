//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.SceneOption
// 功能：			  场景界面元素的可见性控制
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.SceneOption = function (scenecontrol)
{
  
  SuperMap.Web.Realspace.SceneOption.initializeBase(this);

  this._innerSceneOption = scenecontrol._get_innerSceneControl().Scene.SceneOption;
  
};

SuperMap.Web.Realspace.SceneOption.prototype ={

	/*
	*属性:经纬网是否可见
	*/
	get_isLatLonGridVisible:function()
	{
		///<value type="boolean"></value>
	    if ((this._innerSceneOption == null))
        {
             return ;           
        } 
        return this._innerSceneOption.IsLatLonGridVisible;
		
	},
	set_isLatLonGridVisible:function(bVisible)
	{
	    if ((this._innerSceneOption == null))
        {
             return ;
        } 
        this._innerSceneOption.IsLatLonGridVisible = bVisible;
		
	},
	
	/*
	*属性:经纬网上的文字是否可见
	*/
	get_isLatLonGridTextVisible:function()
	{
		///<value type="boolean"></value>
		if ((this._innerSceneOption == null)) 
        {
             return ;
        }
        return this._innerSceneOption.IsLatLonGridTextVisible;
		
	},
	set_isLatLonGridTextVisible:function(bVisible)
	{
	    if ((this._innerSceneOption == null))
        {
             return ;
        }
		this._innerSceneOption.IsLatLonGridTextVisible = bVisible;
	},
	
	/*
	*属性:进度条是否可见
	*/
	get_isProcessBarVisible:function()
	{
		///<value type="boolean"></value>
		if ((this._innerSceneOption == null))
        {
             return ;
             
        }
		return this._innerSceneOption.IsProcessBarVisible;
	},
	set_isProcessBarVisible:function(bVisible)
	{
	    if ((this._innerSceneOption == null))
        {
             return ;
        }
		this._innerSceneOption.IsProcessBarVisible = bVisible;
	},
	
	/*
	*属性:大气层是否可见
	*/
	get_isAtmosphereVisible:function()
	{
		///<value type="boolean"></value>
		if ((this._innerSceneOption == null))
        {
             return ;
        }
		return this._innerSceneOption.IsAtmosphereVisible;
	},
	set_isAtmosphereVisible:function(bVisible)
	{
		if ((this._innerSceneOption == null))
        {
             return ;
        }
		this._innerSceneOption.IsAtmosphereVisible = bVisible;
	},
	
	/*
	*属性:星空是否可见
	*/
	get_isStarVisible:function()
	{
		///<value type="boolean"></value>
		if ((this._innerSceneOption == null))
        {
             return ;
        }
		return this._innerSceneOption.IsStarVisible;
	},
	set_isStarVisible:function(bVisible)
	{
		if ((this._innerSceneOption == null))
        {
             return ;
        }
		this._innerSceneOption.IsStarVisible = bVisible;
	},
	
	/*
	*属性:操作面板是否可见
	*/
	get_isControlPlaneVisible:function()
	{
		///<value type="boolean"></value>
		if ((this._innerSceneOption == null))
        {
             return ;
        }
		return this._innerSceneOption.IsControlPlaneVisible;
	},
	set_isControlPlaneVisible:function(bVisible)
	{
		if ((this._innerSceneOption == null))
        {
             return ;
        }
		this._innerSceneOption.IsControlPlaneVisible = bVisible;
	},
	
	/*
	*属性:比例尺是否可见
	*/
	get_isScaleVisible:function()
	{
		///<value type="boolean"></value>
		if ((this._innerSceneOption == null))
        {
             return ;
        }
		return this._innerSceneOption.IsScaleVisible;
	},
	set_isScaleVisible:function(bVisible)
	{
		if ((this._innerSceneOption == null))
        {
             return ;
        }
		this._innerSceneOption.IsScaleVisible = bVisible;
	},

	/*
	*属性:状态条是否可见
	*/
	get_isStatusBarVisible:function()
	{
		///<value type="boolean"></value>
		if ((this._innerSceneOption == null))
        {
             return ;
        }
		return this._innerSceneOption.IsStatusBarVisible;
	},
	set_isStatusBarVisible:function(bVisible)
	{
		if ((this._innerSceneOption == null)) 
        {
             return ;
        }
		this._innerSceneOption.IsStatusBarVisible = bVisible;
	},
	
	/*
	*属性:海洋是否可见
	*/
	get_isOceanVisible:function()
	{
		///<value type="boolean"></value>
		if ((this._innerSceneOption == null))
        {
             return ;
        }
		return this._innerSceneOption.IsOceanVisible;
	},
	set_isOceanVisible:function(bVisible)
	{
		if ((this._innerSceneOption == null)) 
        {
             return ;
        }
		this._innerSceneOption.IsOceanVisible = bVisible;
	}
	
};

SuperMap.Web.Realspace.SceneOption.registerClass('SuperMap.Web.Realspace.SceneOption', Sys.Component, Sys.IDisposable);
