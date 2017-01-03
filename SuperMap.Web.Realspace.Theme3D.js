//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Theme3D
// 功能：			  太阳
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Theme3D = function()
{
    SuperMap.Web.Realspace.Theme3D.initializeBase(this);
    this._innerTheme3D = null;
};

SuperMap.Web.Realspace.Theme3D.prototype ={

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerTheme3D = null;
    },

    /*
   *设置和获取com对象，不对外开放
   */
    _get_innerTheme3D: function () {
        if (/**/ this._innerTheme3D == null) {
            return null;
        }
        return this._innerTheme3D;
    },

    _set_innerTheme3D: function (innerTheme3D) {
        if (innerTheme3D == null) {
            this.innerTheme3D = null;
            return;
        }
        this._innerTheme3D = innerTheme3D;
    },

    /*
     *属性:专题图类型
     */
    get_type:function()
    {
        ///<value type="boolean"></value>
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        return this._innerTheme3D.Type;
    },

    /*
     *方法:使用SuperMap专题图xml文件构建专题图
     */
    fromXML: function(strXML, nVersion)
    {
        ///<param name="strXML" type="String">xml信息</param>
        ///<param name="nVersion" type="Number">工作空间版本</param>
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        return this._innerTheme3D.FromXML(strXML,nVersion);
    },

    /*
     *方法:返回专题图设置的XML描述
     */
    toXML: function(nVersion)
    {
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        return this._innerTheme3D.ToXML(nVersion);
    },

    /*
     *方法:设置外部数据数组
     */
    setMemoryData: function(strArrayKeys, strArrayValues)
    {
        ///<param name="strArrayKeys" type="Object">外部数据关键字数组</param>
        ///<param name="strLayerName" type="String">外部数据关键字对应的存储值数组</param>
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        this._innerTheme3D.SetMemoryData(strArrayKeys, strArrayValues);
    },

    /*
     *方法:获取外部数据数组的关键字数组
     */
    getMemoryDataKeys: function()
    {
        ///<value type="Object">返回字符串类型的关键字数组</value>
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        this._innerTheme3D.GetMemoryDataKeys();
    },

    /*
     *方法:返回外部数据数组的真实数据值数组
     */
    getMemoryDataValues: function()
    {
        ///<value type="Object">返回字符串类型的数据数组</value>
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        this._innerTheme3D.GetMemoryDataValues();
    },

    /*
     *方法:返回外部数据数组存储的数据个数
     */
    getMemoryDataCount: function()
    {
        ///<value type="Number"></value>
        if ((this._innerTheme3D == null))
        {
            return ;
        }
        this._innerTheme3D.GetMemoryDataCount();
    }
};

SuperMap.Web.Realspace.Theme3D.registerClass('SuperMap.Web.Realspace.Theme3D');
