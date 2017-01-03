//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2014。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.FlyingOperator
// 功能：			 飞行操作类
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.FlyingOperator = function (scenecontrol)
{
	/// <summary>飞行操作对象</summary>
	SuperMap.Web.Realspace.FlyingOperator.initializeBase(this);
	this._innerFlyingOperator = scenecontrol._get_innerSceneControl().Scene.FlyingOperator;
};

SuperMap.Web.Realspace.FlyingOperator.prototype = {
    flyTo: function(camera, nMillSec, flyingMode) {
        /// <summary>飞行到指定的相机位置</summary>
        ///<param name="camera" type="SuperMap.Web.Realspace.Camera">相机参数</param> 		
        ///<param name="nMillSec" type="number" integer="true" optional="true">飞行时间</param> 
        ///<param name="flyingMode" type="SuperMap.Web.Realspace.FlyingMode" optional="true">飞行方式</param> 
        ///<returns type="void"></returns>
        if ((this._innerFlyingOperator == null)) {
            return;
        }
        if (SuperMap.Web.Realspace.Camera.isInstanceOfType(camera)) {
            if (camera.isValid()) {
                var innerCamera = camera._get_innerCamera();
                var n_nMillSec = parseFloat(nMillSec);
                var n_flyingMode = parseInt(flyingMode);
                if (!isNaN(n_nMillSec)) {
                    if (!isNaN(n_flyingMode)) {
                        this._innerFlyingOperator.FlyTo(innerCamera, n_nMillSec, n_flyingMode);
                    }
                    else {
                        this._innerFlyingOperator.FlyTo(innerCamera, n_nMillSec, SuperMap.Web.Realspace.FlyingMode.CAMERA_NORMAL);
                    }
                }
                else {
                    this._innerFlyingOperator.FlyTo(innerCamera, -1, SuperMap.Web.Realspace.FlyingMode.CAMERA_NORMAL);
                }
            }
        }
    },
	
	 flyToLookAt: function(lookat, nMillSec) {
        /// <summary>飞行到指定的相机位置</summary>
        ///<param name="LookAt" type="SuperMap.Web.Realspace.LookAt">相机参数</param> 		
        ///<param name="nMillSec" type="number" integer="true" optional="true">飞行时间</param>        
        ///<returns type="void"></returns>
        if ((this._innerFlyingOperator == null)) {
            return;
        }
        if (SuperMap.Web.Realspace.LookAt.isInstanceOfType(lookat)) {
            if (lookat.isValid()) {
                var innerLookAt = lookat._get_innerLookAt();
                var n_nMillSec = parseFloat(nMillSec);              
                if (!isNaN(n_nMillSec)) {                    
                    this._innerFlyingOperator.FlyToLookAt(innerLookAt, n_nMillSec);                   
                }
                else {
                    this._innerFlyingOperator.FlyToLookAt(innerLookAt, -1);
                }
            }
        }
    },

    play: function(geoline3d, speedRatio, relativeDistance) {
        /// <summary>沿线飞行</summary>
        ///<param name="geoline3d" type="SuperMap.Web.Core.GeoLine3D">三维线对象</param>
        ///<param name="speedRatio" type="number" integer="false" optional="true">飞行速度倍数</param>
        ///<param name="relativeDistance" type="number" integer="false" optional="true">飞行相对高度</param> 
        ///<returns type="void"></returns>
        if ((this._innerFlyingOperator == null)) {
            return;
        }
        var n_speedRatio = parseFloat(speedRatio);
        var n_relativeDistance = parseFloat(relativeDistance);
        if (isNaN(n_speedRatio) || isNaN(n_relativeDistance)) {
            n_speedRatio = 1.0;
            n_relativeDistance = 2000;
        }

        if (SuperMap.Web.Core.GeoLine3D.isInstanceOfType(geoline3d)) {
            if (geoline3d.isValid()) {
                var innergeoline3d = geoline3d._get_innerGeometry();
                if (innergeoline3d != null) {
                   this._innerFlyingOperator.Play(innergeoline3d, n_speedRatio, n_relativeDistance); 
                }
            }
        }
    },

    flyToBounds: function(rect2D, nMillSec) {
        /// <summary>飞行到指定的Bounds区域</summary>
        ///<param name="rect2D" type="SuperMap.Web.Core.Rectangle2D">指定的Bounds区域</param> 
        ///<param name="nMillSec" type="number" integer="true" optional="true">飞行时间</param> 
        ///<returns type="void"></returns>
        if ((this._innerFlyingOperator == null)) {
            return;
        }
        if (SuperMap.Bounds.isInstanceOfType(rect2D)) {
			/*
            if (rect2D.isEmpty()) {
                return;
            }
			*/
			if (rect2D.getSize().w == 0 && rect2D.getSize().h == 0){
				return;
			}
            innerRect2D = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(rect2D);
            var n_nMillSec = parseFloat(nMillSec);
            if (!isNaN(n_nMillSec)) {
                this._innerFlyingOperator.FlyToBounds(innerRect2D, nMillSec);
            }
            else {
                this._innerFlyingOperator.FlyToBounds(innerRect2D, 1);
            }
        }
    },

    /*
    *flyToGeometry:根据指定的目标对象和飞行时间进行飞行
     */
    flyToGeometry: function(geoObject, nMillSec, flyingMode) {
        /// <summary>根据指定的飞行模式和目标对象进行飞行</summary>
        ///<param name="geoObject" type="SuperMap.Web.Core.Geometry3D">几何对象参数</param> 		
        ///<param name="nMillSec" type="number" integer="true" optional="true">飞行时间</param> 
        ///<param name="flyingMode" type="SuperMap.Web.Realspace.FlyingMode" optional="true">飞行方式</param> 
        ///<returns type="void"></returns>
        if ((this._innerFlyingOperator == null)) {
            return;
        }
        if (SuperMap.Geometry.isInstanceOfType(geoObject)) {
            if (geoObject.isValid()) {
                var innerGeometry = geoObject._get_innerGeometry();
                var n_nMillSec = parseFloat(nMillSec);
                var n_flyingMode = parseInt(flyingMode);
                if (isNaN(n_nMillSec)) {
                    n_nMillSec = -1;
                }
                if (isNaN(n_flyingMode)) {
                    n_flyingMode = SuperMap.Web.Realspace.FlyingMode.MULTIPOINTFLY_NORMAL;
                }
                this._innerFlyingOperator.FlyToGeometry(innerGeometry, n_nMillSec, n_flyingMode);
            }
        }
    },

    /*
    *flyCircle:围绕指定地点旋转飞行模式，飞行过程中可以控制飞行的速度
     */
    flyCircle:function(geometry, speedRatio) {
        if ((this._innerFlyingOperator != null)) {
            var innerGeometry = geometry._get_innerGeometry();
            this._innerFlyingOperator.FlyCircle(innerGeometry,speedRatio);
        }
    }
};
SuperMap.Web.Realspace.FlyingOperator.registerClass('SuperMap.Web.Realspace.FlyingOperator', Sys.Component, Sys.IDisposable);
