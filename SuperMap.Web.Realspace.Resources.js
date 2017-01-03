//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Resources.js  
// 功能：			Realspace资源
// 最后修改时间：	2009-12-1
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Resources = function() {
	
};

// 参照Ajax格式。
// 资源信息成员，中文资源成员，静态变量，资源格式为：key:message。信息包含传入变量时，message格式如下：“message<message>...”。key格式如下：class_method_erroName，其中每个字段开头要大写，构造方法名用Constructor代替。
SuperMap.Web.Realspace.Resources.zh_cn = {

	"Realspace_PlugIn_Version_Info" : "当前安装的插件版本为:",
	"Realspace_Couldnt_Get_Version_Info" : "无法获取到版本信息",
	"Realspace_No_Update_Available" : "当前无可用的更新",
	"Realspace_PlugIn_Is_Not_Installed" : "在查看三维场景之前, 您必须安装Realspace三维场景插件到您的计算机上",
	"Realspace_Browser_Is_Not_Supported" : "该浏览器版本当前不支持，请更换为Internet Explorer 6.0及其以上版本",
	"Realspace_Argument_Type_Is_Illegal" : "参数类型非法",
	"Realspace_Unkonwn_Error":"未知错误",
	"Realspace_Argument_Number_Is_Illegal" : "参数个数非法",
	"Realspace_Operation_Failed" : "操作失败",
	"Realspace_Open_ModelFile_Failed" : "获取模型文件失败或文件结构错误，无法打开文件",
	"Realspace_Open_PictureFile_Failed" : "获取图片文件失败或文件结构错误，无法打开文件",
	"Realspace_PlugIn_Lower" : "您当前使用的插件版本与脚本库版本出现不兼容，为了保证您的正常使用请将插件升级到:",
	"Realspace_Lib_Lower" : "您当前使用的插件版本与脚本库版本出现不兼容，为了保证您的正常使用请将插件还原到:",
	"Realspace_SceneAntialias_Failed" : "设置场景反走样失败，可能是用户账户控制导致，请尝试关闭UAC",
	"Realspace_RenderSystem_Is_Not_Supported" : "您的系统的OpenGL版本较低，请更新显卡驱动"
	
};

SuperMap.Web.Realspace.Resources.registerClass('SuperMap.Web.Realspace.Resources');