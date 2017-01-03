//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Core.Realspace.js
// 功能：			三维核心类库   
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Core');


/** 
* 类名 : Point3D
* 描   述： 三维几何点对象
* 版 本 号： 
*/
SuperMap.Web.Core.Point3D = function(x, y, z) {
    /// <param name="x" type="Number">x值</param>
    /// <param name="y" type="Number">y值</param>
    /// <param name="z" type="Number">z值</param>
    /// <returns type="SuperMap.Web.Core.Point3D"></returns>
    /// <field name="x" type="Number">x轴方向坐标。</field>
    /// <field name="y" type="Number">y轴方向坐标。</field>
    /// <field name="z" type="Number">z轴方向坐标。</field>
    //改用parseFloat，传入非数值参数都返回NaN值
    this.x = parseFloat(x);
    this.y = parseFloat(y);
    this.z = parseFloat(z);
};
SuperMap.Web.Core.Point3D.prototype = {

	toString: function()
	{
	/// <summary>返回一个表示此三维点对象坐标的格式化字符串，如点(2.0,3.0,4.0)。</summary>
	/// <returns type="String">表示此 Point3D的字符串，格式为（x,y,z）。</returns>
        return "(" + this.x + ", " + this.y + ", " + this.z + ")";
    },

    copy: function(point3D)
	{
		/// <summary>复制三维点对象</summary>
		/// <param name="point3D" type="SuperMap.Web.Core.Point3D">点对象</param>
		/// <returns type="void"></returns>
        //判断point3D类型。
		if(SuperMap.Web.Core.Point3D.isInstanceOfType(point3D))
		{
		    this.x = point3D.x;
            this.y = point3D.y;
            this.z = point3D.z;
		}
	
    },

	/**
	 * 地图点对象比较
	 * @param {SuperMap.Web.Core.Point3D} object
	 */
    equals: function(object)
	{
		/// <summary>判断当前对象与参数对象是否相等</summary>
		///<param name="object" type="SuperMap.Web.Core.Point3D"></param>
		///<returns type="Boolean">是否相等</returns>
		//当前对象与object不相等时，返回为false
		if(!SuperMap.Web.Core.Point3D.isInstanceOfType(object)) 
		{
			return false;
		}
		if((object.x == this.x && object.y == this.y && object.z == this.z) || (object.isEmpty() && this.isEmpty()))
		{
			return true;
		}
		else 
		{
			return false;
		}
    },
	/**
	 * 判断点对象是否为空，当x,y其中一个为NaN或Null返回true，否则返回false
	 */
	isEmpty:function() 
	{
		///<returns type="Boolean"></returns>
		if(isNaN(this.x) || isNaN(this.y) || isNaN(this.z)) 
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
};
SuperMap.Web.Core.Point3D.fromJson = function(jsonObject){
	/// <summary>将 JSON 对象转换为点对象。</summary>
	/// <param name="jsonObject" type="JSONObject">要转换的 JSON 对象。</param>
	/// <returns type="SuperMap.Point3D">&lt;see cref="T:SuperMap.Point3D"&gt;Point3D&lt;/see&gt;点对象。</returns>
    if(!jsonObject){
        return null;
    } 
    var object = jsonObject; 
    if(typeof(jsonObject) === "string"){
        object = eval('(' + jsonObject + ')');
        object = eval('(' + jsonObject + ')');
    }
    var point3D = new SuperMap.Web.Core.Point3D(object.x, object.y,object.z);
    return point3D;
};
SuperMap.Web.Core.Point3D.registerClass('SuperMap.Web.Core.Point3D');

/** 
* 类名 : Point3Ds
* 描   述： 三维点集合对象
* 版 本 号： 
*/
SuperMap.Web.Core.Point3Ds = function(pntArray) {

    ///<returns type="SuperMap.Web.Core.Point3Ds"></returns>

    this._innerPoint3Ds = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreatePoint3Ds();

    if (Function._validateParams(arguments, [{ name: "pntArray", type: Array, elementType: SuperMap.Web.Core.Point3D}]) == null) {
        var count = pntArray.length;
        for (var i = 0; i < count; i++) {
            if (!SuperMap.Web.Core.Point3D.isInstanceOfType(pntArray[i]) || pntArray[i].isEmpty()) {
                return false;
            }
            var point3d = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(pntArray[i]);
            if (point3d != null) {
                this._innerPoint3Ds.Add(point3d);
            }           
        }
    }
};
SuperMap.Web.Core.Point3Ds.prototype = {


    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerPoint3Ds = null;
    },

    /*
    *innerPoint3Ds对象，不对外开放
    */
    _get_innerPoint3Ds: function() {

        if ( this._innerPoint3Ds == null) {
            return null;
        }
        return this._innerPoint3Ds;
    },
    _set_innerPoint3Ds: function(innerPoint3Ds) {
        if (innerPoint3Ds == null) {
            return null;
        }
        this._innerPoint3Ds = innerPoint3Ds;
    },

    get_count: function() {
        ///<value type="Number" integer="true"></value>

        if ( this._innerPoint3Ds == null) {
            return 0;
        }
        return this._innerPoint3Ds.Count;
    },

    get_item: function(index) {
        /// <summary>获取三维点对象</summary>
        /// <param name="index" type="Number" integer="true">点对象</param>
        /// <value type="SuperMap.Web.Core.Point3D"></value>
        //判断SuperMap.Web.Core.Point3Ds类型。
        if ( this._innerPoint3Ds == null) {
            return null;
        }
        var n_index = parseInt(index);
        if (!isNaN(n_index)) {
            var innerPoint3D = this._innerPoint3Ds.get_Item(n_index);
            return new SuperMap.Web.Core.Point3D(innerPoint3D.X, innerPoint3D.Y, innerPoint3D.Z);
        }

    },

    /**
    * 判断点集合对象是否为空，若集合中点的个数为0则返回true
    * 
    */
    isEmpty: function() {
        /// <summary>判断当前对象是否为空</summary>
        ///<returns type="Boolean">是否相等</returns>
        if ( this._innerPoint3Ds == null) {
            return true;
        }
        if (this._innerPoint3Ds.Count) {
            return false;
        }
        else {
            return true;
        }
    },
    /**
    * 往三维点集合中添加三维点对象
    */
    add: function(pnt) {
        ///<param name="pnt" type="SuperMap.Web.Core.Point3D"></param>
        ///<returns type="Number" integer="true"></returns>
        if ( this._innerPoint3Ds == null) {
            return -1;
        }
        if (!SuperMap.Web.Core.Point3D.isInstanceOfType(pnt) || pnt.isEmpty()) {
            return -1;
        }
        var point3d = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(pnt);
        if (point3d != null) {
            return this._innerPoint3Ds.Add(point3d);
        }

    },

    removeAll: function() {
        ///<returns type="void"></returns>
        if ( this._innerPoint3Ds == null) {
            return;
        }
        this._innerPoint3Ds.RemoveAll();

    },

    removeAt: function(nIndex, nCount) {
        ///<param name="nIndex" type="Number"></param>
        ///<param name="nCount" type="Number"></param>
        ///<returns type="Boolean"></returns>
        if ( this._innerPoint3Ds == null) {
            return 0;
        }
        var n_nIndex = parseInt(nIndex);
        var n_nCount = parseInt(nCount);
        if (!isNaN(n_nIndex)) {
            if (!isNaN(n_nCount)) {
                return this._innerPoint3Ds.RemoveAt(n_nIndex, n_nCount);
            }
            else {
                return this._innerPoint3Ds.RemoveAt(n_nIndex, 1);
            }
        }


    },

    insert: function(pnt, nIndex) {
        ///<param name="pnt" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="nIndex" type="Number" integer="true"></param>
        ///<returns type="Boolean"></returns>

        if ( this._innerPoint3Ds == null) {
            return false;
        }
        var n_nIndex = parseInt(nIndex);
        if (!SuperMap.Web.Core.Point3D.isInstanceOfType(pnt) || pnt.isEmpty() || isNaN(n_nIndex)) {
            return false;
        }
        var point3d = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(pnt);
        if (point3d != null) {
            return this._innerPoint3Ds.Insert(point3d, n_nIndex);
        }
        else {
            return false;
        }
    },

    toPoint2Ds: function() {
        ///<returns type="Array" elementType="SuperMap.Web.Core.Point2D"></returns>
        var innerPoint2Ds = this._innerPoint3Ds.ToPoint2Ds();
        return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(innerPoint2Ds,"Point2Ds");
    }

};
SuperMap.Web.Core.Point3Ds.registerClass('SuperMap.Web.Core.Point3Ds');


/** 
* 类名 : Vector3D
* 描   述： 三维向量对象,与Point3D的区别是向量有长度和方向
* 版 本 号： 
*/
SuperMap.Web.Core.Vector3D = function(x, y, z) {
	/// <param name="x" type="Number">x值</param>
    /// <param name="y" type="Number">y值</param>
    /// <param name="z" type="Number">z值</param>
    ///<returns type="SuperMap.Web.Core.Vector3D"></returns>

this._innerVector3D = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateVector3D();
    
    if ( this._innerVector3D == null) 
    {
        return;
    }
    //改用parseFloat，传入非数值参数都返回NaN值
    this._innerVector3D.X = parseFloat(x);
    this._innerVector3D.Y = parseFloat(y);
    this._innerVector3D.Z = parseFloat(z);
	    

};
SuperMap.Web.Core.Vector3D.prototype = {

    dispose: function()
    {
        ///<returns type="void">析构函数</returns>
        this._innerVector3D = null;
    },
    
    /*
	*innerVector3D对象，不对外开放
	*/
    _get_innerVector3D: function()
    {

        if ( this._innerVector3D == null) 
        {
              return null;
        }
        return this._innerVector3D;
    },
    _set_innerVector3D: function(innerVector3D)
    {
        if (innerVector3D == null) 
        {
              return null;
        }
        this._innerVector3D = innerVector3D;
    },
 
	toString: function()
	{
	    /// <summary>返回一个表示此向量对象坐标的格式化字符串，如点(2.0,3.0,4.0)。</summary>
	    /// <returns type="String">表示此 Vector3D的字符串，格式为（x,y,z）。</returns>
        return "(" + this._innerVector3D.X + ", " + this._innerVector3D.Y + ", " + this._innerVector3D.Z + ")";
    },
    
    get_x: function()
    {
        ///<value type="Number"></value>
        
        if ( this._innerVector3D == null) 
        {
            return null;
        }
        return this._innerVector3D.X;
    },
    set_x: function(x)
    {
        if ( this._innerVector3D == null) 
        {
            return;
        }
        this._innerVector3D.X = parseFloat(x);
        
    },
    
    get_y: function()
    {
        ///<value type="Number"></value>
        
        if ( this._innerVector3D == null) 
        {
            return null;
        }
        return this._innerVector3D.Y;
    },
    set_y: function(y)
    {
        if ( this._innerVector3D == null) 
        {
            return;
        }
        this._innerVector3D.Y = parseFloat(y);
        
    },
    
    get_z: function()
    {
        ///<value type="Number"></value>
        
        if ( this._innerVector3D == null) 
        {
            return null;
        }
        return this._innerVector3D.Z;
    },
    set_z: function(z)
    {
        if ( this._innerVector3D == null) 
        {
            return;
        }
        this._innerVector3D.Z = parseFloat(z);
        
    },
    
    get_length: function () 
    {
        ///<value type="Number"></value>
        
        if ( this._innerVector3D == null) 
        {
            return null;
        }
        return this._innerVector3D.Length;
    },

    copy: function(vector3D)
	{
		/// <summary>复制向量对象</summary>
		/// <param name="vector3D" type="SuperMap.Web.Core.Vector3D">点对象</param>
		/// <returns type="void"></returns>
        //判断vector类型。
        if ( this._innerVector3D == null) 
        {
            return null;
        }
		if(SuperMap.Web.Core.Vector3D.isInstanceOfType(vector3D))
		{
		    this._innerVector3D.X = vector3D.get_x();
            this._innerVector3D.Y = vector3D.get_y();
            this._innerVector3D.Z = vector3D.get_z();
		}
	
    },

	/**
	 * 地图向量对象比较
	 * @param {SuperMap.Web.Core.Vector3D} object
	 */
    equals: function(object)
	{
		/// <summary>判断当前对象与参数对象是否相等</summary>
		///<param name="object" type="SuperMap.Web.Core.Vector3D"></param>
		///<returns type="Boolean">是否相等</returns>
		//当前对象与object不相等时，返回为false
		if ( this._innerVector3D == null) 
        {
            return false;
        }
		if(!SuperMap.Web.Core.Vector3D.isInstanceOfType(object)) 
		{
			return false;
		}
		if (this._innerVector3D.Equals(object._get_innerVector3D()))
		{
			return true;
		}
		else 
		{
			return false;
		}
    },
	/**
	 * 判断向量对象是否为空，当x,y，z其中一个为NaN或Null返回true，否则返回false
	 */
	isEmpty:function() 
	{
		///<returns type="Boolean"></returns>
		if ( this._innerVector3D == null) 
        {
            return true;
        }
        if (isNaN(this._innerVector3D.X) || isNaN(this._innerVector3D.Y) || isNaN(this._innerVector3D.Z)){
            return true;
        }
        else {
            return false;
        }
	}
};
SuperMap.Web.Core.Vector3D.registerClass('SuperMap.Web.Core.Vector3D');

/** 
* 类名 : BoundingBox
* 描   述： 三维包围盒对象
* 版 本 号： 
*/
SuperMap.Web.Core.BoundingBox = function(lower, upper) {
    /// <param name="lower" type="SuperMap.Web.Core.Vector3D">lower值</param>
    /// <param name="upper" type="SuperMap.Web.Core.Vector3D">upper值</param>
    /// <returns type="SuperMap.Web.Core.BoundingBox"></returns>
    this._center = null;
    this._lower = null;
    this._upper = null;
    if ((lower == undefined && upper == undefined) || (SuperMap.Web.Core.Vector3D.isInstanceOfType(lower) && SuperMap.Web.Core.Vector3D.isInstanceOfType(upper))) {
        this._innerBoundingBox = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateBoundingBox();
        if (this._innerBoundingBox == null) {
            return;
        }
        if ((lower != undefined && upper != undefined)) {
            this._innerBoundingBox.Lower = lower._get_innerVector3D();
            this._innerBoundingBox.Upper = upper._get_innerVector3D();
        }
        this._lower = new SuperMap.Web.Core.Vector3D(this._innerBoundingBox.Lower.X, this._innerBoundingBox.Lower.Y, this._innerBoundingBox.Lower.Z);
        this._upper = new SuperMap.Web.Core.Vector3D(this._innerBoundingBox.Upper.X, this._innerBoundingBox.Upper.Y, this._innerBoundingBox.Upper.Z);
        this._center = new SuperMap.Web.Core.Vector3D(this._innerBoundingBox.Center.X, this._innerBoundingBox.Center.Y, this._innerBoundingBox.Center.Z);
    }
    else {
        return;
    }

};
SuperMap.Web.Core.BoundingBox.prototype = {


    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerBoundingBox = null;
        this._center = null;
        this._lower = null;
        this._upper = null;
    },

    /*
    *innerBoundingBox对象，不对外开放
    */
    _get_innerBoundingBox: function() {

        if (this._innerBoundingBox == null) {
            return null;
        }
        return this._innerBoundingBox;
    },
    _set_innerBoundingBox: function(innerBoundingBox) {
        if (innerBoundingBox == null) {
            return null;
        }
        this._innerBoundingBox = innerBoundingBox;
    },

    toString: function() {
        /// <summary>返回一个表示此包围盒对象坐标的格式化字符串，如{(2.0,3.0,4.0)，(2.0,3.0,4.0)}。</summary>
        /// <returns type="String">表示此BoundingBox的字符串，格式为{（x,y,z),（x,y,z）}</returns>
        if (this._innerBoundingBox == null) {
            return null;
        }
        
        return "{ " + this.get_lower().toString() + ", " + this.get_upper().toString() + " }";
    },

    get_lower: function() {
        ///<value type="SuperMap.Web.Core.Vector3D"></value>

        if (this._innerBoundingBox == null) {
            return null;
        }
        if (this._lower == null) {
            this._lower = new SuperMap.Web.Core.Vector3D(0, 0, 0);
        }
        this._lower._set_innerVector3D(this._innerBoundingBox.Lower);

        return this._lower;
    },
    set_lower: function(lower) {
        if (this._innerBoundingBox == null) {
            return;
        }
        if (SuperMap.Web.Core.Vector3D.isInstanceOfType(lower)) {
            this._innerBoundingBox.Lower = lower._get_innerVector3D();
        }
    },

    get_upper: function() {
        ///<value type="SuperMap.Web.Core.Vector3D"></value>
        if (this._innerBoundingBox == null) {
            return null;
        }
        if (this._upper == null) {
            this._upper = new SuperMap.Web.Core.Vector3D(0, 0, 0);
        }
        this._upper._set_innerVector3D(this._innerBoundingBox.Upper);
        return this._upper;
    },
    set_upper: function(upper) {
        if (this._innerBoundingBox == null) {
            return;
        }
        if (SuperMap.Web.Core.Vector3D.isInstanceOfType(upper)) {
            this._innerBoundingBox.Upper = upper._get_innerVector3D();
        }

    },

    get_center: function() {
        ///<value type="SuperMap.Web.Core.Vector3D"></value>

        if (this._innerBoundingBox == null) {
            return null;
        }
        if (this._center == null) {
            this._center = new SuperMap.Web.Core.Vector3D(0, 0, 0);
        }
        this._center._set_innerVector3D(this._innerBoundingBox.Center);

        return this._center;
    },

    copy: function(boundingBox) {
        /// <summary>复制包围盒对象</summary>
        /// <param name="boundingBox" type="SuperMap.Web.Core.BoundingBox">包围盒对象</param>
        /// <returns type="void"></returns>

        if (this._innerBoundingBox == null) {
            return null;
        }
        //判断BoundingBox类型。
        if (SuperMap.Web.Core.BoundingBox.isInstanceOfType(boundingBox)) {
            if (boundingBox.isEmpty()) {
                this._innerBoundingBox = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateBoundingBox();
            }
            else {
                this.set_lower(boundingBox.get_lower());
                this.set_upper(boundingBox.get_upper());
            }
        }
    },

    /**
    * 包围盒对象比较
    * @param {SuperMap.Web.Core.BoundingBox} object
    */
    equals: function(object) {
        /// <summary>判断当前对象与参数对象是否相等</summary>
        ///<param name="object" type="SuperMap.Web.Core.BoundingBox"></param>
        ///<returns type="Boolean">是否相等</returns>
        //当前对象与object不相等时，返回为false
        if (this._innerBoundingBox == null) {
            return false;
        }
        if (!SuperMap.Web.Core.BoundingBox.isInstanceOfType(object)) {
            return false;
        }
        if (object.get_lower().equals(this.get_lower()) && object.get_upper().equals(this.get_upper())) {
            return true;
        }
        else {
            return false;
        }
    },
    /**
    * 判断包围盒对象是否为空
    */
    isEmpty: function() {
        ///<returns type="Boolean"></returns>
        if (this._innerBoundingBox == null) {
            return true;
        }
        if (SuperMap.Web.Core.Vector3D.isInstanceOfType(this._lower) && SuperMap.Web.Core.Vector3D.isInstanceOfType(this._upper)) {
            if (this._lower.isEmpty() || this._upper.isEmpty()) {
                return true;
            }
        }
        return this._innerBoundingBox.IsEmpty;
    }
};
SuperMap.Web.Core.BoundingBox.registerClass('SuperMap.Web.Core.BoundingBox');


/** 
* 类名 : Color
* 描   述： 颜色对象，其中red/green/blue/alpha的值都为0—255
* 版 本 号： 
*/
SuperMap.Web.Core.Color  = function(red, green, blue, alpha) {
	/// <param name="red" type="number">red值</param>
    /// <param name="green" type="number">green值</param>
    /// <param name="blue" type="number">blue值</param>
    /// <param name="alpha" type="number">alpha值</param>
    /// <returns type="SuperMap.Web.Core.Color"></returns>

    this._red = this._getColorInRange(red);
    this._green = this._getColorInRange(green);
    this._blue = this._getColorInRange(blue);
    this._alpha = parseInt(alpha);
    if (isNaN(this._alpha)) {
        this._alpha = 255;
    }
    else {
        this._alpha = this._getColorInRange(alpha);
    }       
};
SuperMap.Web.Core.Color.prototype = {

    _getColorInRange: function(colorValue) {
    //改用parseInt，传入非数值参数都返回NaN值
        var nColorValue = parseInt(colorValue);
        if (isNaN(nColorValue)) {
            nColorValue = 0;
        }
        return nColorValue > 255 ? 255 : (nColorValue < 0 ? 0 : nColorValue);
    },

    get_red: function() {
        ///<value type="Number" integer="true"></value>
        return this._red;
    },
    set_red: function(red) {
        this._red = this._getColorInRange(red);
    },

    get_green: function() {
        ///<value type="Number" integer="true"></value>
        return this._green;
    },
    set_green: function(green) {
        this._green = this._getColorInRange(green);
    },

    get_blue: function() {
        ///<value type="Number" integer="true"></value>

        return this._blue;
    },
    set_blue: function(blue) {
        this._blue = this._getColorInRange(blue);
    },

    get_alpha: function() {
        ///<value type="Number" integer="true"></value>
        return this._alpha;
    },
    set_alpha: function(alpha) {
        this._alpha = parseInt(alpha);
        if (isNaN(this._alpha)) {
            this._alpha = 255;
        }
        else {
            this._alpha = this._getColorInRange(alpha);
        }  
    },

    copy: function(color) {
        /// <summary>复制颜色对象</summary>
        /// <param name="color" type="SuperMap.Web.Core.Color">颜色对象</param>
        /// <returns type="void"></returns>
        //判断color类型。
        if (SuperMap.Web.Core.Color.isInstanceOfType(color)) {
            this._red = color.get_red();
            this._green = color.get_green();
            this._blue = color.get_blue();
            this._alpha = color.get_alpha();
        }

    },


    /**
    * css中使用#FFFFFF的字符串格式来表示颜色，需进行解析转换成RGB格式的。
    */
    fromRGB: function(rgb) {
        ///<param name="rgb" type="String"></param>
        ///<returns type="void"></returns>
        if (typeof (rgb) == "string") {
            var start = rgb.search(/#/);
            var colorStr = rgb.slice(start + 1, start + 7);
            var color = parseInt(colorStr, 16);
            this._red = parseInt(color >> 16, 10) & 0x00FF;
            this._green = parseInt(color >> 8, 10) & 0x00FF;
            this._blue = parseInt(color, 10) & 0x00FF;
        }
    },

    /**
    * css中使用#FFFFFF的字符串格式来表示颜色
    */
    toRGB: function() {
        ///<returns type="String"></returns>

        var red = "";
        if (this._red < 16)
        {
           red = "0" + this._red.toString(16);
        }
        else
        {
           red = this._red.toString(16);
        }
        var green = "";
        if (this._green < 16)
        {
           green = "0" + this._green.toString(16);
        }
        else
        {
           green = this._green.toString(16);
        }
        var blue = "";
        if (this._blue < 16)
        {
           blue = "0" + this._blue.toString(16);
        }
        else
        {
           blue = this._blue.toString(16);
        }
        //var longColor = (this._red << 16) | (this._green << 8) | (this._blue);
        return ("#" + red + green + blue);

    },

    //Com层使用的OLE_COLOR是以ABGR的顺序排列的32位整型
    toLongABGR: function() {
        ///<returns type="Long"></returns>    
        return (this._alpha << 24) | (this._blue << 16) | (this._green << 8) | (this._red);
    },

    fromLongABGR: function(longABGR) {
        ///<param name="longABGR" type="Number"></param>
        ///<returns type="void"></returns>

        if (!isNaN(longABGR) && (longABGR !== "")) {
            this._alpha = (longABGR >> 24) & 0x00FF;
            this._blue = (longABGR >> 16) & 0x00FF;
            this._green = (longABGR >> 8) & 0x00FF;
            this._red = longABGR & 0x00FF;
        }

    },
    toString:function(){
        return "red="+this.get_red()+",green="+this.get_green()+",blue="+this.get_blue()+",alpha="+this.get_alpha();
    }

};
SuperMap.Web.Core.Color.registerClass('SuperMap.Web.Core.Color');



/** 
* 类名 : Style3D
* 描   述： 三维风格对象
* 版 本 号： 
*/
SuperMap.Web.Core.Style3D  = function() {
    ///<returns type="SuperMap.Web.Core.Style3D"></returns>
    SuperMap.Web.Core.Style3D.initializeBase(this);

    this._innerStyle3D = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeoStyle3D();
	this._lineColor = null;
	this._fillForeColor = null;
	this._markerColor = null;
	
};
SuperMap.Web.Core.Style3D.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerStyle3D = null;
    },
    /*
    *innerStyle3D对象，不对外开放
    */
    _get_innerStyle3D: function(innerStyle3D) {

        if ( this._innerStyle3D == null) {
            return null;
        }
        return this._innerStyle3D;
    },
    _set_innerStyle3D: function(innerStyle3D) {
        if (innerStyle3D == null) {
            return null;
        }
        this._innerStyle3D = innerStyle3D;
    },

    get_altitudeMode: function() {
        ///<value type="SuperMap.Web.Realspace.AltitudeMode" integer="true"></value>

        if ( this._innerStyle3D == null) {
            return null;
        }
        return this._innerStyle3D.AltitudeMode;
    },
    set_altitudeMode: function(altitudeMode) {
        if ( this._innerStyle3D == null) {
            return;
        }
        var n_altitudeMode = parseInt(altitudeMode);
        if (!isNaN(n_altitudeMode)) {
            this._innerStyle3D.AltitudeMode = n_altitudeMode;
        }

    },

    get_bottomAltitude: function() {
        ///<value type="Number"></value>

        if ( this._innerStyle3D == null) {
            return null;
        }
        return this._innerStyle3D.BottomAltitude;
    },
    set_bottomAltitude: function(bottomAltitude) {
        if ( this._innerStyle3D == null) {
            return;
        }
        var n_bottomAltitude = parseFloat(bottomAltitude);
        if (!isNaN(n_bottomAltitude)) {
            this._innerStyle3D.BottomAltitude = n_bottomAltitude;
        }

    },

    get_extendHeight: function() {
        ///<value type="Number"></value>

        if ( this._innerStyle3D == null) {
            return null;
        }
        return this._innerStyle3D.ExtendHeight;
    },
    set_extendHeight: function(extendHeight) {
        if ( this._innerStyle3D == null) {
            return null;
        }
        var n_extendHeight = parseFloat(extendHeight);
        if (!isNaN(n_extendHeight)) {
            this._innerStyle3D.ExtendHeight = n_extendHeight;
        }

    },


    get_fillForeColor: function() {
        ///<value type="SuperMap.Web.Core.Color"></value>
        if ( this._innerStyle3D == null) {
            return null;
        }
        if (this._fillForeColor == null) {
            this._fillForeColor = new SuperMap.Web.Core.Color();
        }
        this._fillForeColor.fromLongABGR(this._innerStyle3D.FillForeColor);
        return this._fillForeColor;
    },
    set_fillForeColor: function(fillForeColor) {
        if ( this._innerStyle3D == null) {
            return;
        }
        if (SuperMap.Web.Core.Color.isInstanceOfType(fillForeColor)) {
            this._innerStyle3D.FillForeColor = fillForeColor.toLongABGR();
        }
        else if (!isNaN(parseFloat(fillForeColor))) {
            this._innerStyle3D.FillForeColor = parseFloat(fillForeColor);
        }

    },

    get_fill3DMode: function() {
        ///<value type="SuperMap.Web.Core.Fill3DMode" integer="true"></value>

        if ( this._innerStyle3D == null) {
            return null;
        }
        return this._innerStyle3D.Fill3DMode;
    },
    set_fill3DMode: function(fill3DMode) {
        if ( this._innerStyle3D == null) {
            return;
        }
        var n_fill3DMode = parseInt(fill3DMode);
        if (!isNaN(n_fill3DMode)) {
            this._innerStyle3D.Fill3DMode = n_fill3DMode;
        }

    },

    get_lineColor: function() {
        ///<value type="SuperMap.Web.Core.Color"></value>

        if ( this._innerStyle3D == null) {
            return null;
        }
        if (this._lineColor == null) {
            this._lineColor = new SuperMap.Web.Core.Color();
        }
        this._lineColor.fromLongABGR(this._innerStyle3D.LineColor);
        return this._lineColor;

    },
    set_lineColor: function(lineColor) {
        if ( this._innerStyle3D == null) {
            return;
        }
        if (SuperMap.Web.Core.Color.isInstanceOfType(lineColor)) {
            this._innerStyle3D.LineColor = lineColor.toLongABGR();
        }
        else if (!isNaN(parseFloat(lineColor))) {
            this._innerStyle3D.LineColor = parseFloat(lineColor);
        }

    },

    get_lineWidth: function() {
        ///<value type="Number" integer="false"></value>
        if ( this._innerStyle3D == null) {
            return 0;
        }
        return this._innerStyle3D.LineWidth;
    },
    set_lineWidth: function(lineWidth) {
        if ( this._innerStyle3D == null) {
            return;
        }
        var n_lineWidth = parseFloat(lineWidth);
        if (!isNaN(n_lineWidth)) {
            this._innerStyle3D.LineWidth = n_lineWidth;
        }

    },

    get_markerSymbolID: function () {
        ///<value type="Number" integer="false"></value>
        if (this._innerStyle3D == null) {
            return 0;
        }
        return this._innerStyle3D.MarkerSymbolID;
    },
    set_markerSymbolID: function (markerSymbolID) {
        if (this._innerStyle3D == null) {
            return;
        }
        var n_markerSymbolID = parseFloat(markerSymbolID);
        if (!isNaN(n_markerSymbolID)) {
            this._innerStyle3D.MarkerSymbolID = n_markerSymbolID;
        }
    },

    get_lineSymbolID: function () {
        ///<value type="Number" integer="false"></value>
        if (this._innerStyle3D == null) {
            return 0;
        }
        return this._innerStyle3D.LineSymbolID;
    },
    set_lineSymbolID: function (lineSymbolID) {
        if (this._innerStyle3D == null) {
            return;
        }
        var n_lineSymbolID = parseFloat(lineSymbolID);
        if (!isNaN(n_lineSymbolID)) {
            this._innerStyle3D.LineSymbolID = n_lineSymbolID;
        }
    },

    get_fillSymbolID: function () {
        ///<value type="Number" integer="false"></value>
        if (this._innerStyle3D == null) {
            return 0;
        }
        return this._innerStyle3D.FillSymbolID;
    },
    set_fillSymbolID: function (fillSymbolID) {
        if (this._innerStyle3D == null) {
            return;
        }
        var n_fillSymbolID = parseFloat(fillSymbolID);
        if (!isNaN(n_fillSymbolID)) {
            this._innerStyle3D.FillSymbolID = n_fillSymbolID;
        }

    },

    get_markerColor: function() {
        ///<value type="SuperMap.Web.Core.Color"></value>

        if ( this._innerStyle3D == null) {
            return null;
        }
        if (this._markerColor == null) {
            this._markerColor = new SuperMap.Web.Core.Color();
        }
        this._markerColor.fromLongABGR(this._innerStyle3D.MarkerColor);
        return this._markerColor;

    },
    set_markerColor: function(markerColor) {
        if ( this._innerStyle3D == null) {
            return;
        }
        if (SuperMap.Web.Core.Color.isInstanceOfType(markerColor)) {
            this._innerStyle3D.MarkerColor = markerColor.toLongABGR(); 
        }
        else if (!isNaN(parseFloat(markerColor))) {
            this._innerStyle3D.MarkerColor = parseFloat(markerColor);
        }
    },

    get_markerFile: function() {
        ///<value type="String"></value>
        if ( this._innerStyle3D == null) {
            return null;
        }
        return this._innerStyle3D.MarkerFile;
    },
    set_markerFile: function(markerFile) {
        if ( this._innerStyle3D == null) {
            return;
        }
        if (typeof (markerFile) == "string") {
            this._innerStyle3D.MarkerFile = markerFile;
        }

    },

    get_markerScale: function() {
        ///<value type="Number"></value>
        if ( this._innerStyle3D == null) {
            return null;
        }
        return this._innerStyle3D.MarkerScale;
    },
    set_markerScale: function(markerScale) {
        if ( this._innerStyle3D == null) {
            return;
        }
        var n_markerScale = parseFloat(markerScale);
        if (!isNaN(n_markerScale)) {
            this._innerStyle3D.MarkerScale = n_markerScale;
        }

    },

    get_markerSize: function() {
        ///<value type="Number"></value>
        if ( this._innerStyle3D == null) {
            return null;
        }
        return this._innerStyle3D.MarkerSize;
    },
    set_markerSize: function(markerSize) {
        if ( this._innerStyle3D == null) {
            return;
        }
        var n_markerSize = parseFloat(markerSize);
        if (!isNaN(n_markerSize)) {
            this._innerStyle3D.MarkerSize = n_markerSize;
        }
    },

    get_sideTextureFiles: function() {
        ///<value type="Array" elementType="String"></value>
        if ( this._innerStyle3D == null) {
            return null;
        }
        var tex = this._innerStyle3D.SideTextureFiles;
        // 处理内部的com的数组
        if (typeof (tex) == "unknown") {
           var   obj = new   VBArray(tex); 
           var   vbAry=obj.toArray();
           return vbAry;
        }
        // 处理js数组
        else if (typeof(tex) == "object") {
           return tex;
        }
        return null;
    },
    set_sideTextureFiles: function(sideTextureFiles) {
        if ( this._innerStyle3D == null) {
            return;
        }

        if (Function._validateParams(arguments, [{ name: "sideTextureFiles", type: Array, elementType: String}]) == null) {
        
            //原有方法在ie9下有问题先注掉
            //this._innerStyle3D.SideTextureFiles = sideTextureFiles;
            
            this._innerStyle3D.RemoveSideTextureFiles();
            for(var i = 0; i<sideTextureFiles.length; i++)
            {
                this._innerStyle3D.AddSideTextureFile(sideTextureFiles[i]);
            }
            this._innerStyle3D.CommitSideTextureFiles();
        }

    },

    get_topTextureFile: function() {
        ///<value type="String"></value>
        if ( this._innerStyle3D == null) {
            return null;
        }
        return this._innerStyle3D.TopTextureFile;
    },
    set_topTextureFile: function(topTextureFile) {
        if ( this._innerStyle3D == null) {
            return;
        }
        if (typeof (topTextureFile) == "string") {
            this._innerStyle3D.TopTextureFile = topTextureFile;
        }

    },


    get_tilingU: function() {
        ///<value type="Number"></value>
        if ( this._innerStyle3D == null) {
            return null;
        }
        return this._innerStyle3D.TilingU;
    },
    set_tilingU: function(tilingU) {
        if ( this._innerStyle3D == null) {
            return;
        }
        var n_tilingU = parseFloat(tilingU);
        if (!isNaN(n_tilingU)) {
            this._innerStyle3D.TilingU = n_tilingU;
        }

    },

    get_tilingV: function() {
        ///<value type="Number"></value>
        if ( this._innerStyle3D == null) {
            return null;
        }
        return this._innerStyle3D.TilingV;
    },
    set_tilingV: function(tilingV) {
        if ( this._innerStyle3D == null) {
            return;
        }
        var n_tilingV = parseFloat(tilingV);
        if (!isNaN(n_tilingV)) {
            this._innerStyle3D.TilingV = n_tilingV;
        }
    },
    
    get_iconAnchorPoint: function() {
        ///<value type="SuperMap.Web.Core.Point2D"></value>
        if ( this._innerStyle3D == null) {
            return null;
        }
        return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(this._innerStyle3D.IconAnchorPoint,"Point2D");
    },
    set_iconAnchorPoint: function(iconAnchorPoint) {
        if ( this._innerStyle3D == null) 
        {
            return;
        }
        if(SuperMap.LonLat.isInstanceOfType(iconAnchorPoint))
        {
            this._innerStyle3D.IconAnchorPoint = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(iconAnchorPoint);
        }
    },
    
    get_isMarkerSizeFixed: function() {
        ///<value type="Boolean"></value>
        if ( this._innerStyle3D == null) {
            return null;
        }
        return this._innerStyle3D.IsMarkerSizeFixed;
    },
    set_isMarkerSizeFixed: function(isFixed) {
        if ( this._innerStyle3D == null) 
        {
            return;
        }
        if(typeof (isFixed) == "boolean")
        {
            this._innerStyle3D.IsMarkerSizeFixed = isFixed;
        }
    },

    clone: function() {
        /// <summary>克隆三维风格对象</summary>
        /// <returns type="SuperMap.Web.Core.Style3D"></returns>
        if ( this._innerStyle3D == null) {
            return null;
        }

        var innerStyle3D = this._innerStyle3D.Clone();
        if (innerStyle3D == null) {
            return null;
        }
        var style3D = new SuperMap.Web.Core.Style3D();
        style3D._set_innerStyle3D(innerStyle3D);

        return style3D;

    }

};
SuperMap.Web.Core.Style3D.registerClass('SuperMap.Web.Core.Style3D',Sys.Component);


/** 
* 类名 : TextStyle3D
* 描   述： 三维文本风格类
* 版 本 号： 
*/
SuperMap.Web.Core.TextStyle3D  = function() {

    ///<returns type="SuperMap.Web.Core.TextStyle3D"></returns>
    
	this._innerTextStyle3D = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateTextStyle();
	
};
SuperMap.Web.Core.TextStyle3D.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerTextStyle3D = null;
    },
    /*
    *innerStyle3D对象，不对外开放
    */
    _get_innerTextStyle3D: function(innerStyle3D) {

        if (this._innerTextStyle3D == null) {
            return null;
        }
        return this._innerTextStyle3D;
    },
    _set_innerTextStyle3D: function(innerTextStyle3D) {
        if (innerTextStyle3D == null) {
            return null;
        }
        this._innerTextStyle3D = innerTextStyle3D;
    },
    
    
    /*
    *对齐方式
    */
    get_alignment: function() {
        ///<value type="SuperMap.Web.Core.TextAlignment"></value>

        if (this._innerTextStyle3D == null) {
            return null;
        }
        return this._innerTextStyle3D.Alignment;
    },
    set_alignment: function(alignment) {
        if (this._innerTextStyle3D == null) {
            return;
        }
        this._innerTextStyle3D.Alignment = alignment;
        
    },
    
    /*
    *背景色
    */
    get_backColor: function() {
        ///<value type="SuperMap.Web.Core.Color"></value>
        if (this._innerTextStyle3D == null) {
            return null;
        }

        var color = new SuperMap.Web.Core.Color();
        color.fromLongABGR(this._innerTextStyle3D.BackColor);
        return color;

    },
    set_backColor: function(backColor) {
        if (this._innerTextStyle3D == null) {
            return;
        }
        if (SuperMap.Web.Core.Color.isInstanceOfType(backColor)) {
            this._innerTextStyle3D.BackColor = backColor.toLongABGR(); ;
        }
        else if (!isNaN(parseFloat(backColor))) {
            this._innerTextStyle3D.BackColor = parseFloat(backColor);
        }
    },
    
    /*
    *是否背景不透明
    */
    get_backOpaque: function() {
        ///<value type="Boolean"></value>
        return this._innerTextStyle3D.BackOpaque;
    },
    set_backOpaque: function(bOpaque) {
        this._innerTextStyle3D.BackOpaque = bOpaque;
    },
    
    /*
    *是否加粗
    */
    get_bold: function() {
        ///<value type="Boolean"></value>
        return this._innerTextStyle3D.Bold;
    },
    set_bold: function(bBold) {
        this._innerTextStyle3D.Bold = bBold;
    },

    /*
    *字体高度
    */
    get_fontHeight: function() {
        ///<value type="Number"></value>
        if (this._innerTextStyle3D == null) {
            return null;
        }
        return this._innerTextStyle3D.FontHeight;
    },
    set_fontHeight: function(fontHeight) {
        if (this._innerTextStyle3D == null) {
            return;
        }
        var n_fontHeight = parseFloat(fontHeight);
        if (!isNaN(n_fontHeight)) {
            this._innerTextStyle3D.FontHeight = n_fontHeight;
        }
    },
    
    /*
    *字体名称
    */
    get_fontName: function() {
        ///<value type="String"></value>
		if (this._innerTextStyle3D == null) {
            return null;
        }
        return this._innerTextStyle3D.FontName;
    },
    set_fontName: function(name) {
        if (this._innerTextStyle3D == null) {
            return;
        }
        if (typeof (name) == "string") {
            this._innerTextStyle3D.FontName = name;
        }
    },
    
    /*
    *字体宽度
    */
    get_fontWidth: function() {
        ///<value type="Number"></value>
        if (this._innerTextStyle3D == null) {
            return null;
        }
        return this._innerTextStyle3D.FontWidth;
    },
    set_fontWidth: function(fontWidth) {
        if (this._innerTextStyle3D == null) {
            return;
        }
        var n_fontWidth = parseFloat(fontWidth);
        if (!isNaN(n_fontWidth)) {
            this._innerTextStyle3D.FontWidth = n_fontWidth;
        }
    },
    
    /*
    *是否固定大小
    */
    get_isSizeFixed: function() {
        ///<value type="Boolean"></value>
        return this._innerTextStyle3D.IsSizeFixed;
    },
    set_isSizeFixed: function(isSizeFixed) {
        this._innerTextStyle3D.IsSizeFixed = isSizeFixed;
    },
    
    /*
    *固定大小的尺寸
    */
    get_fixedSize: function() {
        ///<value type="Number"></value>
        if (this._innerTextStyle3D == null) {
            return null;
        }
        return this._innerTextStyle3D.FixedSize;
    },
    set_fixedSize: function(fixedSize) {
        if (this._innerTextStyle3D == null) {
            return;
        }
        var n_fixedSize = parseFloat(fixedSize);
        if (!isNaN(n_fixedSize)) {
            this._innerTextStyle3D.FixedSize = n_fixedSize;
        }
    },
    
    /*
    *是否斜体
    */
    get_isItalic: function() {
        ///<value type="Boolean"></value>
        return this._innerTextStyle3D.IsItalic;
    },
    set_isItalic: function(isItalic) {
        this._innerTextStyle3D.IsItalic = isItalic;
    },
    
    /*
    *倾斜角度 单位度
    */
//    get_italicAngle: function() {
//        ///<value type="Number"></value>
//        if (this._innerTextStyle3D == null) {
//            return null;
//        }
//        return this._innerTextStyle3D.ItalicAngle;
//    },
//    set_italicAngle: function(italicAngle) {
//        if (this._innerTextStyle3D == null) {
//            return;
//        }
//        var n_italicAngle = parseFloat(italicAngle);
//        if (!isNaN(n_italicAngle)) {
//            this._innerTextStyle3D.ItalicAngle = n_italicAngle;
//        }
//    },
    
    /*
    *是否显示外框
    */
    get_outline: function() {
        ///<value type="Boolean"></value>
        return this._innerTextStyle3D.Outline;
    },
    set_outline: function(outline) {
        this._innerTextStyle3D.Outline = outline;
    },
    
    /*
    *旋转角度 单位度
    */
    get_rotation: function() {
        ///<value type="Number"></value>
        if (this._innerTextStyle3D == null) {
            return null;
        }
        return this._innerTextStyle3D.Rotation;
    },
    set_rotation: function(rotation) {
        if (this._innerTextStyle3D == null) {
            return;
        }
        var n_rotation = parseFloat(rotation);
        if (!isNaN(n_rotation)) {
            this._innerTextStyle3D.Rotation = n_rotation;
        }
    },
    
    /*
    *是否阴影
    */
    get_shadow: function() {
        ///<value type="Boolean"></value>
        return this._innerTextStyle3D.Shadow;
    },
    set_shadow: function(shadow) {
        this._innerTextStyle3D.Shadow = shadow;
    },
    
    /*
    *是否删除线
    */
    get_strikeout: function() {
        ///<value type="Boolean"></value>
        return this._innerTextStyle3D.Strikeout;
    },
    set_strikeout: function(strikeout) {
        this._innerTextStyle3D.Strikeout = strikeout;
    },
    
    /*
    *是否下划线
    */
    get_underline: function() {
        ///<value type="Boolean"></value>
        return this._innerTextStyle3D.Underline;
    },
    set_underline: function(underline) {
        this._innerTextStyle3D.Underline = underline;
    },
    
    /*
    *文本的笔划宽度
    */
    get_weight: function() {
        ///<value type="Number"></value>
        if (this._innerTextStyle3D == null) {
            return null;
        }
        return this._innerTextStyle3D.Weight;
    },
    set_weight: function(weight) {
        if (this._innerTextStyle3D == null) {
            return;
        }
        var n_weight = parseFloat(weight);
        if (!isNaN(n_weight)) {
            this._innerTextStyle3D.Weight = n_weight;
        }
    },

    //value range:0-100,default value is 100
    get_opaqueRate: function() {
        ///<value type="Number"></value>

        if (this._innerTextStyle3D == null) {
            return null;
        }
        return this._innerTextStyle3D.OpaqueRate;
    },
    set_opaqueRate: function(opaqueRate) {
        if (this._innerTextStyle3D == null) {
            return;
        }
        var n_opaqueRate = parseFloat(opaqueRate);
        if (!isNaN(n_opaqueRate)) {
            this._innerTextStyle3D.OpaqueRate = n_opaqueRate;
        }

    },



    get_fontScale: function() {
        ///<value type="Number"></value>
        if (this._innerTextStyle3D == null) {
            return null;
        }
        return this._innerTextStyle3D.FontScale;
    },
    set_fontScale: function(fontScale) {
        if (this._innerTextStyle3D == null) {
            return;
        }
        var n_fontScale = parseFloat(fontScale);
        if (!isNaN(n_fontScale)) {
            this._innerTextStyle3D.FontScale = n_fontScale;
        }

    },

    //default value rgb(0, 0, 0)
    get_foreColor: function() {
        ///<value type="SuperMap.Web.Core.Color"></value>
        if (this._innerTextStyle3D == null) {
            return null;
        }

        var color = new SuperMap.Web.Core.Color();
        color.fromLongABGR(this._innerTextStyle3D.ForeColor);
        return color;

    },
    set_foreColor: function(foreColor) {
        if (this._innerTextStyle3D == null) {
            return;
        }
        if (SuperMap.Web.Core.Color.isInstanceOfType(foreColor)) {
            this._innerTextStyle3D.ForeColor = foreColor.toLongABGR(); ;
        }
        else if (!isNaN(parseFloat(foreColor))) {
            this._innerTextStyle3D.ForeColor = parseFloat(foreColor);
        }
    },

    clone: function() {
        /// <summary>克隆三维文本风格对象</summary>
        /// <returns type="SuperMap.Web.Core.TextStyle3D"></returns>
        if (this._innerTextStyle3D == null) {
            return null;
        }

        var innerTextStyle3D = this._innerTextStyle3D.Clone();
        if (innerTextStyle3D == null) {
            return null;
        }
        var textStyle3D = new SuperMap.Web.Core.TextStyle3D();
        textStyle3D._set_innerTextStyle3D(innerTextStyle3D);

        return textStyle3D;

    }

};
SuperMap.Web.Core.TextStyle3D.registerClass('SuperMap.Web.Core.TextStyle3D');

/** 
* 类名 : Feature3D
* 描   述： 三维特征要素对象
* 版 本 号： 
*/
SuperMap.Web.Core.Feature3D  = function() {
    ///<returns type="SuperMap.Web.Core.Feature3D"></returns>
    this._innerFeature3D = null;
    this._geometry = null;
    this._style3d = null;
    this._textstyle3d = null;
    this._camera = null;
    this._bDirty = false;
	this._attributes = new Object();
	//用于跟踪层对象隐藏
	this._innerTrackingLayer3D = null;
	this._nIndex = -1;
};

SuperMap.Web.Core.Feature3D.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerFeature3D = null;
        this._geometry = null;
        this._style3d = null;
        this._textstyle3d = null;
        this._bDirty = false;
		this._attributes = null;
    },
    /*
    *innerFeature3D对象，不对外开放
    */
    _get_innerFeature3D: function() {
    
        this._initialInnerObject();
        return this._innerFeature3D;
    },
    _set_innerFeature3D: function(innerFeature3D) {
        if (innerFeature3D == null) {
            return;
        }
        this._innerFeature3D = innerFeature3D;
    },

    _initialInnerObject: function() {
        if (this._innerFeature3D == null) {
           this._innerFeature3D = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateFeature3D(SuperMap.Web.Core.Feature3DType.FEATURE3DOBJECT);   
        }        
    },

    get_id: function() {
        ///<value type="Number" integer="true"></value>
        this._initialInnerObject();
        return this._innerFeature3D.ID;
    },
    set_id: function(id) {
        // 没有对是否是整型还是浮点型进行判断
        var n_id = parseInt(id);
        if (isNaN(n_id)) {
            return;
        }
        this._initialInnerObject();
        this._innerFeature3D.ID = n_id;
    },

    get_name: function() {
        ///<value type="String"></value>
        this._initialInnerObject();
        return this._innerFeature3D.Name;
    },
    set_name: function(name) {
        if (typeof (name) == "string") {
            this._initialInnerObject();
            this._innerFeature3D.Name = name;
        }

    },

    get_description: function() {
        ///<value type="String"></value>
        this._initialInnerObject();
        return this._innerFeature3D.Description;
    },
    set_description: function(description) {
        if (typeof (description) == "string") {
            this._initialInnerObject();
            this._innerFeature3D.Description = description;
        }

    },

    get_isVisible: function() {
        ///<value type="Boolean"></value>
        if(this._innerTrackingLayer3D != null)
        {
            return this._innerTrackingLayer3D.get_ItemVisible(this._nIndex);
        }
        this._initialInnerObject();
        return this._innerFeature3D.IsVisible;
    },
    set_isVisible: function(bVisible) {
        if(this._innerTrackingLayer3D != null)
        {
            this._innerTrackingLayer3D.set_ItemVisible(this._nIndex,bVisible);
            return;
        }
        this._initialInnerObject();
        this._innerFeature3D.IsVisible = bVisible;

    },

    get_visibleDistance: function() {
        ///<value type="Number"></value>
        this._initialInnerObject();
        return this._innerFeature3D.VisibleDistance;
    },
    set_visibleDistance: function(dis) {
        var n_dis = parseFloat(dis);
        if (isNaN(n_dis)) {
            return;
        }
        this._initialInnerObject();
        this._innerFeature3D.VisibleDistance = n_dis;

    },

    get_camera: function() {
        ///<value type="SuperMap.Web.Realspace.Camera"></value>
        this._initialInnerObject();
        if (this._camera == null) {
            if (this._innerFeature3D != null && this._innerFeature3D.Camera != null) {
                this._camera = SuperMap.Web.Core.Conversion._CreateObjectBySRObject(this._innerFeature3D.Camera,"Camera");
            }
        }
        return this._camera;
    },
    set_camera: function(object) {
        if (SuperMap.Web.Realspace.Camera.isInstanceOfType(object)) {
            this._camera = object;
            this._initialInnerObject();
            this._innerFeature3D.Camera = this._camera._get_innerCamera();
        }
    },

    get_geometry: function() {
        ///<value type="SuperMap.Web.Core.Geometry"></value>
        if (this._geometry != null && this._bDirty) {
               var innergeo = this._geometry._get_innerGeometry();
            if (this._style3d != null && SuperMap.Web.Core.Geometry3D.isInstanceOfType(this._geometry)) {
                innergeo.Style3D = this._style3d._get_innerStyle3D();
            }

            if (this._textstyle3d != null) {
                if (innergeo.Type == SuperMap.Web.Core.GeometryType.GEOTEXT3D) {
                    innergeo.TextStyle = this._textstyle3d._get_innerTextStyle3D();
                }
                if (innergeo.Type == SuperMap.Web.Core.GeometryType.GEOPLACEMARK) {
                    innergeo.NameStyle = this._textstyle3d._get_innerTextStyle3D();
                }
            }
            this._bDirty = false;
        }
        return this._geometry;
    },
    set_geometry: function(object) {
        this._initialInnerObject();
        if (SuperMap.Geometry.isInstanceOfType(object)) 
        {
           if (SuperMap.Web.Core.Geometry3D.isInstanceOfType(object)) 
           {
                if(object.isValid())
                {
                    this._geometry = object;
                    if (this._innerFeature3D != null) 
                    {
                        this._innerFeature3D.Geometry = this._geometry._get_innerGeometry();
                    }
                }
           }
           else
           {
               var geometry = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(object);
               if(geometry!=null)
               {
                   this._innerFeature3D.Geometry = geometry;
                   this._geometry = SuperMap.Web.Core.Conversion._CreateObjectBySRObject(geometry,"Geometry");
               }
           }
        }

    },

    get_style3D: function() {
        ///<value type="SuperMap.Web.Core.Style3D"></value>
        return this._style3d;
    },
    set_style3D: function(object) {
        if (SuperMap.Web.Core.Style3D.isInstanceOfType(object)) {
            this._style3d = object;
            if (this._geometry != null) {
                this._geometry._get_innerGeometry().Style3D = this._style3d._get_innerStyle3D();
            }
            else{
               this._bDirty = true;
            }
        }
    },

    get_textStyle3D: function() {
        ///<value type="SuperMap.Web.Core.TextStyle3D"></value>
        return this._textstyle3d;
    },
    set_textStyle3D: function(object) {
        if (SuperMap.Web.Core.TextStyle3D.isInstanceOfType(object)) {
            this._textstyle3d = object;
            if (this._geometry != null) {
                if (this._geometry._get_innerGeometry().Type == SuperMap.Web.Core.GeometryType.GEOTEXT3D) {
                    this._geometry._get_innerGeometry().TextStyle = this._textstyle3d._get_innerTextStyle3D();
                }
                if (this._geometry._get_innerGeometry().Type == SuperMap.Web.Core.GeometryType.GEOPLACEMARK) {
                    this._geometry._get_innerGeometry().NameStyle = this._textstyle3d._get_innerTextStyle3D();
                }
            }
            else{
               this._bDirty = true;
            }
        }
    },
	get_attributes: function(){
	///<value type="Object">有fieldNames属性和fieldValues属性</value>
	    return this._attributes;
	},
	set_attributes: function(object){
	    this._attributes=object;
	},
    _make: function(innergeometry) {
        this._geometry = SuperMap.Web.Core.Conversion._CreateObjectBySRObject(innergeometry,"Geometry");
        if (innergeometry.Style3D != null) {
            this._style3d = SuperMap.Web.Core.Conversion._CreateObjectBySRObject(innergeometry.Style3D,"Style3D");
        }

        if (innergeometry.Type == SuperMap.Web.Core.GeometryType.GEOTEXT3D) {
            if (innergeometry.TextStyle3D != null) {
                this._textstyle3d = SuperMap.Web.Core.Conversion._CreateObjectBySRObject(innergeometry.TextStyle3D,"TextStyle3D");
            }
        }
        if (innergeometry.Type == SuperMap.Web.Core.GeometryType.GEOPLACEMARK) {
            if (innergeometry.NameStyle != null) {
                this._textstyle3d = SuperMap.Web.Core.Conversion._CreateObjectBySRObject(innergeometry.NameStyle,"TextStyle3D");
            }
            if (innergeometry.Geometry != null) {
              this._geometry.set_geometry(innergeometry.Geometry);
            }
        }
    },

    updateData: function() {
        /// <summary>更新三维要素对象</summary>
        /// <returns type="void"></returns>
        if (this._innerFeature3D != null) {
            this._innerFeature3D.UpdateData();
        }
    },

    clone: function() {
        /// <summary>克隆三维要素对象</summary>
        /// <returns type="SuperMap.Web.Core.Feature3D"></returns>

        var feature3d = new SuperMap.Web.Core.Feature3D();
        if (this._innerFeature3D != null) {
            var innerObject = this._innerFeature3D.Clone();
            feature3d._set_innerFeature3D(innerObject);
        }

        if (this._style3d != null) {
            feature3d._style3d = this._style3d.clone();
        }
        if (this._textstyle3d != null) {
            feature3d._textstyle3d = this._textstyle3d.clone();
        }
        if (this._geometry != null) {
            feature3d._geometry = this._geometry.clone();
        }
		if(this._attributes!=null){
			feature3d._attributes = this._attributes;
		}
        return feature3d;
    }

};
SuperMap.Web.Core.Feature3D.registerClass('SuperMap.Web.Core.Feature3D',null, Sys.IDisposable);

/** 
* 类名 : Feature3Ds
* 描   述： 三维特征要素集合类，不可创建类型
* 版 本 号： 
*/
SuperMap.Web.Core.Feature3Ds  = function() {
    // 初始化基类。
    SuperMap.Web.Core.Feature3Ds.initializeBase(this);

    this._innerFeature3Ds = null; //SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateFeature3D(SuperMap.Web.Core.Feature3DType.FEATURE3DTREE);
    
    // 脚本层的数组意义与COM层的数组相同。
	this._feature3dArray = [];
		
};
SuperMap.Web.Core.Feature3Ds.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerFeature3Ds = null;
        Array.clear(this._feature3dArray);
        this._feature3dArray = [];
    },
    /*
    *innerFeature3Ds对象，不对外开放
    */
    _get_innerFeature3Ds: function() {
        if (this._innerFeature3Ds == null) {
            return null;
        }
        return this._innerFeature3Ds;
    },
    _set_innerFeature3Ds: function(innerFeature3Ds) {
        if (innerFeature3Ds == null) {
            return null;
        }
        this._innerFeature3Ds = innerFeature3Ds;
    },

    // // 基类里暂不实现的方法
    get_id: function() {
        return -1;
    },
    set_id: function(id) {
        return;
    },

    // 没有geometry属性
    get_geometry: function() {
        return null;
    },
    set_geometry: function() {
        return;
    },

    // 没有style3d属性
    get_style3D: function() {
        return null;
    },
    set_style3D: function() {
        return;
    },

    // 没有textstyle3d属性
    get_textStyle3D: function() {
        return null;
    },
    set_textStyle3D: function() {
        return;
    },

    clone: function() {
        return null;
    },

    updateData: function() {
        return;
    },
    //    
    get_count: function() {
        ///<value type="Number" integer="true"></value>
        if (this._innerFeature3Ds == null) {
            return null;
        }

        return this._innerFeature3Ds.Count;

    },

    isEmpty: function() {
        ///<returns type="Boolean"></returns>
        if (this._innerFeature3Ds == null) {
            return null;
        }
        return this._innerFeature3Ds.IsEmpty;
    },

    get_isVisible: function() {
        ///<value type="Boolean"></value>
        if (this._innerFeature3Ds == null) {
            return null;
        }
        return this._innerFeature3Ds.IsVisible;
    },
    set_isVisible: function(bvisible) {
        if (this._innerFeature3Ds == null) {
            return;
        }
        this._innerFeature3Ds.IsVisible = bvisible;
    },

    get_name: function() {
        ///<value type="String"></value>
        if (this._innerFeature3Ds == null) {
            return;
        }
        return this._innerFeature3Ds.Name;
    },
    set_name: function(name) {
        if (typeof (name) == "string") {
            if (this._innerFeature3Ds == null) {
                return;
            }
            this._innerFeature3Ds.Name = name;
        }

    },

    get_description: function() {
        ///<value type="String" ></value>
        if (this._innerFeature3Ds == null) {
            return;
        }
        return this._innerFeature3Ds.Description;
    },
    set_description: function(description) {
        if (typeof (description) == "string") {
            if (this._innerFeature3Ds == null) {
                return;
            }
            this._innerFeature3Ds.Description = description;
        }

    },

    get_visibleDistance: function() {
        ///<value type="Number"></value>
        return -1;
    },
    set_visibleDistance: function(dis) {
        return;
    },

    get_camera: function() {
        ///<value type="SuperMap.Web.Realspace.Camera"></value>
        if (this._camera == null) {
            if (this._innerFeature3Ds == null) {
                return;
            }

            this._camera = SuperMap.Web.Core.Conversion._CreateObjectBySRObject(this._innerFeature3Ds.Camera,"Camera");
        }
        return this._camera;
    },
    set_camera: function(object) {
        if (SuperMap.Web.Realspace.Camera.isInstanceOfType(object)) {
            this._camera = object;
            if (this._innerFeature3Ds == null) {
                return;
            }
            this._innerFeature3Ds.Camera = this._camera._get_innerCamera();
        }
    },
    add: function(feature3d) {
        ///<param name="feature3d" type="SuperMap.Web.Core.Feature3D"></param>
        ///<returns type="Boolean"></returns>
        if (this._innerFeature3Ds == null) {
            return;
        }

        if (SuperMap.Web.Core.Feature3D.isInstanceOfType(feature3d)) {
            var btrue = this._innerFeature3Ds.Add(feature3d._get_innerFeature3D());
            if (btrue) {
                this._feature3dArray.push(feature3d);

            }
            return btrue;
        }

    },

    insert: function(index, feature3d) {
        ///<param name="index" type="Number" integer="true"></param>
        ///<param name="feature3d" type="SuperMap.Web.Core.Feature3D"></param>
        ///<returns type="Boolean"></returns>
        if (this._innerFeature3Ds == null) {
            return;
        }
        if ((index != null) && (!isNaN(index) || typeof (index) == "string")) {
            var btrue = this._innerFeature3Ds.Insert(index, feature3d._get_innerFeature3D());
            if (btrue) {
                Array.insert(this._feature3dArray, index, feature3d);
            }
            return btrue;
            
        }
    },

    removeAt: function(index) {
        ///<param name="index" type="Number" integer="true"></param>
        ///<returns type="Boolean"></returns>
        if (this._innerFeature3Ds == null) {
            return null;
        }
        if ((index != null) && (!isNaN(index) || typeof (index) == "string")) {
            var feature3d = this.get_item(index);
            if (feature3d != null) {
                var bsucceed = this._innerFeature3Ds.RemoveAt(index);
                if (bsucceed) {
                    Array.remove(this._feature3dArray, feature3d);  
                }
                return bsucceed;
            }
        }

    },

    get_item: function(index) {
        /// <summary>获取要素集合内部元素对象</summary>
        /// <value type="SuperMap.Web.Core.Feature3D"></value>
        if (this._innerFeature3Ds == null) {
            return null;
        }
        var nIndex = -1;
        if ((index != null) && !isNaN(index)) {
            nIndex = index;
        }
        else if (typeof (index) == "string") {
            nIndex = this._indexOf(index);
        }
        if (nIndex < 0 || nIndex >= this._feature3dArray.length) {
            return null;
        }
        return this._feature3dArray[nIndex];
    },

    _indexOf: function(tag) {
        if (this._innerFeature3Ds == null) {
            return null;
        }
        if (typeof (tag) == "string") {
            return this._innerFeature3Ds.IndexOf(tag);
        }
        return -1;
    },

    exchange: function(index1, index2) {
        /// <summary>交换元素位置</summary>
        ///<param name="index1" type="Number/String" integer="true"></param>
        ///<param name="index2" type="Number/String" integer="true"></param>
        /// <returns type="void"></returns>
        if (this._innerFeature3Ds == null) {
            return;
        }
        if ((index1 != null) && (!isNaN(index1) || typeof (index1) == "string") && (index2 != null) && (!isNaN(index2) || typeof (index2) == "string")) {
            var bture = this._innerFeature3Ds.Exchange(index1, index2);
            if (bture) {
                var featuretmp = this._feature3dArray[index1];
                this._feature3dArray[index1] = this._feature3dArray[index2];
                this._feature3dArray[index2] = featuretmp;
            }
        }
    },

    _makelist: function() {
        if (this._innerFeature3Ds == null) {
            return;
        }
        for (var index = 0; index < this.get_count(); index++) {
               var item = this._innerFeature3Ds.get_Item(index);
            if (item.Type == SuperMap.Web.Core.Feature3DType.FEATURE3DOBJECT) {
                var feature3d = new SuperMap.Web.Core.Feature3D();
                feature3d._set_innerFeature3D(item);
                feature3d._make(item.Geometry);
                this._feature3dArray.push(feature3d);
            }
            else if (item.Type == SuperMap.Web.Core.Feature3DType.FEATURE3DTREE) {
                var feature3ds = new SuperMap.Web.Core.Feature3Ds();
                feature3ds._set_innerFeature3Ds(item);
                feature3ds._makelist();
                this._feature3dArray.push(feature3ds);
            }
        }
    },

    findFeature3D: function(index, option) {
        /// <summary>根据feature3d的ID值或名字查找对应的feature3d对象</summary>
        ///<param name="index" type="Number/String" integer="true"></param>
        ///<param name="option" type="SuperMap.Web.Core.Feature3DSearchOption"></param>
        ///<returns type="SuperMap.Web.Core.Feature3D"></returns>
        var bstring = false;
        if (typeof (index) == "string") {
            bstring = true;
        }
        if (option == SuperMap.Web.Core.Feature3DSearchOption.AllFeatures) {
            for (var i = 0; i < this._feature3dArray.length; i++) {

                var feature3d = this._feature3dArray[i];
                if (bstring) {
                    if (feature3d.get_name() == index) {
                        return feature3d;
                    }
                }
                else {
                    if (feature3d.get_id() == index) {
                        return feature3d;
                    }
                }
                if (SuperMap.Web.Core.Feature3Ds.isInstanceOfType(feature3d)) {
                    var child = feature3d.findFeature3D(index, option);
                    if (child != null) {
                        return child;
                    }
                }
            }
        }
        else if (option == SuperMap.Web.Core.Feature3DSearchOption.TopFeaturesOnly) {
            for (var i = 0; i < this._feature3dArray.length; i++) {
                var feature3d = this._feature3dArray[i];
                if (bstring) {
                    if (feature3d.get_name() == index) {
                        return feature3d;
                    }
                }
                else {
                    if (feature3d.get_id() == index) {
                        return feature3d;
                    }
                }
            }
        }

        return null;
    },

    removeAll: function() {
        /// <summary>清空队列并释放数据</summary>
        ///<returns type="void"></returns>
        if (this._innerFeature3Ds == null) {
            return;
        }
        this._innerFeature3Ds.RemoveAll();
        Array.clear(this._feature3dArray);
    }

};
SuperMap.Web.Core.Feature3Ds.registerClass('SuperMap.Web.Core.Feature3Ds', SuperMap.Web.Core.Feature3D, Sys.IDisposable);