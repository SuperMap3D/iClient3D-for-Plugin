//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Selection3D.js
// 功能：			 三维选择集类
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Selection3D = function(innerSelection3D,layer3D)
{
  /// <summary>三维选择集对象</summary>
  SuperMap.Web.Realspace.Selection3D.initializeBase(this);
  
  this._innerSelection3D = null;
  
  this._layer3D = null;
  
  this._style3d = null;
  
  this._textstyle3d = null;
  
  
  if((SuperMap.Web.Realspace.Layer3D.isInstanceOfType(layer3D)))
  {
  	    if (innerSelection3D != null) 
  	    {
  	        this._innerSelection3D = innerSelection3D;
      
            this._layer3D = layer3D;
  	    } 	    
  	
  }

};

SuperMap.Web.Realspace.Selection3D.prototype = {

    /*
    * 方法:
    */
    dispose: function() {
        ///<returns type="void"></returns>
        this._innerSelection3D = null;
        this._layer3D = null;
        this._style3d = null;
        this._textstyle3d = null;
    },

    /*
    *属性:三维选择集中对象的总数
    */
    get_count: function() {
        ///<returns type="Number" integer="true">三维选择集中对象的总数</returns>
        if (this._innerSelection3D != null) {
            return this._innerSelection3D.Count;
        }

    },

    /*
    *属性:三维选择集对象的所属的图层
    */
    get_layer3D: function() {
        ///<value type="SuperMap.Web.Realspace.Layer3D">三维选择集对象的所属的图层</value>	
        if (this._innerSelection3D != null) {
            return this._layer3D;
        }
    },

    //	//对外不开放set接口
    //	_set_layer3D:function(layer3D)
    //	{
    //		this._layer3D = layer3D;		
    //	},

    /*
    *方法:根据序号得到三维选择集中指定对象的系统 ID 值
    */
    get_item: function(nIndex) {
        ///<param name="nIndex" type="Number" integer="true"序号</param> 
        ///<value type="Number" integer="true">系统 ID 值</value>
        if (this._innerSelection3D != null) {
            if (!isNaN(nIndex) && (nIndex !== "") && (nIndex >= 0)) {
                return this._innerSelection3D.get_Item(nIndex);
            }
        }
        return -1;
    },

    /*
    *方法:向三维选择集中加入指定的对象
    */
    add: function(nId) {
        ///<param name="nId" type="Number" integer="true">要添加对象的系统 ID 值</param> 
        ///<returns type=Nnumber" integer="true">对象在三维选择集中的序号</returns>
        if (this._innerSelection3D != null) {
            var n_nId = parseInt(nId);
            if (!isNaN(n_nId)) {
                //经测试，这句可以不加。
                //SuperMap.Web.Realspace.InnerScene.SetRefreshRaster(true);
                return this._innerSelection3D.Add(n_nId);
            }

        }
        return -1;
    },

    /*
    *方法:清空三维选择集
    */
    removeAll: function() {
        ///<returns type="void"></returns>
        if (this._innerSelection3D != null) {
            this._innerSelection3D.RemoveAll();
        }
    },

    /*
    *方法:从指定索引处开始移除一个或多个几何对象
    */
    removeAt: function(nIndex, nCount) {
        ///<param name="nIndex" type="number" integer="true">开始处的索引</param> 
        ///<param name="nCount" type="number" integer="true" optional="true">要移除的个数</param> 
        ///<returns type="void"></returns>
        if (this._innerSelection3D != null) {
            var n_nIndex = parseInt(nIndex);
            var n_nCount = parseInt(nCount);
            if (!isNaN(n_nIndex)) {
                if (!isNaN(n_nCount)) {
                    this._innerSelection3D.RemoveAt(n_nIndex, n_nCount);
                }
                else {
                    this._innerSelection3D.RemoveAt(n_nIndex,1);
                }
            }
        }
    },

    /*
    *方法:根据系统 ID 值移除三维选择集中的对象
    */
    remove: function(nId) {
        ///<param name="nId" type="number" integer="true">要移除对象的系统 ID 值</param>
        ///<returns type="void"></returns>    
        if (this._innerSelection3D != null) {

            var n_nId = parseInt(nId);
            if (!isNaN(n_nId)) {
                this._innerSelection3D.Remove(n_nId);

            }
        }
    },

    /*
    *方法:在三维选择集中添加对象id数组
    */
    append: function(arrIds) {
        ///<param name="arrIds" type="Array" elementType="Number" integer="true">要加入的数组</param> 
        ///<returns type="Number" integer="true">加入数组的起始索引</returns>
        if (this._innerSelection3D != null) {
            var e = Function._validateParams(arguments, [{ name: "arrIds", type: Array, elementType: Number}]);
            if (e) {
                return -1;
            }
            else {
                return this._innerSelection3D.Append(arrIds);
            }
        }
        return -1;

    },

    /*
    *属性:三维选择集对象高亮的风格
    */
    get_style3D: function() {
        ///<value type="SuperMap.Web.Core.Style3D">获取三维选择集对象高亮的风格</value>
		if (this._style3d == null && this._innerSelection3D.Style3D != null)
		{
			this._style3d = new SuperMap.Web.Core.Style3D();
			this._style3d._innerStyle3D = null;
			this._style3d._set_innerStyle3D(this._innerSelection3D.Style3D);
		}
        return this._style3d;

    },
    set_style3D: function(newvalue) {
        if (this._innerSelection3D != null && SuperMap.Web.Core.Style3D.isInstanceOfType(newvalue)) {
            this._innerSelection3D.Style3D = newvalue._get_innerStyle3D();
            // 包装内部的COM对象就好了
            if (this._style3d == null) {
                this._style3d = new SuperMap.Web.Core.Style3D();
                this._style3d._innerStyle3D = null;
            }
            this._style3d._set_innerStyle3D(this._innerSelection3D.Style3D);
        }

    },

    /*
    *属性:三维选择集文本对象高亮的风格
    */
    get_textStyle3D: function() {
        ///<value type="SuperMap.Web.Core.TextStyle3D">获取三维选择集文本对象高亮的风格</value>
        return this._textstyle3d;

    },
    set_textStyle3D: function(newvalue) {
        if (this._innerSelection3D != null && SuperMap.Web.Core.TextStyle3D.isInstanceOfType(newvalue)) {
            this._innerSelection3D.TextStyle = newvalue._get_innerTextStyle3D();

            if (this._textstyle3d == null) {
                this._textstyle3d = new SuperMap.Web.Core.TextStyle3D();
                this._textstyle3d._innerTextStyle3D = null;
            }
            this._textstyle3d._set_innerTextStyle3D(this._innerSelection3D.TextStyle);
        }

    },

    /*
    *方法:判断选择集是否为空
    */
    isEmpty: function() {
        ///<returns type="Boolean" >是否为空</returns>
        if (this._innerSelection3D != null) {
            return this._innerSelection3D.IsEmpty;
        }
    }



};
SuperMap.Web.Realspace.Selection3D.registerClass('SuperMap.Web.Realspace.Selection3D', Sys.Component, Sys.IDisposable);
