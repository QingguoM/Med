	//重新发送动态密码
	function reSendMsm(msgKey,handler) {
		$("#errMessage").html("");
		$("#sendMsg").attr("disabled", "disabled");
		handler = isUndefinedOrNull(handler) ? "Default" : handler;
		var jsonData = {
				"MsgKey":msgKey,
				"handler":handler
		}
		doAjax("reSendMessage",jsonData,smsSendSuccess,smsSendFail);
	}

	function doAjax(transId,jsonData,callBack,failBack){
		$.ajax({
			type:"post",
			contentType : "application/x-www-form-urlencoded",
			data:jsonData,
			url:"/ewap/"+transId+".action",
			dataType:"json",
			success:function(data){
				callBack(data);
			},
			error:function(data){
				failBack(data);
			}
		});
	}
	
	function smsSendSuccess(data)
	{
		var c = 60;
		count = window.setInterval(function() {
			c = c - 1;
		    $("#sendMsg").text((c > 9 ? c : ("0" + c)));
			$("#sendMsg").css("background", "#3D3D3D");
			if (c == 0) {
				$("#sendMsg").css("background", "#0c59b1");
				$("#sendMsg").removeAttr("disabled");
				$("#sendMsg").text("重新获取");
				clearInterval(count);
			}
		}, 1000); //计时器
		
		if("AAAAAAA" == data.ResponseCode){
			$("#errMessage").html(data.ResponseMsg);
		}else{
			$("#errMessage").html(data.ResponseMsg);
		}
		
	}
	function smsSendFail(data){
		$("#errMessage").html("动态密码发送失败,请稍候重试!");
	}
	
	//检查动态密码格式
	function checkDym(){
		var MobilePasswd = $("#MobilePasswd").val();
		var reg = /^[A-Za-z0-9]{6}$/;
		if(!reg.test(MobilePasswd)){
			alert("请正确输入动态密码");
			return false;
		}
		return true;
	}
	
	//检查登录密码格式
	function checkPwd(){
		var pwd = $("#Password").val();
		if(pwd == ""){
			alert("请输入您的网银/手机银行登录密码");
			return false;
		}
		return true;
	}
	//检查客户号格式
	function checkMasterId(){
		var MasterId = $("#MasterId").val();
		var reg = /^[0-9]{10}$/;
		if(!reg.test(MasterId)){
			alert("请输入正确客户号!");
			return false;
		}
		return true;
	}
	//检查登录名格式
	function checkLoginId(){
		var LoginId = $("#LoginId").val();
		var reg = /^[A-Za-z0-9]{1,30}$/;
		if(!reg.test(LoginId)){
			alert("请输入正确登录名!");
			return false;
		}
		return true;
	}
	
	//检查非空
	function isEmpty(s){
		if(isExist(s)){
			var s1=eval(s);
			if(!isEmptyString(s1.value)){
				return false;
			}
		}
		return true;
	}

	//检查一个对象是否存在
	function isExist(s){
		if (eval(s)==null){
			return false;
		}
		return true;
	}

	//确定字符串是否为空
	function isEmptyString(str){
		if (str==null || str==""){
			return true;
		}
		return false;
	}
   	
	
	function getUrl(){
		return window.location.protocol+"//"+document.domain;
	}

	//添加账期下拉框
	function addOption(month){
		var year = month.substring(0,4);
		var mon = month.substring(4,6);
		var payTerm = "";
		if(month.length == 6){
			if(mon == "03"){
				payTerm = year + "年第一季度";
			}else if(mon == "06"){
				payTerm = year + "年第二季度";
			}else if(mon == "09"){
				payTerm = year + "年第三季度";
			}else if(mon == "12"){
				payTerm = year + "年第四季度";
			}
			
			if(mon=="03"||mon=="06"||mon=="09"||mon=="12"){
				$("#PayTerm").append("<option value='"+month+"'>"+payTerm+"</option>");
			}
		}
	}
	
	// 将金额数字转换为标准的格式
	function standMoneyString(inStr){
		// 以小数点为分界，分别处理整数和小数部分
		var outStr;
		var valueArr = inStr.split(".");
		// 处理小数部分
		var dotStr,dotValue;
		if(valueArr.length==2) {
			dotValue = valueArr[1];
			if(dotValue.length==0) {
				dotStr = "00";
			}
			else {
				if(dotValue.length==1)
					dotStr = dotValue + "0";
				else
					dotStr = dotValue.substring(0,2);
			}	
		}
		else {
			dotStr = "00";
		}
			
		// 处理整数部分
		var intArr = valueArr[0].split(",");
		// 无论整数部分是否已经用逗号分隔开，都将其合并成一个整体
		var intValue = "";
		for(i=0; i<intArr.length; i++) {
			intValue+=intArr[i];
		}

		// 将整数部分用逗号进行分隔
		var intStr = "";
		while(intValue.length > 3) {
			intStr="," + intValue.substring(intValue.length-3,intValue.length) + intStr;
			intValue = intValue.substring(0,intValue.length-3);
		}
		intStr = intValue + intStr;
		
		// 最后将处理后的整数部分与小数部分合并，作为输出
		if( intStr == "" || intStr == null ) {
			intStr = "0";
		}
		outStr = intStr + "." + dotStr;
		return outStr;
	}
	
	/**
	 * 判断是否为空
	 * @param obj
	 * @returns {Boolean}
	 */
	function isUndefinedOrNull(obj){
		if(obj==undefined||obj==null){
			return true;
		}	
		return false;
	};
	
	/**
	 * Mustache渲染表格
	 * @param tableId 表格ID
	 * @param listKey List Key
	 * @param data JSON数据
	 */
	function renderTable(tableId, listKey, data) {
		var tbody = $("#" + tableId).html();
		var tr = $("#" + tableId).find('tr[render="OK"]')[0].outerHTML;
		var trLeft = tbody.substring(0, tbody.indexOf(tr));
		var trRight = tbody.substring(tbody.indexOf(tr) + tr.length);
		var _tr = "{{#" + listKey + "}}" + tr + "{{/" + listKey + "}}";
		var _then = Mustache.render(_tr, data);
		$("#" + tableId).html(trLeft + _then + trRight);
	}