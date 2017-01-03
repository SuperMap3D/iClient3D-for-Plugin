//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.Scene
// 功能：			 场景类，负责场景渲染与飞行浏览
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

// 去掉构造参数就减少了值的传递 add by zhaozhe
SuperMap.Web.Realspace.Scene = function (scenecontrol)
{
	SuperMap.Web.Realspace.Scene.initializeBase(this);
	if (typeof (scenecontrol) != "object" || scenecontrol == null)
	{
		var ex = new Error(SuperMap.Web.Resources.Resource.getMessage("SuperMap.Web.Realspace.Resources", "Realspace_PlugIn_Is_Not_Installed"));
		ex.name = SuperMap.Web.Realspace.ExceptionName.PlugInNotInstalled;
		throw ex;
	}
	// 严格控制对COM对象的访问，加强封装力度
	this._innerScene = scenecontrol._get_innerSceneControl().Scene;
	if (this._innerScene == null)
	{
		var ex = new Error(SuperMap.Web.Resources.Resource.getMessage("SuperMap.Web.Realspace.Resources", "Realspace_Operation_Failed"));
		ex.name = SuperMap.Web.Realspace.ExceptionName.OperationFailed;
		throw ex;
	}
	this._scenecontrol = scenecontrol;
	SuperMap.Web.Realspace.Utility._SceneControl = scenecontrol;
/////////////////////Scene的属性与scene绑定/////////////////////////////////////
	this._sceneOption = new SuperMap.Web.Realspace.SceneOption(scenecontrol);
	this._flyingOperator = new SuperMap.Web.Realspace.FlyingOperator(scenecontrol);
	this._flyManager = new SuperMap.Web.Realspace.FlyManager(scenecontrol);
	this._layer3Ds = new SuperMap.Web.Realspace.Layer3Ds(scenecontrol);
	this._terrainLayers = new SuperMap.Web.Realspace.TerrainLayers(scenecontrol);

	this._trackingLayer3D = new SuperMap.Web.Realspace.TrackingLayer3D(scenecontrol);

	this._screenLayer3D = new SuperMap.Web.Realspace.ScreenLayer3D(scenecontrol);
	this._camera = new SuperMap.Web.Realspace.Camera();
	this._camera._set_innerCamera(this._innerScene.Camera);

	this._firstPersonCamera = new SuperMap.Web.Realspace.Camera();
	this._firstPersonCamera._set_innerCamera(this._innerScene.FirstPersonCamera);

	this._underground = null;
	this._globalImage = null;
	this._atmosphere = null;
	this._splitter = [];

	this._stereo = null;
	this._sun = null;

	this._lockTarget = null;
};

SuperMap.Web.Realspace.Scene.prototype = {

    /**
    *innerScene对象
    */
    _get_innerScene: function() {
        ///<value type="SuperMap.Web.Realspace.Scene"></value>
        return this._innerScene;
    },

    /**
    *name属性
    */
    get_name: function() {
        ///<value type="string"></value>
        return this._innerScene.Name;
    },
    set_name: function(name) {
        if (typeof (name) != "string") {
            return;
        }
        this._innerScene.Name = name;
    },


    /**
    *SceneOption对象
    */
    get_sceneOption: function() {
        ///<value type="SuperMap.Web.Realspace.SceneOption"></value>
        return this._sceneOption;
    },

    /**
    *FlyingOperator对象
    */
    get_flyingOperator: function() {
        ///<value type="SuperMap.Web.Realspace.FlyingOperator"></value>
        return this._flyingOperator;
    },

    /**
    *FlyManager对象
    */
    get_flyManager: function() {
        ///<value type="SuperMap.Web.Realspace.FlyManager"></value>
        return this._flyManager;
    },

    /**
    *Layer3Ds对象
    */
    get_layer3Ds: function() {
        ///<value type="SuperMap.Web.Realspace.Layer3Ds"></value>
        return this._layer3Ds;
    },

    /**
    *TerrainLayer3Ds对象
    */
    get_terrainLayers: function() {
        ///<value type="SuperMap.Web.Realspace.TerrainLayers"></value>
        return this._terrainLayers;
    },

    /**
    *TrackingLayer3D对象
    */
    get_trackingLayer3D: function() {
        ///<value type="SuperMap.Web.Realspace.TrackingLayer3D"></value>
        return this._trackingLayer3D;
    },

    /**
    *ScreenLayer3D对象
    */
    get_screenLayer3D: function() {
        ///<value type="SuperMap.Web.Realspace.ScreenLayer3D"></value>
        return this._screenLayer3D;
    },

    /**
    *camera对象
    */
    get_camera: function() {
        ///<value type="SuperMap.Web.Realspace.Camera"></value>
        this._camera._set_innerCamera(this._innerScene.Camera);
        return this._camera;
    },
    set_camera: function(camera) {
        if (SuperMap.Web.Realspace.Camera.isInstanceOfType(camera)) {
            this._innerScene.Camera = camera._get_innerCamera();
            this._camera = camera;
        }
    },

    /**
    *第一人称相机
    */
    get_firstPersonCamera: function() {
        ///<value type="SuperMap.Web.Realspace.Camera"></value>
        this._firstPersonCamera._set_innerCamera(this._innerScene.FirstPersonCamera);
        return this._firstPersonCamera;
    },
    set_firstPersonCamera: function(camera) {
        if (SuperMap.Web.Realspace.Camera.isInstanceOfType(camera)) {
            this._innerScene.FirstPersonCamera = camera._get_innerCamera();
            this._firstPersonCamera = camera;
        }
    },

	//场景的视角
	get_fov: function(){
		///<value type="number" integer="false"></value>
		return this._innerScene.Fov;
		},
	set_fov: function(fov){
		var f_fov = parseFloat(fov);
        if (isNaN(f_fov)||(fov<0)||(fov>180)) {
            return;
		}
		this._innerScene.Fov=f_fov;
		},
    /**
    *terrainExaggeration属性
    */
    get_terrainExaggeration: function() {
        ///<value type="number"></value>
        return this._innerScene.TerrainExaggeration;
    },
    set_terrainExaggeration: function(exaggerationRatio) {

        var n_exaggerationRatio = parseFloat(exaggerationRatio);
        if (isNaN(n_exaggerationRatio)) {
            return;
        }
        this._innerScene.TerrainExaggeration = n_exaggerationRatio;
        //刷新地形图层
        this.resetTerrain();
    },

    /**
    *currentScale属性
    */
    get_currentScale: function() {
        ///<value type="Number"></value>
        return this._innerScene.CurrentScale;
    },

	get_viewBounds: function()
	{
        var bounds = this._innerScene.ViewBounds;
		if (bounds == null)
		{
			return null;
		}
        return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(bounds,"Rectangle2D");

	},

	get_viewWndHeight: function()
	{
        return this._innerScene.ViewWndHeight;
	},

	get_viewWndWidth: function()
	{
        return this._innerScene.ViewWndWidth;
	},

    /**
    *VectorDrawMode对象
    */
    // 	get_vectorDrawMode:function()
    // 	{
    // 		///<value type="SuperMap.Web.Realspace.VectorDrawMode"></value>
    // 		return this._innerScene.VectorDrawMode;
    // 	},
    // 	set_vectorDrawMode:function(vectorDrawMode)
    // 	{
    //         if (!isNaN(vectorDrawMode) && (vectorDrawMode !== ""))
    //         {
    //             this._innerScene.VectorDrawMode = vectorDrawMode;
    //         }
    //
    // 	},


    /**
    *保存场景
    */
//     save: function(nVersion) {
//         ///<param name="nVersion" type="number" integer="true">GML的版本</param>
//         ///<returns type="string">保存的场景文件的URL</returns>
//         var n_nVersion = parseInt(nVersion);
//         if (!isNaN(n_nVersion) ) {
//             return this._innerScene.Save(n_nVersion);
//         }
//     },

    /**
    *打开场景文件
    */
    open: function(strServerRootUrl, sceneName) {
        ///<param name="strServerRootUrl" type="String">场景文件的URL</param>
        ///<param name="sceneName" type="String">场景名称</param>
        ///<returns type="boolean">是否成功</returns>

        this.close();

        var isdone = this._innerScene.Open(strServerRootUrl, sceneName);
        if (isdone == true) {
            var innerLayer3Ds = this._innerScene.Layer3Ds;
            var layerCount = innerLayer3Ds.Count;
            for (var i = 0; i < layerCount; i++) {
                var innerLayer3D = innerLayer3Ds.get_Item(i);
								var layer3D;
								if(innerLayer3D.Type === 15) {
									layer3D = new SuperMap.Web.Realspace.Layer3DOSGB(strServerRootUrl, innerLayer3D.Name, innerLayer3D.DataName, innerLayer3D);
								}else {
									layer3D = new SuperMap.Web.Realspace.Layer3D(strServerRootUrl, innerLayer3D.Name, innerLayer3D.DataName, innerLayer3D.Type, innerLayer3D);
								}
          
                this.get_layer3Ds()._get_layer3DArray().push(layer3D);

            }

            layerCount = this._innerScene.TerrainLayers.Count;
            var innerTerrainLayers = this._innerScene.TerrainLayers;
            for (var i = 0; i < layerCount; i++) {
                innerTerrainLayer = innerTerrainLayers.get_Item(i);
                var terrain = new SuperMap.Web.Realspace.TerrainLayer(strServerRootUrl, innerTerrainLayer.Name, innerTerrainLayer.DataName);
                this.get_terrainLayers()._get_terrainLayerArray().push(terrain);

            }

        }
        return isdone;
    },

    /**
    *关闭场景
    */
    close: function() {
        ///<returns type="void"></returns>
        this.get_layer3Ds().removeAll();
        this.get_terrainLayers().removeAll();
        this.get_trackingLayer3D().removeAll();
        this.get_screenLayer3D().removeAll();
        this._innerScene.Close();
    },


    /**
    *刷新场景
    */
    refresh: function() {
        ///<returns type="void"></returns>
        this._innerScene.Refresh();
    },
    /**
    * 场景视图是否改变
    */
    getViewWorldState: function() {
        ///<returns type="void"></returns>
        return this._innerScene.GetViewProjectMatrixState();
    },

    /**
    * 全幅显示场景
    */
    viewEntire: function() {
        ///<returns type="void"></returns>
        this._innerScene.ViewEntire();
    },

    /**
    * 设置实时栅格化是否更新，解决kml的面数据
    */
    setRefreshRaster: function(bRefreshRaster) {
        ///<param name="bRefreshRaster" type="bool">是否刷新标识</param>
        ///<returns type="void"></returns>
        this._innerScene.SetRefreshRaster(bRefreshRaster);
    },

    /**
    *重置地形图层 涉及地形的添、删、可见不可见操作时，解决地形数据的刷新问题
    */
    resetTerrain: function() {
        ///<returns type="void"></returns>
        this._innerScene.ResetTerrain();
    },

    /**
    *获取平均帧数方法，不开放仅供内部测试使用。
    */
    getAverageFPS: function() {
        ///<returns type="Number"></returns>
        return this._innerScene.GetAverageFPS();
    },

    /**
    *获取当前三维场景中的选择集集合,
    */
    findSelection3Ds: function(hasObjectSelected) {
        ///<param name="HasObjectSelected" type="bool">是否只返回不为空的选择集</param>
        ///<returns type="Array" elementType="SuperMap.Web.Realspace.Selection3D"></returns>
        var nCount = this._layer3Ds.get_count();
        var selection3Ds = [];
        if (!hasObjectSelected) {
            this.setRefreshRaster(true);
            for (var i = 0; i < nCount; i++) {
                var layer3D = this._layer3Ds.get_item(i);
                if (layer3D.get_type() != SuperMap.Web.Realspace.Layer3DType.IMAGE && layer3D.get_type() != 4) {
                    selection3Ds.push(layer3D.get_selection3D());
                }
            }
        }
        else {
            for (var i = 0; i < nCount; i++) {
                var layer3D = this._layer3Ds.get_item(i);

				if(SuperMap.Web.Realspace.Layer3DWMTS.isInstanceOfType(layer3D) ||SuperMap.Web.Realspace.Layer3DWMS.isInstanceOfType(layer3D) ){
                   continue;
                }

                if (layer3D.get_isSelectable() && layer3D.get_selection3D().get_count() && layer3D.get_type() != SuperMap.Web.Realspace.Layer3DType.IMAGE && layer3D.get_type() != 4/*SuperMap.Web.Realspace.Layer3DType.GEIMAGE*/) {
                    selection3Ds.push(layer3D.get_selection3D());
                }
            }
        }
        return selection3Ds;
    },
    /**
    *删除该场景缓存数据
    */
    updateCacheFile:function()
    {
        var size = 0;
        for (var i = 0; i < this._layer3Ds.get_count(); i++)
        {
            var layer3D = this._layer3Ds.get_item(i);
            size += layer3D.updateCacheFile();
        }

        for (var i = 0; i < this._terrainLayers.get_count(); i++)
        {
            var terrainLayer = this._terrainLayers.get_item(i);
            size += terrainLayer.updateCacheFile();
        }
        return size;
    },

    /**
    *获取场景数据下载进度，以图层为基础，即所有图层下载进度的均值
    */
    getDataStreamingProgress:function()
    {
        var progress = 0;
        for (var i = 0; i < this._layer3Ds.get_count(); i++)
        {
            var layer3D = this._layer3Ds.get_item(i);
            progress += layer3D.getDataStreamingProgress();
        }

        for (var i = 0; i < this._terrainLayers.get_count(); i++)
        {
            var terrainLayer = this._terrainLayers.get_item(i);
            progress += terrainLayer.getDataStreamingProgress();
        }
        var averageProgress = progress/(this._layer3Ds.get_count()+this._terrainLayers.get_count());
        return averageProgress;
    },

    /**
    *underground对象
    */
    get_underground: function() {
        ///<value type="SuperMap.Web.Realspace.Underground"></value>
        if(this._underground == null)
        {
            this._underground = new SuperMap.Web.Realspace.Underground();
            this._underground._innerUnderground = this._innerScene.Underground;
        }
        return this._underground;
    },

    /**
    *globalImage对象
    */
    get_globalImage: function() {
        ///<value type="SuperMap.Web.Realspace.GlobalImage"></value>
        if(this._globalImage == null)
        {
            this._globalImage = new SuperMap.Web.Realspace.GlobalImage();
            this._globalImage._innerGlobalImage = this._innerScene.GlobalImage;
        }
        return this._globalImage;
    },

    /**
    *atmosphere对象
    */
    get_atmosphere: function () {
        ///<return type="SuperMap.Web.Realspace.Atmosphere">返回大气对象</value>
        if (this._atmosphere == null) {
            this._atmosphere = new SuperMap.Web.Realspace.Atmosphere();
            this._atmosphere._innerAtmosphere = this._innerScene.Atmosphere;
        }
        return this._atmosphere;
    },
    /**
    *获得指定名称的splitter对象
    */
    getSplitter: function (name) {
        ///<param name="name" type="String">分隔条名称</param>
        ///<return type="SuperMap.Web.Realspace.Splitter">返回分隔条对象</value>
        var splitter = new SuperMap.Web.Realspace.Splitter();
        splitter._innerSplitter = this._innerScene.GetSplitter(name);
        return splitter;
    },
    /**
    *增加指定名称的splitter对象
    */
    addSplitter: function (name) {
        ///<param name="name" type="String">分隔条名称</param>
        ///<return type="SuperMap.Web.Realspace.Splitter">返回分隔条对象</value>
        var splitter = new SuperMap.Web.Realspace.Splitter();
        splitter._innerSplitter = this._innerScene.AddSplitter(name);
        this._splitter.push(splitter);
        return splitter;
    },
    /**
    *删除指定名称的splitter对象
    */
    removeSplitter: function (name) {
        ///<param name="name" type="String">分隔条名称</param>
        ///<return type="Boolean">删除是否成功</value>
        return this._innerScene.RemoveSplitter(name);
    },
    /**
    *获得分隔条对象的数量
    */
    get_splitterCount: function () {
        ///<return type="Number">返回分隔条对象数量</value>
        return this._innerScene.SplitterCount();
    },
    /**
    *stereo对象
    */
    get_stereo: function() {
        ///<value type="SuperMap.Web.Realspace.Stereo"></value>

        if(this._stereo == null)
        {
            this._stereo = new SuperMap.Web.Realspace.Stereo(this._scenecontrol);
        }
        return this._stereo;
    },

    /**
    *sun对象
    */
    get_sun: function() {
        ///<value type="SuperMap.Web.Realspace.Sun"></value>

        if(this._sun == null)
        {
            this._sun = new SuperMap.Web.Realspace.Sun(this._scenecontrol);
        }
        return this._sun;
    },

    /**
    *场景的跟踪对象
    */
	get_autoLockTarget: function ()
	{
		///<value type="SuperMap.Web.Core.GeoModel"></value>
		return this._lockTarget;
	},
    set_autoLockTarget: function(geoModel)
    {
        ///<param name="geoModel" type="SuperMap.Web.Core.GeoModel">跟踪对象</param>
        if(SuperMap.Web.Core.GeoModel.isInstanceOfType(geoModel))
        {
			this._lockTarget = geoModel;
            this._innerScene.SetAutoLockTarget(geoModel._innerGeometry);
        }
        else
        {
			this._lockTarget = null;
            this._innerScene.UnLockTarget();
        }
    },

    /**
    *场景跟踪对象的偏移量
    */
    get_autoLockOffset: function()
    {
        ///<value type="SuperMap.Web.Core.Point3D"></value>
        var autoLockOffset = this._innerScene.AutoLockOffset;
        return new SuperMap.Web.Core.Point3D(autoLockOffset.X,autoLockOffset.Y,autoLockOffset.Z);
    },
    set_autoLockOffset: function(autoLockOffset)
    {
        if (SuperMap.Web.Core.Point3D.isInstanceOfType(autoLockOffset))
        {
            this._innerScene.AutoLockOffset = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(autoLockOffset);
        }
    },

    /**
    *场景类型
    */
    get_type: function()
    {
        ///<value type="SuperMap.Web.Realspace.SceneType"></value>
		if ((this._innerScene == null))
        {
             return ;
        }
        return this._innerScene.Type;
    },
    set_type: function(type)
    {
		if ((this._innerScene == null))
        {
             return ;
        }
        this._innerScene.Type = type;
    },

    /**
    *小场景操作范围
    */
    get_bounds: function()
    {
        ///<value type="SuperMap.Web.Core.Rectangle2D">小场景操作范围</value>
    	if ((this._innerScene == null))
        {
             return ;
        }
        var bounds = this._innerScene.Bounds;
		if (bounds == null)
		{
			return null;
		}
        return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(bounds,"Rectangle2D");
    },
    set_bounds: function(bounds)
    {
		if ((this._innerScene == null))
        {
             return ;
        }
        this._innerScene.Bounds = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(bounds);
    },

    /*
	*属性:是否第一人称方式操作摄像机
	*/
	get_isFirstPersonView:function()
	{
		///<value type="boolean"></value>
	    if ((this._innerScene == null))
        {
             return ;
        }
        return this._innerScene.IsFirstPersonView;

	},
	set_isFirstPersonView:function(bVisible)
	{
	    if ((this._innerScene == null))
        {
             return ;
        }
        this._innerScene.IsFirstPersonView = bVisible;

	},


	/**
    *获取地面上某点的海拔高度
    */
    getAltitude: function(longitude, latitude)
    {
        ///<param name="longitude" type="number">经度</param>
        ///<param name="latitude" type="number">纬度</param>
        ///<returns type="number" >海拔高度</returns>
        return this._innerScene.GetAltitude(longitude, latitude);
    },

		/**
			*获取场景中地面和模型上某点的海拔高度
			*/
			getHeight: function(longitude, latitude)
			{
					///<param name="longitude" type="number">经度</param>
					///<param name="latitude" type="number">纬度</param>
					///<returns type="number" >海拔高度</returns>
					return this._innerScene.GetHeight(longitude, latitude);
			},



    /**
    *输出场景为图片
    */
    outputSceneToFile: function(strFilePath, imageType) {
        ///<param name="strFilePath" type="String">文件全路径URL</param>
        ///<param name="imageType" type="SuperMap.Web.Realspace.ImageType">图片类型</param>
        ///<returns type="boolean">是否成功</returns>

        return this._innerScene.OutputSceneToFile(strFilePath, imageType,true);
    },

    /**
     *输出场景为图片(不需要数据下载完成时)
     */
    outputSceneToImg: function(strFilePath, imageType) {
        ///<param name="strFilePath" type="String">文件全路径URL</param>
        ///<param name="imageType" type="SuperMap.Web.Realspace.ImageType">图片类型</param>
        ///<returns type="boolean">是否成功</returns>

        return this._innerScene.OutputSceneToFile(strFilePath, imageType,false);
    },

    /**
     * 获得碰撞检测状态
     */
    get_collisionDetection:function(){
    	return this._innerScene.CollisionDetection;
    },

    /**
     * 设置是否开启碰撞检测
     */
    set_collisionDetection:function(bValue){
        this._innerScene.CollisionDetection = bValue;
    },


	/**
     * 获得碰撞检测距离
     */
    get_collisionDistanceThreshold:function(){
    	return this._innerScene.CollisionDistanceThreshold;
    },

    /**
     * 设置碰撞检测距离
     */
    set_collisionDistanceThreshold:function(distance){
        this._innerScene.CollisionDistanceThreshold = distance;
    },


    /**
     * 获得多视口模式
     */
    get_multiViewportMode:function(){
        return this._innerScene.MultiViewportMode;
    },

    /**
     * 设置多视口模式
     */
    set_multiViewportMode:function(value){
        this._innerScene.MultiViewportMode = value;
    },

    /**
     * 获得场景行走模式
     */
    get_walkingMode:function(){
    	return this._innerScene.WalkingMode;
    },

    /**
     * 设置场景行走模式
     */
    set_walkingMode:function(value){
    	this._innerScene.WalkingMode = value;
    },

    /**
     * 设置下载的方式
     */
    set_configueDownloadStyle:function(value){
        ///<param name="value" type="SuperMap.Web.Realspace.ConfigueDownLoadStyle">配置文件下载方式</param>
        this._innerScene.SetConfigueDownType(value);
    },

		/**
		 * 获取或设置相机到近裁剪面的距离，即相机能看见的最近距离
		 */
		get_cameraNearClipDistance:function(){
			  ///<returns type="number"></returns>
				return this._innerScene.CameraNearClipDistance;
		},

		set_cameraNearClipDistance:function(value){
				///<param name="value" type="number"></param>
				if(typeof value !== "number"){
				    return;
				}
				this._innerScene.CameraNearClipDistance = value;
		},

		/**
		 * 获取或设置相机到远裁剪面的距离，即相机能看见的最远距离
		 */
		get_cameraFarClipDistance:function(){
				///<returns type="number"></returns>
				return this._innerScene.CameraFarClipDistance;
		},

		set_cameraFarClipDistance:function(value){
				///<param name="value" type="number"></param>
		    if(typeof value !== "number"){
				    return;
			  }
		    this._innerScene.CameraFarClipDistance = value;
		},

		/**
		 * 计算两点的球面距离
		 */
		 computeSphericalDistance:function(point1, point2){
			 	 if(this._innerScene === null){
				     return;
				 }

		     if(!SuperMap.LonLat.isInstanceOfType(point1) || !SuperMap.LonLat.isInstanceOfType(point2)){
				     return;
				 }

				 var left = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(point1);
				 var right = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(point2);

				 return this._innerScene.ComputeSphericalDistance(left, right);
		 }
};
SuperMap.Web.Realspace.Scene.registerClass('SuperMap.Web.Realspace.Scene', Sys.Component);
