//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Theme3DUnique 
// 功能：			单值专题图
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Theme3DUnique = function()
{

    SuperMap.Web.Realspace.Theme3DUnique.initializeBase(this);

    this._innerTheme3D = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateTheme3D(SuperMap.Web.Realspace.Theme3DType.THEME3DUNIQUE);

};

SuperMap.Web.Realspace.Theme3DUnique.prototype ={

    /*
    *属性：返回单值专题图子项个数
     */
    get_count:function()
    {
        if(this._innerTheme3D != null){
           return this._innerTheme3D.Count;
        }
    },
    /*
     *属性:制作单值专题图表达式
     */
    get_uniqueExpression:function()
    {
        if (this._innerTheme3D == null)
        {
            return ;
        }
        return this._innerTheme3D.UniqueExpression;
    },
    set_uniqueExpression:function(strName)
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        this._innerTheme3D.UniqueExpression = strName;
    },

    /*
     *属性：单值专题图默认风格
     */
    get_DefaultStyle: function()
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        return this._innerTheme3D.DefaultStyle;
    },
    set_DefaultStyle: function(style)
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        this._innerTheme3D.DefaultStyle = style._get_innerStyle3D();
    },

    /*
     *属性:专题图层的默认建模风格（包括底部高程、拉伸高度等）是否有效。默认值是false
     */
    get_isDefaultModellingStyleEnabled: function()
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        return this._innerTheme3D.IsDefaultModellingStyleEnabled;
    },
    set_isDefaultModellingStyleEnabled: function(enabled)
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        this._innerTheme3D.IsDefaultModellingStyleEnabled = enabled;
    },

    /*
    *方法：添加专题图子项
     */
    add:function(uniqueItem){
        if(SuperMap.Web.Realspace.Theme3DUniqueItem.isInstanceOfType(uniqueItem)){
            this._innerTheme3D.Add(uniqueItem._get_innerUniqueItem());
        }
    },

    /*
    *将给定的三维单值专题图子项插入到指定序号的位置
     */
    insert:function(index,uniqueItem){
        if(SuperMap.Web.Realspace.Theme3DUniqueItem.isInstanceOfType(uniqueItem)){
            this._innerTheme3D.Insert(index, uniqueItem._get_innerUniqueItem());
        }
    },

    /*
     *删除一个指定序号的三维单值专题图子项
     */
    remove:function(index){
        if(this._innerTheme3D!=null){
            this._innerTheme3D.Remove(index);
        }
    },

    /*
     *删除所有三维单值专题图子项
     */
    clear:function(){
        if(this._innerTheme3D!=null){
            this._innerTheme3D.Clear();
        }
    },

    /*
     *返回三维单值专题图中指定子项单值在当前序列中的序号
     */
    indexOf:function(strUnique){
        if(this._innerTheme3D!=null){
            this._innerTheme3D.IndexOf(strUnique);
        }
    },

    /*
     *对三维单值专题图中子项的风格进行反序显示
     */
    reverseStyle:function(){
        if(this._innerTheme3D!=null){
            this._innerTheme3D.ReverseStyle();
        }
    }
};

SuperMap.Web.Realspace.Theme3DUnique.registerClass('SuperMap.Web.Realspace.Theme3DUnique',  SuperMap.Web.Realspace.Theme3D, Sys.IDisposable);
