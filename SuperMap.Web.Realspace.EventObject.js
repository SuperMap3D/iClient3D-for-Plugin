//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.EventObject.js
// 功能：			三维事件对象类库   
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.EventObject = function()
{
  
  SuperMap.Web.Realspace.EventObject.initializeBase(this);
  
  
  this._clientX = 0;
  
  this._clientY = 0;  
  
  this._altitude = 0;
  
  this._longitude = 0;
  
  this._latitude = 0;
  
  this._camera = null;
  
  this._flagType = 0;
  
  this._zDelta = 0;
  
  this._elementID = -1;
};

SuperMap.Web.Realspace.EventObject.prototype ={	
	
	/*
	*clientX属性
	*/
	get_clientX:function()
	{
		///<value type="number"></value>
		return this._clientX;
	},
	//注意在EventObject中所有的set函数都加上下划线，避免框架提出来
	_set_clientX:function(clientX)
	{
		this._clientX = clientX;
	},
	
	/*
	*clientY属性
	*/
	get_clientY:function()
	{
		///<value type="number"></value>
		return this._clientY;
	},
	_set_clientY:function(clientY)
	{
		this._clientY = clientY;
	},
	
	/*
	*altitude属性
	*/
	get_altitude:function()
	{
		///<value type="number"></value>
		return this._altitude;
	},
	_set_altitude:function(altitude)
	{
		this._altitude = altitude;
	},
	
	/*
	*latitude属性
	*/
	get_latitude:function()
	{
		///<value type="number"></value>
		return this._latitude;
	},
	_set_latitude:function(latitude)
	{
		this._latitude = latitude;
	},
	
	/*
	*longitude属性
	*/
	get_longitude:function()
	{
		///<value type="number"></value>
		return this._longitude;
	},
	_set_longitude:function(longitude)
	{
		this._longitude = longitude;
	},
	
	/*
	*flagType属性
	*/
	get_flagType:function()
	{
		///<value type="number"></value>
		return this._flagType;
	},
	_set_flagType:function(flagType)
	{
		this._flagType = flagType;
	},
	
	/*
	*camera属性
	*/
	get_camera:function()
	{
		///<value type="SuperMap.Web.Realspace.Camera"></value>
		return this._camera;
	},
	_set_camera:function(camera)
	{
		this._camera = camera;
	},
	
	/*
	*zDelta属性
	*/
	get_zDelta:function()
	{
		///<value type="number"></value>
		return this._zDelta;
	},
	_set_zDelta:function(zDelta)
	{
		this._zDelta = zDelta;
	}
	
	/*
	*elementID属性(暂时不实现)
	*/
// 	get_elementID:function()
// 	{
// 		///<value type="number"></value>
// 		return this._elementID;
// 	},
// 	_set_elementID:function(elementID)
// 	{
// 		this._elementID = elementID;
// 	}
	
	
};
SuperMap.Web.Realspace.EventObject.registerClass('SuperMap.Web.Realspace.EventObject', Sys.Component, Sys.IDisposable);
