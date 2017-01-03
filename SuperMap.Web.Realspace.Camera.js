//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Camera 
// 功能：			  照相机类，设置场景中照相机的各参数
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Camera = function(dlongitude, dlatitude, daltitude) {
    ///<param name="dlongitude" type="number">相机经度</param>
    ///<param name="dlatitude" type="number">相机纬度</param>
    ///<param name="daltitude" type="number">相机高度</param>
    SuperMap.Web.Realspace.Camera.initializeBase(this);
    this._innerCamera = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateCamera();
    this._innerCamera.Latitude = -180;
    this._innerCamera.Longitude = -90;
    this._innerCamera.Altitude = -1;

    var n_dlongitude = parseFloat(dlongitude);
    var n_dlatitude = parseFloat(dlatitude);
    var n_daltitude = parseFloat(daltitude);
    if ((this._innerCamera != null)) 
    {
        if(!isNaN(n_dlongitude))
        {
            this._innerCamera.Longitude = n_dlongitude;
        }
        if (!isNaN(n_dlatitude)) 
        {
            this._innerCamera.Latitude = n_dlatitude;
        }
        if (!isNaN(n_daltitude)) 
        {
            this._innerCamera.Altitude = n_daltitude;
        }
    }
};

SuperMap.Web.Realspace.Camera.prototype ={	
	
	/*
	*innerCamera属性，不对外开放
	*/
	_get_innerCamera:function()
	{
		if(this._innerCamera != null)
		{
		    return this._innerCamera;
		}
		
	},
	_set_innerCamera:function(innerCamera)
	{
	    if(this._innerCamera != null)
		{
		    this._innerCamera = innerCamera;
		}
		
	},
	
	/*
	*altitude属性:相机高度
	*/
	get_altitude:function()
	{
		///<returns type="number">相机高度</returns>
		if(this._innerCamera != null)
		{
		    return this._innerCamera.Altitude;
		}
	},
	set_altitude:function(altitude)
	{
        if(this._innerCamera != null) {
            var n_daltitude = parseFloat(altitude);
            if (!isNaN(n_daltitude))
            {
                this._innerCamera.Altitude = n_daltitude;
            }
           
		}
	},
	
	/*
	*latitude属性:相机纬度
	*/
	get_latitude:function()
	{
		///<returns type="number">相机纬度</returns>
		if(this._innerCamera != null)
		{
		    return this._innerCamera.Latitude;
		}
	},
	set_latitude:function(latitude)
	{
		
		if(this._innerCamera != null) {
		    var n_dlatitude = parseFloat(latitude);
		    if (!isNaN(n_dlatitude))
            {
                this._innerCamera.Latitude = n_dlatitude;
            }

		    
		}
	},
	
	/*
	*longitude属性:相机经度
	*/
	get_longitude:function()
	{
		///<returns type="number">相机经度</returns>
		if(this._innerCamera != null)
		{
		   return this._innerCamera.Longitude;
		}
	},
	set_longitude:function(longitude)
	{
		
		if(this._innerCamera != null) {

		    var n_dlongitude = parseFloat(longitude);
		    if (!isNaN(n_dlongitude))
            {
                this._innerCamera.Longitude = n_dlongitude;
            }

		    
		}
	},
	
	/*
	*tilt属性:相机的仰（俯）角
	*/
	get_tilt:function()
	{
		///<returns type="number">相机的仰（俯）角</returns>
		if(this._innerCamera != null)
		{
		    return this._innerCamera.Tilt;
		}
	},
	set_tilt:function(tilt)
	{
		if(this._innerCamera != null) {
		    var n_dtilt = parseFloat(tilt);
		    if (!isNaN(n_dtilt))
            {
                this._innerCamera.Tilt = n_dtilt;
            }
        		
		    
		}
	},
	
	/*
	*heading属性:相机的方位角
	*/
	get_heading:function()
	{
		///<returns type="number">相机的方位角</returns>
		if(this._innerCamera != null)
		{
		    return this._innerCamera.Heading;
		}
	},
	set_heading:function(heading)
	{
		if(this._innerCamera != null) {
		    var n_dheading = parseFloat(heading);
		    if (!isNaN(n_dheading))
            {
                this._innerCamera.Heading = n_dheading;
            }
        
		    
		}
	},
	
	/*
	*altitudeMode属性:相机高度模式
	*/
	get_altitudeMode:function()
	{
		///<returns type="number">相机高度模式</returns>
		if(this._innerCamera != null)
		{
		    return this._innerCamera.AltitudeMode;
		}
	},
	set_altitudeMode:function(altitudeMode)
	{		
		if(this._innerCamera != null) {
		    var n_altitudeMode = parseInt(altitudeMode);
		    if (!isNaN(n_altitudeMode))
            {
                this._innerCamera.AltitudeMode = n_altitudeMode;
            }		    
		}
	},

	/*
	*验证相机的参数是否有效。
	*/
	isValid:function()
	{
		///<returns type="boolean">是否有效</returns>
		if(this._innerCamera != null)
		{
		    return this._innerCamera.IsValid;
		}
	}
	
};
SuperMap.Web.Realspace.Camera.registerClass('SuperMap.Web.Realspace.Camera', Sys.Component, Sys.IDisposable);
