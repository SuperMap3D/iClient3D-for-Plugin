//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.ParticleSystem
// 功能：			粒子系统
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.ParticleSystem = function(innerParticleSystem)
{
 
  SuperMap.Web.Realspace.ParticleSystem.initializeBase(this);

  this._innerParticleSystem = innerParticleSystem;

};
SuperMap.Web.Realspace.ParticleSystem.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerParticleSystem = null;
    },
    /*
    *innerParticleSystem对象，不对外开放
    */
    _get_innerParticleSystem: function() {

        if (this._innerParticleSystem == null) {
            return null;
        }
        return this._innerParticleSystem;
    },
    _set_innerParticleSystem: function(innerParticleSystem) {
        if (innerParticleSystem == null) {
            return null;
        }
        this._innerParticleSystem = innerParticleSystem;
    },
    
    get_localCenterPos: function() {
        ///<value type="SuperMap.Web.Core.Point3D">粒子系统对象的相对位置</value>
        if (this._innerParticleSystem == null) {
            return null;
        }
        var point3D = SuperMap.Web.Core.Conversion._ConvertSRObject2Object(this._innerParticleSystem.LocalCenterPos,"Point3D");
        return point3D;
    },
    set_localCenterPos: function(point3D) 
    {
        if (!SuperMap.Web.Core.Point3D.isInstanceOfType(point3D) || this._innerParticleSystem == null) 
        {
            return;
        }
        innerPoint3d = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(point3D);
        this._innerParticleSystem.LocalCenterPos = innerPoint3d;
    },
    
    get_particleWidth: function() {
        ///<value type="Number">粒子系统对象中每个粒子的宽度</value>
        if (this._innerParticleSystem == null) {
            return null;
        }
        return this._innerParticleSystem.ParticleWidth;
    },
    set_particleWidth: function(particleWidth) {
        if (this._innerParticleSystem == null) {
            return;
        }
        var n_particleWidth = parseFloat(particleWidth);
        if (!isNaN(n_particleWidth)) {
            this._innerParticleSystem.ParticleWidth = n_particleWidth;
        }
    },
    
    get_particleHeight: function() {
        ///<value type="Number">粒子系统对象中每个粒子的高度</value>
        if (this._innerParticleSystem == null) {
            return null;
        }
        return this._innerParticleSystem.ParticleHeight;
    },
    set_particleHeight: function(particleHeight) {
        if (this._innerParticleSystem == null) {
            return;
        }
        var n_particleHeight = parseFloat(particleHeight);
        if (!isNaN(n_particleHeight)) {
            this._innerParticleSystem.ParticleHeight = n_particleHeight;
        }
    },
    
    get_particleLifeTime: function() {
        ///<value type="Number">粒子系统对象中每个粒子的生命周期，即粒子从产生到消亡的时间长度，单位：毫秒。</value>
        if (this._innerParticleSystem == null) {
            return null;
        }
        return this._innerParticleSystem.ParticleLifeTime;
    },
    set_particleLifeTime: function(particleLifeTime) {
        if (this._innerParticleSystem == null) {
            return;
        }
        var n_particleLifeTime = parseFloat(particleLifeTime);
        if (!isNaN(n_particleLifeTime)) {
            this._innerParticleSystem.ParticleLifeTime = n_particleLifeTime;
        }
    },
    
    get_particleCountPerSecond: function() {
        ///<value type="Number">粒子系统对象每秒产生的粒子个数</value>
        if (this._innerParticleSystem == null) {
            return null;
        }
        return this._innerParticleSystem.ParticleCountPerSecond;
    },
    set_particleCountPerSecond: function(particleCountPerSecond) {
        if (this._innerParticleSystem == null) {
            return;
        }
        var n_particleCountPerSecond = parseInt(particleCountPerSecond);
        if (!isNaN(n_particleCountPerSecond)) {
            this._innerParticleSystem.ParticleCountPerSecond = n_particleCountPerSecond;
        }
    },
    
    get_colorRangeStart: function() {
        ///<value type="SuperMap.Web.Core.Color">粒子系统对象中每个粒子的起始颜色值</value>
        if (this._innerParticleSystem == null) {
            return null;
        }
        var colorRangeStart = new SuperMap.Web.Core.Color();
        colorRangeStart.fromLongABGR(this._innerParticleSystem.ColorRangeStart);
        return colorRangeStart;
    },
    set_colorRangeStart: function(colorRangeStart) {
        if (this._innerParticleSystem == null) {
            return;
        }
        if (SuperMap.Web.Core.Color.isInstanceOfType(colorRangeStart)) {
            this._innerParticleSystem.ColorRangeStart = colorRangeStart.toLongABGR();
        }
        else if (!isNaN(parseFloat(colorRangeStart))) {
            this._innerParticleSystem.ColorRangeStart = parseFloat(colorRangeStart);
        }
    },
    
    get_colorRangeEnd: function() {
        ///<value type="SuperMap.Web.Core.Color">粒子系统对象中每个粒子的终止颜色值</value>
        if (this._innerParticleSystem == null) {
            return null;
        }
        var colorRangeEnd = new SuperMap.Web.Core.Color();
        colorRangeEnd.fromLongABGR(this._innerParticleSystem.ColorRangeEnd);
        return colorRangeEnd;
    },
    set_colorRangeEnd: function(colorRangeEnd) {
        if (this._innerParticleSystem == null) {
            return;
        }
        if (SuperMap.Web.Core.Color.isInstanceOfType(colorRangeEnd)) {
            this._innerParticleSystem.ColorRangeEnd = colorRangeEnd.toLongABGR();
        }
        else if (!isNaN(parseFloat(colorRangeEnd))) {
            this._innerParticleSystem.ColorRangeEnd = parseFloat(colorRangeEnd);
        }
    },
    
    get_texturePath: function() {
        ///<value type="String">粒子系统对象中粒子纹理贴图的路径</value>
        if (this._innerParticleSystem == null) {
            return null;
        }
        return this._innerParticleSystem.TexturePath;
    },
    set_texturePath: function(texturePath) {
        if (this._innerParticleSystem == null) {
            return;
        }
        if (typeof (texturePath) == "string") {
            this._innerParticleSystem.TexturePath = texturePath;
        }
    },
    
    get_colorRangeImagePath: function() {
        ///<value type="String">粒子系统对象中用于设置粒子颜色渐变的图像的路径</value>
        if (this._innerParticleSystem == null) {
            return null;
        }
        return this._innerParticleSystem.ColorRangeImagePath;
    },
    set_colorRangeImagePath: function(colorRangeImagePath) {
        if (this._innerParticleSystem == null) {
            return;
        }
        if (typeof (colorRangeImagePath) == "string") {
            this._innerParticleSystem.ColorRangeImagePath = colorRangeImagePath;
        }
    }
};
SuperMap.Web.Realspace.ParticleSystem.registerClass('SuperMap.Web.Realspace.ParticleSystem',Sys.Component);