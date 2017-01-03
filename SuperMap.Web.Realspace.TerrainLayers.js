//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.TerrainLayer.js
// 功能：			 地形图层集合类，负责地形图层的管理
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.TerrainLayers = function (scenecontrol)
{
	/// <summary>地形图层集合对象</summary>
   SuperMap.Web.Realspace.TerrainLayers.initializeBase(this);

   this._innerTerrainLayers = scenecontrol._get_innerSceneControl().Scene.TerrainLayers;

   this._terrainLayerArray = [];   // 只用来存脚本对象，不实现排序，查找算法，Layer3Ds上的脚本数组也是如此

   this._terrainLayerName = [];  // 由于支持添加tin地形,所以创建图层时图层已经自动加入图层列表,上层需要增加此数组来判断该图层是否添加

   this._scenecontrol = scenecontrol;
};

SuperMap.Web.Realspace.TerrainLayers.prototype ={
	/*
	*innerTerrainLayers对象，com层Layer3Ds，不对外开发
	*/
//	get_innerTerrainLayers:function()
//	{
//		return this._innerTerrainLayers;
//	},

	/*
	*获得脚本层的地形图层列表，不开放给外部使用
	*/
	_get_terrainLayerArray:function()
	{
	    return this._terrainLayerArray;
	},

	/*
	* 地形图层列表中的层数
	*/
	get_count:function()
	{
		///<returns type="number" integer="true">层数</returns>
        //return this._innerTerrainLayers.Count;
        if ((this._innerTerrainLayers == null))
        {
             return ;
        }
        return this._terrainLayerArray.length;
	},

	/*
	* 获得地形图层列表中的地形图层
	*/
	get_item:function(index)
	{
		///<param name="index" type="string/number">索引或名称</param>
		///<returns type="TerrainLayer">返回指定的地形图层</returns>
        if ((this._innerTerrainLayers == null))
        {
             return null;
        }
        if((index==0) || index)
        {
	        var innerTerrainLayer = this._innerTerrainLayers.get_Item(index);

            if (innerTerrainLayer == null)
            {
                return null;
            }

            for(var i=0; i<this._terrainLayerArray.length; i++)
            {
                if (this._terrainLayerArray[i]._get_innerTerrainLayer() == innerTerrainLayer)
                {
                    return this._terrainLayerArray[i];
                }
            }

        }
	},

	/*
	*向地形图层集合中添加新图层
	*/
	add:function(strServerRootUrl, strLayerName, strDataName, addToHead)
	{
		///<param name="strServerRootUrl" type="string">服务器地址</param>
		///<param name="strLayerName" type="string">地形图层名</param>
		///<param name="strDataName" type="string">地形数据名</param>
		///<param name="addToHead" type="boolean">是否添加到头部</param>
		///<returns type="SuperMap.Web.Realspace.TerrainLayer">添加的地形图层</returns>
        if ((this._innerTerrainLayers == null))
        {
             return null;
        }
        var terrainLayer = new SuperMap.Web.Realspace.TerrainLayer(strServerRootUrl, strLayerName, strDataName);

        if(terrainLayer.initialized())
        {
			if(addToHead||(null==addToHead))
			{
				if (this.insert(terrainLayer))
				{
					return terrainLayer;
				}
           }
			else
			{
				var index = this.get_count();
				if (this.insert(terrainLayer,index))
				{
					return terrainLayer;
				}
			}

        }
        return null;
	},

	/*
	*创建图层方法，需用insert函数加入地形图层集
	*/
	_createTerrainLayer:function (strServerRootUrl, strLayerName, strDataName)
	{
	   if ((this._innerTerrainLayers == null))
        {
             return null;
        }
        var innerTerrainLayer = this._innerTerrainLayers.get_Item(strLayerName);
        if (innerTerrainLayer != null)
        {
            return innerTerrainLayer;
        }
        else
        {
            return this._innerTerrainLayers.CreateTerrainLayer(strServerRootUrl, strLayerName, strDataName);
        }

	},

    /*
	* 清除地形图层列表中所有的图层
	*/
	removeAll:function()
	{
		///<returns type="void"></returns>
        if ((this._innerTerrainLayers == null))
        {
             return ;
        }
       Array.clear(this._terrainLayerArray);
		this._innerTerrainLayers.RemoveAll();
	    //刷新地形图层
		this._scenecontrol.get_scene().resetTerrain();
	},

	/*
	*清除地形图层列表中指定的图层，参数可以为图层name或者位置
	*/
	removeAt:function(index)
	{
		///<param name="index" type="string/number">图层名或位置</param>
		///<returns type="boolean">是否成功</returns>
	    if ((this._innerTerrainLayers == null))
        {
             return false;
        }
		if((index==0) || index)
		{
			var terrainLayer = this.get_item(index);

		    if (terrainLayer != null)
		    {
		        Array.remove(this._terrainLayerArray,terrainLayer);
		        this._innerTerrainLayers.RemoveAt(index);

                //刷新地形图层
		        this._scenecontrol.get_scene().resetTerrain();
		        return true;
		    }
		}

	    return false;

	},

	/*
	* 将创建出来的的图层插入列表中，默认插入列表顶部
	*/
	insert:function(terrainLayer, nIndex)
	{
		///<param name="terrainLayer" type="TerrainLayer">要插入的地形图层</param>
		///<param name="nIndex" type="number">插入的位置</param>
		///<returns type="boolean">是否成功</returns>
		if ( !SuperMap.Web.Realspace.TerrainLayer.isInstanceOfType(terrainLayer) || (this._innerTerrainLayers == null))
        {
			return false;
        }
		var bInsert = null;
		if((!isNaN(nIndex) && (nIndex !== "")) && (nIndex>=0))
		{
			//根据zhaozhe的思想，这里加进去就行了，脚本层列表不维护图层的顺序
            bInsert = this._innerTerrainLayers.Insert(terrainLayer._get_innerTerrainLayer(), nIndex);
		}
		else
		{
			bInsert =  this._innerTerrainLayers.Insert(terrainLayer._get_innerTerrainLayer(), 0);
		}
    if(!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(val) {
            return jQuery.inArray(val, this);
        }
    }
		if (this._terrainLayerName.indexOf(terrainLayer.get_name()) === -1)
		{
      this._terrainLayerName.push(terrainLayer.get_name());
			this._terrainLayerArray.push(terrainLayer);
			//刷新地形图层
			this._scenecontrol.get_scene().resetTerrain();
			return true;
		}

		return false;
	},

	/*
	* 根据图层name查抄出图层的在列表中的位置
	*/
	indexOf:function(strLayerName)
	{
		///<param name="strLayerName" type="string">图层名称</param>
		///<returns type="number" integer="true">在列表中的位置</returns>
        if ((this._innerTerrainLayers == null))
        {
             return -1;
        }
		if(strLayerName)
        {
    	      return this._innerTerrainLayers.IndexOf(strLayerName);
        }
        else
        {
    	      return -1;
        }
	},

	/*
	*方法:将此地形图层集合中的指定索引号的地形图层移动到指定目标的索引号位置。
	*/
	moveTo:function(nFromIndex, nToIndex)
	{
		///<param name="nFromIndex" type="number" integer="true">起始位置</param>
		///<param name="nToIndex" type="number" integer="true">目标位置</param>
		///<returns type="boolean">是否成功</returns>
        if ((this._innerTerrainLayers == null))
        {
             return false;
        }
        nFromIndex = parseInt(nFromIndex);
        nToIndex = parseInt(nToIndex);
        if((!isNaN(nFromIndex)) && (nFromIndex>=0) && (!isNaN(nToIndex)) && (nToIndex>=0))
        {
           //刷新地形图层的工作统一在底层接口里面做了
	        return this._innerTerrainLayers.MoveTo(nFromIndex, nToIndex);
        }
        else
        {
	        return false;
        }
	},
	/*
	*方法:将此地形图层集合中的指定索引号的地形图层移动到顶部
	*/
	moveToTop:function(nIndex)
	{
		///<param name="nIndex" type="number">指定地形图层的索引</param>
		///<returns type="boolean">是否成功</returns>
        if ((this._innerTerrainLayers == null))
        {
             return false;
        }
        nIndex = parseInt(nIndex);
        if(!isNaN(nIndex) && nIndex>=0)
        {
	        return this._innerTerrainLayers.MoveToTop(nIndex);
        }
        else
        {
	        return false;
        }
	},
	/*
	*方法:将此地形图层集合中的指定索引号的地形图层移动到底部
	*/
	moveToBottom:function(nIndex)
	{
		///<param name="nIndex" type="number">指定地形图层的索引</param>
		///<returns type="boolean">是否成功</returns>
        if ((this._innerTerrainLayers == null))
        {
	        return false;
        }
        nIndex = parseInt(nIndex);
        if(!isNaN(nIndex) && nIndex>=0)
        {
	        return this._innerTerrainLayers.MoveToBottom(nIndex);
        }
        else
        {
	        return false;
        }
	},
	/*
	*方法:将此地形图层集合中的指定索引号的地形图层向下移动一层
	*/
	moveDown:function(nIndex)
	{
		///<param name="nIndex" type="number">指定地形图层的索引</param>
		///<returns type="boolean">是否成功</returns>
        if ((this._innerTerrainLayers == null))
        {
	        return false;
        }
        nIndex = parseInt(nIndex);
        if(!isNaN(nIndex) && nIndex>=0)
        {
	        return this._innerTerrainLayers.MoveDown(nIndex);
        }
        else
        {
	        return false;
        }
	},
    /*
	*方法:将此地形图层集合中的指定索引号的地形图层向上移动一层
	*/
	moveUp:function(nIndex)
	{
		///<param name="nIndex" type="number">指定地形图层的索引</param>
		///<returns type="boolean">是否成功</returns>
		if ((this._innerTerrainLayers == null))
        {
	        return false;
        }
        nIndex = parseInt(nIndex);
        if(!isNaN(nIndex) && nIndex>=0)
        {
	        return this._innerTerrainLayers.MoveUp(nIndex);
        }
        else
        {
	        return false;
        }
	},
  /*
  *方法:添加STK地形
  */
  addSTKTerrain:function(strServerRootUrl, strLayerName)
  {
    ///<param name="strServerRootUrl" type="string">服务地址</param>
    ///<param name="strLayerName" type="string">图层名称</param>
    ///<returns type="SuperMap.Web.Realspace.TerrainLayer">添加的地形土层</returns>
    if (this._innerTerrainLayers == null){
         return null;
    }
    var innerLayer = this._innerTerrainLayers.AddSTK(strServerRootUrl, strLayerName);
    var terrainLayer = new SuperMap.Web.Realspace.TerrainLayer();
    terrainLayer._innerTerrainLayer = innerLayer;
    var innerBounds = terrainLayer._innerTerrainLayer.Bounds;

    terrainLayer._bounds = new SuperMap.Bounds(innerBounds.Left, innerBounds.Bottom, innerBounds.Right, innerBounds.Top);

    if (this.insert(terrainLayer, 0)){
        return terrainLayer;
    }
    return null;
  },

  /*
   *分层设色对象
   */
  get_hypsometricSetting: function()
  {
      if (this._innerTerrainLayers == null){
           return null;
      }
      var hypsometricSetting = new SuperMap.Web.Realspace.HypsometricSetting();
      hypsometricSetting._innerHypsometricSetting = this._innerTerrainLayers.HypsometricSetting;
      return hypsometricSetting;
  },

  set_hypsometricSetting: function(value)
  {
      if(this._innerTerrainLayers === null || !(value instanceof SuperMap.Web.Realspace.HypsometricSetting)){
          return;
      }

      if(value._innerHypsometricSetting === null){
          return;
      }
      this._innerTerrainLayers.HypsometricSetting = value._innerHypsometricSetting;
  }

};
SuperMap.Web.Realspace.TerrainLayers.registerClass('SuperMap.Web.Realspace.TerrainLayers', Sys.Component, Sys.IDisposable);
