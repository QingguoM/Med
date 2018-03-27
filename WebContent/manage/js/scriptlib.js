// 忽略回车
function skipRC(){
	if (event.keyCode == 13) {
		event.returnValue=false;
	}
}

// 只能输入中文，比较粗略的方法
function mustChinese(){
	if(event.keyCode < 256){
		event.returnValue=false;
	}
}
 
// 只能输入ASCII字符
function mustASCII(){
	if(event.keyCode > 256){
		event.returnValue=false;
	}
}

// 只能是ASCII字符串
function isASCIIString(obj){   
    for(var i=0; i<obj.length; i++){
    	if(obj.charCodeAt(i) > 256){
    		return false;
    	}
	}
	return true;
}

// 只能是有效数值（整数、浮点数且包含'-'和'/'）
function mustNumber(){
	if(event.keyCode<45 || event.keyCode>57){
		event.returnValue=false;
	}
}

//是否是有效正数值（只能为数字0～9或.）
function mustNumberNew(){
	if(event.keyCode == 47 || event.keyCode<46 || event.keyCode>57){
		event.returnValue=false;
	}
}

// 只能输入金额，e为输入框元素
function mustAmount(e) {
	if (e.value.length == 0) {
		// 第一个字符只能是半角阿拉伯数字
		if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;
	} else {
		// 小数点只能出现一次
		if (e.value.indexOf(".") > 0 && event.keyCode == 46) event.returnValue = false;
		// 前导0
		if (e.value == "0" && event.keyCode != 46) event.returnValue = false;
		// 精确到小数点后2位
		if (e.value.indexOf(".") > 0 && e.value.length - e.value.indexOf(".") == 3) event.returnValue = false;
	}
}

// 只能是数字（不能包含小数点）
function mustDigit(){
	if(event.keyCode<48 || event.keyCode>57){
		event.returnValue=false;
	}
}


// 检查一个对象是否存在
function isExist(s){
	if (eval(s) == null){
		return false;
	}
	return true;
}

// 清除字符串前导空格和拖尾空格
function trimString(s){
	if(s==null || s==""){
  		return "";
	}

	var str = new String(s);
	var index = 0;

	while(str.charAt(0) == " "){
		str = str.substring(1);
	}

	index=str.length-1;

	while(str.charAt(index) == " "){
		str = str.substring(0,index);
		index = str.length-1;
	}
	return str;
}

// 检查字符串是否是由数字组成
function isDigitString(str){
	if(!isEmptyString(str)&&!isNaN(str) && str.indexOf('.')==-1 && str.indexOf('e')==-1 && str.indexOf('E')==-1){
		return true;
	}
	return false;	
}

// 确定字符串是否为空
function isEmptyString(str){
	if (str==null || str=="")	{
		return true;
	}
	return false;
}

// 检查非空
function isEmpty(s)	{
	if(isExist(s)){
		var s1 = eval(s);
		if(!isEmptyString(s1.value)){
			return false;
		}
	}
	return true;
}

// 检查数字
function isNumber(s){
	if(isEmpty(s)){
		return false;	
	}
	
	var s1 = eval(s);
	if(isDigitString(s1.value))	{
		return true;
	}
	return false;	
}

// 检查合法的标识符
function isValidChar(s){
	if(isEmpty(s)){
		return false;	
	}
	
	var s1 = eval(s);
	var validchar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-#!";
	var tmpstr = s1.value;
	
	for(var i=0; i<tmpstr.length; i++){
		tmpchar=tmpstr.charAt(i);
		if(validchar.indexOf(tmpchar) == -1){
			return false;
		}
	}
	return true;
}

// 检查固定长度
function checkLength0(s,len){
	if(isEmpty(s)){
		return false;	
	}
	
	var s1 = eval(s);
	if( s1.value.length == len ){
		return true;
	}
	return false;
}

// 检查长度范围
function checkLength1(s,min,max){
	if(isEmpty(s)){
		return false;	
	}
	
	var s1 = eval(s);
	if( s1.value.length>=min && s1.value.length<=max){
		return true;
	}
	return false;
}

// 检查金额
function checkAmountFormat(s){
	if(isEmpty(s)){
		return false;	
	}
	
	revertMoney(s,false);
	
	var s1=eval(s);
	if(!isNaN(s1.value)){
		if(Number(s1.value) < 0){
			return false;
		}
		if(s1.value.indexOf('.') == -1){
			if(s1.value.length > 1 && s1.value.substring(0,1) == 0)
				return false;
			s.value+='.00';
			return true;
		}
		if(s1.value.length-s1.value.indexOf('.') > 3){
			return false;
		}
		if(s1.value.length-s1.value.indexOf('.') == 2){
			s.value += '0';
		}
		if(s1.value.length-s1.value.indexOf('.') == 1){
			s.value += '00';
		}
		str = s.value.substring(0,s.value.indexOf('.'));
		if(str.length > 1 && str.substring(0,1) == 0)
			return false;
		
		return true;
	}
	
	return false;
}

// 检查日期格式
function checkDateFormat(s){
	if(isEmpty(s))	{
		return false;	
	}
	
	var s1=eval(s);
	var temp=s1.value;
	
	if( temp.length == 8 && isDigitString(temp)){
		var yyyy=Number(temp.substring(0,4));
		var mm = Number(temp.substring(4,6));
		var dd = Number(temp.substring(6,8));
		
		if (yyyy > 1969 && yyyy < 2051)	{
			if( mm > 0 && mm < 13){
				if (dd > 0){
					switch(mm){
						case 2:
				      		if(yyyy%4!=0||((yyyy%100 == 0)&&(yyyy%400!=0))){
				      			if(dd < 29){
				      				return true;
				      			}
				      			else{
				      				return false;
				      			}
				      		}
				      		
				      		if(dd<30){
				      			return true;
				      		}
				      		else{
				      			return false;
				      		}
				      	case 4:
				      	case 6:
				      	case 9:
				      	case 11:
				      		if(dd < 31){
				      			return true;
				      		}
				      		else{
				      			return false;
				      		}
				      	default: 
				      		if(dd < 32){
				      			return true;
				      		}
					}
				}
			}
		}
	}
	
	return false;
}

// 检查时间格式
function checkTimeFormat(s){
	if(isEmpty(s)){
		return false;	
	}
	
	var s1 = eval(s);
	temp = s1.value;
	
	if(temp.length==6 && isDigitString(temp)){
		var hh = temp.substring(0,2);
		var mm = temp.substring(2,4);
		var ss = temp.substring(4,6);
		if(hh>=0 && hh<24 && mm>=0 && mm<60 && ss>=0 && ss<60){
			return true;
		}
	}
	return false;
}

// 转换日期格式
function formatDate(s){
	if(isEmpty(s)){
		return false;	
	}
	var s1 = val(s);
	s.value = s1.value.substring(0,4) + "-" + s1.value.substring(4,6) + "-" + s1.value.substring(6,8);
}

// 检查Radio或CheckBox按钮或按钮组是否Checked
function isNotchecked(s){
	if(!isExist(s))	{
		return false;	
	}
	
	var s1 = eval(s);
	
	if(s1.length != null){
		for(var i=0; i<s1.length; i++){
			if(s1[i].checked){
				return true;
			}
		}
		
		return false;	
	}
	
	return s1.checked;
}

// 检查是否是中文字符串
function isChineseChar(s){
	if(isEmpty(s)){
		return false;
	}
	
	for(var index=0; index<s.length; index++)	{
		if(s.charCodeAt(index) < 256){
			return false;
		}
	}
	return true;
}
 

// 检查两个日期间隔是否在一个月以内
function checkDate(stdate,eddate){
	var styear=Number(stdate.substring(0,4));
	var stmonth=Number(stdate.substring(4,6));
	var stday=Number(stdate.substring(6,8));
	var edyear=Number(eddate.substring(0,4));
	var edmonth=Number(eddate.substring(4,6));
	var edday=Number(eddate.substring(6,8));
	
	if(edyear<styear || (edyear-styear)>1){
		return false;
	}
	
	if(edyear>styear){
		if(stmonth!=12){
			return false;
		}
		if(edmonth!=1){
			return false;
		}
		return (edday<=stday);
	}
	
	if(edmonth<stmonth || (edmonth-stmonth)>1){
		return false;
	}
	
	if(endmonth>stmonth){
		return (edday<=stday);
	}
		
	return (edday>=stday);
}

function convertToStdMoney(inStr){
	var i,charValue,outStr;
	var flag = 1;
	if(inStr.substring(0,1) == "-"){
		inStr = inStr.substring(1);
		flag = 0;
	}
	for(i=0; i<inStr.length; i++){
		charValue = inStr.charAt(i);
		if(isNaN(parseInt(charValue,10)) && (charValue!=".") && (charValue!=",")){
			alert(inStr+" 非法金额!");
			return "0.00";
		}
	}
	// 以小数点为分界，分别处理整数和小数部分
	var valueArr = inStr.split(".");
	if(valueArr.length > 2) {
		alert(inStr+" 非法金额!");		
		return "0.00";
	}

	// 处理小数部分
	var dotStr,dotValue;
	if(valueArr.length == 2) {
		dotValue = valueArr[1];
		if(dotValue.length == 0) {
			dotStr = "00";
		}
		else {
			if(dotValue.length == 1)
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
	for(i=0;i<intArr.length;i++) {
		intValue += intArr[i];
	}

	// 将整数部分用逗号进行分隔
	var intStr = "";
	while(intValue.length > 3) {
		intStr =","+intValue.substring(intValue.length-3,intValue.length) + intStr;
		intValue = intValue.substring(0,intValue.length-3);
	}
	intStr = intValue + intStr;
	
	// 最后将处理后的整数部分与小数部分合并，作为输出
	if( intStr == "" || intStr == null ) {
		intStr = "0";
	}
	outStr = intStr + "." + dotStr;
	if(flag == 0)
		outStr = "-" + outStr;
	return outStr;
}

// 将金额数字转换为标准的格式
function standMoney(inObject){
	// 首先检查字符串的所有字符是否均为数字、小数点或逗号分隔符形式
	if(isEmpty(inObject)){
		return false;
	}
	
	var inStr = inObject.value;
	var i,charValue,outStr;
	for(i=0; i<inStr.length; i++){
		charValue = inStr.charAt(i);
		if(isNaN(parseInt(charValue,10)) && (charValue!=".") && (charValue!=",")){
			inObject.focus();
			inObject.select();
			alert(inStr+" 非法金额!");
			return false;
		}
	}
	
	// 以小数点为分界，分别处理整数和小数部分
	var valueArr = inStr.split(".");
	if(valueArr.length>2) {
		alert(inStr+" 非法金额!");
		inObject.focus();
		inObject.select();
		return false;
	}

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

	inObject.value = outStr;
	return true;
}

// 恢复成数字串的格式，删掉分节符
function revertMoney(inObject,flag) {
	if(isEmpty(inObject)){
		return false;
	}
	
	var inStr = inObject.value;
	var outStr="";
	var ch;
	
	for(i=0; i<inStr.length; i++){
		ch = inStr.charAt(i);
		if(ch!=','){
			outStr += ch;
		}
		else {
			continue;
		}
	}
	inObject.value = outStr;
	if(flag){
		inObject.select();
	}
	
	return true;
}

// 恢复成数字串的格式，删掉分节符
function revertMoneyString(inStr) {
	var outStr="";
	var ch;
	
	for(i=0; i<inStr.length; i++){
		ch = inStr.charAt(i);
		if(ch!=','){
			outStr += ch;
		}
		else {
			continue;
		}
	}
	return outStr;
}

// 检查日期
function checkDate(indate){
	if (isNaN(indate)) {
		return 1;
	}

	var year = indate.substring(0,4);
	var month = indate.substring(4,6);
	var day = indate.substring(6);

	if (month < 1 || month > 12) { 
		return 1;
	}
	if (day < 1 || day > 31) {
		return 1;
	}
	if ((month==4 || month==6 || month==9 || month==11) && day==31) {
		return 1;
	}
	if (month == 2) { 
		var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
		if (day>29 || (day==29 && !isleap)) {
			return 1;
		}
	}
	return 0; 
 }

// 用于零币兑换的总金额计算和校验
function calTotal() {
	var total = 0;
	
	if (document.TransferForm.TenCentNoteInfo.length != 0){
		if (isNaN(document.TransferForm.TenCentNoteInfo.value)) {
			alert("兑换张数只能输入数字");
			document.TransferForm.TenCentNoteInfo.focus();
			return 1;
		}   
		if (document.TransferForm.TenCentNoteInfo.value < 0) {
			alert("请输入正确的兑换张数");
			document.TransferForm.TenCentNoteInfo.focus();
			return 1;
		}

		var num1=document.TransferForm.TenCentNoteInfo.value;

		if ( (Math.round(num1)) != num1 ){
			alert("请入整数的兑换张数");
			document.TransferForm.TenCentNoteInfo.focus();
			return 1;
		}
	}
	else{
		var num1=0;
	}

	if (document.TransferForm.TwentyCentNoteInfo.length != 0){
		if (isNaN(document.TransferForm.TwentyCentNoteInfo.value)) {
			alert("兑换张数只能输入数字");
			document.TransferForm.TwentyCentNoteInfo.focus();
			return 1;
		}   
		if (document.TransferForm.TwentyCentNoteInfo.value < 0) {
			alert("请输入正确的兑换张数");
			document.TransferForm.TwentyCentNoteInfo.focus();
			return 1;
		}

      	var num2=document.TransferForm.TwentyCentNoteInfo.value;
		if ( (Math.round(num2)) != num2 ){
			alert("请入整数的兑换张数");
			document.TransferForm.TwentyCentNoteInfo.focus();
			return 1;
		}
	}
	else{
		var num2=0;
	}

	if (document.TransferForm.FiftyCentNoteInfo.length != 0){
		if (isNaN(document.TransferForm.FiftyCentNoteInfo.value)) {
			alert("兑换张数只能输入数字");
			document.TransferForm.FiftyCentNoteInfo.focus();
			return 1;
 
		}   
		if (document.TransferForm.FiftyCentNoteInfo.value < 0) {
			alert("请输入正确的兑换张数");
			document.TransferForm.FiftyCentNoteInfo.focus();
			return 1;
		}

      	var num3=document.TransferForm.FiftyCentNoteInfo.value;
		if ( (Math.round(num3)) != num3 ){
			alert("请入整数的兑换张数");
			document.TransferForm.FiftyCentNoteInfo.focus();
			return 1;
		}
	}else{
		var num3=0;
	}

	if (document.TransferForm.OneYuanNoteInfo.length != 0){
		if (isNaN(document.TransferForm.OneYuanNoteInfo.value)) {
			alert("兑换张数只能输入数字");
			document.TransferForm.OneYuanNoteInfo.focus();
			return 1;
		}   
		if (document.TransferForm.OneYuanNoteInfo.value < 0){
			alert("请输入正确的兑换张数");
			document.TransferForm.OneYuanNoteInfo.focus();
			return 1;
		}

      	var num4=document.TransferForm.OneYuanNoteInfo.value;
		if ( (Math.round(num4)) != num4 ){
			alert("请入整数的兑换张数");
			document.TransferForm.OneYuanNoteInfo.focus();
			return 1;
		}
	}else{
		var num4=0;
	}

	if (document.TransferForm.TwoYuanNoteInfo.length != 0) {
		if (isNaN(document.TransferForm.TwoYuanNoteInfo.value)) {
			alert("兑换张数只能输入数字");
			document.TransferForm.TwoYuanNoteInfo.focus();
			return 1;
		}   
		if (document.TransferForm.TwoYuanNoteInfo.value < 0) {
			alert("请输入正确的兑换张数");
			document.TransferForm.TwoYuanNoteInfo.focus();
			return 1;
		}

		var num5=document.TransferForm.TwoYuanNoteInfo.value;
		if ( (Math.round(num5)) != num5 ){
			alert("请入整数的兑换张数");
			document.TransferForm.TwoYuanNoteInfo.focus();
			return 1;
		}
	}else{
		var num5=0;
	}

	if (document.TransferForm.FiveYuanNoteInfo.length != 0){
		if (isNaN(document.TransferForm.FiveYuanNoteInfo.value)) {
			alert("兑换张数只能输入数字");
			document.TransferForm.FiveYuanNoteInfo.focus();
			return 1;
		}   
		if (document.TransferForm.FiveYuanNoteInfo.value < 0){
			alert("请输入正确的兑换张数");
			document.TransferForm.FiveYuanNoteInfo.focus();
			return 1;
		}

      	var num6=document.TransferForm.FiveYuanNoteInfo.value;
		if ( (Math.round(num6)) != num6 ){
			alert("请入整数的兑换张数");
			document.TransferForm.FiveYuanNoteInfo.focus();
			return 1;
		}
	}else{
		var num6=0;
	}

	if (document.TransferForm.TenYuanNoteInfo.length != 0){
		if (isNaN(document.TransferForm.TenYuanNoteInfo.value)) {
			alert("兑换张数只能输入数字");
			document.TransferForm.TenYuanNoteInfo.focus();
			return 1;
		}   
		if (document.TransferForm.TenYuanNoteInfo.value < 0) {
			alert("请输入正确的兑换张数");
			document.TransferForm.TenYuanNoteInfo.focus();
			return 1;
		}

		var num7=document.TransferForm.TenYuanNoteInfo.value;
		if ( (Math.round(num7)) != num7 ){
			alert("请入整数的兑换张数");
			document.TransferForm.TenYuanNoteInfo.focus();
			return 1;
		}
	}else{
		var num7=0;
	}

	total=0.1*num1 + 0.2*num2 +0.5*num3 +1*num4 +2*num5 +5*num6+ 10*num7;
	total = (Math.round(total*100))/100;

	document.TransferForm.Amount.value = total;
	standMoney(document.TransferForm.Amount);

	return 0;
}


function QSearch(arrays, key) {
	var low = 0;
	var mid = 0;
	var high = arrays.length-1;     
	var dd = 0;
	
	while (low <= high) {
		mid = Math.floor( (low + high)/2);

		var midObj = arrays[mid];
		var midVal = midObj.name;

	    if (midVal < key)
	    	low = mid + 1;
	    else if (midVal > key)
	    	high = mid - 1;
	    else
	    	return arrays[mid]; // key found
	}
	return new dataobject("","",2);  // key not found.
}

function compare(a,b) {
	if(a.name > b.name)
		return 1;
	else
		if(a.name < b.name) 
			return -1;
	return 0;
}

function dataobject(name,value,type){
	this.name = name;
	this.value = value;
	this.type =type;
}

// added by dlinkon 2001/12
// load form's fields from array

function loadForm(myarray){
	myarray.sort(compare);
	
	var form = window.document.forms[0];
	if(form==null) return;
	
	for (var i = 0; i < form.elements.length; i++) {   
		if( form.elements[i].type=="text" || form.elements[i].type=="select-one" || form.elements[i].type=="textarea"){ 
			var value = QSearch(myarray,form.elements[i].name);
	
			if(value.type!=2)
				form.elements[i].value = value.value;
		}else if( form.elements[i].type == "select-multiple"){
			var value = QSearch(myarray,form.elements[i].name);
	
			if(value.type == 0){
				// if(form.elements[i].value==value.value)
				//{
					// form.elements[i].selected= true;
					// alert(value.value);
					form.elements[i].value = value.value;
				//}
			}
			else if(value.type == 1){
				var arraydata = value.value;
      
				for(var k=0; k<form.elements[i].length; k++){
					var matched = false;
	     
					for(var j=0; j<arraydata.length; j++){
						if(form.elements[i].options[k].value == arraydata[j].value){ 
							matched = true;
							break;
						}
					}
					form.elements[i].options[k].selected = matched;
				}

			}
		}else if(form.elements[i].type == "radio" ){
			var value = QSearch(myarray,form.elements[i].name);
	
			if(value.type == 0){
				if(form.elements[i].value==value.value){
					form.elements[i].checked= true;
				}else{
					form.elements[i].checked= false;
				}
			}
			// else
			// form.elements[i].checked= false;
		}else if(form.elements[i].type == "checkbox" ){
			var value = QSearch(myarray,form.elements[i].name);
			if(value.type == 0){
				if(form.elements[i].value == value.value) {
					form.elements[i].checked= true;
				}else
					form.elements[i].checked= false;
			}
			else if(value.type == 1){
				var arraydata = value.value;
				var matched = false;
            
				for(var j=0; j<arraydata.length; j++){
					if(form.elements[i].value == arraydata[j].value){ 
						matched= true;
						break;
					}
				}
				form.elements[i].checked= matched;
			}
		}
	}
  
  	// 当form加载完毕添加一个页面回调方法
	// added by RenZenggang
	if((typeof onformload)!='undefined'){
		onformload();
	}
}

function MultiSubmit(form, tranName){
	form.transName.value= tranName;
	form.submit();
}

function csiiprint( ID){
	var target = window.document.all(ID); 
    target.style.display="none";	
	// target.style.display="";
	/*
	 * var imagesarray =window.document.images for(var i=0;i<
	 * imagesarray.length;i++) { imagesarray[i].style.display="none"; }
	 */
	window.print();
	target.style.display="";
	/*
	 * for(var i=0;i< imagesarray.length;i++) {
	 * imagesarray[i].style.display=""; }
	 */
}

function csiiprintmh(){
	for(var i = 0; i < arguments.length; i++){
		window.document.all(arguments[i]).style.display="none";
	}
	
	window.print();
	
	for(var i = 0; i < arguments.length; i++){
		window.document.all(arguments[i]).style.display="";
	}
}

// 只提供打印固定table ,table必须包含id
function csiiprintWithBorder(ID){
	var bodyHtml = document.body.innerHTML;
	var tableHtml = document.all[ID].innerHTML;
	tableHtml = tableHtml.replace("border=0","border=1");
	tableHtml = tableHtml.replace("table_comm","table_comm_print");
	tableHtml = tableHtml.replace(/\<TD/g,"<td style='border-bottom:1 solid #000000; border-left: 1 solid #000000; border-right: 0 solid #ffffff;border-top: 0 solid #ffffff;'");

	tableHtml = "<div><table width='100%' border='0' cellspacing='0' cellpadding='0' align='center' style='border-color: #000000;border-top: 1px solid #000000; border-right: 1px solid #000000; font:normal 12px 宋体;'>" + tableHtml + "</table></div>";
                       
	document.body.innerHTML=tableHtml;
	window.print();
	
	document.body.innerHTML = bodyHtml;
}

function openBrWindow(theURL, name, attribute) { 
  // window.open(theURL,"certDetail",'toolbar=no,location=no,directories=no,status=yes,resizable=yes,width=800,height=590,left=0,top=0');
	window.open(theURL,name,attribute);  
}

function isChecked(chkboxname){
	var form = window.document.forms[0];
	if(form==null) return false;
	for (var i = 0; i < form.elements.length; i++) {
		if(form.elements[i].type == "checkbox" ) {
			if(form.elements[i].name == chkboxname){
				if(form.elements[i].checked)
					return true;
			}
		}
	} 
	alert("复选框不能为空");
	return false; 
}

/* added by jock */
function calRemitFee(amount){
	var fee = 5.00;
	if (amount<=0.00) fee = 0.00;
	if (amount>10000.00) fee = 10.00;
	if (amount>100000.00) fee = 15.00;
	if (amount>500000.00) fee = 20.00;
	if (amount>1000000.00) fee = amount*0.20/10000;
	if (fee>200.00) fee = 200.00;
	fee = Math.round(fee*100)/100;
	return fee;
}


// added by dlinkon 2002/09/12
// get form's fields

function getFormData(){
	var result="";  
  
	var form = window.document.forms[0];
	if(form==null) return;
	
	var ukeyDisplayField = getUKeyDisplayField(form);

	for (var i = 0; i < form.elements.length; i++) {   
		if(form.elements[i].name == "certPK"){
			continue;
		}
		if(in_array(ukeyDisplayField, form.elements[i].name))
			continue;
		
		if(form.elements[i].type == "select-one"){
			if(isASCIIString(form.elements[i].value)){
				result += form.elements[i].name + "=" + form.elements[i].value + "~|~";
			}
		}else if(form.elements[i].type == "hidden" || form.elements[i].type == "text"){
			var tmp = (form.elements[i].name).toUpperCase();
			// hidden字段名称不含有PASSWORD的才做签名
			if(!(tmp.indexOf("PASSWORD") > -1 || form.elements[i].name == "_UkeyDisplay" )){
				if(isASCIIString(form.elements[i].value)){
					result += form.elements[i].name + "=" + form.elements[i].value + "~|~";
				}
			}
		}else if( form.elements[i].type == "select-multiple"){
			for(var k=0; k<form.elements[i].length; k++){
				if(form.elements[i].options[k].selected && isASCIIString(form.elements[i].options[k].value)){
					result=result+form.elements[i].name+"="+form.elements[i].options[k].value+"~|~";
				}
			}
		}else if(form.elements[i].type == "radio" || form.elements[i].type == "checkbox"){
			if(form.elements[i].checked && isASCIIString(form.elements[i].value)){
					result=result+form.elements[i].name+"="+form.elements[i].value+"~|~";
						}
					}
	}
	
	result = "~|~_signtimestamp="+ GetDateT()+"~|~" + result;
	  
	var ukeyDisplay = "";
	if(ukeyDisplayField != null && ukeyDisplayField.length > 0){
		for(var i = 0; i < ukeyDisplayField.length; i++) {
				if(form.elements[ukeyDisplayField[i]].length == undefined){
					if(form.elements[ukeyDisplayField[i]].type == "radio" || form.elements[ukeyDisplayField[i]].type == "checkbox"){
					if( form.elements[ukeyDisplayField[i]].checked)
								ukeyDisplay += ukeyDisplayField[i] + "=" + form.elements[ukeyDisplayField[i]].value + "~|~";
					}else{
							ukeyDisplay += ukeyDisplayField[i] + "=" + form.elements[ukeyDisplayField[i]].value + "~|~";
						}
				}else{
					if(form.elements[ukeyDisplayField[i]].type == "select-one" ){
							ukeyDisplay += ukeyDisplayField[i] + "=" + form.elements[ukeyDisplayField[i]].value + "~|~";
					}else{
						for(var j = 0; j < form.elements[ukeyDisplayField[i]].length; j++){
							if(form.elements[ukeyDisplayField[i]][j].type == "radio" || form.elements[ukeyDisplayField[i]][j].type == "checkbox") {
								if(form.elements[ukeyDisplayField[i]][j].checked){
										ukeyDisplay += ukeyDisplayField[i] + "=" + form.elements[ukeyDisplayField[i]][j].value + "~|~";
									}
								}
							}
						}
					}
				}
			}
	form.signature.value= result + ukeyDisplay;
}

//add 20130522 For PE
function getFormDataForDiabled(){
	var result="";  
  
	var form = window.document.forms[0];
	if(form==null) return;
	
	var ukeyDisplayField = getUKeyDisplayField(form);

	for (var i = 0; i < form.elements.length; i++) {   

		if(in_array(ukeyDisplayField, form.elements[i].name))
			continue;
		
		if(form.elements[i].disabled){ //如果该元素是disabled 不签名
			continue;
		}
		
		if(form.elements[i].type == "select-one"){
			if(isASCIIString(form.elements[i].value)){
				result += form.elements[i].name + "=" + form.elements[i].value + "~|~";
			}
		}else if(form.elements[i].type == "hidden" || form.elements[i].type == "text"){
			var tmp = (form.elements[i].name).toUpperCase();
			// hidden字段名称不含有PASSWORD的才做签名
			if(!(tmp.indexOf("PASSWORD") > -1 || form.elements[i].name == "_UkeyDisplay" )){
				if(isASCIIString(form.elements[i].value)){
					result += form.elements[i].name + "=" + form.elements[i].value + "~|~";
				}
			}
		}else if( form.elements[i].type == "select-multiple"){
			for(var k=0; k<form.elements[i].length; k++){
				if(form.elements[i].options[k].selected && isASCIIString(form.elements[i].options[k].value)){
					result=result+form.elements[i].name+"="+form.elements[i].options[k].value+"~|~";
				}
			}
		}else if(form.elements[i].type == "radio" || form.elements[i].type == "checkbox"){
			if(form.elements[i].checked && isASCIIString(form.elements[i].value)){
					result=result+form.elements[i].name+"="+form.elements[i].value+"~|~";
						}
					}
	}
	
	result = "~|~_signtimestamp="+ GetDateT()+"~|~" + result;
	var ukeyDisplay = "";
	if(ukeyDisplayField != null && ukeyDisplayField.length > 0){
		for(var i = 0; i < ukeyDisplayField.length; i++) {
			if(form.elements[ukeyDisplayField[i]].length == undefined){
				if(form.elements[ukeyDisplayField[i]].type == "radio" || form.elements[ukeyDisplayField[i]].type == "checkbox"){
					if( form.elements[ukeyDisplayField[i]].checked){
						ukeyDisplay += ukeyDisplayField[i] + "=" + form.elements[ukeyDisplayField[i]].value + "~|~";
					}
				}else{
					ukeyDisplay += ukeyDisplayField[i] + "=" + form.elements[ukeyDisplayField[i]].value + "~|~";
				}
			}else{
				if(form.elements[ukeyDisplayField[i]].type == "select-one" ){
					ukeyDisplay += ukeyDisplayField[i] + "=" + form.elements[ukeyDisplayField[i]].value + "~|~";
				}else{
					for(var j = 0; j < form.elements[ukeyDisplayField[i]].length; j++){
						if(form.elements[ukeyDisplayField[i]][j].type == "radio" || form.elements[ukeyDisplayField[i]][j].type == "checkbox") {
							if(form.elements[ukeyDisplayField[i]][j].checked){
								ukeyDisplay += ukeyDisplayField[i] + "=" + form.elements[ukeyDisplayField[i]][j].value + "~|~";
							}
						}
					}
				}
			}
		}
	}
	form.signature.value= result + ukeyDisplay;
}

function in_array(arr, val) {
	if(arr == null || arr.length == 0)
		return false;
	for (var i = 0; i < arr.length; i++) {
		if (val == arr[i]) {
			return true;
		}
	}
	return false;
}  

function getUKeyDisplayField(form) {
	if(form.elements["_UkeyDisplay"] == undefined)
		return null;

	var ukeyDisplayDef = form.elements["_UkeyDisplay"].value;

	var ukeyDisplayArray = ukeyDisplayDef.substring(1,ukeyDisplayDef.length-1).split(",");

	var ukeyDisplayField = new Array();
	ukeyDisplayField[0] = "_UkeyDisplay";

	for(var i = 0; i < ukeyDisplayArray.length; i++){
		ukeyDisplayField[i+1] = ukeyDisplayArray[i].substring(1,ukeyDisplayArray[i].indexOf(":"));
	}
	  
	return ukeyDisplayField;
}
 
function GetDateT(){
	var _date =new Date(); 
	var _timestamp = _date.getFullYear() + "/" +
         (_date.getMonth()+1) + "/" +
         _date.getDate() + " " +
         _date.getHours() + ":" +
         _date.getMinutes() + ":" +
         _date.getSeconds() + "." +
         _date.getMilliseconds();
	return _timestamp;  
} 

// added by Lawrence Dai 2002/12/12
// compare form's fields

function fieldobject(name,value,remark){
	this.name = name;
	this.value = value;
	this.remark = remark;
}

function checkForm(myarray){
	myarray.sort(compare);

	var form = window.document.forms[0];
	if(form==null) return false;
  
	for (var i = 0; i < form.elements.length; i++) {   
		if( form.elements[i].type=="text" || form.elements[i].type=="select-one" ) { 
			var data = form.elements[i].value;
			var value = QSearch(myarray,form.elements[i].name);
			if(form.elements[i].name=="Amount"){
				if(parseFloat(form.elements[i].value)!=parseFloat(value.value)){
					alert("\""+value.remark+"\""+" 的复录值不正确");
					return false;
				}
			} else if(data!=value.value){
				alert("\""+value.remark+"\""+" 的复录值不正确");
				return false;
			}
		}
	}

  return true;
}

function hint(){
	window.status="交易处理中，请您稍候 ....";
}

// 对select域保持以便回显
function select(obj,value){
	for(var k=0;k<obj.length;k++){
		if(obj.options[k].value==value) {
			obj.options[k].selected=true;
			break;
		} 
	}
}

// added by posy 2004-02-11
// 阻止网页的相关刷新，后退等操作。
function protect(){
	if ((event.keyCode==116)|| // 屏蔽 F5 刷新键
			(event.ctrlKey && event.keyCode==82)){ // Ctrl + R
		alert("为了您的网上交易安全，禁止进行该类操作");
		event.keyCode=0;
		event.returnValue=false;
	}
	if ((event.ctrlKey)&&(event.keyCode==78)){ // 屏蔽 Ctrl+n
		alert("为了您的网上交易安全，禁止进行该类操作");
		event.returnValue=false;
	}
   
	if ((event.shiftKey)&&(event.keyCode==121)){ // 屏蔽 shift+F10
		alert("为了您的网上交易安全，禁止进行该类操作");
		event.returnValue=false;
	}
 
	if ((window.event.altKey)&&
			((window.event.keyCode==37)|| // 屏蔽 Alt+ 方向键 ←
					(window.event.keyCode==39))){ // 屏蔽 Alt+ 方向键 →
		alert("为了您的网上交易安全，禁止进行该类操作");
		event.returnValue=false;
	}
 
	if((event.ctrlKey)&&((window.event.keyCode==37)||(window.event.keyCode==39))){
		alert("为了您的网上交易安全，禁止进行该类操作");
		event.keyCode=0;
		event.returnValue=false;
	}
}
 
// 阻止网页上的右键操作
function Click(){
	alert("为了您的网上交易安全，禁止进行该类操作");
	window.event.returnValue=false;
}
 
// 校验手机代码
function checkMobilePhone(str){
	if (isEmptyString(str) ){
		alert("手机号码不能为空");
		return false;  
	}
	else{
		if(11!=str.length){
			alert("手机号码必须为11位");
			return false;  
		}
		if(isNaN(str)){
			alert("手机号码必须为数字");
			return false;  
		}
	}
	return true;		
}

function checkTelphone(object){
	if(isEmpty(object)){
		alert("手机号码不能为空");
		return false;
	}
	
	var ex="(1((3[0-9])|59))|(([0-9]{2})(((-)([0-9]{7}))|([0-9]{7})))";	
	var reExpression=new RegExp(ex,"i");
	if( !reExpression.test(object.value)){
		alert("联系电话输入有误！");
		return false;
	}
	return true;
}

// 检查是否是中文字符串
function judgeSBCcase(string){  
	for(var index=0; index<string.length; index++){
		if(string.charCodeAt(index)>256){
			return true;
		}
	}
  return false;  
} 

var CalenderDate;
function fPopUpCalendarDlg(ctrlobj){	 
	showx = event.screenX - event.offsetX - 4 - 210 ; // + deltaX;
	showy = event.screenY - event.offsetY + 18; // + deltaY;	      
	CalenderDate = window.showModalDialog ("/ent/gb/CalendarDlg.htm","","unadorned:yes;help:no;dialogHide:yes;dialogLeft:"+showx+"px; dialogTop:"+showy+"px;scroll:no;status:no;dialogWidth=185px;dialogHeight=270px");
	
	if( CalenderDate != null ){
		ctrlobj.value = CalenderDate;
	}else{
		// alert("canceled");
	}
}

// 校验BIC号
function checkBankBic(){
	if((event.keyCode>=48 && event.keyCode<=57) || (event.keyCode>=65 && event.keyCode<=90)){
		event.returnValue=true;
	}
	else if(event.keyCode>=97 && event.keyCode<=122){
		event.keyCode=(event.keyCode-32);
	}
	else
		event.returnValue=false;
}

function standBIC(inObject){
	if(isEmpty(inObject)){
		return false;
	}
	
	var inStr = inObject.value;
	for(var i=0; i<inStr.length; i++)	{
		var charValue = inStr.charAt(i);
		if(charValue<"0"){
			inObject.focus();
			inObject.select();
			alert(inStr+" 非法BIC号!");
			return false;
		}else if(charValue>"9" && charValue<"A"){
			inObject.focus();
			inObject.select();
			alert(inStr+" 非法BIC号!");
			return false;
		}else if(charValue>"Z" && charValue<"a"){
			inObject.focus();
			inObject.select();
			alert(inStr+" 非法BIC号!");
			return false;
		}else if (charValue>"z"){
			inObject.focus();
			inObject.select();
			alert(inStr+" 非法BIC号!");
			return false;
		}
	}
	if(i < 11){
		inObject.focus();
		inObject.select();
		alert("BIC号长度必须为11位!");
		return false;
	}
	inObject.value = inStr.toUpperCase();
	return true;
}

// 检查是否标准邮件格式
function isEmail(str){
	t=0;
	j=0;
	for (var i=0; i<str.length; i++) {
		if (str.charAt(i) == '@') {
			t=1;
		}
		if (str.charAt(i) == '.') {
			j=1;					
		}
	}
	
	if(t==0){
		return false;
	}
	
	if(j==0){
	    return false;
	}	
	return true;
}

// SWIFT字符检查
function checkSwift(str){
	if(str == null || str == '')
		return true;
	var reg = /^[A-Za-z0-9.:()/\?\-\+,' ]+$/;
	if(!reg.test(str)){
		return false;  
	}
	return true;
}

function isRadioChecked(obj){
	if(obj.checked)
		return true;
	for(var i = 0; i < obj.length; i++){
		if(obj[i].checked){
			return true;
		}
	}
	return false;
}

// 检查字符串的字节长度
function checkStrByteLength(inStr ,leng) {
	if(inStr.length*2 <= leng)
		return true;
	else{ 
		var t=0; 
		for(i=0;i<=inStr.length;i++) {
			if(t>leng){
				return false;
			}
			if (inStr.charCodeAt(i) > 256)
				t+=2;
			else 
				t++;
		}
	}
	return true;
}

// 加密密码
function encryptPasswd(){
	var result;
	
	try{
		var powerpass=document.getElementById("OPassword");
		document.form1.Password.value = powerpass.getValue();  
		result = powerpass.verify();
  	}catch(e){
  		 
	}
  		
	if(result==-1){
  		alert("密码不能为空!");
  		return false;
  	}
  	else if(result==-2){
  		alert("密码长度错误!");
  		return false;
	}
  	else if(result < 0){
  		alert("密码内容不合法!");
  		return false;
  	}
  		
	return true;
}
	
function encryptPasswd1(ocxid,fieldid){
	var result;
	try{
		var powerpass=document.getElementById(ocxid);
		document.getElementById(fieldid).value = powerpass.getPinValue();  
		result = powerpass.verify();
	}catch(e){
		
	}
	
  	if(result==-1){
  		alert("密码不能为空!");
  		return false;
  	}
  	else if(result==-2){
  		alert("密码长度错误!");
  		return false;
	}
  	else if(result < 0){
  		alert("密码内容不合法!");
  		return false;
  	}
  	
	return true;
}
//根据输入密码进行校验
function encryptPasswd2(ocxid,fieldid){
	var result;
	try{
		var powerpass=document.getElementById(ocxid);
		document.getElementById(fieldid).value = powerpass.getValue();  
		result = powerpass.verify();
	}catch(e){
		
	}
	
  	if(result==-1){
  		alert("密码不能为空!");
  		return false;
  	}
  	else if(result==-2){
  		alert("密码长度错误!");
  		return false;
	}
  	else if(result < 0){
  		alert("密码内容不合法!");
  		return false;
  	}
  	
	return true;
}
//校验两次输入密码
function checkConsistency(pass1, pass2){
	try {
		var powerobj1 = document.getElementById(pass1);
		var powerobj2 = document.getElementById(pass2);
		var nresult1 = powerobj1.verify();
		var nresult2 = powerobj2.verify();
		if(nresult1 < 0 || nresult2 < 0){
			return false;
		} 
		if(powerobj1.getMeasureValue() != powerobj2.getMeasureValue()){
			return false;
		}
	}catch(e){
		return false;
	}
	return true;
}


//检查两个日期间隔是否在一年以内
//日期格式yyyymmdd
function checkDateForYear(stdate,eddate)
{
	var styear=Number(stdate.substring(0,4));
	var stmonth=Number(stdate.substring(4,6));
	var stday=Number(stdate.substring(6,8));
	var edyear=Number(eddate.substring(0,4));
	var edmonth=Number(eddate.substring(4,6));
	var edday=Number(eddate.substring(6,8));

	if ((edyear-styear) == 0) {
		return true;
	}
	
	if(edyear<styear || (edyear-styear)>1) {
		return false;
	}
	
	if ((edmonth-stmonth) > 0) {
		return false;
	}
	
	if ((edmonth-stmonth)==0 && (edday - stday)>0) {
		return false;
	}
	
	return true;
}


