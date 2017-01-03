//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Stereo
// 功能：			  立体显示模块
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Stereo = function (scenecontrol)
{
  
  SuperMap.Web.Realspace.Stereo.initializeBase(this);

  this._innerStereo = scenecontrol._get_innerSceneControl().Scene.Stereo;
  
};

SuperMap.Web.Realspace.Stereo.prototype ={

	/*
	*属性:立体显示是否开启
	*/
	get_enable:function()
	{
		///<value type="boolean"></value>
		if ((this._innerStereo == null))
        {
             return ;
        }
		return this._innerStereo.Enable;
	},
	set_enable:function(enable)
	{
		if ((this._innerStereo == null)) 
        {
             return ;
        }
		this._innerStereo.Enable = enable;
	},
	
	/*
	*属性:立体显示模式
	*/
	get_stereoMode: function() 
    {
        ///<value type="SuperMap.Web.Realspace.StereoMode">立体显示模式</value>
		if ((this._innerStereo == null)) 
        {
             return ;
        }
        return this._innerStereo.StereoMode;
    },
    set_stereoMode: function(stereoMode) 
    {
		if ((this._innerStereo == null)) 
        {
             return ;
        }
        this._innerStereo.StereoMode = stereoMode;
    },
    
    /*
	*属性:视差模式
	*/
    get_parallaxMode: function() 
    {
        ///<value type="SuperMap.Web.Realspace.ParallaxMode">视差模式</value>
		if ((this._innerStereo == null)) 
        {
             return ;
        }
        return this._innerStereo.ParallaxMode;
    },
    set_parallaxMode: function(parallaxMode) 
    {
		if ((this._innerStereo == null)) 
        {
             return ;
        }
        this._innerStereo.ParallaxMode = parallaxMode;
    },
    
    
	/**
    *属性:立体显示时两摄像机的距离（正视差时为实际摄像机距离，负视差时为距离变化的参数）
    */
    get_cameraSeparation: function() {
        ///<value type="number"></value>
        if ((this._innerStereo == null)) 
        {
             return ;
        }
        return this._innerStereo.CameraSeparation;
    },
    set_cameraSeparation: function(cameraSeparation) {
        if ((this._innerStereo == null)) 
        {
             return ;
        }
        var n_cameraSeparation = parseFloat(cameraSeparation);
        if (isNaN(n_cameraSeparation)) {
            return;
        }
        this._innerStereo.CameraSeparation = n_cameraSeparation;
    },
    
    /**
    *属性:立体显示时两摄像机的偏转角度（用于正视差）
    */
    get_cameraAngle: function() {
        ///<value type="number"></value>
        if ((this._innerStereo == null)) 
        {
             return ;
        }
        return this._innerStereo.CameraAngle;
    },
    set_cameraAngle: function(cameraAngle) {
        if ((this._innerStereo == null)) 
        {
             return ;
        }
        var n_cameraAngle = parseFloat(cameraAngle);
        if (isNaN(n_cameraAngle)) {
            return;
        }
        this._innerStereo.CameraAngle = n_cameraAngle;
    }
};

SuperMap.Web.Realspace.Stereo.registerClass('SuperMap.Web.Realspace.Stereo', Sys.Component, Sys.IDisposable);
