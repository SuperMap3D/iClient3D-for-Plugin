//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Theme3DRangeItem
// 功能：			  太阳
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Theme3DRangeItem = function()
{

    SuperMap.Web.Realspace.Theme3DRangeItem.initializeBase(this);

    this._innerTheme3DRangeItem = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateTheme3DRangeItem();

};

SuperMap.Web.Realspace.Theme3DRangeItem.prototype ={

    /*
     *属性:三维分段专题图子项的起始值
     */
    get_start:function(){
        if(this._innerTheme3DRangeItem != null){
            return this._innerTheme3DRangeItem.Start;
        }
    },
    set_start:function(dStart){
        if(this._innerTheme3DRangeItem != null){
            this._innerTheme3DRangeItem.Start = dStart;
        }
    },

    /*
     *属性:三维分段专题图子项的终止值
     */
    get_end:function(){
        if(this._innerTheme3DRangeItem != null){
            return this._innerTheme3DRangeItem.End;
        }
    },
    set_end:function(dEnd){
        if(this._innerTheme3DRangeItem != null){
            this._innerTheme3DRangeItem.End = dEnd;
        }
    },
    /*
     *属性:子项是否显示
     */
    get_isVisible:function()
    {
        ///<value type="boolean"></value>
        if ((this._innerTheme3DRangeItem == null))
        {
            return ;
        }
        return this._innerTheme3DRangeItem.IsVisible;
    },
    set_isVisible:function(isVisible)
    {
        if ((this._innerTheme3DRangeItem == null))
        {
            return ;
        }
        this._innerTheme3DRangeItem.IsVisible = isVisible;
    },

    /*
     *属性:专题图子项描述
     */
    get_caption: function()
    {
        ///<value type="Date">太阳照射的时间</value>
        if ((this._innerTheme3DRangeItem != null))
        {
            return this._innerTheme3DRangeItem.Caption;
        }
    },
    set_caption: function(strCaption)
    {
        if ((this._innerTheme3DRangeItem != null))
        {
            this._innerTheme3DRangeItem.Caption = strCaption;
        }
    },

    /*
     *属性:专题图子项风格
     */
    get_style3D: function()
    {
        if ((this._innerTheme3DRangeItem != null))
        {
            return this._innerTheme3DRangeItem.Style3D;
        }
    },
    set_style3D: function(style)
    {
        if ((this._innerTheme3DRangeItem != null)&& SuperMap.Web.Core.Style3D.isInstanceOfType(style))
        {
            this._innerTheme3DRangeItem.Style3D = style._get_innerStyle3D();;
        }
    },

    /*
     *属性:专题图子项是否使用图层风格
     */
    get_isModellingStyleEnabled:function(){
        if(this._innerTheme3DRangeItem != null){
            return this._innerTheme3DRangeItem.IsModellingStyleEnabled;
        }
    },
    set_isModellingStyleEnabled:function(enabled){
        if(this._innerTheme3DRangeItem != null){
            this._innerTheme3DRangeItem.IsModellingStyleEnabled = enabled;
        }
    },

    _get_innerRangeItem: function() {

        if ( this._innerTheme3DRangeItem == null) {
            return null;
        }
        return this._innerTheme3DRangeItem;
    },

    _set_innerRangeItem: function(innerRangeItem) {
    if (innerUniqueItem == null) {
        return null;
    }
    this._innerTheme3DRangeItem = innerRangeItem;
   }
};

SuperMap.Web.Realspace.Theme3DRangeItem.registerClass('SuperMap.Web.Realspace.Theme3DRangeItem', Sys.Component, Sys.IDisposable);
