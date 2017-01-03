//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.SRTheme3DUniqueItem
// 功能：			  太阳
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Theme3DGraphItem = function()
{

    SuperMap.Web.Realspace.Theme3DGraphItem.initializeBase(this);

    this._innerTheme3DItem = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateTheme3DGraphItem();

};

SuperMap.Web.Realspace.Theme3DGraphItem.prototype ={

    /*
     *属性:三维统计专题图子项的表达式
     */
    get_graphExpression:function(){
        if (this._innerTheme3DItem != null) {
            return this._innerTheme3DItem.GraphExpression;
        }
    },
    set_graphExpression:function(strExpression){
        if (this._innerTheme3DItem != null) {
            this._innerTheme3DItem.GraphExpression = strExpression;
        }
    },

    /*
     *属性:专题图子项描述
     */
    get_caption: function()
    {
        if ((this._innerTheme3DItem != null))
        {
            return this._innerTheme3DItem.Caption;
        }
    },
    set_caption: function(strCaption)
    {
        if ((this._innerTheme3DItem != null))
        {
            this._innerTheme3DItem.Caption = strCaption;
        }
    },

    /*
     *属性:统计三维统计专题图子项的显示风格
     */
    get_uniformStyle: function()
    {
        if ((this._innerTheme3DItem != null))
        {
            return this._innerTheme3DItem.UniformStyle;
        }
    },
    set_uniformStyle: function(style)
    {
        if ((this._innerTheme3DItem != null)&& SuperMap.Web.Core.Style3D.isInstanceOfType(style))
        {
            this._innerTheme3DItem.UniformStyle = style._get_innerStyle3D();;
        }
    },

    _get_innerGraphItem: function() {

        if ( this._innerTheme3DItem == null) {
            return null;
        }
        return this._innerTheme3DItem;
    },

    _set_innerGraphIem: function(innerItem) {
         if (innerItem == null) {
            return null;
        }
        this._innerTheme3DItem = innerItem;
    },

    /*
     *属性:设置内存专题图记录值
     */
    setMemoryDoubleValues:function(dValuesArray){
        if (this._innerTheme3DItem != null) {
            this._innerTheme3DItem.SetMemoryDoubleValues(dValuesArray);
        }
    },

    /*
     *属性:获取内存专题图记录值
     */
    getMemoryDoubleValues:function(){
        if (this._innerTheme3DItem != null) {
            return this._innerTheme3DItem.GetMemoryDoubleValues();
        }
    }
};

SuperMap.Web.Realspace.Theme3DGraphItem.registerClass('SuperMap.Web.Realspace.Theme3DGraphItem', Sys.Component, Sys.IDisposable);
