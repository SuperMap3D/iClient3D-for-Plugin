//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Sun
// 功能：			  太阳
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Theme3DGraph = function()
{
    SuperMap.Web.Realspace.Theme3DGraph.initializeBase(this);

    this._innerTheme3D = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateTheme3D(SuperMap.Web.Realspace.Theme3DType.THEME3DGRAPH);

};

SuperMap.Web.Realspace.Theme3DGraph.prototype ={

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
     *属性:柱状图中每一个柱的宽度。单位为米
     */
    get_barWidth:function()
    {
        if (this._innerTheme3D == null)
        {
            return ;
        }
        return this._innerTheme3D.BarWidth;
    },
    set_barWidth:function(dWidth)
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        this._innerTheme3D.BarWidth = dWidth;
    },

    /*
     *属性：统计专题图中统计符号显示的最小值
     */
    get_minGraphSize: function()
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        return this._innerTheme3D.MinGraphSize;
    },
    set_minGraphSize:  function(dSize)
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        this._innerTheme3D.MinGraphSize = dSize;
    },

    /*
     *属性:统计专题图中统计符号显示的最大值
     */
    get_maxGraphSize: function()
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        return this._innerTheme3D.MaxGraphSize;
    },
    set_maxGraphSize: function(dSize)
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        this._innerTheme3D.MaxGraphSize = dSize;
    },

    /*
     *属性:统计专题图的统计图类型
     */
    get_graph3DType: function()
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        return this._innerTheme3D.Graph3DType;
    },
    set_graph3DType: function(nType)
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        this._innerTheme3D.Graph3DType = nType;
    },

    /*
     *属性:是否显示统计图上的文本标注
     */
    get_isGraph3DTextDisplayed: function()
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        return this._innerTheme3D.IsGraph3DTextDisplayed;
    },
    set_isGraph3DTextDisplayed: function(bDisplay)
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        this._innerTheme3D.IsGraph3DTextDisplayed = bDisplay;
    },

    /*
     *属性:统计图上的文字标注风格
     */
    get_graph3DTextFormat: function()
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        return this._innerTheme3D.Graph3DTextFormat;
    },
    set_graph3DTextFormat: function(format)
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        this._innerTheme3D.Graph3DTextFormat = format ;
    },

    /*
     *属性:专题图分级模式。其中包括常量分级、对数分级和平方根分级
     */
    get_graduatedMode3D: function()
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        return this._innerTheme3D.GraduatedMode3D;
    },
    set_graduatedMode3D: function(nMode)
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        this._innerTheme3D.GraduatedMode3D = nMode ;
    },

    /*
     *属性:统计图上的文字标注风格
     */
    get_graph3DTextStyle: function()
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        return this._innerTheme3D.Graph3DTextStyle;
    },
    set_graph3DTextStyle: function(textStyle)
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        this._innerTheme3D.Graph3DTextStyle = textStyle._get_innerTextStyle3D();
    },

    /*
     *属性:饼状统计图的起始角度，默认以饼的圆心右侧水平方向为起始线，逆时针方向为正方向。单位为度，精确到 0.1 度
     */
    get_startAngle: function()
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        return this._innerTheme3D.StartAngle;
    },
    set_startAngle: function(dAngle)
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        this._innerTheme3D.StartAngle = dAngle;
    },


    /*
     *方法：获取指定序号的三维统计专题图子项
     */
    get_item:function(nIndex){
        if(this.innerTheme3D != null){
           return  this._innerTheme3D.get_Item(nIndex);
        }
    },

    /*
    *方法：添加专题图子项
     */
    add:function(item){
        if(SuperMap.Web.Realspace.Theme3DGraphItem.isInstanceOfType(item)){
            this._innerTheme3D.Add(item._get_innerGraphItem());
        }
    },

    /*
    *方法:将指定序号的两个子项进行位置交换
     */
    exchangeItem:function(index1,index2){
        if(this._innerTheme3D != null){
            this._innerTheme3D.ExchangeItem(index1,index2);
        }
    },

    /*
     *在统计专题图子项序列中删除指定序号的统计专题图子项
     */
    remove:function(index){
        if(this._innerTheme3D!=null){
            this._innerTheme3D.Remove(index);
        }
    },

    /*
     *删除统计专题图中的所有子项
     */
    clear:function(){
        if(this._innerTheme3D!=null){
            this._innerTheme3D.Clear();
        }
    },

    /*
    *返回统计专题图中指定统计字段表达式的对象在当前统计图子项序列中的序号
     */
    indexOf:function(strExpression){
        if(this._innerTheme3D!=null){
            this._innerTheme3D.IndexOf(strExpression);
        }
    },

    /*
    *
     */
    setExtremum:function(minSum,maxSum,rec2d,count){
        if(this._innerTheme3D != null){
            var innerRec2d = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(rec2d);
            this._innerTheme3D.SetExtremum(minSum, maxSum, innerRec2d, count);
        }
    },

    /*
     *方法:获取统计内存专题图的关键字数组
     */
    getMemoryKeys:function(){
        if(this._innerTheme3D != null){
            return this._innerTheme3D.GetMemoryKeys();
        }
    },

    /*
     *方法:设置统计内存专题图的关键字数组
     */
    setMemoryKeys:function(nKeysArray){
        if(this._innerTheme3D != null){
            return this._innerTheme3D.SetMemoryKeys(nKeysArray);
        }
    }
};

SuperMap.Web.Realspace.Theme3DGraph.registerClass('SuperMap.Web.Realspace.Theme3DGraph',  SuperMap.Web.Realspace.Theme3D, Sys.IDisposable);
