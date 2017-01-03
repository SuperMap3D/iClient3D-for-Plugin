//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Sun
// 功能：			  太阳
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Sun = function(scenecontrol)
{
  
  SuperMap.Web.Realspace.Sun.initializeBase(this);

  this._innerSun = scenecontrol._get_innerSceneControl().Scene.Sun;
  
};

SuperMap.Web.Realspace.Sun.prototype ={

	/*
	*属性:是否开启显示
	*/
	get_isVisible:function()
	{
		///<value type="boolean"></value>
		if ((this._innerSun == null))
        {
             return ;
        }
		return this._innerSun.IsVisible;
	},
	set_isVisible:function(isVisible)
	{
		if ((this._innerSun == null)) 
        {
             return ;
        }
		this._innerSun.IsVisible = isVisible;
	},
	
	/*
	*属性:太阳照射的时间
	*/
	get_dateTime: function() 
    {
        ///<value type="Date">太阳照射的时间</value>
		if ((this._innerSun == null)) 
        {
             return ;
        }
        return SuperMap.Web.Realspace.Utility.convertDoubleToDate(this._innerSun.DateTime);
    },
    set_dateTime: function(dateTime) 
    {
		if ((this._innerSun == null)) 
        {
             return ;
        }
        this._innerSun.DateTime = SuperMap.Web.Realspace.Utility.convertDateToDouble(dateTime);
    },
    
    /*
	*属性:计算太阳位置时所用的时区偏移
	*/
    get_baseUtcOffset: function() 
    {
        ///<value type="number">时区偏移 范围-720—720</value>
		if ((this._innerSun == null)) 
        {
             return ;
        }
        return this._innerSun.BaseUtcOffset;
    },
    set_baseUtcOffset: function(baseUtcOffset) 
    {
		if ((this._innerSun == null)) 
        {
             return ;
        }
        this._innerSun.BaseUtcOffset = baseUtcOffset;
    },
    /*
	*属性:获取/设置时间滑条的可见性
	*/
    get_timeSliderVisible: function () {
        ///<returns type="Boolean">时间滑条是否可见</returns>
        if ((this._innerSun == null)) {
            return;
        }
        return this._innerSun.TimeSliderVisible;
    },
    set_timeSliderVisible: function (timeSliderVisible) {
        ///<param name="timeSliderVisible" type="Boolean">是否可见</param>
        if ((this._innerSun == null)) {
            return;
        }
        this._innerSun.TimeSliderVisible = timeSliderVisible;
    },
    /*
	*方法:通过滑块改变时间
	*/
    updateTimeBySlider: function (value) {
        ///<param name="value" type="Number"></param>
        if ((this._innerSun == null)) {
            return;
        }
        this._innerSun.UpdateTimeBySlider(value);
    }
};

SuperMap.Web.Realspace.Sun.registerClass('SuperMap.Web.Realspace.Sun', Sys.Component, Sys.IDisposable);
