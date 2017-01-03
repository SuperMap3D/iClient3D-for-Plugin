//========================================================================== 
// SuperMap Realspace �ͻ��˳��򣬰�Ȩ���У�������ͼ����ɷ����޹�˾��2000-2009�� 
// ������ֻ������Ч����Ȩ�����ʹ�á�δ����ɣ��������κ��ֶ�����ʹ�û򴫲��� 
// ���ߣ�			SuperMap WebClient Team 
// �޸ģ�	 
// �ļ�����			SuperMap.Web.Realspace.Atmosphere
// ���ܣ�			 ������
// ����޸�ʱ�䣺	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Atmosphere = function () {
    /// <summary>��������</summary>
    SuperMap.Web.Realspace.Atmosphere.initializeBase(this);
    this._innerAtmosphere = null;
};

SuperMap.Web.Realspace.Atmosphere.prototype = {
    /*
    *SwipeRegion����
    */
    get_swipeRegion: function () {
        ///<return type="SuperMap.Bounds">���ؾ�����Χ</value>
        if (this._innerAtmosphere != null) {
            area = this._innerAtmosphere.SwipeRegion;
            return new SuperMap.Bounds(area.Left, area.Bottom, area.Right, area.Top);
        }
    },
    set_swipeRegion: function (rec2d) {
        ///<summary>���þ�����Χ</summary>
        ///<param name="rec2d" type="SuperMap.Bounds">������Χ</param>
        if (this._innerAtmosphere != null) {
            var recInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(rec2d);
            this._innerAtmosphere.SwipeRegion = recInner;
        }
    },

    /*
    *�Ƿ�������Ч��
    */
    get_swipeEnabled: function () {
        ///<return type="Boolean">����ͼ���Ƿ�������Ч��</value>
        if (this._innerAtmosphere != null) {
            return this._innerAtmosphere.SwipeEnabled;
        }
    },
    set_swipeEnabled: function (isswipeEnabled) {
        ///<summary>����ͼ���Ƿ�������</summary>
        ///<param name="isswipeEnabled" type="Boolean">�Ƿ�������</param>
        if (this._innerAtmosphere != null) {
            this._innerAtmosphere.SwipeEnabled = isswipeEnabled;
        }
    }
};
SuperMap.Web.Realspace.Atmosphere.registerClass('SuperMap.Web.Realspace.Atmosphere', Sys.Component, Sys.IDisposable);