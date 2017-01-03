//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.iServerJava6R.Data3D.js  
// 功能：			 iServerJava6R Data3D服务主要是构建查询参数和查询结果的回调提取
// 最后修改时间：	2009-8-8
//========================================================================== 
//------------------------GetFeaturesBy**Service------------------------------------------------
Type.registerNamespace('SuperMap.Web.iServerJava6R.Data3D');

SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsResult = function() {
	/// <summary>查询要素结果类</summary>
	this._featureCount = null;
	this._feature3Ds = null;
	this._featureUriList = null;
};
SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsResult.prototype = {

	get_featureCount:function(){
   	/// <value type="Number" integer="true">要素的数目。</value>
         return this._featureCount;
    },
	get_feature3Ds:function(){
   	/// <value type="Array" elementType="SuperMap.Web.Core.Feature3D">当前查询返回的要素集合。</value>
         return this._feature3Ds;
    }  
};
SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsResult.fromJson = function(jsonObject){
	//从json对象转换到feature3d
    if(!jsonObject){return;}
	var result = new SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsResult();
	result._featureCount = jsonObject.featureCount;
	if(jsonObject.features){
		result._feature3Ds = new Array();
		for(var i=0;i<jsonObject.features.length;i++){
			result._feature3Ds[i] = SuperMap.Web.iServerJava6R.ServerFeature.fromJson(jsonObject.features[i]).toFeature3D();
		}
	}
	return result;
};
SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsResult.registerClass('SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsResult');

SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsEventArgs = function(result, originResult) {
	/// <summary>查询要素事件参数类。</summary>

	this._result = result;
	this._originResult = originResult;
};
SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsEventArgs.prototype = {

	get_result:function(){
   	/// <value type="SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsResult">查询结果</value>
         return this._result;
    }
};
SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsEventArgs.registerClass('SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsEventArgs');

SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsParametersBase = function() {
	/// <summary>要素查询参数基类</summary>

	this._datasetNames = null;
	this._fromIndex = 0;
	this._toIndex = -1;
};
SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsParametersBase.prototype = {
	get_datasetNames:function(){
   	/// <value type="Array" elementType="String">几何对象,【必选参数】 数据集名称数组(datasourceName:datasetName)。</value>
         this._datasetNames=datasetname;
    },
    set_datasetNames:function(datasetname){
         this._datasetNames=datasetname;
    }
};
SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsParametersBase.registerClass('SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsParametersBase');


SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsBySQLParameters = function() {
	/// <summary>要素查询参数</summary>
	
	SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsBySQLParameters.initializeBase(this);

	this._filterParameter = null;
	
};
SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsBySQLParameters.prototype = {
	get_filterParameter:function(){
   	/// <value type="SuperMap.Web.iServerJava6R.FilterParameter">属性查询过滤器。</value>
         return this._filterParameter;
    },
    set_filterParameter:function(filterParameter){
         this._filterParameter=filterParameter;
    }
};
SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsBySQLParameters.registerClass('SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsBySQLParameters', SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsParametersBase);

SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsBySQLService = function(url) {
	/// <summary>要素查询服务类。</summary>
	/// <param name="url" type="String">指定服务的url</param>
    SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsBySQLService.initializeBase(this, [url]);
    
    this._lastResult = null;

};
SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsBySQLService.prototype = {
    get_lastResult:function(){
   	/// <value type="SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsResult">上次的结果</value>
        return this._lastResult; 
    },

	processAsync:function(parameter) {
	/// <param name="parameter" type="SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsBySQLParameters">要素查询参数</param>
    ///<returns type="void"></returns>
		var operateCompleteDelegate = Function.createDelegate(this, this._operateComplete);
		var operateErrorDelegate = Function.createDelegate(this, this._operateError);
		var jsonParameter = this._getParameters(parameter);
		
		if(SuperMap.Web.Utility.isInTheSameDomain(this._url)) {
			this._url += ".json?returnContent=true";
		}
		else{
			this._url += ".jsonp?returnContent=true";
		}
		
		if(parameter._fromIndex>=0 && parameter._toIndex>=0){
			this._url +=  '&fromIndex=' + parameter._fromIndex + '&toIndex=' + parameter._toIndex;
		}
		
		this.request(this._url, "POST", jsonParameter, null, null, operateCompleteDelegate, operateErrorDelegate, null);
	},
	
	_getParameters:function(parameter) {
		var jsonParameters = '{"getFeatureMode":"SQL", "datasetNames":';
		
		if(parameter._datasetNames != null){
			var datasetNamesString = "[";
			for(var i=0;i<parameter._datasetNames.length;i++){
				if(i!=0) datasetNamesString += ",";
				datasetNamesString += '"' + parameter._datasetNames[i] + '"';
			}
			jsonParameters += datasetNamesString + "]";
		}
		
		jsonParameters += ', "queryParameter":';
		if(parameter._filterParameter){
			jsonParameters += SuperMap.Web.Utility.toJSON(parameter._filterParameter);
		}
		
		jsonParameters += '}';
		//jsonParameters = '{' + jsonParameters + '}';
		
		return jsonParameters;
	},
	
    //操作完成
    _operateComplete:function(result, userContext){
		var getFeaturesResult = null;
		getFeaturesResult = SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsResult.fromJson(result);
		this._lastResult = getFeaturesResult;
		
		var le = new SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsEventArgs(getFeaturesResult, result);
        this.raise_processCompleted(le, userContext);
	},
	
	//操作失败
	_operateError:function(result, userContext) {
		this.raise_processFailed(result, userContext);
	},
    
    /**
	*请求结果返回触发事件
	*/
	add_processCompleted:function(handler) {
		this._addEvent("processCompleted", handler);
	},
	remove_processCompleted:function(handler) {
		this._removeEvent("processCompleted", handler);
	},
	raise_processCompleted:function(arguments, userContext) {
		this._raiseEvent("processCompleted", arguments, userContext);
	},
	
	add_processFailed:function(handler) {
		this._addEvent("processFailed", handler);
	},
	remove_processFailed:function(handler) {
		this._removeEvent("processFailed", handler);
	},
	raise_processFailed:function(arguments, userContext) {
		this._raiseEvent("processFailed", arguments, userContext);
	},
	
	_addEvent:function(eventName, handler) {
		this.get_events().addHandler(eventName, handler);
	},
	_removeEvent:function(eventName, handler) {
		this.get_events().removeHandler(eventName, handler);
	},
	_raiseEvent:function(eventName, arguments, userContext) {
		var handler = this.get_events().getHandler(eventName);
		if(handler) {
			handler(arguments, userContext);
		}
	}
};
SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsBySQLService.registerClass('SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsBySQLService', SuperMap.Web.iServerJava6R.ServiceBase);

//-----------------------------------GetFeature3DsByBoundsService--------------------------------------------
SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsByBoundsParameters = function() {
    /// <summary>要素查询参数</summary>
	
	SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsByBoundsParameters.initializeBase(this);
	
	this._bounds = null;
	this._attributeFilter = null;
	this._fields = null;
};
SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsByBoundsParameters.prototype = {
	get_bounds:function(){
   	/// <value type="SuperMap.Web.Core.Rectangle2D">查询用的 bounds</value>
         return this._bounds;
    },
    set_bounds:function(bounds){
         this._bounds=bounds;
    }
};
SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsByBoundsParameters.registerClass('SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsByBoundsParameters', SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsParametersBase);

SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsByBoundsService = function(url) {
	/// <summary>要素查询服务类。</summary>
	/// <param name="url" type="String">指定服务的url</param>
    SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsByBoundsService.initializeBase(this, [url]);
    
    this._lastResult = null;
};
SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsByBoundsService.prototype = {
    get_lastResult:function(){
   	/// <value type="SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsResult">上次的结果</value>
        return this._lastResult;
    },

	processAsync:function(parameter) {
	/// <param name="parameter" type="SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsByBoundsParameters">要素查询参数</param>
	/// <returns type="void"></returns>
		var operateCompleteDelegate = Function.createDelegate(this, this._operateComplete);
		var operateErrorDelegate = Function.createDelegate(this, this._operateError);
		var jsonParameter = this._getParameters(parameter);
		if(SuperMap.Web.Utility.isInTheSameDomain(this._url)){
			this._url += ".json?returnContent=true";
		}
		else{
			this._url += ".jsonp?returnContent=true";
		}
		
		if(parameter._fromIndex>=0 && parameter._toIndex>=0){
			this._url +=  '&fromIndex=' + parameter._fromIndex + '&toIndex=' + parameter._toIndex;
		}
		
		this.request(this._url, "POST", jsonParameter, null, null,  operateCompleteDelegate, operateErrorDelegate, null);
	},
	_getParameters:function(parameter) {
		if(parameter._attributeFilter == null){
			var jsonParameters = '{"getFeatureMode":"BOUNDS", "datasetNames":';
		}
		else{
			var jsonParameters = '{"getFeatureMode":"BOUNDS_ATTRIBUTEFILTER", "attributeFilter":"' + parameter.attributeFilter + '", "datasetNames":';
		}
		
		if(parameter._datasetNames != null){
			var datasetNamesString = "[";
			for(var i=0;i<parameter._datasetNames.length;i++){
				if(i!=0) datasetNamesString += ",";
				datasetNamesString += '"' + parameter._datasetNames[i] + '"';
			}
			jsonParameters += datasetNamesString + "]";
		}
		jsonParameters += ', "bounds":';
		if(parameter._bounds != null){
			jsonParameters += SuperMap.Web.Utility.toJSON(parameter._bounds);
		}

		if(parameter._fields && parameter._fields.length){
			jsonParameters += ', "queryParameter":';
			var filterParameter = new SuperMap.Web.iServerJava6R.FilterParameter();
			filterParameter.name = parameter._datasetNames;
			for(var i=0;i<parameter._fields.length;i++){
				filterParameter.fields = parameter._fields;
			}
			jsonParameters += SuperMap.Web.Utility.toJSON(filterParameter);
		}
		jsonParameters += '}';
		
		return jsonParameters;
	},
	
    //操作完成
    _operateComplete:function(result, userContext){
		var getFeaturesResult = null;
		getFeaturesResult = SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsResult.fromJson(result);
		this._lastResult = getFeaturesResult;
		
		var le = new SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsEventArgs(getFeaturesResult, result);
        this.raise_processCompleted(le, userContext);
	},
	
	//操作失败
	_operateError:function(result, userContext) {
		this.raise_processFailed(result, userContext);
	},
    
    /**
	*请求结果返回触发事件
	*/
	add_processCompleted:function(handler) {
		this._addEvent("processCompleted", handler);
	},
	remove_processCompleted:function(handler) {
		this._removeEvent("processCompleted", handler);
	},
	raise_processCompleted:function(arguments, userContext) {
		this._raiseEvent("processCompleted", arguments, userContext);
	},
	
	add_processFailed:function(handler) {
		this._addEvent("processFailed", handler);
	},
	remove_processFailed:function(handler) {
		this._removeEvent("processFailed", handler);
	},
	raise_processFailed:function(arguments, userContext) {
		this._raiseEvent("processFailed", arguments, userContext);
	},
	
	_addEvent:function(eventName, handler) {
		this.get_events().addHandler(eventName, handler);
	},
	_removeEvent:function(eventName, handler) {
		this.get_events().removeHandler(eventName, handler);
	},
	_raiseEvent:function(eventName, arguments, userContext) {
		var handler = this.get_events().getHandler(eventName);
		if(handler) {
			handler(arguments, userContext);
		}
	}
};
SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsByBoundsService.registerClass('SuperMap.Web.iServerJava6R.Data3D.GetFeature3DsByBoundsService', SuperMap.Web.iServerJava6R.ServiceBase);
