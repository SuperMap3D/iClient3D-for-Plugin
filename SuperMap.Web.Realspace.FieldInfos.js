//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.FieldInfos 
// 功能：			矢量文件缓存的属性字段信息
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.FieldInfos = function(innerFieldInfos)
{
 
  SuperMap.Web.Realspace.FieldInfos.initializeBase(this);

  this._innerFieldInfos = innerFieldInfos;
};

SuperMap.Web.Realspace.FieldInfos.prototype ={	
	
	get_count:function()
	{
		/// <summary>获取属性字段数目</summary>
		///<value type="number" integer="true"></value>
		 if (this._innerFieldInfos == null) {
            return -1;
        }
		return this._innerFieldInfos.Count;
	},
	get_item:function(index)
	{
		/// <summary>获取指定索引的属性字段</summary>
		///<param name="index" type="number" integer="true">索引值</param> 
		/// <returns type="SuperMap.Web.Realspace.FieldInfo">返回属性字段</returns>
		 if (this._innerFieldInfos == null) {
            return null;
        }
		 var n_nIndex = parseInt(index);
        if (!isNaN(n_nIndex) && n_nIndex >= 0) 
        {
	        var innerFieldInfo = this._innerFieldInfos.get_Item(n_nIndex);
    		
	        if(innerFieldInfo != null)
	        {
	            var fieldInfo = new SuperMap.Web.Realspace.FieldInfo(innerFieldInfo);
	            return fieldInfo;
	        }
	    }
		return null;
	}
};
SuperMap.Web.Realspace.FieldInfos.registerClass('SuperMap.Web.Realspace.FieldInfos', Sys.Component, Sys.IDisposable);