//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Animation
// 功能：			动画状态信息
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Animation  = function() {
    ///<returns type="SuperMap.Web.Realspace.Animation"></returns>
    SuperMap.Web.Realspace.Animation.initializeBase(this);

    this._innerAnimation = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateAnimation();	
};
SuperMap.Web.Realspace.Animation.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerAnimation = null;
    },
    /*
    *innerAnimation对象，不对外开放
    */
    _get_innerAnimation: function() {

        if ( this._innerAnimation == null) {
            return null;
        }
        return this._innerAnimation;
    },
    _set_innerAnimation: function(innerAnimation) {
        if (innerAnimation == null) {
            return null;
        }
        this._innerAnimation = innerAnimation;
    },

    get_length: function() {
        ///<value type="Number">动画长度</value>
        if ( this._innerAnimation == null) {
            return null;
        }
        return this._innerAnimation.Length;
    },
    
    get_currentTime: function() {
        ///<value type="Number">动画当前时间</value>
        if ( this._innerAnimation == null) {
            return null;
        }
        return this._innerAnimation.CurrentTime;
    },
    set_currentTime: function(currentTime) {
        if ( this._innerAnimation == null) {
            return;
        }
        var n_currentTime = parseFloat(currentTime);
        if (!isNaN(n_currentTime)) {
            this._innerAnimation.CurrentTime = n_currentTime;
        }
    },
    
    get_startTime: function() {
        ///<value type="Number">动画开始时间</value>
        if ( this._innerAnimation == null) {
            return null;
        }
        return this._innerAnimation.StartTime;
    },
    set_startTime: function(startTime) {
        if ( this._innerAnimation == null) {
            return;
        }
        var n_startTime = parseFloat(startTime);
        if (!isNaN(n_startTime)) {
            this._innerAnimation.StartTime = n_startTime;
        }
    },
    
    get_endTime: function() {
        ///<value type="Number">动画结束时间</value>
        if ( this._innerAnimation == null) {
            return null;
        }
        return this._innerAnimation.EndTime;
    },
    set_endTime: function(endTime) {
        if ( this._innerAnimation == null) {
            return;
        }
        var n_endTime = parseFloat(endTime);
        if (!isNaN(n_endTime)) {
            this._innerAnimation.EndTime = n_endTime;
        }
    },
    
    get_isEnabled: function() {
        ///<value type="Boolean">是否可用</value>
        return this._innerAnimation.IsEnabled;
    },
    set_isEnabled: function(bEnabled) {
        this._innerAnimation.IsEnabled = bEnabled;
    },
    
    get_isAutoUpdated: function() {
        ///<value type="Boolean">是否自动更新</value>
        return this._innerAnimation.IsAutoUpdated;
    },
    set_isAutoUpdated: function(bUpdated) {
        this._innerAnimation.IsAutoUpdated = bUpdated;
    }
};
SuperMap.Web.Realspace.Animation.registerClass('SuperMap.Web.Realspace.Animation',Sys.Component);