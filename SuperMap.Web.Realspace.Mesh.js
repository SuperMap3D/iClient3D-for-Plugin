//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Mesh
// 功能：			网格
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Mesh  = function(innerMesh) {
    ///<returns type="SuperMap.Web.Realspace.Mesh"></returns>
    SuperMap.Web.Realspace.Mesh.initializeBase(this);
    
    
    this._innerMesh = null;
    if (innerMesh != null) {
        this._innerMesh = innerMesh;
    }
    else {    
        this._innerMesh = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateMesh();	
    }  
    if (this._innerMesh == null) {
        var ex = new Error(SuperMap.Web.Resources.Resource.getMessage("SuperMap.Web.Realspace.Resources", "Realspace_Operation_Failed"));
        ex.name = SuperMap.Web.Realspace.ExceptionName.OperationFailed;
        throw ex;
    }
};
SuperMap.Web.Realspace.Mesh.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerMesh = null;
    },
    /*
    *innerMesh对象，不对外开放
    */
    _get_innerMesh: function() {

        if (this._innerMesh == null) {
            return null;
        }
        return this._innerMesh;
    },
    _set_innerMesh: function(innerMesh) {
        if (innerMesh == null) {
            return null;
        }
        this._innerMesh = innerMesh;
    },
    
    get_vertices: function() {
        /// <summary>顶点数组</summary>
        ///<value type="Array" elementType="Number"></value>
        if (this._innerMesh == null) {
            return null;
        }
        var vertices = this._innerMesh.Vertices;
        // 处理内部的com的数组
        if (typeof (vertices) == "unknown") {
           var   obj = new   VBArray(vertices); 
           var   vbAry=obj.toArray();
           return vbAry;
        }
        // 处理js数组
        else if (typeof(vertices) == "object") {
           return vertices;
        }
        return null;
    },
    set_vertices: function(vertices) {
        if (this._innerMesh == null) {
            return;
        }

        if (Function._validateParams(arguments, [{ name: "vertices", type: Array, elementType: Number}]) == null) {
            this._innerMesh.Vertices = vertices;
        }
    },
    
    get_normals: function() {
        /// <summary>向量数组</summary>
        ///<value type="Array" elementType="Number"></value>
        if (this._innerMesh == null) {
            return null;
        }
        var normals = this._innerMesh.Normals;
        // 处理内部的com的数组
        if (typeof (normals) == "unknown") {
           var   obj = new   VBArray(normals); 
           var   vbAry=obj.toArray();
           return vbAry;
        }
        // 处理js数组
        else if (typeof(normals) == "object") {
           return normals;
        }
        return null;
    },
    set_normals: function(normals) {
        if (this._innerMesh == null) {
            return;
        }

        if (Function._validateParams(arguments, [{ name: "normals", type: Array, elementType: Number}]) == null) {
            this._innerMesh.normals = normals;
        }
    },
    
    get_textureCoords: function() {
        /// <summary>纹理坐标数组</summary>
        ///<value type="Array" elementType="Number"></value>
        if (this._innerMesh == null) {
            return null;
        }
        var textureCoords = this._innerMesh.TextureCoords;
        // 处理内部的com的数组
        if (typeof (textureCoords) == "unknown") {
           var   obj = new   VBArray(textureCoords); 
           var   vbAry=obj.toArray();
           return vbAry;
        }
        // 处理js数组
        else if (typeof(textureCoords) == "object") {
           return textureCoords;
        }
        return null;
    },
    set_textureCoords: function(textureCoords) {
        if (this._innerMesh == null) {
            return;
        }

        if (Function._validateParams(arguments, [{ name: "textureCoords", type: Array, elementType: Number}]) == null) {
            this._innerMesh.TextureCoords = textureCoords;
        }
    },
    
    get_indexes: function() {
        /// <summary>索引数组</summary>
        ///<value type="Array" elementType="Number"></value>
        if (this._innerMesh == null) {
            return null;
        }
        var indexes = this._innerMesh.Indexes;
        // 处理内部的com的数组
        if (typeof (indexes) == "unknown") {
           var   obj = new   VBArray(indexes); 
           var   vbAry=obj.toArray();
           return vbAry;
        }
        // 处理js数组
        else if (typeof(indexes) == "object") {
           return indexes;
        }
        return null;
    },
    set_indexes: function(indexes) {
        if (this._innerMesh == null) {
            return;
        }

        if (Function._validateParams(arguments, [{ name: "indexes", type: Array, elementType: Number}]) == null) {
            this._innerMesh.Indexes = indexes;
        }
    },
    
    get_diffuseColors: function() {
        /// <summary>颜色数组</summary>
        ///<value type="Array" elementType="SuperMap.Web.Core.Color"></value>
        if (this._innerMesh == null) {
            return null;
        }
        var diffuseColors = this._innerMesh.DiffuseColors;
        // 处理内部的com的数组
        if (typeof (diffuseColors) == "unknown") {
           var   obj = new   VBArray(diffuseColors); 
           var   vbAry=obj.toArray();
           for(var i=0; i<vbAry.length; i++)
           {
                var color = new SuperMap.Web.Core.Color();
                color.fromLongABGR(vbAry[i]);
                vbAry[i] = color;
           }
           return vbAry;
        }
        return null;
    },
    set_diffuseColors: function(diffuseColors) {
        if (this._innerMesh == null) {
            return;
        }
        if (Function._validateParams(arguments, [{ name: "diffuseColors", type: Array, elementType: SuperMap.Web.Core.Color}]) == null) 
        {
            var temColor = diffuseColors.slice();
            for(var i=0;i<temColor.length;i++)
            {
                temColor[i] = temColor[i].toLongABGR();
            }
            this._innerMesh.DiffuseColors = temColor;
        }
    },

    get_material: function() 
    {
        ///<value type="SuperMap.Web.Realspace.Material"></value>
        if (this._innerMesh == null)
        {
            return;
        }
        return new SuperMap.Web.Realspace.Material(this._innerMesh.Material);
    },
    set_material: function(material) 
    {
        if (this._innerMesh == null) 
        {
            return;
        }
        if (SuperMap.Web.Realspace.Material.isInstanceOfType(material)) 
        {
            if (this._innerMesh != null) 
            {
                this._innerMesh.Material = material._get_innerMaterial();
            }
        }
    }
};
SuperMap.Web.Realspace.Mesh.registerClass('SuperMap.Web.Realspace.Mesh',Sys.Component);