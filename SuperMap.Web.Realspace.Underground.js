//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Underground
// 功能：			 地下的球体类
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Underground = function()
{
	/// <summary>地下的球体对象</summary>
	SuperMap.Web.Realspace.Underground.initializeBase(this);
	this._innerUnderground =  null;
};

SuperMap.Web.Realspace.Underground.prototype = {
	
	dispose: function() {
     ///<returns type="void">析构函数</returns>
     this._innerUnderground = null;
    },

    get_isVisible: function() 
    {
        /// <summary>获取地下是否可见</summary>
        ///<value type="boolean"></value>
        if ((this._innerUnderground == null)) 
        {
            return;
        }
        return this._innerUnderground.IsVisible;
    },
    set_isVisible: function(visible) 
    {
        if (typeof (visible) != "boolean" || (this._innerUnderground == null)) 
        {
            return;
        }
        this._innerUnderground.IsVisible = visible;
    },
    
    get_depth: function() 
    {
        /// <summary>获取地下是深度</summary>
        ///<value type="number"></value>
        if ((this._innerUnderground == null)) 
        {
            return;
        }
        return this._innerUnderground.Depth;
    },
    set_depth: function(depth) 
    {
        if ((this._innerUnderground == null)) 
        {
            return;
        }
        var n_depth = parseFloat(depth);
        if (!isNaN(n_depth)) {
            this._innerUnderground.Depth = n_depth;
        }
    }
};
SuperMap.Web.Realspace.Underground.registerClass('SuperMap.Web.Realspace.Underground', Sys.Component, Sys.IDisposable);
