//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.Bubbles
// 功能：			  气泡类，设置场景弹出气泡列表的各参数
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Bubbles = function(bubbles) {

	if (bubbles !=null)
	{
		this._innerBubbles = bubbles;
	}
};


SuperMap.Web.Realspace.Bubbles.prototype ={

	/*
	*innerBubbles属性，不对外开放
	*/
	_get_innerBubbles:function()
	{
		if(this._innerBubbles != null)
		{
		    return this._innerBubbles;
		}

	},
	_set_innerBubbles:function(innerBubbles)
	{
    if(this._innerBubbles != null)
		{
		    this._innerBubbles = innerBubbles;
		}

	},

	/*
	*add方法:添加气泡对象
	*/
	add:function(bubble)
	{
		///<summary>添加气泡</summary>
        ///<param name="bubble" type="SuperMap.Web.Realspace.Bubble">添加的气泡框对象。</param>
        ///<returns type="Number">添加的气泡框对象在集合中的位置索引。</returns>
		if(this._innerBubbles != null && bubble._get_innerBubble() !=null)
		{
			return this._innerBubbles.Add(bubble._get_innerBubble());
		}
	},

	/*
	*insert方法:添加气泡对象到指定位置
	*/
	insert:function(index,bubble)
	{
		///<summary>在指定索引位置插入气泡对象。</summary>
        ///<param name="index" type="Number">插入气泡对象的位置索引。</param>
		///<param name="bubble" type="SuperMap.Web.Realspace.Bubble">插入的气泡框对象。</param>
        ///<returns type="Number">添加的气泡框对象在集合中的位置索引。</returns>
		if(this._innerBubbles != null && bubble._get_innerBubble() !=null)
		{
			return this._innerBubbles.Insert(index,bubble._get_innerBubble());
		}
	},

	/*
	*indexOf方法:返回指定名称的气泡索引
	*/
	indexOf:function(name)
	{
		///<summary>获取指定名称的气泡对象在集合中的位置。</summary>
        ///<param name="name" type="String">要查询的气泡对象的名称</param>
        ///<returns type="Number">要查询的气泡对象的位置索引。</returns>
		if(this._innerBubbles != null && bubble._get_innerBubble() !=null)
		{
			return this._innerBubbles.IndexOf(name);
		}
	},

	/*
	*removeAt方法:删除场景中指定索引(或名称)的气泡
	*/
	removeAt:function(index)
	{
		///<summary>移除指定索引位置的气泡对象</summary>
        ///<param name="index" type="Number">要移除的气泡对象的位置索引。</param>
		if(this._innerBubbles != null)
		{
			return this._innerBubbles.RemoveAt(index);
		}
	},

	/*
	*removeAll方法:删除场景中所有气泡
	*/
	removeAll:function()
	{
		///<summary>移除集合中的所有气泡对象</summary>
		if(this._innerBubbles != null)
		{
			this._innerBubbles.RemoveAll();
		}
	},

	/*
	*count属性:场景中的气泡数量
	*/
	get_count:function()
	{
		///<value type="Number"></value>
		if(this._innerBubbles != null)
		{
		    return this._innerBubbles.Count;
		}
	},

	/*
	*item属性:得到指定索引的气泡对象
	*/
	get_item:function(index)
	{
	    ///<param name="index" type="Number">指定的位置索引。</param>
		///<value type="SuperMap.Web.Realspace.Bubble">气泡对象</value>
		if(this._innerBubbles != null)
		{
			var innerBubble = this._innerBubbles.GetItem(index);
			if (innerBubble != null)
			{
				var bubble =new SuperMap.Web.Realspace.Bubble(innerBubble);
				return bubble;
			}
		}
	}
};
SuperMap.Web.Realspace.Bubbles.registerClass('SuperMap.Web.Realspace.Bubbles', Sys.Component, Sys.IDisposable);
