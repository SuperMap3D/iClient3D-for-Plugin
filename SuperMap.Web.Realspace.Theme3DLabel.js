//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Theme3DLabel 
// 功能：			单值专题图
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Theme3DLabel = function()
{

    SuperMap.Web.Realspace.Theme3DLabel.initializeBase(this);

    this._innerTheme3D = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateTheme3D(SuperMap.Web.Realspace.Theme3DType.THEME3DLABEL);

};

SuperMap.Web.Realspace.Theme3DLabel.prototype ={

    /*
     *属性:制作标签专题图表达式
     */
    get_labelExpression: function ()
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        return this._innerTheme3D.LabelExpression;
    },
    set_labelExpression: function (strName)
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        this._innerTheme3D.LabelExpression = strName;
    },

    /*
     *属性：标签专题图文本风格
     */
    get_uniformStyle: function ()
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        return this._innerTheme3D.DefaultStyle;
    },
    set_uniformStyle: function (style)
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        this._innerTheme3D.UniformStyle = style._get_innerTextStyle3D();
    },

    /*
     *属性:标签专题图显示精度
     */
    get_numericPrecision: function ()
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        return this._innerTheme3D.NumericPrecision;
    },
    set_numericPrecision: function (numericPrecision)
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        this._innerTheme3D.NumericPrecision = numericPrecision;
    }
};

SuperMap.Web.Realspace.Theme3DLabel.registerClass('SuperMap.Web.Realspace.Theme3DLabel', SuperMap.Web.Realspace.Theme3D, Sys.IDisposable);
