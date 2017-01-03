//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.Splitter
// 功能：			 场景分隔条(或拆分条)类
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Splitter = function () {
    /// <summary>分隔条对象</summary>
    SuperMap.Web.Realspace.Splitter.initializeBase(this);
    this._innerSplitter = null;
};

SuperMap.Web.Realspace.Splitter.prototype = {
    /*
    *IsVisible属性
    */
    get_isVisible: function () {
        ///<return type="Boolean">返回是否可见</value>
        if (this._innerSplitter != null) {
            return this._innerSplitter.IsVisible;
        }
    },
    set_isVisible: function (isVisible) {
        ///<summary>设置是否可见</summary>
        ///<param name="isVisible" type="Boolean"></param>
        if (this._innerSplitter != null) {
            this._innerSplitter.IsVisible = isVisible;
        }
    },

    /*
    *SplitRatio 返回/设置分隔比率
    */
    get_splitRatio: function () {
        ///<return type="Number">返回分隔比率</value>
        if (this._innerSplitter != null) {
            return this._innerSplitter.SplitRatio;
        }
    },
    set_splitRatio: function (nvalue) {
        ///<param name="nvalue" type="Number">分隔比率</param>
        if (this._innerSplitter != null) {
            this._innerSplitter.SplitRatio = nvalue;
        }
    },
    /*
    *SplitterOrientation 返回/设置分隔条方向
    */
    get_splitterOrientation: function () {
        ///<return type="SuperMap.Web.Realspace.SplitterOrientation">分隔条方向</value>
        if (this._innerSplitter != null) {
            return this._innerSplitter.SplitterOrientation;
        }
    },
    set_splitterOrientation: function (value) {
        ///<param name="value" type="SuperMap.Web.Realspace.SplitterOrientation">分隔条方向</param>
        if (this._innerSplitter != null) {
            this._innerSplitter.SplitterOrientation = value;
        }
    },

    addExploreEvent: function(obj, name, func){
        if (obj.attachEvent) {
            obj.attachEvent("on"+name, func);
        } else {
            obj.addEventListener(name, func, false);
        }
    },
    /*
    *addEvent 增加事件监听
    */
    addEvent: function(eventName, handler) {
        ///<summary>添加事件监听</summary>
        ///<param name="eventName" type="String">事件名称</param>
        ///<param name="handler" type="Function">处理函数</param>
        if (this._innerSplitter != null) {
            this._innerSplitter.CallBack();
        }
        this.addExploreEvent(this._innerSplitter, eventName, handler);
    }
};
SuperMap.Web.Realspace.Splitter.registerClass('SuperMap.Web.Realspace.Splitter', Sys.Component, Sys.IDisposable);
