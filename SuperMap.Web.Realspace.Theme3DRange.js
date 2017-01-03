//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Theme3DRange
// 功能：			分段专题图
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Theme3DRange = function()
{

    SuperMap.Web.Realspace.Theme3DRange.initializeBase(this);

    this._innerTheme3D = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateTheme3D(SuperMap.Web.Realspace.Theme3DType.THEME3DRANGE);

};

SuperMap.Web.Realspace.Theme3DRange.prototype ={

    /*
    *属性：三维分段专题图中分段的个数
     */
    get_count:function()
    {
        if(this._innerTheme3D != null){
           return this._innerTheme3D.Count;
        }
    },
    /*
     *属性:三维分段字段表达式
     */
    get_rangeExpression:function()
    {
        if (this._innerTheme3D == null)
        {
            return ;
        }
        return this._innerTheme3D.RangeExpression;
    },
    set_rangeExpression:function(strName)
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        this._innerTheme3D.RangeExpression = strName;
    },

    /*
     *属性：当前三维分段模式
     */
    get_rangeMode: function()
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        return this._innerTheme3D.RangeMode;
    },

    get_Item:function(nIndex){
        if(this._innerTheme3D != null){
            return this._innerTheme3D.get_Item(nIndex);
        }
    },

    /*
     *维分段专题图中指定分段字段值在当前分段序列中的序号
     */
    indexOf:function(dValue){
        if(this._innerTheme3D != null){
            this._innerTheme3D.IndexOf(dValue);
        }
    },
    /*
    *方法：把一个三维分段专题图子项添加到分段列表的开头
     */
    addToHead:function(rangeItem){
        if(SuperMap.Web.Realspace.Theme3DRangeItem.isInstanceOfType(rangeItem)){
            this._innerTheme3D.AddToHead(rangeItem._get_innerRangeItem());
        }
    },

    /*
    *将给定的三维单值专题图子项插入到指定序号的位置
     */
    addToTail:function(rangeItem){
        if(SuperMap.Web.Realspace.Theme3DRangeItem.isInstanceOfType(rangeItem)){
            this._innerTheme3D.AddToTail(rangeItem._get_innerRangeItem());
        }
    },

    /*
     *删除所有三维单值专题图子项
     */
    clear:function(){
        if(this._innerTheme3D!=null){
            this._innerTheme3D.Clear();
        }
    }
};
SuperMap.Web.Realspace.Theme3DRange.registerClass('SuperMap.Web.Realspace.Theme3DRange', SuperMap.Web.Realspace.Theme3D, Sys.IDisposable);
