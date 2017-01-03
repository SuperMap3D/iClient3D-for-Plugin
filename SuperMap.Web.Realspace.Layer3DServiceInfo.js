//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Layer3DServiceInfo 
// 功能：			图层服务信息类 
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Layer3DServiceInfo = function(innerLayer3DServiceInfo)
{
	/// <summary>图层服务信息对象</summary>
	/// <returns type="SuperMap.Web.Realspace.Layer3D">返回图层服务信息对象。</returns>
	SuperMap.Web.Realspace.Layer3DServiceInfo.initializeBase(this);
  
    this._innerLayer3DServiceInfo = null;
    
    this._style3D = null;
    
    if (innerLayer3DServiceInfo != null) 
    {
        this._innerLayer3DServiceInfo = innerLayer3DServiceInfo;
    }
};

SuperMap.Web.Realspace.Layer3DServiceInfo.prototype = {

    // 	/*
    // 	*设置com层的Layer3DServiceInfo对象,不对外开放
    // 	*/
    // 	_set_innerLayer3DServiceInfo:function(innerLayer3DServiceInfo)
    // 	{
    // 		this._innerLayer3DServiceInfo = innerLayer3DServiceInfo;
    // 	},

    /*
    * 属性：图层名称
    */
    get_name: function() 
    {///<value type="String">返回图层名</value>
        if(this._innerLayer3DServiceInfo != null)
        {
            return this._innerLayer3DServiceInfo.Name;
        }
    },
    set_name: function(name) {
        if (typeof (name) == "string" && this._innerLayer3DServiceInfo != null) 
        {
            this._innerLayer3DServiceInfo.Name = name;
        }
    },

    /*
    *属性:图层类型
    */
    get_type: function() {
        ///<value type="SuperMap.Web.Realspace.Layer3DType">返回图层类型</value>
        if(this._innerLayer3DServiceInfo != null)
        {
            return this._innerLayer3DServiceInfo.Type;
        }
    },
    set_type: function(type) {
        var n_type = parseInt(type);
        if (!isNaN(n_type)  && this._innerLayer3DServiceInfo != null) 
        {
            this._innerLayer3DServiceInfo.Type = n_type;
        }
    },

    /*
    *数据存储路径
    */
     get_dataName: function() 
     {///<value type="String">返回图层数据存储路径</value>
        if(this._innerLayer3DServiceInfo != null)
        {
            return this._innerLayer3DServiceInfo.DataName;
        }
     },
     set_dataName: function(dataName) 
     {///<summary>设置图层数据存储路径</summary>
        if (typeof (name) == "string" && this._innerLayer3DServiceInfo != null) 
        {
            this._innerLayer3DServiceInfo.DataName = dataName;
        }
     },

    get_caption: function() {
    	///<value type="String">返回图层标题</value>
    	if(this._innerLayer3DServiceInfo != null)
    	{
    	    return this._innerLayer3DServiceInfo.Caption;
    	}
    },
    set_caption: function(caption) {
    	 /// <summary>设置图层标题</summary>
        if (typeof (caption) == "string"  && this._innerLayer3DServiceInfo != null) {
            this._innerLayer3DServiceInfo.Caption = caption;
        }

    },
    
    get_description: function() {
        ///<value type="String">返回图层描述信息</value>
        if(this._innerLayer3DServiceInfo != null)
    	 {
    	    return this._innerLayer3DServiceInfo.Description;
    	 }
    },
    set_description: function(description) {
    	/// <summary>设置图层描述信息</summary>
        if (typeof (description) == "string" && this._innerLayer3DServiceInfo != null) {
            this._innerLayer3DServiceInfo.Description = description;
        }
    },
    /*
    *图层可见性属性
    */
    get_isVisible: function() {
        ///<value type="Boolean">返回图层是否可见</value>
        if(this._innerLayer3DServiceInfo != null)
    	{
    	    return this._innerLayer3DServiceInfo.IsVisible
    	}
    },
    set_isVisible: function(isVisible) {
        ///<summary>设置图层可见性</summary>
        if (typeof (isVisible) == "boolean" && this._innerLayer3DServiceInfo != null) 
        {
            this._innerLayer3DServiceInfo.IsVisible = isVisible;
        }
    },
    /*
    *图层是否可选择
    */
    get_isSelectable: function() {
        ///<value type="Boolean">返回图层是否可选择</value>
        if (this._innerLayer3DServiceInfo != null) {
            return this._innerLayer3DServiceInfo.IsSelectable;
        }

    },

    set_isSelectable: function(isSelectable) {
        ///<summary>设置图层是否可选择</summary>
        if (typeof (isSelectable) == "boolean" && this._innerLayer3DServiceInfo != null) {
            this._innerLayer3DServiceInfo.IsSelectable = isSelectable;
        }

    },
    /*
    *图层的可见距离
    */
    get_visibleDistance: function() {
        ///<value type="Number">返回图层的可见距离</value>
        if (this._innerLayer3DServiceInfo != null) {
            return this._innerLayer3DServiceInfo.VisibleDistance;
        }
    },

    set_visibleDistance: function(visibleDistance) {
        ///<summary>设置图层的可见距离</summary>
        if (!isNaN(visibleDistance)) {
            if (this._innerLayer3DServiceInfo != null) {
                this._innerLayer3DServiceInfo.VisibleDistance = visibleDistance;
            }

        }
    },
    
    /*
    *属性三维图层的最大可见高程值
    */
    get_maxVisibleAltitude: function() {
        ///<value type="Number">返回图层的最大可见高程值</value>
        if (this._innerLayer3DServiceInfo != null) {
            return this._innerLayer3DServiceInfo.MaxVisibleAltitude;
        }

    },

    set_maxVisibleAltitude: function(maxVisibleAltitude) {
        ///<summary>设置图层的最大可见高程值</summary>
        var n_maxVisibleAltitude = parseFloat(maxVisibleAltitude);
        if (!isNaN(n_maxVisibleAltitude)) {
            if (this._innerLayer3DServiceInfo != null) {
                this._innerLayer3DServiceInfo.MaxVisibleAltitude = n_maxVisibleAltitude;
            }
        }
    },
    /*
    *属性三维图层的最小可见高程值
    */
    get_minVisibleAltitude: function() {
        ///<value type="Number">返回图层的最小可见高程值</value>
        if (this._innerLayer3DServiceInfo != null) {
            return this._innerLayer3DServiceInfo.MinVisibleAltitude;
        }

    },

    set_minVisibleAltitude: function(minVisibleAltitude) {
        ///<summary>设置图层的最小可见高程值</summary>
        var n_minVisibleAltitude = parseFloat(minVisibleAltitude);
        if (!isNaN(n_minVisibleAltitude)) {
            if (this._innerLayer3DServiceInfo != null) {
                this._innerLayer3DServiceInfo.MinVisibleAltitude = n_minVisibleAltitude;
            }

        }
    },
    
    /*
    *图层是否始终进行渲染
    */
    get_isAlwaysRender: function() {
        ///<value type="Boolean">返回图层是否始终进行渲染</value>
        if (this._innerLayer3DServiceInfo != null) {
            return this._innerLayer3DServiceInfo.IsAlwaysRender;
        }

    },

    set_isAlwaysRender: function(isalbe) {
        ///<summary>设置图层是否始终进行渲染</summary>
        if (typeof (isalbe) == "boolean" && this._innerLayer3DServiceInfo != null) {
            this._innerLayer3DServiceInfo.IsAlwaysRender = isalbe;
        }

    },
    /*
    *图层是否可编辑
    */
    get_isEditable: function() {
        ///<value type="Boolean">返回图层是否可编辑</value>
        if (this._innerLayer3DServiceInfo != null) {
            return this._innerLayer3DServiceInfo.IsEditable;
        }

    },

    set_isEditable: function(iseditalbe) {
        ///<summary>设置图层是否可编辑</summary>
        if (typeof (iseditalbe) == "boolean" && this._innerLayer3DServiceInfo != null) {
            this._innerLayer3DServiceInfo.IsEditable = iseditalbe;
        }

    },
        /*
    *Style3D属性
    */
    get_style3D: function() 
    {
        ///<value type="SuperMap.Web.Core.Style3D">返回矢量类型图层的风格属性</value>
        if (this._innerLayer3DServiceInfo != null && this._innerLayer3DServiceInfo.Type == SuperMap.Web.Realspace.Layer3DType.VECTOR) 
        {
            if(null == this._style3D)
            {
                this._style3D = SuperMap.Web.Core.Conversion._CreateObjectBySRObject(this._innerLayer3DServiceInfo.Style3D,"Style3D");
            }
            return this._style3D;
        }
    },
    set_style3D: function(style3D) 
    {
        ///<summary>设置矢量类型图层的显示风格</summary>
        if (this._innerLayer3DServiceInfo == null) 
        {
            return;
        }
        if (SuperMap.Web.Core.Style3D.isInstanceOfType(style3D) && this._innerLayer3DServiceInfo.Type == SuperMap.Web.Realspace.Layer3DType.VECTOR) 
        {
            this._innerLayer3DServiceInfo.Style3D = style3D._get_innerStyle3D();
        }
    },
    /*
    *设置/返回图层的XML信息
    */
    get_xml: function () {
        ///<returns type="String">返回包含所有xml信息的字符串</returns>
        if (this._innerLayer3DServiceInfo != null)
        {  
            return this._innerLayer3DServiceInfo.Xml;
        }
    },

    set_xml: function (strxml) {
        ///<param name="strxml" type="String">XML信息字符串</param>
        if (typeof (strxml) == "string" && this._innerLayer3DServiceInfo != null)
        {
            this._innerLayer3DServiceInfo.Xml = strxml;
        }
    }
};
SuperMap.Web.Realspace.Layer3DServiceInfo.registerClass('SuperMap.Web.Realspace.Layer3DServiceInfo', Sys.Component, Sys.IDisposable);
