//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Meshes
// 功能：			网格集合
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Meshes  = function(innerMeshes) {
    ///<returns type="SuperMap.Web.Realspace.Meshes"></returns>
    SuperMap.Web.Realspace.Meshes.initializeBase(this);

    this._innerMeshes = null;	
    
    if (innerMeshes != null) {
        this._innerMeshes = innerMeshes;
    }
    if (this._innerMeshes == null) {
        var ex = new Error(SuperMap.Web.Resources.Resource.getMessage("SuperMap.Web.Realspace.Resources", "Realspace_Operation_Failed"));
        ex.name = SuperMap.Web.Realspace.ExceptionName.OperationFailed;
        throw ex;
    }
};
SuperMap.Web.Realspace.Meshes.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerMeshes = null;
    },
    /*
    *innerMeshes对象，不对外开放
    */
    _get_innerMeshes: function() {

        if (this._innerMeshes == null) {
            return null;
        }
        return this._innerMeshes;
    },
    _set_innerMeshes: function(innerMeshes) {
        if (innerMeshes == null) {
            return null;
        }
        this._innerMeshes = innerMeshes;
    },
    
    get_count: function() {
        /// <summary>网格个数</summary>
        ///<value type="Number"></value>
        if (this._innerMeshes == null) {
            return null;
        }
        return this._innerMeshes.Count;
    },
    
    get_item: function(index) {
        /// <summary>根据索引获得Mesh对象</summary>
        ///<value type="SuperMap.Web.Realspace.Mesh"></value>
        if (this._innerMeshes == null) {
            return null;
        }
        return new SuperMap.Web.Realspace.Mesh(this._innerMeshes.Item(index));
    },
    set_item: function(index,mesh) {
        if (this._innerMeshes == null) {
            return;
        }

       if (SuperMap.Web.Realspace.Mesh.isInstanceOfType(mesh)) 
       {
            this._innerMeshes.Item(index)= mesh._get_innerMesh();
       }
    },
    
    
    add: function(mesh) 
    {
        ///<param name="mesh" type="SuperMap.Web.Realspace.Mesh">mesh对象</param>
        ///<returns type="Number">若添加成功返回ID</returns>
        if (this._innerMeshes == null) 
        {
            return;
        }
       if (SuperMap.Web.Realspace.Mesh.isInstanceOfType(mesh)) 
       {
            return this._innerMeshes.Add(mesh._get_innerMesh());
       }
    },
    
    insert: function(index,mesh) 
    {
        ///<param name="index" type="Int" elementType="Number" integer="true">对象Id</param>
        ///<param name="mesh" type="SuperMap.Web.Realspace.Mesh">mesh对象</param>
        if (this._innerMeshes == null) 
        {
            return;
        }
       if (SuperMap.Web.Realspace.Mesh.isInstanceOfType(mesh)) 
       {
            return this._innerMeshes.Insert(index,mesh._get_innerMesh());
       }
    },
    
    remove: function(index) 
    {
        /// <summary>根据索引移除Mesh对象</summary>
        ///<param name="index" type="Int" elementType="Number" integer="true">对象Id</param>
        if (this._innerMeshes == null) 
        {
            return;
        }
       if (SuperMap.Web.Realspace.Mesh.isInstanceOfType(mesh)) 
       {
            return this._innerMeshes.Remove(index);
       }
    },
    
    clear: function() 
    {
        /// <summary>清空网格数组</summary>
        if (this._innerMeshes == null) 
        {
            return;
        }
        this._innerMeshes.Clear();
    }
};
SuperMap.Web.Realspace.Meshes.registerClass('SuperMap.Web.Realspace.Meshes',Sys.Component);