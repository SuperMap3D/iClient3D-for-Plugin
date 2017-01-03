//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Material
// 功能：			材质
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Material  = function(innerMaterial) {
    ///<returns type="SuperMap.Web.Realspace.Material"></returns>
    SuperMap.Web.Realspace.Material.initializeBase(this);
    this._innerMaterial = null;
    if (innerMaterial != null) {
        this._innerMaterial = innerMaterial;
    }
    else {    
        this._innerMaterial = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateMaterial();	
    }  
    if (this._innerMaterial == null) {
        var ex = new Error(SuperMap.Web.Resources.Resource.getMessage("SuperMap.Web.Realspace.Resources", "Realspace_Operation_Failed"));
        ex.name = SuperMap.Web.Realspace.ExceptionName.OperationFailed;
        throw ex;
    }
};
SuperMap.Web.Realspace.Material.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerMaterial = null;
    },
    /*
    *innerMaterial对象，不对外开放
    */
    _get_innerMaterial: function() {

        if (this._innerMaterial == null) {
            return null;
        }
        return this._innerMaterial;
    },
    _set_innerMaterial: function(innerMaterial) {
        if (innerMaterial == null) {
            return null;
        }
        this._innerMaterial = innerMaterial;
    },
    
    get_name: function() {
        /// <summary>材质名称</summary>
        ///<value type="String">材质名称</value>
        if (this._innerMaterial == null) {
            return null;
        }
        return this._innerMaterial.Name;
    },
    set_name: function(name) {
        if (this._innerMaterial == null) {
            return;
        }
        this._innerMaterial.Name = name;
    },
    
    get_textureFilePath: function() {
        /// <summary>纹理路径</summary>
        ///<value type="String">纹理路径</value>
        if (this._innerMaterial == null) {
            return null;
        }
        return this._innerMaterial.TextureFile;
    },
    set_textureFilePath: function(textureFilePath) {
        if (this._innerMaterial == null) {
            return;
        }
        this._innerMaterial.TextureFile = textureFilePath;
    },
    
    get_diffuse: function() {
        /// <summary>漫反射</summary>
        ///<value type="SuperMap.Web.Core.Color"></value>
        if (this._innerMaterial == null) {
            return null;
        }
        var diffuseColor = this._innerMaterial.Diffuse;
        // 处理内部的com的数组
        if (typeof (diffuseColor) == "unknown") {
           var obj = new   VBArray(diffuseColor); 
           var vbAry=obj.toArray();
           var color = new SuperMap.Web.Core.Color(vbAry[0]*255,vbAry[1]*255,vbAry[2]*255,vbAry[3]*255)
           return color;
        }
        return null;
    },
    set_diffuse: function(diffuseColor) {
        if (this._innerMaterial == null) {
            return;
        }
        if (SuperMap.Web.Core.Color.isInstanceOfType(diffuseColor)) {
            colorArray = [diffuseColor.get_red()/255,diffuseColor.get_green()/255,diffuseColor.get_blue()/255,diffuseColor.get_alpha()/255]
            this._innerMaterial.Diffuse = colorArray;
        }
    },
    
    get_ambient: function() {
        /// <summary>环境光</summary>
        ///<value type="SuperMap.Web.Core.Color"></value>
        if (this._innerMaterial == null) {
            return null;
        }
        var ambientColor = this._innerMaterial.Ambient;
        // 处理内部的com的数组
        if (typeof (ambientColor) == "unknown") {
           var obj = new   VBArray(ambientColor); 
           var vbAry=obj.toArray();
           var color = new SuperMap.Web.Core.Color(vbAry[0]*255,vbAry[1]*255,vbAry[2]*255,vbAry[3]*255)
           return color;
        }
        return null;
    },
    set_ambient: function(ambientColor) {
        if (this._innerMaterial == null) {
            return;
        }
        if (SuperMap.Web.Core.Color.isInstanceOfType(ambientColor)) {
            colorArray = [ambientColor.get_red()/255,ambientColor.get_green()/255,ambientColor.get_blue()/255,ambientColor.get_alpha()/255]
            this._innerMaterial.Ambient = colorArray;
        }
    },
    
    get_specular: function() {
        /// <summary>镜面反射</summary>
        ///<value type="SuperMap.Web.Core.Color"></value>
        if (this._innerMaterial == null) {
            return null;
        }
        var specularColor = this._innerMaterial.Specular;
        // 处理内部的com的数组
        if (typeof (specularColor) == "unknown") {
           var obj = new   VBArray(specularColor); 
           var vbAry=obj.toArray();
           var color = new SuperMap.Web.Core.Color(vbAry[0]*255,vbAry[1]*255,vbAry[2]*255,vbAry[3]*255)
           return color;
        }
        return null;
    },
    set_specular: function(specularColor) {
        if (this._innerMaterial == null) {
            return;
        }
        if (SuperMap.Web.Core.Color.isInstanceOfType(specularColor)) {
            colorArray = [specularColor.get_red()/255,specularColor.get_green()/255,specularColor.get_blue()/255,specularColor.get_alpha()/255]
            this._innerMaterial.Specular = colorArray;
        }
    },
    
    get_emission: function() {
        /// <summary>自发光</summary>
        ///<value type="SuperMap.Web.Core.Color"></value>
        if (this._innerMaterial == null) {
            return null;
        }
        var emissionColor = this._innerMaterial.Emission;
        // 处理内部的com的数组
        if (typeof (emissionColor) == "unknown") {
           var obj = new   VBArray(emissionColor); 
           var vbAry=obj.toArray();
           var color = new SuperMap.Web.Core.Color(vbAry[0]*255,vbAry[1]*255,vbAry[2]*255,vbAry[3]*255)
           return color;
        }
        return null;
    },
    set_emission: function(emissionColor) {
        if (this._innerMaterial == null) {
            return;
        }
        if (SuperMap.Web.Core.Color.isInstanceOfType(emissionColor)) {
            colorArray = [emissionColor.get_red()/255,emissionColor.get_green()/255,emissionColor.get_blue()/255,emissionColor.get_alpha()/255]
            this._innerMaterial.Emission = colorArray;
        }
    },
    get_shininess: function() {
        ///<value type="Number"></value>
        if (this._innerMaterial == null) {
            return null;
        }
        return this._innerMaterial.Shininess;
    },
    set_shininess: function(shininess) {
        if (this._innerMaterial == null) {
            return;
        }
        var n_shininess = parseFloat(shininess);
        if (!isNaN(n_shininess)) {
            this._innerMaterial.Shininess = n_shininess;
        }
    }
};
SuperMap.Web.Realspace.Material.registerClass('SuperMap.Web.Realspace.Material',Sys.Component);