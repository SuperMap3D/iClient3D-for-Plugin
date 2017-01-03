//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.AsyncHelper
// 功能：			异步获取器
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.AsyncHelper = function(scenecontrol) {

    SuperMap.Web.Realspace.AsyncHelper.initializeBase(this);

    this._innerObjectManager = scenecontrol._get_innerObjectManager();
    
	if (this._innerObjectManager == null) 
	{
		var ex = new Error(SuperMap.Web.Resources.Resource.getMessage("SuperMap.Web.Realspace.Resources", "Realspace_Operation_Failed"));
		ex.name = SuperMap.Web.Realspace.ExceptionName.OperationFailed;
		throw ex;
	}    
};

SuperMap.Web.Realspace.AsyncHelper.prototype = {

    //////////////////////////////////
    ///添加事件
    //////////////////////////////////	
    _addEvent: function(eventName, handler) {
        ///<param name="eventName" type="String"></param>
        ///<param name="handler" type="Object"></param> 
        ///<returns type="Boolean" ></returns>
        this.get_events().addHandler(eventName, handler);
    },
    //////////////////////////////////
    ///删除事件
    //////////////////////////////////	
    _removeEvent: function(eventName, handler) {
        ///<param name="eventName" type="String"></param>
        ///<param name="handler" type="Object"></param> 
        ///<returns type="Boolean" ></returns>
        this.get_events().removeHandler(eventName, handler);
    },

    //////////////////////////////////
    ///触发绑定事件，不对外开放
    //////////////////////////////////		
    _raiseEvent: function(eventName, arguments, userContext) {
        var handler = this.get_events().getHandler(eventName);
        if (handler) {
            handler(arguments, userContext);
        }
    },


    asyncFetchModel: function(modelUrl, fetchModelFinishedHandler) {
        /// <summary>异步下载模型对象</summary>
        ///<param name="modelUrl" type="String">模型网络地址</param>
        ///<param name="fetchModelFinishedHandler" type="Function">下载成功后的回调函数</param>
        /// <returns type="void">通过回调函数返回GeoModel对象</returns>
        if (typeof (modelUrl) != "string" || typeof (fetchModelFinishedHandler) != "function" || modelUrl === "") {
            return false;
        }
        if (this._innerObjectManager == null) {
            return false;
        }

        this._removeEvent("fetchModelFinished", fetchModelFinishedHandler);
        this._addEvent("fetchModelFinished", fetchModelFinishedHandler);
        this._innerObjectManager.AsyncFetchModel(modelUrl);
        return true;
    },

    _asyncFetchModelFinished: function(innerGeoModel, sceneControl) {
        
        if (innerGeoModel != null)
        {
            var geoModel = SuperMap.Web.Core.Conversion._CreateObjectBySRObject(innerGeoModel,"Geometry");
            this._raiseEvent("fetchModelFinished", geoModel);           
        }
        else if (innerGeoModel == null || innerGeoModel == 0) {
           this._raiseEvent("fetchModelFinished", null);
        }
        return ;

    },

    asyncFetchPicture3D: function(picture3DUrl, fetchPicture3DFinishedHandler) {
        /// <summary>异步下载图片对象</summary>
        ///<param name="modelUrl" type="String">图片网络地址</param>
        ///<param name="fetchPicture3DFinishedHandler" type="Function">下载成功后的回调函数</param>
        /// <returns type="void">通过回调函数返回GeoPicture3D对象</returns>
        if (typeof (picture3DUrl) != "string" || typeof (fetchPicture3DFinishedHandler) != "function" || picture3DUrl === "") {
            return false;
        }

        if (this._innerObjectManager == null) {
            return false;
        }

        this._removeEvent("fetchPicture3DFinished", fetchPicture3DFinishedHandler);
        this._addEvent("fetchPicture3DFinished", fetchPicture3DFinishedHandler);
        this._innerObjectManager.AsyncFetchPicture3D(picture3DUrl);
        return true;
    },

    _asyncFetchPicture3DFinished: function(innerGeoPicture3D, sceneControl) {
    
        if (innerGeoPicture3D != null) {
            var geoPicture3D = SuperMap.Web.Core.Conversion._CreateObjectBySRObject(innerGeoPicture3D,"Geometry");
            this._raiseEvent("fetchPicture3DFinished", geoPicture3D);
        }
        else if (innerGeoPicture3D == null || innerGeoPicture3D == 0) {
           this._raiseEvent("fetchPicture3DFinished", null);
        }
        return ;
    },

    asyncFetchLayer3D: function(serverAddress, layerName, dataName, layerType, fetchLayer3DFinishedHandler) {

        /// <summary>异步下载影像、模型的图层配置文件以及kml、kmz</summary>
        ///<param name="serverAddress" type="String">服务器地址</param>
        ///<param name="layerName" type="String">图层名</param>
        ///<param name="dataName" type="String">数据名</param>
        ///<param name="layerType" type="SuperMap.Web.Realspace.Layer3DType">图层类型</param>
        ///<param name="fetchLayer3DFinishedHandler" type="Function">下载成功后的回调函数</param>
        /// <returns type="void">通过回调函数返回3D图层对象</returns>
        var n_layerType = parseInt(layerType);
        if (typeof (serverAddress) != "string" || typeof (layerName) != "string" || typeof (dataName) != "string" ||
            isNaN(n_layerType) || typeof (fetchLayer3DFinishedHandler) != "function" || serverAddress ==="") {
            return false;
        }
        if (this._innerObjectManager == null) {
            return false;
        }

        this._removeEvent("fetchLayer3DFinished", fetchLayer3DFinishedHandler);
        this._addEvent("fetchLayer3DFinished", fetchLayer3DFinishedHandler);
        this._innerObjectManager.AsyncFetchLayer3D(serverAddress, layerName, dataName, n_layerType);
        return true;
    },

    _asyncFetchLayer3DFinished: function(innerLayer3D, sceneControl) {
        
        if (innerLayer3D != null) {
           var layer3D = SuperMap.Web.Core.Conversion._CreateObjectBySRObject(innerLayer3D,"Layer3D");
           this._raiseEvent("fetchLayer3DFinished", layer3D);
        }
        else if (innerLayer3D == null || innerLayer3D == 0) {
           this._raiseEvent("fetchLayer3DFinished", null);
           
        }
        return ;
    }

};
SuperMap.Web.Realspace.AsyncHelper.registerClass('SuperMap.Web.Realspace.AsyncHelper', Sys.Component, Sys.IDisposable);
