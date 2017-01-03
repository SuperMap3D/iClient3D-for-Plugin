//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.TerrainLayer
// 功能：			 地形图层类
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.TerrainLayer = function(strServerRootUrl, strLayerName, strDataName)
{
	/// <summary>地形图层对象</summary>
	///<param name="strServerRootUrl" type="String">服务器地址</param>
	///<param name="strLayerName" type="String">图层名称</param>
	///<param name="strDataName" type="String">数据名称</param>
	///<returns type="SuperMap.Web.Realspace.TerrainLayer">返回地形图层对象</returns>
    SuperMap.Web.Realspace.TerrainLayer.initializeBase(this);

    this._innerTerrainLayer = null;

    if(arguments.length === 0){
        return;
    }
    var e = Function._validateParams(arguments, [{name: "strServerRootUrl", type: String},{name: "strLayerName", type: String},{name: "strDataName", type: String}]);
    if(e)
    {
        var ex = SuperMap.Web.Realspace.Utility._ConvertSysEx2Realspace(e);
        throw ex;
    }

    this._innerTerrainLayer = SuperMap.Web.Realspace.Utility._SceneControl.get_scene().get_terrainLayers()._createTerrainLayer(strServerRootUrl, strLayerName, strDataName);

    if (this._innerTerrainLayer == null) {
        var ex = new Error(SuperMap.Web.Resources.Resource.getMessage("SuperMap.Web.Realspace.Resources", "Realspace_Operation_Failed"));
        ex.name = SuperMap.Web.Realspace.ExceptionName.OperationFailed;
        throw ex;
    }

    var innerBounds = this._innerTerrainLayer.Bounds;

    this._bounds = new SuperMap.Bounds(innerBounds.Left, innerBounds.Bottom, innerBounds.Right, innerBounds.Top);



};

SuperMap.Web.Realspace.TerrainLayer.prototype ={

    /*
	*innerTerrainLayer属性:内部地形图层对象，不对外开放
	*/
	_get_innerTerrainLayer:function()
	{
         return this._innerTerrainLayer;
	},
	_set_innerTerrainLayer:function(innerTerrainLayer)
	{
		this._innerTerrainLayer = innerTerrainLayer;
	},

	/*
	*initialized属性，判断图层对象是否构建成功
	*/
	initialized:function()
	{
		///<returns type="Boolean">是否成功</returns>
		if (this._innerTerrainLayer != null)
		{
		    return true;
		}
		else
		{
		    return false;
		}
	},

	/*
	*属性: 图层名
	*/
	get_name:function()
	{
		///<value type="String">图层名称</value>
        return this._innerTerrainLayer.Name;
	},

    /*
	*属性: 图层别名
	*/
	get_caption:function()
	{
	    ///<value type="String">图层别名</value>

		return this._innerTerrainLayer.Caption;
	},
	set_caption:function(caption)
	{
	    if (typeof(caption) == "string")
	    {
	        this._innerTerrainLayer.Caption = caption;
	    }
	},

    /*
	* 属性:图层描述信息
	*/
	get_description:function()
	{
	    ///<value type="String">图层描述信息</value>
        return this._innerTerrainLayer.Description;
	},
	set_description:function(description)
	{
	    if (typeof(description) == "string")
	    {
	        this._innerTerrainLayer.Description = description;
	    }

	},

	/*
	*属性:数据网络路径
	*/
 	get_dataName:function()
 	{
 	    ///<value type="String">图层数据存储路径</value>
 		return this._innerTerrainLayer.DataName;
 	},

	/*
	* 属性:是否可见
	*/
	get_isVisible:function()
	{
	    ///<value type="Boolean">图层是否可见</value>
		return this._innerTerrainLayer.IsVisible;
	},
	set_isVisible:function(isVisible)
	{
		this._innerTerrainLayer.IsVisible = isVisible;
		SuperMap.Web.Realspace.Utility._SceneControl.get_scene().resetTerrain();
	},

	/*
	*方法:获得地形图层的范围
	*/
	get_bounds:function()
	{
		///<value type="SuperMap.Web.Core.Rectangle2D">地形图层的范围</value>
		if (this._innerTerrainLayer != null)
		{
			var innerBounds = this._innerTerrainLayer.Bounds;
    		return new SuperMap.Bounds(innerBounds.Left, innerBounds.Bottom, innerBounds.Right, innerBounds.Top);

		}
	},
	/**
    *删除该地形图层缓存数据
    */
    updateCacheFile:function()
    {
        return this._innerTerrainLayer.UpdateCacheFile();
    },

    /*
    *获取图层数据下载进度
    */
    getDataStreamingProgress:function()
    {
        if (this._innerTerrainLayer == null) {
            return;
        }
        return this._innerTerrainLayer.GetDataStreamingProgress();
    }


};
SuperMap.Web.Realspace.TerrainLayer.registerClass('SuperMap.Web.Realspace.TerrainLayer', Sys.Component, Sys.IDisposable);
