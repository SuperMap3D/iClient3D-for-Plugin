//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.ProjectionImage
// 功能：			投影图片分析
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.ProjectionImage  = function(scene) {
    ///<param name="scene" type="SuperMap.Web.Realspace.Scene">场景对象</param>
    ///<returns type="SuperMap.Web.Realspace.ProjectionImage"></returns>
    SuperMap.Web.Realspace.ProjectionImage.initializeBase(this);

    this._innerProjectionImage = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateProjectionImage(scene._get_innerScene());
};
SuperMap.Web.Realspace.ProjectionImage.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerProjectionImage = null;
    },

    /**
    *位置信息
    */
    get_position: function() {
        ///<returns type="SuperMap.Web.Core.Point3D">位置信息</returns>
        if ( this._innerProjectionImage == null) {
            return null;
        }
        var position = this._innerProjectionImage.Position;
        return new SuperMap.Web.Core.Point3D(position.X,position.Y,position.Z);
    },

    set_position: function(position) {
        ///<param name="position" type="SuperMap.Web.Core.Point3D">位置信息</param>
        if (SuperMap.Web.Core.Point3D.isInstanceOfType(position))
        {
            this._innerProjectionImage.Position = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(position);
        }
    },

    /**
    *投影仪方位角
    */
    get_heading: function() {
        ///<returns type="Number">投影仪方位角</returns>
        if ( this._innerProjectionImage == null) {
            return null;
        }

        return this._innerProjectionImage.Heading;;
    },

    set_heading: function(value) {
        ///<param name="value" type="Number">投影仪方位角</param>
        if ( this._innerProjectionImage == null) {
            return;
        }
        this._innerProjectionImage.Heading = value;
    },

    /**
    *投影仪俯仰角
    */
    get_pitch: function() {
        ///<returns type="Number">投影仪俯仰角</returns>
        if ( this._innerProjectionImage == null) {
            return null;
        }

        return this._innerProjectionImage.Pitch;;
    },

    set_pitch: function(value) {
        ///<param name="value" type="Number">投影仪俯仰角</param>
        if ( this._innerProjectionImage == null) {
            return;
        }
        this._innerProjectionImage.Pitch = value;
    },

    /**
    *投影仪水平视角范围
    */
    get_horizontalFov: function() {
        ///<returns type="Number">投影仪水平视角范围</returns>
        if ( this._innerProjectionImage == null) {
            return null;
        }

        return this._innerProjectionImage.HorizontalFov;;
    },

    set_horizontalFov: function(value) {
        ///<param name="value" type="Number">投影仪水平视角范围</param>
        if ( this._innerProjectionImage == null) {
            return;
        }
        this._innerProjectionImage.HorizontalFov = value;
    },

    /**
    *投影仪垂直视角范围
    */
    get_verticalFov: function() {
        ///<returns type="Number">投影仪垂直视角范围</returns>
        if ( this._innerProjectionImage == null) {
            return null;
        }

        return this._innerProjectionImage.VerticalFov;;
    },

    set_verticalFov: function(value) {
        ///<param name="value" type="Number">投影仪垂直视角范围</param>
        if ( this._innerProjectionImage == null) {
            return;
        }
        this._innerProjectionImage.VerticalFov = value;
    },

    /**
    *提示线的可见性
    */
    get_hintLineVisible: function() {
        ///<returns type="Boolean">投影仪垂直视角范围</returns>
        if ( this._innerProjectionImage == null) {
            return null;
        }

        return this._innerProjectionImage.HintLineVisible;;
    },

    set_hintLineVisible: function(visible) {
        ///<param name="visible" type="Boolean">提示线是否可见</param>
        if ( this._innerProjectionImage == null) {
            return;
        }
        this._innerProjectionImage.HintLineVisible = visible;
    },

    /**
    *提示线长度
    */
    get_hintLineLength: function() {
        ///<returns type="Number">提示线长度</returns>
        if ( this._innerProjectionImage == null) {
            return null;
        }

        return this._innerProjectionImage.HintLineLength;;
    },

    set_hintLineLength: function(value) {
        ///<param name="value" type="Number">提示线长度</param>
        if ( this._innerProjectionImage == null) {
            return;
        }
        this._innerProjectionImage.HintLineLength = value;
    },

    /**
    *通过目标点计算方向角和俯仰角
    */
    setDirectionByPoint: function(point) {
        ///<param name="point" type="SuperMap.Web.Core.Point3D">点</param>
        if ( this._innerProjectionImage == null) {
            return;
        }

        if (SuperMap.Web.Core.Point3D.isInstanceOfType(point))
        {
            this._innerProjectionImage.SetDirectionByPoint(SuperMap.Web.Core.Conversion._ConvertObject2SRObject(point));
        }
    },

    /**
    *设置图片对象
    */
    setImage: function(url) {
        ///<param name="url" type="String">图片url</param>
        if ( this._innerProjectionImage == null) {
            return;
        }
        this._innerProjectionImage.SetImage(url);
    },

    /**
    *定位到拍摄位置
    */
    locateToShootingPosition: function() {
        if ( this._innerProjectionImage == null) {
            return;
        }
        this._innerProjectionImage.LocateToShootingPosition();
    },

    /**
    *执行分析
    */
    build: function() {
        if ( this._innerProjectionImage == null) {
            return;
        }
        this._innerProjectionImage.Build();
    },

    /**
    *清除
    */
    clear: function() {
        if ( this._innerProjectionImage == null) {
            return;
        }
        this._innerProjectionImage.Clear();
    }
};
SuperMap.Web.Realspace.ProjectionImage.registerClass('SuperMap.Web.Realspace.ProjectionImage',Sys.Component);
