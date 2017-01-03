//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2014。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.LookAt 
// 功能：			  照相机类，设置场景中照相机的各参数
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.LookAt = function(dlongitude, dlatitude, dRange) {
    ///<param name="dlongitude" type="number">目标点经度</param>
    ///<param name="dlatitude" type="number">目标点纬度</param>
    ///<param name="dRange" type="number">距离目标点的距离</param>
    SuperMap.Web.Realspace.LookAt.initializeBase(this);
    this._innerLookAt = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateLookAt();
    this._innerLookAt.Latitude = -180;
    this._innerLookAt.Longitude = -90;
    this._innerLookAt.dRange = 100;

    var n_dlongitude = parseFloat(dlongitude);
    var n_dlatitude = parseFloat(dlatitude);
    var n_dRange = parseFloat(dRange);
    if ((this._innerLookAt != null)) 
    {
        if(!isNaN(n_dlongitude))
        {
            this._innerLookAt.Longitude = n_dlongitude;
        }
        if (!isNaN(n_dlatitude)) 
        {
            this._innerLookAt.Latitude = n_dlatitude;
        }
        if (!isNaN(n_dRange)) 
        {
            this._innerLookAt.Range = n_dRange;
        }
    }
};

SuperMap.Web.Realspace.LookAt.prototype ={	
	
	/*
	*innerLookAt属性，不对外开放
	*/
	_get_innerLookAt:function()
	{
		if(this._innerLookAt != null)
		{
		    return this._innerLookAt;
		}
		
	},
	_set_innerLookAt:function(innerLookAt)
	{
	    if(this._innerLookAt != null)
		{
		    this._innerLookAt = innerLookAt;
		}
		
	},
	
	/*
	*altitude属性:相机观察目标点的高度
	*/
	get_altitude:function()
	{
		///<returns type="number">目标点高度</returns>
		if(this._innerLookAt != null)
		{
		    return this._innerLookAt.Altitude;
		}
	},
	set_altitude:function(altitude)
	{
        if(this._innerLookAt != null) {
            var n_daltitude = parseFloat(altitude);
            if (!isNaN(n_daltitude))
            {
                this._innerLookAt.Altitude = n_daltitude;
            }
           
		}
	},
	
	/*
	*range:相机距离目标点的距离
	*/
	get_range:function()
	{
		///<returns type="number">相机距离目标点的距离</returns>
		if(this._innerLookAt != null)
		{
		    return this._innerLookAt.Range;
		}
	},
	set_range:function(range)
	{
        if(this._innerLookAt != null) {
            var n_dRange = parseFloat(range);
            if (!isNaN(n_dRange))
            {
                this._innerLookAt.Range = n_dRange;
            }
           
		}
	},
	
	/*
	*latitude属性:相机观察目标点纬度
	*/
	get_latitude:function()
	{
		///<returns type="number">目标点纬度</returns>
		if(this._innerLookAt != null)
		{
		    return this._innerLookAt.Latitude;
		}
	},
	set_latitude:function(latitude)
	{
		
		if(this._innerLookAt != null) {
		    var n_dlatitude = parseFloat(latitude);
		    if (!isNaN(n_dlatitude))
            {
                this._innerLookAt.Latitude = n_dlatitude;
            }

		    
		}
	},
	
	/*
	*longitude属性:相机所观察的目标点的经度
	*/
	get_longitude:function()
	{
		///<returns type="number">目标点经度</returns>
		if(this._innerLookAt != null)
		{
		   return this._innerLookAt.Longitude;
		}
	},
	set_longitude:function(longitude)
	{
		
		if(this._innerLookAt != null) {

		    var n_dlongitude = parseFloat(longitude);
		    if (!isNaN(n_dlongitude))
            {
                this._innerLookAt.Longitude = n_dlongitude;
            }

		    
		}
	},
	
	/*
	*tilt属性:相机的仰（俯）角
	*/
	get_tilt:function()
	{
		///<returns type="number">相机的仰（俯）角</returns>
		if(this._innerLookAt != null)
		{
		    return this._innerLookAt.Tilt;
		}
	},
	set_tilt:function(tilt)
	{
		if(this._innerLookAt != null) {
		    var n_dtilt = parseFloat(tilt);
		    if (!isNaN(n_dtilt))
            {
                this._innerLookAt.Tilt = n_dtilt;
            }
        		
		    
		}
	},
	
	/*
	*heading属性:相机的方位角
	*/
	get_heading:function()
	{
		///<returns type="number">相机的方位角</returns>
		if(this._innerLookAt != null)
		{
		    return this._innerLookAt.Heading;
		}
	},
	set_heading:function(heading)
	{
		if(this._innerLookAt != null) {
		    var n_dheading = parseFloat(heading);
		    if (!isNaN(n_dheading))
            {
                this._innerLookAt.Heading = n_dheading;
            }
        
		    
		}
	},
	
	/*
	*altitudeMode属性:相机高度模式
	*/
	get_altitudeMode:function()
	{
		///<returns type="number">相机高度模式</returns>
		if(this._innerLookAt != null)
		{
		    return this._innerLookAt.AltitudeMode;
		}
	},
	set_altitudeMode:function(altitudeMode)
	{		
		if(this._innerLookAt != null) {
		    var n_altitudeMode = parseInt(altitudeMode);
		    if (!isNaN(n_altitudeMode))
            {
                this._innerLookAt.AltitudeMode = n_altitudeMode;
            }		    
		}
	},

	/*
	*验证相机的参数是否有效。
	*/
	isValid:function()
	{
		///<returns type="boolean">是否有效</returns>
		if(this._innerLookAt != null)
		{
		    return this._innerLookAt.IsValid;
		}
	}
	
};
SuperMap.Web.Realspace.LookAt.registerClass('SuperMap.Web.Realspace.LookAt', Sys.Component, Sys.IDisposable);
