//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.FieldInfo
// 功能：			矢量文件缓存的属性字段
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.FieldInfo = function(innerFieldInfo)
{
 
  SuperMap.Web.Realspace.FieldInfo.initializeBase(this);

  this._innerFieldInfo = innerFieldInfo; 
};

SuperMap.Web.Realspace.FieldInfo.prototype ={	
	
	get_name:function()
	{
		/// <summary>获取指定索引的属性字段名称</summary>
		/// <returns type="String">返回属性字段名称</returns>
		if (this._innerFieldInfo == null) {
            return "";
        }
		return this._innerFieldInfo.Name;
	},
    get_foreignName:function()
	{
		/// <summary>获取指定索引的属性字段别名</summary>
		/// <returns type="String">返回属性字段别名</returns>
		if (this._innerFieldInfo == null) {
            return "";
        }
		return this._innerFieldInfo.ForeignName;
	}
};
SuperMap.Web.Realspace.FieldInfo.registerClass('SuperMap.Web.Realspace.FieldInfo', Sys.Component, Sys.IDisposable);