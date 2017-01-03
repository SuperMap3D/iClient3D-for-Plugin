//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.Bubble
// 功能：			  气泡类，设置场景弹出气泡的各参数
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Bubble = function(bubble) {

    SuperMap.Web.Realspace.Bubble.initializeBase(this);
	if (bubble !=null)
	{
		this._innerBubble = bubble;
	}
	else
	{
	    this._innerBubble = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateBubble();
	}
};


SuperMap.Web.Realspace.Bubble.prototype ={

	/*
	*innerBubble属性，不对外开放
	*/
	_get_innerBubble:function()
	{
		if(this._innerBubble != null)
		{
		    return this._innerBubble;
		}

	},
	_set_innerBubble:function(innerBubble)
	{
    if(this._innerBubble != null)
		{
		    this._innerBubble = innerBubble;
		}

	},

	/*
	*pointer属性:气泡指向的经纬度
	*/
	get_pointer:function()
	{
		///<value type="SuperMap.Web.Core.Point3D"></value>
		if(this._innerBubble != null)
		{
			var point =new SuperMap.Web.Core.Point3D();
			var pointInner =this._innerBubble.Pointer;

			point.x =pointInner.X;
			point.y =pointInner.Y;
			point.z =pointInner.Z;
		  return point;
		}
	},
	set_pointer:function(pointer)
	{
		///<value type="void"></value>
		if(this._innerBubble != null)
		{
			var pointInner =this._innerBubble.Pointer;

			pointInner.X =pointer.x;
			pointInner.Y =pointer.y;
			pointInner.Z =pointer.z;
			this._innerBubble.Pointer =pointInner;
		}
	},

	/*
	*backColor属性:气泡的背景色
	*/
	get_backColor:function()
	{
		///<value type="SuperMap.Web.Core.Color"></value>
		if(this._innerBubble != null)
		{
			var color =new SuperMap.Web.Core.Color();
			color.fromLongABGR(this._innerBubble.BackColor);
		    return color;
		}
	},
	set_backColor:function(color)
	{
		///<value type="void"></value>
		if(this._innerBubble != null)
		{
			this._innerBubble.BackColor = color.toLongABGR();
		}
	},

	/*
	*frameColor属性:气泡的边框颜色
	*/
	get_frameColor:function()
	{
		///<value type="SuperMap.Web.Core.Color"></value>
		if(this._innerBubble != null)
		{
			var color =new SuperMap.Web.Core.Color();
			color.fromLongABGR(this._innerBubble.FrameColor);
		    return color;
		}
	},
	set_frameColor:function(color)
	{
		///<value type="void"></value>
		if(this._innerBubble != null)
		{
			this._innerBubble.FrameColor = color.toLongABGR();
		}
	},


	/*
	*left属性:气泡的左边界
	*/
	get_left:function()
	{
		///<value type="Number"></value>
		if(this._innerBubble != null)
		{
		   return this._innerBubble.Left;
		}
	},

	/*
	*top属性:气泡的上边界
	*/
	get_top:function()
	{
		///<value type="Number"></value>
		if(this._innerBubble != null)
		{
		   return this._innerBubble.Top;
		}
	},

	/*
	*width属性:气泡的像素宽度
	*/
	get_width:function()
	{
		///<value type="Number"></value>
		if(this._innerBubble != null)
		{
		   return this._innerBubble.Width;
		}
	},
	set_width:function(value)
	{
		///<value type="void"></value>
		if(this._innerBubble != null)
		{
			this._innerBubble.Width = value;
		}
	},

	/*
	*height属性:气泡的像素高度
	*/
	get_height:function()
	{
		///<value type="Number"></value>
		if(this._innerBubble != null)
		{
		   return this._innerBubble.Height;
		}
	},
	set_height:function(value)
	{
		///<value type="void"></value>
		if(this._innerBubble != null)
		{
			this._innerBubble.Height = value;
		}
	},

	/*
	*id属性:气泡的id
	*/
	get_id:function()
	{
		///<value type="Number"></value>
		if(this._innerBubble != null)
		{
			return this._innerBubble.ID;
		}
	},

	/*
	*name属性：气泡的名称
	*/
	get_name:function()
	{
		///<value type="String"></value>
		if(this._innerBubble != null)
		{
			return this._innerBubble.Name;
		}
	},

	set_name:function(value)
	{
		///<value type="void"></value>
		if(this._innerBubble != null)
		{
			if (typeof(value) != "string")
			{
				return;
			}
			this._innerBubble.Name =value;
		}
	},

	/*
	*clientLeft属性:气泡绘图区的左边界
	*/
	get_clientLeft:function()
	{
		///<value type="Number"></value>
		///<value type="Number"></value>
		if (this._innerBubble != null){
			if(window.navigator.appName == "Microsoft Internet Explorer")
			{
				var zoom=96/window.screen.deviceXDPI;
				return this._innerBubble.ClientLeft*zoom;
			}else{
				return this._innerBubble.ClientLeft;
			}
		}
	},

	/*
	*clientTop属性:气泡绘图区上边界
	*/
	get_clientTop:function()
	{
		///<value type="Number"></value>
		if (this._innerBubble != null){
			if(window.navigator.appName == "Microsoft Internet Explorer")
			{
				var zoom=96/window.screen.deviceXDPI;
				return this._innerBubble.ClientTop*zoom;
			}else{
				return this._innerBubble.ClientTop;
			}
		}
	},

	/*
	*clientWidth属性:气泡绘图区的像素宽度
	*/
	get_clientWidth:function()
	{
		///<value type="Number"></value>
		if (this._innerBubble != null){
			if(window.navigator.appName == "Microsoft Internet Explorer")
			{
				var zoom=96/window.screen.deviceXDPI;
				return this._innerBubble.ClientWidth*zoom;
			}else{
				return this._innerBubble.ClientWidth;
			}
		}
	},

	set_clientWidth:function(value)
	{
		///<value type="void"></value>
		if(this._innerBubble != null)
		{
			this._innerBubble.ClientWidth = value;
		}
	},

	/*
	*clientHeight属性:气泡绘图区的像素高度
	*/
	get_clientHeight:function()
	{
		///<value type="Number"></value>
		if (this._innerBubble != null){
			if(window.navigator.appName == "Microsoft Internet Explorer")
			{
				var zoom=96/window.screen.deviceXDPI;
				return this._innerBubble.ClientHeight*zoom;
			}else{
				return this._innerBubble.ClientHeight;
			}
		}
	},

	set_clientHeight:function(value)
	{
		///<value type="void"></value>
		///<value type="Number"></value>
		if(this._innerBubble != null)
		{
			this._innerBubble.ClientHeight = value;
		}
	},

	/*
	*visible属性：气泡是否可见
	*/
	get_isVisible:function()
	{
		///<value type="boolean"></value>
		if(this._innerBubble !=null)
		{
			return this._innerBubble.IsVisible;
		}
	},

	set_isVisible:function(value)
	{
		///<value type="void"></value>
		if(this._innerBubble !=null)
		{
			this._innerBubble.IsVisible =value;
		}
	},

	/*
	*frameWidth属性:气泡外边框与内容的空隙宽度
	*/
	get_frameWidth:function()
	{
		///<value type="Number"></value>
		if(this._innerBubble != null)
		{
		   return this._innerBubble.FrameWidth;
		}
	},

	set_frameWidth:function(value)
	{
		///<value type="void"></value>
		if(this._innerBubble != null)
		{
			this._innerBubble.FrameWidth = value;
		}
	},

		/*
	*RoundQuality属性:气泡边角的圆角程度
	*/
	get_roundQuality:function()
	{
		///<value type="Number"></value>
		if(this._innerBubble != null)
		{
		   return this._innerBubble.RoundQuality;
		}
	},

	set_roundQuality:function(value)
	{
		///<value type="void"></value>
		if(this._innerBubble != null)
		{
			this._innerBubble.RoundQuality = value;
		}
	},

		/*
	*isAutoHide属性：指针移出窗口时气泡是否自动关闭
	*/
	get_isAutoHide:function()
	{
		///<value type="boolean"></value>
		if(this._innerBubble !=null)
		{
			return this._innerBubble.IsAutoHide;
		}
	},

	set_isAutoHide:function(value)
	{
		///<value type="void"></value>
		if(this._innerBubble !=null)
		{
			this._innerBubble.IsAutoHide =value;
		}
	},

        /*
    *isLockPosition属性
    */
	get_isLockPosition: function () {
	    ///<value type="boolean"></value>
	    if (this._innerBubble != null) {
	        return this._innerBubble.IsLockPosition;
	    }
	},

	set_isLockPosition: function (value) {
	    ///<value type="void"></value>
	    if (this._innerBubble != null) {
	        this._innerBubble.IsLockPosition = value;
	    }
	},

	/*
	*title属性：气泡的标题
	*/
	get_title:function()
	{
		///<value type="String"></value>
		if(this._innerBubble != null)
		{
			return this._innerBubble.Title;
		}
	},

	set_title:function(value)
	{
		///<value type="void"></value>
		if(this._innerBubble != null)
		{
			if (typeof(value) != "string")
			{
				return;
			}
			this._innerBubble.Title =value;
		}
	},

	/*
  *属性:title的文本风格
  */
  get_titleTextStyle3D: function() {
      ///<value type="SuperMap.Web.Core.TextStyle3D">气泡title的文本风格</value>
      return this._textstyle3d;

  },

  set_titleTextStyle3D: function(newvalue) {
      if (this._innerBubble != null && SuperMap.Web.Core.TextStyle3D.isInstanceOfType(newvalue)) {
          this._innerBubble.TitleTextStyle = newvalue._get_innerTextStyle3D();

          if (this._textstyle3d == null) {
              this._textstyle3d = new SuperMap.Web.Core.TextStyle3D();
              this._textstyle3d._innerTextStyle3D = null;
          }
          this._textstyle3d._set_innerTextStyle3D(this._innerBubble.TextStyle);
      }
  }

};
SuperMap.Web.Realspace.Bubble.registerClass('SuperMap.Web.Realspace.Bubble', Sys.Component, Sys.IDisposable);
