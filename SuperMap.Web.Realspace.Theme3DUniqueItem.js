//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Theme3DUniqueItem
// 功能：			  太阳
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Theme3DUniqueItem = function()
{

    SuperMap.Web.Realspace.Theme3DUniqueItem.initializeBase(this);

    this._innerTheme3DUniqueItem = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateTheme3DUniqueItem();

};

SuperMap.Web.Realspace.Theme3DUniqueItem.prototype ={

    /*
     *属性:单值专题图子项表达式名字
     */
    get_unique:function(){
        if(this._innerTheme3DUniqueItem != null){
            return this._innerTheme3DUniqueItem.Unique;
        }
    },
    set_unique:function(strUnique){
        if(this._innerTheme3DUniqueItem != null){
            this._innerTheme3DUniqueItem.Unique = strUnique;
        }
    },
    /*
     *属性:子项是否显示
     */
    get_isVisible:function()
    {
        ///<value type="boolean"></value>
        if ((this._innerTheme3DUniqueItem == null))
        {
            return ;
        }
        return this._innerTheme3DUniqueItem.IsVisible;
    },
    set_isVisible:function(isVisible)
    {
        if ((this._innerTheme3DUniqueItem == null))
        {
            return ;
        }
        this._innerTheme3DUniqueItem.IsVisible = isVisible;
    },

    /*
     *属性:专题图子项描述
     */
    get_caption: function()
    {
        ///<value type="Date">太阳照射的时间</value>
        if ((this._innerTheme3DUniqueItem != null))
        {
            return this._innerTheme3DUniqueItem.Caption;
        }
    },
    set_caption: function(strCaption)
    {
        if ((this._innerTheme3DUniqueItem != null))
        {
            this._innerTheme3DUniqueItem.Caption = strCaption;
        }
    },

    /*
     *属性:专题图子项风格
     */
    get_style3D: function()
    {
        if ((this._innerTheme3DUniqueItem != null))
        {
            return this._innerTheme3DUniqueItem.Style3D;
        }
    },
    set_style3D: function(style)
    {
        if ((this._innerTheme3DUniqueItem != null)&& SuperMap.Web.Core.Style3D.isInstanceOfType(style))
        {
            this._innerTheme3DUniqueItem.Style3D = style._get_innerStyle3D();;
        }
    },

    /*
     *属性:专题图子项是否使用图层风格
     */
    get_isModellingStyleEnabled:function(){
        if(this._innerTheme3DUniqueItem != null){
            return this._innerTheme3DUniqueItem.IsModellingStyleEnabled;
        }
    },
    set_isModellingStyleEnabled:function(enabled){
        if(this._innerTheme3DUniqueItem != null){
            this._innerTheme3DUniqueItem.IsModellingStyleEnabled = enabled;
        }
    },

    _get_innerUniqueItem: function() {

        if ( this._innerTheme3DUniqueItem == null) {
            return null;
        }
        return this._innerTheme3DUniqueItem;
    },

    _set_innerUniqueItem: function(innerUniqueItem) {
    if (innerUniqueItem == null) {
        return null;
    }
    this._innerTheme3DUniqueItem = innerUniqueItem;
   }
};

SuperMap.Web.Realspace.Theme3DUniqueItem.registerClass('SuperMap.Web.Realspace.Theme3DUniqueItem', Sys.Component, Sys.IDisposable);
