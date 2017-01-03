//==========================================================================
// SuperMap Realspace �ͻ��˳��򣬰�Ȩ���У�������ͼ����ɷ����޹�˾��2000-2009��
// ������ֻ������Ч����Ȩ�����ʹ�á�δ����ɣ��������κ��ֶ�����ʹ�û򴫲���
// ���ߣ�			SuperMap WebClient Team
// �޸ģ�
// �ļ�����			SuperMap.Web.Realspace.Splitter
// ���ܣ�			 �����ָ���(������)��
// ����޸�ʱ�䣺
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Splitter = function () {
    /// <summary>�ָ�������</summary>
    SuperMap.Web.Realspace.Splitter.initializeBase(this);
    this._innerSplitter = null;
};

SuperMap.Web.Realspace.Splitter.prototype = {
    /*
    *IsVisible����
    */
    get_isVisible: function () {
        ///<return type="Boolean">�����Ƿ�ɼ�</value>
        if (this._innerSplitter != null) {
            return this._innerSplitter.IsVisible;
        }
    },
    set_isVisible: function (isVisible) {
        ///<summary>�����Ƿ�ɼ�</summary>
        ///<param name="isVisible" type="Boolean"></param>
        if (this._innerSplitter != null) {
            this._innerSplitter.IsVisible = isVisible;
        }
    },

    /*
    *SplitRatio ����/���÷ָ�����
    */
    get_splitRatio: function () {
        ///<return type="Number">���طָ�����</value>
        if (this._innerSplitter != null) {
            return this._innerSplitter.SplitRatio;
        }
    },
    set_splitRatio: function (nvalue) {
        ///<param name="nvalue" type="Number">�ָ�����</param>
        if (this._innerSplitter != null) {
            this._innerSplitter.SplitRatio = nvalue;
        }
    },
    /*
    *SplitterOrientation ����/���÷ָ�������
    */
    get_splitterOrientation: function () {
        ///<return type="SuperMap.Web.Realspace.SplitterOrientation">�ָ�������</value>
        if (this._innerSplitter != null) {
            return this._innerSplitter.SplitterOrientation;
        }
    },
    set_splitterOrientation: function (value) {
        ///<param name="value" type="SuperMap.Web.Realspace.SplitterOrientation">�ָ�������</param>
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
    *addEvent �����¼�����
    */
    addEvent: function(eventName, handler) {
        ///<summary>����¼�����</summary>
        ///<param name="eventName" type="String">�¼�����</param>
        ///<param name="handler" type="Function">������</param>
        if (this._innerSplitter != null) {
            this._innerSplitter.CallBack();
        }
        this.addExploreEvent(this._innerSplitter, eventName, handler);
    }
};
SuperMap.Web.Realspace.Splitter.registerClass('SuperMap.Web.Realspace.Splitter', Sys.Component, Sys.IDisposable);
