/** * 请求原型 * @param JIAOYM	前段交易码，匹配后端业务逻辑类 * @param reqObj	请求参数 * @returns */function MedRequest(JIAOYM, reqObj) {		this.reqData = {		JIAOYM : JIAOYM												};		jQuery.extend(this.reqData, reqObj);};/** * 发送请求 */MedRequest.prototype.callServer = function() {	var deferred = jQuery.Deferred();		this.getData(this.getUrl(), this.reqData, function(resp) {		var respCodeWithPCE = valRespWithPCE(resp);		switch(respCodeWithPCE){			case 0:				deferred.resolve(resp.rtBody);				break;			case 1:				alert("通讯错误，不能继续交易！");				break;			case 2:				alert("交易异常，不能继续交易！")				break;		}	});	return deferred.promise();}MedRequest.prototype.getUrl = function() {	return "http://" + location.hostname + ":" + location.port + "/Medicine/srv.call";}MedRequest.prototype.getData = function(url, reqData, callback) {	var _type = 'post';	jQuery.ajax({		type: _type,		url: url,		data: "req=" + encodeURIComponent(encodeURIComponent(JSON.stringify(reqData))),		dataType: 'text',		success: function(resp) {			eval("var resp = " + resp + ";");			callback(resp);		},		error: function() {			callback({"rtCode":"ZZ99", "rtMsg":"服务端连接失败"});		}	});}/** * 返回结果解析并记录日志 * @param {Object} respJSONObj 请求返回结果 * @returns {Number}   * 0-交易成功 * 1-通讯错误，或者其他异常,需要跳到统一流程Error.html * 2-交易异常 */function valRespWithPCE(respJSONObj) {	if (!respJSONObj) {		return 1;	} else if (!respJSONObj.rtCode) {		return 1;	} else if (respJSONObj.rtCode != 'ZZ00') {		return 2;	} else {		return 0;	}}