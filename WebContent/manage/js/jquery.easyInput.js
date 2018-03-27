/************************************************************************
 ************************************************************************
 * 本JS用来统一处理表单域单击后调出输入法的问题。
 * 输入法目前有两种解决方案：1、捷通华声公司的EasyInput输入法；2、自定制的JS插件keyboard输入法，默认优先使用第一种方案
 * 本脚本需要依赖jquery，故引用此JS之前请务必先引入jquery插件
 * 
 * 使用说明：
 * 通过jquery动态为页面中所有拥有inputMode属性的input元素绑定click处理事件（live方式，支持动态添加的input）
 * 在页面中，只要为<input>标签添加"inputMode"属性，即可引用输入法控件
 * 示例用法如下：
 * <input name="text1" type="text" value="" inputMode="chinese" formatMode="comma" assMode="common" posMode="relative"/>
 * 
 * 其中：
 * inputMode: 必须，输入面板样式，如果不存在此属性，则将不能调用输入法控件功能，具体可选值如下：
 * 		pane_line	 – 区域行写，适用于区域中文手写输入，显示三个手写字区域
 * 		pane_over	 – 区域叠写，适用于区域中文手写输入，显示一个手写字区域（扩展别名：hand）
 * 		full_line	 – 全屏行写，适用于全屏中文手写输入，可在全屏书写
 * 		full_over	 – 全屏叠写，适用于全屏中文手写输入，可在全屏叠写
 * 		chinese		 – 中文拼音，适用于中文拼音输入（扩展别名：pinyin）
 * 		english		 – 英文（英文名），适用于英文输入
 * 		symbol		 – 符号界面，适用于特殊符号输入
 * 		sign		 – 手写签名
 * 		email		 – 英文（邮箱），适用于英文邮箱输入
 * 		id_card		 – 数字（身份证），适用于身份证输入
 * 		birthday	 – 数字（出生日期），适用于日期输入
 * 		phone		 – 数字（手机号），适用于手机号码输入()（扩展别名：phone_number/integer）
 * 		number		 – 数字（金额），适用于金额数值输入（扩展别名：money）
 * 		
 * 		备注：
 * 		inputMode属性值非以上可选参数时，默认为english，英文输入，扩展别名是出于见名知义的考虑，如pane_over与hand是一样的效果，都会调出手写面板
 * 		
 * formatMode:	可选，数据格式化规则，具体可选值如下：
 * 		comma – 千分位逗号，适用于金额的输入格式化
 * 		card  – 银行卡四位空格，适用于银行卡号四位加一空格的输入格式化
 * 		备注：
 * 		formatMode属性值非以上可选参数时，默认不进行任何格式化操作
 * 
 * assMode:	可选，联想字典，具体可选值如下：
 * 		common	– 通用词典——HCI_ASS_GBK，适用于大多数情况输入
 * 		address – 地址词典——HCI_ASS_ADDRESS，对于地址名称的输入，联想词组会更加准确
 * 		备注：
 * 		assMode属性值非以上可选参数时，则默认为common，建议只在地址输入时使用此属性
 * 		
 * posMode: 可选，定位模式，具体可选值如下：
 * 		relative – 跟随定位，跟随当前输入框浮动显示（优先在输入框下方显示）
 * 		absolute – 绝对定位，将输入法面板固定显示在屏幕上方或下方（优先在屏幕下方显示）
 * 		备注：
 * 		posMode属性值非以上可选参数时，则默认为relative，即跟随当前输入框浮动显示
 * 
 * ----------------
 * author: fengcm
 * version: 1.0
 * Date: 2014-7-11
 *************************************************************************
 *************************************************************************/
 
(function($) {
	window.__easyInput = {
		
		/*默认参数配置*/
		settings : {
			fullScreen : true,		//是否允许全屏写，为false时，所有设置inputMode为全屏写的模式都转变为区域行写
			zoomRate   : 1.0,		//输入面板缩放比率，1.0为输入法最原始大小
			inputMode  : "english",	//默认输入模式，默认为english-英文输入
			assMode    : "common",	//默认字典模式，默认为common-通用字典
			signPath   : "C:\\UserSignPNG\\sign" //签名图片默认保存路径
		},
		
		target : null,			//当前输入框元素
		inited : false,			//是否已初始化,在执行_init函数时初始化
		inputOCX : null,		//输入法OCX控件，以此调用输入法程序，在执行_init函数时初始化
		lastMode : '',			//上一面板模式，符号键盘的“返回”判断是回到英文，还是中文模式
		
		//控件初始化
		_init : function() {
			if (!document.getElementById("EasyInputOcx")) {
				var o = document.createElement("object");
				o.setAttribute("id", "EasyInputOcx");
				o.setAttribute("name", "EasyInputOcx");
				o.setAttribute("classid", "clsid:9e862dec-9d2e-471e-a76c-d2017f2bae04");
				document.body.appendChild(o);
			}
			this.inputOCX = document.getElementById("EasyInputOcx");
			this.inited = true;
		},
		
		//输入法打开（应用程序启动）
		open : function() {
			if (!this.inited) {
				this._init();
			};
			
			try {
				this.inputOCX.Open(1000);
			} catch (e) {
				//备用原始输入法
				window.__inputName = 'keyboard';
			}
		},
		
		//输入法显示（入口函数）
		show : function(ele) {
			if (!this.inited) {
				this._init();
			};
			this.target = ele;
			var inputMode = this.getInputMode(ele);
			var pos = this._getEasyInputPos(ele);
			var assMode = this._getAssMode(ele);
			
			try {
				this.inputOCX.ShowInputByPos(inputMode, pos.left, pos.top, assMode);
			} catch (e) {
				//备用原始输入法
			}
		},
			
		//签名面板自主定位显示
		showSign : function(left, top) {
			left = left == undefined ? 0 : left;
			top = top == undefined ? 0 : top;
			
			if (!this.inited) {
				this._init();
			};
			try {
				this.inputOCX.ShowInputByPos(8, left, top, 0);
			} catch (e) {
				//备用原始输入法
			}
		},
			
		//签名确定回调函数
		signOkCallback : function() {},
			
		//签名取消回调函数
		signCancelCallback : function() {},
		
		//输入法隐藏（出口函数）
		hide : function() {
			if (this.inputOCX) {
				try {
					this.inputOCX.HideAll();
				} catch (e) {
					//备用原始输入法
				}
			}
			
			//关闭按钮，执行自定义回调函数(自定义函数必须为window域下的全局函数，inputClosed="unctionName")
			if (this.target) {
				window.formatTools.formatDataOnClosed(this.target);
				var closedFunc = $(this.target).attr("inputClosed");
				if (closedFunc && window[closedFunc] && (typeof window[closedFunc] == "function")) {
					window[closedFunc]();
				}
			}
			this.target = null;
		},
		
		//切换面板时，在事件处理中调用以重新显示新面板
		changeMode : function(inputMode) {
			var pos = this._getEasyInputPos(this.target, inputMode);
			var assMode = this._getAssMode(this.target);
			try {
				this.inputOCX.ShowInputByPos(inputMode, pos.left, pos.top, assMode);
			} catch (e) {
				//备用原始输入法
			}
		},
		
		//清空按钮，清空输入框内容
		clear : function() {
			if (this.target && $(this.target).is(":text")) {
				this.target.value = "";
			}
		},
		
		//关闭按钮，执行自定义回调函数(自定义函数必须为window域下的全局函数，inputClosed="unctionName")
		closed : function() {
			if (this.target) {
				window.formatTools.formatDataOnClosed(this.target);
				var closedFunc = $(this.target).attr("inputClosed");
				if (closedFunc && window[closedFunc] && (typeof window[closedFunc] == "function")) {
					window[closedFunc]();
				}
			}
			this.target = null;
		},
		
		//获取签名图片的Base64格式字符串
		getSignStrBase64 : function() {
			var signStr = "";
			if (this.inputOCX) {
				try {
					signStr = this.inputOCX.GetSignStrBase64();
				} catch (e) {
					//备用原始输入法
				}
			}
			return signStr;
		},
		
		//获得输入法当前输入模式
		getCurrentInputMode : function() {
			var inputMode = "";
			if (this.inputOCX) {
				try {
					inputMode = this.inputOCX.GetInputMode();
				} catch (e) {
					//备用原始输入法
				}
			}
			return inputMode;
		},
		
		//设置部分按钮失效
		setKeyDisable : function(keyName) {
			if (this.inputOCX) {
				try {
					inputMode = this.inputOCX.SetKeyDisable(keyName);
				} catch (e) {
					//备用原始输入法
				}
			}
		},
		
		//设置所有按钮有效
		setAllKeysEnable : function() {
			if (this.inputOCX) {
				try {
					inputMode = this.inputOCX.SetAllKeysEnable();
				} catch (e) {
					//备用原始输入法
				}
			}
		},
		
		//获得输入框的输入方式设置（数字格式）
		getInputMode : function(ele) {
			var mode = '';
			var inputMode = ele.inputMode || this.settings.inputMode;
			switch (inputMode) {
				case 'hand':		//中文手写
				case 'pane_line':	//0 – 区域行写——pane_line 
					mode = '0'; break;
				case 'pane_over':	//1 – 区域叠写——pane_over 
					mode = '1'; break;
				case 'full_line':	//2 – 全屏行写 ——full_line
					mode = (this.settings.fullScreen) ? '2' : '0'; break;
				case 'full_over':	//3 – 全屏叠写——full_over 
					mode = (this.settings.fullScreen) ? '3' : '1'; break;
				case 'chinese':		//中文拼音 
				case 'pinyin':		//4 – 拼音——pinyin 
					mode = '4'; break;
				case 'english':		//5 – 英文
					mode = '5'; break;
				case 'undefined6':	//6 – 未定义
					mode = '6'; break;
				case 'symbol':		//7 – 符号界面——symbol
					mode = '7'; break;
				case 'sign':		//8 – 签名
					mode = '8'; break;
				case 'undefined9':	//9 – 未定义
					mode = '9'; break;
				case 'email':		//10 – 英文（邮箱）——email 
					mode = '10'; break;
				case 'id_card':		//11 – 数字（身份证）——id_card 
					mode = '11'; break;
				case 'birthday':	//12 – 数字（出生日期）——birthday
					mode = '12'; break;
				case 'integer':		//数字（整数）
				case 'phone':		//数字（手机号）
				case 'phone_number'://13 – 数字（手机号）
					mode = '13'; break;
				case 'number':		//数字（金额）
				case 'money':		//14 – 数字（金额）——money 
					mode = '14'; break;
				default:
					mode = '5';
			}
			
			return mode;
		},
		
		//获得字典模式
		_getAssMode : function(ele) {
			var mode = '';
			var assMode = ele.assMode || this.settings.assMode;
			switch (ele.assMode) {
				case 'common': //0 – 通用词典——HCI_ASS_GBK
					mode = '0';
					break;
				case 'address': //1 – 地址词典——HCI_ASS_ADDRESS
					mode = '1';
					break;
				default:
					mode = '0';
			}
			
			return mode;
		},
		
		//获取文本域的位置及宽高值
		_getInputPosAndWH : function(ele) {
			var $target = $(ele);
			var top = $target.offset().top;
			var left = $target.offset().left;
			var width = $target.width();
			var height = $target.height();
			
			return {'top': top, 'left': left, 'width': width, 'height': height};
		},

		//计算获取控件的最理想的显示位置
		_getEasyInputPos : function(ele, inputMode) {
			var newTop = 0;
			var newLeft = 0;
			var docWidth = $(document.body).width();
			var docHeight = $(document.body).height();
			
			var inputPos = this._getInputPosAndWH(ele);
			var ocxWH = this.getEasyInputWH(ele, inputMode);
			
			//未避免输入面板切换时可能上下移动，故定位时始终以输入面板中最大高度判断。
			var maxHeight = 480;
			
			//绝对定位
			var position = ele.posMode;
			if (position == 'absolute') {
				//垂直方向
				if (docHeight - (inputPos.top + inputPos.height + 25) > maxHeight) {//ocxWH.height
					newTop = docHeight - ocxWH.height - 20;
				} else {
					newTop = 20;
				}
				//水平方向
				newLeft = (docWidth - ocxWH.width) / 2;
			} else {
				//垂直方向
				if (docHeight - (inputPos.top + inputPos.height + 5) > maxHeight) {//下方显示 ocxWH.height
					newTop = inputPos.top + inputPos.height + 5;
				} else if (inputPos.top - 5 > maxHeight) {//上方显示 ocxWH.height
					newTop = inputPos.top - ocxWH.height - 5;
				} else {//上方也显示不开的时候，就在下方显示
					newTop = inputPos.top + inputPos.height + 5;
				}
				//水平方向
				if (docWidth - inputPos.left - 5 > ocxWH.width) {//对齐显示
					newLeft = inputPos.left;
				} else {//居右显示
					newLeft = docWidth - ocxWH.width - 5;
				}
			}
			
			return {'top': newTop, 'left': newLeft};
		},
		
		//根据当前控件的输入模式，获得其对应的宽高值
		getEasyInputWH : function(ele, inputMode) {
			var width = 0;
			var height = 0;
			var inputMode = inputMode || this.getInputMode(ele);
			switch (inputMode) {
				case '0': //0 – 区域行写——pane_line
					width = 900; height = 480; break;
				case '1': //1 – 区域叠写——pane_over
					width = 600; height = 480; break;
				case '2': //2 – 全屏行写 ——full_line
					width = 900; height = 150; break;
				case '3': //3 – 全屏叠写——full_over
					width = 900; height = 150; break;
				case '4': //4 – 拼音——chinese
					width = 900; height = 400; break;
				case '5': //5 – 英文——English
					width = 900; height = 360; break;
				case '6': //6 – 未定义
					width = 900; height = 480; break;
				case '7': //7 – 符号界面——symbol
					width = 690; height = 270; break;
				case '8': //8 – 签名 —— sign
					width = 900; height = 480; break;
				case '9': //9 – 未定义
					width = 900; height = 480; break;
				case '10': //10 – 英文（邮箱）——email
					width = 900; height = 360; break;
				case '11': //11 – 数字（身份证）——id_card
					width = 400; height = 280; break;
				case '12': //12 – 数字（出生日期）——birthday
					//width = 400; height = 280;
					width = 500; height = 280; break;
				case '13': //13 – 数字（手机号）——phone_number
					width = 400; height = 280; break;
				case '14': //14 – 数字（金额）——money			
					width = 400; height = 280; break;
				default:
					width = 900; height = 480;
			}
			
			return {'width': width * this.settings.zoomRate, 'height': height * this.settings.zoomRate};
		}
	};
	//-----------------------------------------------------------------------------------------------------------
	window.__keyboard = {
		settings : {
			keys : {
				alphabet : ["1234567890", "qwertyuiop", "asdfghjkl", "zxcvbnm"],
				symbols : ["1234567890", "@#$%&*!?:", "+-\"'(),."],
				numbers : ["1234567890."],
				integers : ["1234567890"]
			}
		},

		_iframe : null,				//
		keyboardContainer : null,	//键盘总容器
		charContainer : null,		//键盘英文字符容器
		ctrlContainer : null,		//键盘控制按钮容器
		target : null,				//当前输入框的jquery对象
		inputMode : 'english',		//键盘输入类型：chinese 中文，english 英文，number 数字，symbol 标点符号
		capital : false,			//是否大写: true：大写，false：小写
		inited : false,				//键盘总容器是否已初始化
		maxColumns : 10,			//每行button数量的最大值
		totalPage : 0,				//备选汉字翻页参数，总页数
		currentPage : 0,			//备选汉字翻页参数，当前页
		chineseChars : '',			//当前所有候选字的字符串
		
		/******************************输入法控件调用方法******************************/
		
		//初始化默认键盘的DIV布局元素并隐藏。
		//页面加载后只执行一次初始化操作，初始化成功后inited设置为true
		_init : function(ele) {
			this.target = $(ele);
			this.inputMode = this._getInputMode(ele);
			//创建整个中文输入法容器
			var $div = $("<div id='keyboard' symbol='spdb'>" + 
							//"<fieldset symbol='spdb'>" + 
							//"<legend id='keyboard-legend' symbol='spdb'>中文</legend>" + 
							//备选汉字容器
							"<div id='keyboard-chineseContainer' symbol='spdb'>" + 
								"<span id='keyboard-chinese' symbol='spdb'></span>" + 
							"</div>" + 
							//输入拼音容器
							"<div id='keyboard-pinyinContainer' symbol='spdb'>" + 
								"<span id='keyboard-pinyin' symbol='spdb'></span>" + 
							"</div>" + 
							//键盘字符容器
							"<div id='keyboard-charBtnContainer' symbol='spdb'>" + 
								this._createCharBtnContainerHtml(this.settings.keys.alphabet) + 
							"</div>" + 
							//控制按钮容器
							"<div id='keyboard-ctrlBtnContainer' symbol='spdb'>" + 
								this._createCtrlBtnContainerHtml() + 
							"</div>" + 
							//"</fieldset>" + 
						"</div>");
			
			this.charContainer = $("#keyboard-charBtnContainer", $div);
			this.ctrlContainer = $("#keyboard-ctrlBtnContainer", $div);
			this.keyboardContainer = $div.appendTo(document.body).hide();
			//创建一透明、等尺寸的iframe元素作为背景，遮住下拉框、OCX等
			this._iframe = $("<iframe id='keyboard-iframe' symbol='spdb'>").appendTo(document.body).hide();
			this.inited = true;
		},
		
		//显示输入法面板(入口函数，可绑定输入文本域的click事件)
		_show : function(ele) {
			if (!this.inited) {
				this._init(ele);
			} else {
				this.target = $(ele);
				this.inputMode = this._getInputMode(ele);
			}
			this.resetKeyboardContainer();
			this.keyboardContainer.show();	
			this._iframe.show();
		},
		
		//关闭输入法面板(出口函数，可绑定document的click事件)
		_close : function() {
			if (!this.inited) {
				return;
			}
			
			this.keyboardContainer.hide();
			this._iframe.hide();
			
			window.formatTools.formatDataOnClosed(this.target && this.target.get(0));
			//关闭按钮，执行自定义回调函数(自定义函数必须为window域下的全局函数，inputClosed="unctionName")
			var closedFunc = this.target && this.target.attr("inputClosed");
			if (closedFunc && window[closedFunc] && (typeof window[closedFunc] == "function")) {
				window[closedFunc]();
			}
			this.target = null;
		},
		
		//根据inputMode重新布局键盘格局（清空中文候选字及拼音区域，重设键盘字符，重设控制按钮状态）
		resetKeyboardContainer : function() {
			var displayKeys = [];
			if (this.inputMode == 'chinese') {
				displayKeys = this.settings.keys.alphabet;
				//$("#keyboard-chineseContainer,#keyboard-pinyinContainer").show();
				//$("#keyboard-legend").text("中文");
			} else if (this.inputMode == 'english') {
				displayKeys = this.settings.keys.alphabet;
				//$("#keyboard-chineseContainer,#keyboard-pinyinContainer").hide();
				//$("#keyboard-legend").text("英文");
			} else if (this.inputMode == 'number') {
				displayKeys = this.settings.keys.numbers;
				//$("#keyboard-chineseContainer,#keyboard-pinyinContainer").hide();
				//$("#keyboard-legend").text("数字");
			} else if (this.inputMode == 'integer') {
				displayKeys = this.settings.keys.integers;
			} else if (this.inputMode == 'symbol') {
				displayKeys = this.settings.keys.symbols;
				//$("#keyboard-chineseContainer,#keyboard-pinyinContainer").hide();
				//$("#keyboard-legend").text("符号");
			}
			
			this._clearChineseContainer();
			$("#keyboard-charBtnContainer").html(this._createCharBtnContainerHtml(displayKeys));
			this._resetCtrlBtnState();
			this._resetContainerPosition();
		},
		
		//清空候选汉字内容
		_clearChineseContainer : function() {
			this.currentPage = 0;
			this.totalPage = 0;
			this.chineseChars = "";
			$("#keyboard-chinese").html("");
			$("#keyboard-pinyin").html("");
		},
		
		//创建键盘字符按钮的HTML, keys:["qwertyuiop", "asdfghjkl", "zxcvbnm"]
		_createCharBtnContainerHtml : function(keys) {
			var htmlStr = "";
			for (var i = 0; i < keys.length; i++) {
				var lineStr = "<div class='keyboard-charBtnLine' symbol='spdb'>";
				var keysArray = keys[i].split("");
				for (var j = 0; j < keysArray.length; j++) {
					lineStr += "<button class='keyboard-charBtn' onclick='window.__keyboard._charBtnClick(this)' symbol='spdb'>" + keysArray[j] + "</button>";
				}
				lineStr += "</div>";
				htmlStr += lineStr;
			}
			
			return htmlStr;
		},
		
		//创建键盘控制按钮的HTML
		_createCtrlBtnContainerHtml : function() {
			var htmlStr = "";
			var controls = [{label:"大写", id:"capitalToggle", disable:true},
							{label:"英文", id:"languageToggle", disable:false},
							{label:"数字", id:"numberToggle", disable:false},
							{label:"符号", id:"symbolToggle", disable:false},
							{label:"空格", id:"blankSpace", disable:false},
							{label:"退格", id:"backspace", disable:false},
							{label:"清空", id:"clear", disable:false},
							{label:"关闭", id:"close", disable:false}];
							
			var obj = null;
			for (var i = 0; obj = controls[i]; i++) {
				var buttonStr = "<button id='" + obj.id + "' class='keyboard-ctrlBtn' onclick='window.__keyboard._ctrlBtnClick(this)'" + (obj.disable ? " disabled='disabled'" : "") + " symbol='spdb'>" + obj.label + "</button>";
				htmlStr += buttonStr;
			}
			
			return htmlStr;
		},
		
		//获得输入方式（针对easyInput的十几种情况，此处只归结为四种：chinese 中文，english 英文，number 数字，symbol 标点符号）
		_getInputMode : function(ele) {
			var mode = 'english';//键盘输入类型：
			switch (ele.inputMode) {
				case 'hand':		//中文手写
				case 'pane_line':	//0 – 区域行写——pane_line 
				case 'pane_over':	//1 – 区域叠写——pane_over
				case 'full_line':	//2 – 全屏行写 ——full_line
				case 'full_over':	//3 – 全屏叠写——full_over 
				case 'chinese':		//中文拼音 
				case 'pinyin':		//4 – 拼音——pinyin 
					mode = 'chinese'; break;
				case 'english':		//5 – 英文
				case 'email':		//10 – 英文（邮箱）——email 
					mode = 'english'; break;
				case 'number':		//数字（金额）
				case 'money':		//14 – 数字（金额）——money 
					mode = 'number'; break;
				case 'id_card':		//11 – 数字（身份证）——id_card 
				case 'integer':		//数字（整数）
				case 'phone':		//数字（手机号）
				case 'phone_number'://13 – 数字（手机号）
					mode = 'integer'; break;
				case 'symbol':		//
					mode = 'symbol'; break;
				default:
					mode = 'english';
			}
			
			return mode;
		},
		
		//文本域新增内容
		_input : function(str) {
			var maxLength = this.target.attr("maxLength");
			if (maxLength && this.target.val().length >= parseInt(maxLength)) {
				return;
			}
			var ele = this.target.get(0);
			ele.value = ele.value + str;
			/*
			var ele = this.target.get(0);
			ele.focus();
			var sel = document.selection.createRange();
			sel.moveStart('character', -ele.value.length);
			var selTxt = sel.text;//当前光标之前所有的字符串
			var currPos = selTxt.length;
			ele.value = selTxt + str + ele.value.substring(currPos);
			
			var newPos = currPos + str.length;
			var oRng = ele.createTextRange();
			oRng.collapse(true);
			oRng.moveStart('character', newPos);
			oRng.select();
			*/
		},
		
		//文本域退格
		_back : function() {
			var val = this.target.val();
			if (val.length == 0) {
				return;
			}
			var ele = this.target.get(0);
			ele.value = val.substr(0, val.length - 1);
			/*
			var ele = this.target.get(0);
			ele.focus();
			var sel = document.selection.createRange();
			sel.moveStart('character', -ele.value.length);
			var selTxt = sel.text;//当前光标之前所有的字符串
			var currPos = selTxt.length;
			if (currPos > 0) {
				var newVal = selTxt.substring(0, currPos - 1) + ele.value.substring(currPos);
				ele.value = newVal;
				var newPos = currPos - 1;
				var oRng = ele.createTextRange();
				oRng.collapse(true);
				oRng.moveStart('character', newPos);
				oRng.select();
			}
			*/
		},
		
		//清空文本域内容
		_clear : function() {
			this.target.val("");
		},
		
		//获取文本域的位置及宽高值
		_getInputPosAndWH : function() {
			var top = this.target.offset().top;
			var left = this.target.offset().left;
			var width = this.target.width();
			var height = this.target.height();
			
			return {'top': top, 'left': left, 'width': width, 'height': height};
		},
		
		//根据当前文本域的输入模式，获得键盘面板对应的宽高值
		_getKeyboardWH : function() {
			//TODO 这地方需要改造
			var width = $("#keyboard").width() + 10;
			var height = $("#keyboard").height() + 10;
			
			return {'width': width, 'height': height};
		},
		
		//计算获取键盘的最理想的显示位置
		_getKeyboardPos : function() {
			var newTop = 0;
			var newLeft = 0;
			
			var docWidth = $(document.body).width();
			var docHeight = $(document.body).height();
			
			var inputPos = this._getInputPosAndWH();
			var keyboardWH = this._getKeyboardWH();
			
			//垂直方向
			if (docHeight - (inputPos.top + inputPos.height + 5) > keyboardWH.height) {//下方显示
				newTop = inputPos.top + inputPos.height + 5;
			} else if (inputPos.top - 5 > keyboardWH.height) {//上方显示
				newTop = inputPos.top - keyboardWH.height - 5;
			} else {//上方也显示不开的时候，就在下方显示
				newTop = inputPos.top + inputPos.height + 5;
			}
			
			//水平方向
			if (docWidth - inputPos.left - 5 > keyboardWH.width) {//对齐显示
				newLeft = inputPos.left;
			} else {//居右显示
				newLeft = docWidth - keyboardWH.width - 5;
			}
			
			var position = this.target.attr("posMode");
			if (position == 'absolute') {
				if (docHeight - (inputPos.top + inputPos.height + 25) > keyboardWH.height) {
					newTop = docHeight - keyboardWH.height - 20;
				} else {
					newTop = 20;
				}
				newLeft = (docWidth - keyboardWH.width) / 2;
			}
			
			return {'top': newTop, 'left': newLeft};
		},
		
		//重新定位输入法面板位置
		_resetContainerPosition : function() {
			var len = $("#keyboard-charBtnContainer").find(".keyboard-charBtnLine:first").find("button").length;//第一行字符按钮的数量
			var width = 1280;//len * 84 + 10;//button width:80px, margin:2px,
			$("#keyboard").width(width);
			var pos = this._getKeyboardPos();
			this.keyboardContainer.css({top: pos.top + 'px', left: pos.left + 'px'});
			this._iframe.css({top: pos.top + 'px', left: pos.left + 'px'});
			this._iframe.width(pos.width).height(pos.height);
		},
		
		//查找所有以pinyinStr开头的拼音的候选汉字
		_getChineseChars : function(pinyinStr) {
			var result = "";
			if (!pinyinStr) return "";
			for (var pinyin in window.chineseCharacter) {
				if (pinyin.indexOf(pinyinStr) == 0) {
					result += window.chineseCharacter[pinyin];
				}
			}
			return result;
		},
		
		//重新显示候选字区域
		_resetChineseContainer : function() {
			var html = "";
			if (!this.chineseChars) {
				$("#keyboard-chinese").html("");
				return;
			}
			
			var charArray = this.chineseChars.split("");
			var characterAmount = charArray.length;
			this.totalPage = Math.ceil(characterAmount / (this.maxColumns - 2));
			
			var preDisabled = (this.currentPage == 0) ? true : false;
			var nextDisabled = (this.currentPage == (this.totalPage - 1)) ? true : false;
			
			var strPre = "<button class='keyboard-chineseBtn' flag='pre' onclick='window.__keyboard._pageChangeBtnClick(this)'" + (preDisabled ? " disabled='disabled'" : "") + " symbol='spdb'> < </button>";
			html += strPre;
			
			var startIndex = this.currentPage * (this.maxColumns - 2);
			var endIndex = Math.min(startIndex + this.maxColumns - 2, charArray.length);
			for (; startIndex < endIndex; startIndex++) {
				var strCNChar = "<button class='keyboard-chineseBtn' flag='pre' onclick='window.__keyboard._chineseCharBtnClick(this)' symbol='spdb'>" + charArray[startIndex] + "</button>";
				html += strCNChar;
			}
			
			var strNext = "<button class='keyboard-chineseBtn' flag='next' onclick='window.__keyboard._pageChangeBtnClick(this)'" + (nextDisabled ? " disabled='disabled'" : "") + " symbol='spdb'> > </button>";
			html += strNext;
			$("#keyboard-chinese").html(html);
		},
		
		//键盘字符按钮的点击事件
		_charBtnClick : function(ele) {
			var label = ele.innerText;
			if (this.inputMode == 'chinese') {//中文
				if (/\d/.test(label)) {
					this._input(label);
				} else {
					var pinyinStr = $("#keyboard-pinyin").text() + label;
					$("#keyboard-pinyin").text(pinyinStr);
					this.currentPage = 0;
					this.totalPage = 0;
					this.chineseChars = this._getChineseChars(pinyinStr);
					this._resetChineseContainer();
				}
			} else {//英文、数字、符号
				this._input(label);
			}
		},
		
		//候选汉字翻页按钮点击事件
		_pageChangeBtnClick : function(ele) {
			var flag = ele.flag;
			if (flag == "pre") {
				this.currentPage--;
			} else {
				this.currentPage++;
			}
			this._resetChineseContainer();
		},
		
		//候选汉字点击事件
		_chineseCharBtnClick : function(ele) {
			this._input(ele.innerText);
			this._clearChineseContainer();
		},
		
		//“控制按钮”单击事件，ele为所点击的按钮元素
		_ctrlBtnClick : function(ele) {
			var label = ele.innerText;
			
			if (label == "关闭") {
				this._close();
			} else if (label == "空格") {
				this._input(" ");
			} else if (label == "清空") {
				this._clear();
			} else if (label == "退格") {
				if (this.inputMode == 'chinese') {//如果当前为中文输入，则优先删除拼音
					var pinyinStr = $("#keyboard-pinyin").text();
					if (pinyinStr.length > 0) {
						pinyinStr = pinyinStr.substr(0, pinyinStr.length - 1);
						$("#keyboard-pinyin").text(pinyinStr);
						this.currentPage = 0;
						this.totalPage = 0;
						this.chineseChars = this._getChineseChars(pinyinStr);
						this._resetChineseContainer();
					} else {
						this._back();
					}
				} else {//英文、数字、符号
					this._back();
				}
			} else if (label == "大写" || label == "小写") {
				this.inputMode = 'english';
				if (label == "大写") {
					this.capital = true;
					$("#keyboard-charBtnContainer").find("button").each(function(){
						$(this).text($(this).text().toUpperCase());
					});
				} else {
					this.capital = false;
					$("#keyboard-charBtnContainer").find("button").each(function(){
						$(this).text($(this).text().toLowerCase());
					});
				}
				this._resetCtrlBtnState();
			} else if (label == "中文" || label == "英文") {
				if (label == "中文") {
					this.inputMode = "chinese";
				} else {
					this.inputMode = "english";
				}
				this.capital = false;
				this.resetKeyboardContainer();
			} else if (label == "数字") {
				this.inputMode = "number";
				this.capital = false;
				this.resetKeyboardContainer();
			} else if (label == "符号" || label == "返回") {
				if (label == "符号") {
					this.lastMode = this.inputMode;
					this.inputMode = "symbol";
				} else {
					if (this.lastMode == "chinese") {
						this.inputMode = "chinese";
					} else {
						this.inputMode = "english";
					}
				}
				this.capital = false;
				this.resetKeyboardContainer();
			}
		},
		
		//根据inputMode重设控制按钮状态（可用状态，字面显示值）
		_resetCtrlBtnState : function() {
			if (this.inputMode == 'chinese') {//中文，“切换大写”不可用
				if (this.capital) {
					$("#capitalToggle").text("小写").attr("disabled", "disabled");
				} else {
					$("#capitalToggle").text("大写").attr("disabled", "disabled");
				}
				$("#languageToggle").text("英文").removeAttr("disabled");
				$("#symbolToggle").text("符号");
				$("#capitalToggle,#languageToggle,#numberToggle,#symbolToggle,#blankSpace").show();
			} else if (this.inputMode == 'english') {//英文
				if (this.capital) {
					$("#capitalToggle").text("小写").removeAttr("disabled");
				} else {
					$("#capitalToggle").text("大写").removeAttr("disabled");
				}
				$("#languageToggle").text("中文").removeAttr("disabled");
				$("#symbolToggle").text("符号");
				$("#capitalToggle,#languageToggle,#numberToggle,#symbolToggle,#blankSpace").show();
			} else if (this.inputMode == 'number' || this.inputMode == 'integer') {//只显示退格，清空，关闭三个控制按钮
				$("#capitalToggle,#languageToggle,#numberToggle,#symbolToggle,#blankSpace").hide();
				$("#backspace,#clear,#close").show();
			} else if (this.inputMode == 'symbol') {//符号，“切换大写”不可用，“切换英文”不可用
				if (this.capital) {
					$("#capitalToggle").text("小写").attr("disabled", "disabled");
				} else {
					$("#capitalToggle").text("大写").attr("disabled", "disabled");
				}
				$("#languageToggle").text("英文").attr("disabled", "disabled");
				$("#symbolToggle").text("返回");
				$("#capitalToggle,#languageToggle,#numberToggle,#symbolToggle,#blankSpace").show();
			}
		}
	};
	//-------------------------------------------------------------------------------------------------------
	window.formatTools = {
		/*参数配置*/
		settings : {
			decimal : 2		//小数位数，千分位格式化时是否截取小数位，-1(负数)时表示不截取，0表示只保留整数，2(正数)表示截取（补足）几位小数
		},
		
		//格式化数据（关闭输入法时调用），
		formatDataOnClosed : function(ele) {
			var oldVal = ele && ele.value;
			if (!oldVal) {
				return;
			}
			if (ele.formatMode == 'comma') {
				var newVal = this.addComma(oldVal);
				if (oldVal != newVal) {
					$(ele).val(newVal);
				}
			}
		},
		
		//格式化数据（值变化时即调用），
		formatDataOnChange : function(ele) {
			var oldVal = ele.value;
			if (!oldVal) {
				return;
			}
			if (ele.formatMode == 'card') {
				var newVal = this.addSpace(oldVal);
				if (oldVal != newVal) {
					ele.focus();
					var sel = document.selection.createRange();
					sel.moveStart('character', -ele.value.length);
					var selTxt = sel.text;//当前光标之前所有的字符串
					var currPos = selTxt.length;
					var step = newVal.length - oldVal.length;
					if (step == 0) {//与原先value值长度一样
						//加字符
						//1234 567|-->1234 567|;	0
						//7|1234 56-->7|123 456;	0
						//12347| 56-->1234 |756;	1	特殊情况
						//1234 7|56-->1234 7|56;	0
						//减字符(backspace或delete)
						//1234 56|-->1234 56|;		0
						//123| 567-->123|5 67;		0
						var start = newVal.substr(0, selTxt.length);
						if (start != selTxt) {
							step = 1;
						}
					} else if (step == 1) {//比原先value值长度多1个字符
						//加字符
						//1234 56789|-->1234 5678 |9;	1
						//9|1234 5678-->9|123 4567 8;	0	特殊情况
						//12349| 5678-->1234 |9567 8;	1
						//1234 9|5678-->1234 9|567 8;	0	特殊情况
						//减字符(backspace或delete)
						//1234|56-->1234| 56;			1
						var start = newVal.substr(0, selTxt.length);
						if (start == selTxt) {
							step = 0;
						}
					} else if (step == -1) {//比原先value值长度少1个字符
						//加字符
						//1234 5678 |-->1234 5678|;		-1
						// |1234 5678-->1|234 5678;		-1
						//1234 | 5678-->1234 |5678;		0	特殊情况
						//1234  |5678-->1234 5|678;		-1
						//12 |34 5678-->123|4 5678;		-1
						//减字符(backspace或delete)
						//1234 |-->1234|;				-1
						//123| 5-->123|5;				0	特殊情况
						//|234 5-->|2345;				0	特殊情况
						var start = newVal.substr(0, selTxt.length);
						if (start == selTxt) {
							step = 0;
						}
						
					}
					ele.value = newVal;
					var newPos = currPos + step;
					setTimeout(function(){
						window.formatTools.setCursorPos(ele, newPos);
					}, 10);
				}
			}
		},
		
		//格式化金额数据，增加千分位，小数点后两位
		//例：1234567.899 --> 1,234,567.90
		addComma : function(val) {
			if (!val) {
				return "";
			}
			//trim空白符，空格，逗号
			val = val.replace(/^\s+|\s+$/g, '').replace(/[ ]/g, '').replace(/,/g, '');
			
			if (isNaN(val)) {
				return "";
			}
			
			var intPart = "";
			var pointPart = "";
			var p = val.indexOf('.');
			if (p >= 0) {
				intPart = val.substring(0, p);
				pointPart = val.substring(p + 1, val.length);
			} else {
				intPart = val;
				pointPart = "";
			}
			
			var reg = /^0/;
			while (reg.test(intPart)) {//去除多余前导0
				intPart = intPart.replace(reg, "");
			}
			if (intPart.length == 0) {
				intPart = "0";
			}
			
			var re = /(-?\d+)(\d{3})/;
			while (re.test(intPart)) {
				intPart = intPart.replace(re, "$1,$2");			
			}
			
			if (this.settings.decimal > 0) {
				while (pointPart.length < this.settings.decimal) {
					pointPart += "0";
				}
				pointPart = pointPart.substring(0, this.settings.decimal);
				val = intPart + "." + pointPart;
			} else if (this.settings.decimal == 0) {
				pointPart = "";
				val = intPart;
			} else {
				val = intPart + (pointPart.length > 0 ? "." : "") + pointPart;
			}

			return val;
		},
		
		//移除千分位，还原为原始数值
		//例：1,234,567.90 --> 1234567.90
		removeComma : function(val) {
			if (!val) {
				return "";
			}
			val = val.replace(/,/g, '');
			return val;
		},
		
		getAmount : function(val) {
			val = this.removeComma($.trim(val));
			if (val && !isNaN(val)) {
				return parseFloat(val);
			} else {
				return 0;
			}
		},
		
		//银行卡号格式化（每4位加1空格）
		//例：12345678901234567890 --> 1234 5678 9012 3456 7890
		addSpace : function(val) {
			if (!val) {
				return "";
			}
			val = val.replace(/\W/g, '');
			var re = /(\w{4})(\w+)/;
			while (re.test(val)) {
				val = val.replace(re, "$1 $2");
			}
			return val;
		},
		
		//银行卡号还原（删除所有空格）
		//例：1234 5678 9012 3456 7890 --> 12345678901234567890
		removeSpace : function(val) {
			if (!val) {
				return "";
			}
			val = val.replace(/\W/g, '');
			return val;
		},
		
		getCursorPos : function(ele) {
			ele.focus();
			var sel = document.selection.createRange();
			sel.moveStart('character', -ele.value.length);
			var currPos = sel.text.length;
			return currPos;
		},
		
		setCursorPos : function(ele, pos) {
			ele.focus();
			var oRng = ele.createTextRange();
			oRng.collapse(true);
			oRng.moveStart('character', pos);
			//oRng.move('character', pos);
			oRng.select();
		}

	};
	
	//----------------------------------------------------------------------------------------------------
	window.__inputName = 'easyInput';
	//window.__inputName = 'keyboard';
	//显示输入法，参数ele为当前文本域对象
	window.showInput = function(ele) {
		if ($(ele).attr("readonly") != undefined || $(ele).is(":disabled")) {//只读和禁用的输入框不显示输入法
			return;
		}
	
		if (window.__inputName == 'easyInput') {
			window.__easyInput.show(ele);//显示输入法
		} else if (window.__inputName == 'keyboard') {
			window.__keyboard._show(ele);
		}
	};
	
	//隐藏输入法
	window.hideInput = function() {
		if (window.__inputName == 'easyInput' && window.__easyInput) {
			window.__easyInput.hide();
		} else if (window.__inputName == 'keyboard' && window.__keyboard) {
			window.__keyboard._close();
		}
	};
	
	$(document).ready(function(){
		//页面卸载时，关闭输入法
		$(window).unload(function() {
			window.hideInput();
		});
		
		//监听document的click事件，以关闭输入法
		$("body").bind("click", function(event){
			var ele = event.srcElement;
			if (window.__inputName == 'easyInput') {
				if (!$(ele).is(":input[inputMode]")) {//不是输入框
					if(window.__easyInput.getCurrentInputMode() != "8") {//手写签名的时候点击屏幕不主动隐藏
						window.__easyInput.hide();
					}
				} else {
					if (window.__easyInput.target) {
						if (ele != window.__easyInput.target) {//点击了另一个输入框
							window.__easyInput.hide();
						}
					}
				}
			} else if (window.__inputName == 'keyboard') {
				var symbol = $(ele).attr("symbol");
				if (!$(ele).attr("symbol")) {//不是键盘元素
					if (!$(ele).is(":input[inputMode]")) {//不是输入框
						window.__keyboard._close();
					} else {
						if (window.__keyboard.target) {
							if (ele != window.__keyboard.target.get(0)) {//点击了另一个输入框
								window.__keyboard._close();
							}
						}
					}
				} else {//点击键盘后，光标定位到输入框
					//if (window.__keyboard.target) {
					//	window.__keyboard.target.focus();
					//}
				}
			}
		});
		
		//监听input的click事件，以显示输入法
		$("input[inputMode]").live("click", function(){
			var ele = this;
			//propertychange不支持live绑定，所以只能在第一次单击时绑定
			if (!$(ele).attr("ownerListner")) {//标识是否已绑定propertychange事件，以控制只绑定一次
				$(ele).attr("ownerListner", "1");
				//监听表单域内容变化()，数据格式化，超时重置等（只支持IE），
				ele.attachEvent("onpropertychange", function(o) {//此方法内千万不要有恒修改值的操作（即每次执行都必然会有修改值操作），否则会死循环
					if (o.propertyName == "value") {//只响应值的变化
						//数据格式化
						window.formatTools.formatDataOnChange(ele);
					}
				});
			}
			//显示输入法面板
			window.showInput(ele);
		});
		
		//页面加载后即立即打开输入法
		window.__easyInput.open();
	});
	
	//给页面添加输入法监听事件
	var easyInputEventStr = 
//	'<SCRIPT TYPE="text/javascript">' + 
//	'	var inputCount = 0;' + 
//	'</SCRIPT>' + 
	'<SCRIPT TYPE="text/javascript" FOR="EasyInputOcx" EVENT="InputEvent">' + 
	'	/*输入面板每一次点击按钮即触发此事件*/' + 
//	'	jQuery("#msg").html("正在输入。。。 " + (++inputCount) + "次，页面重计时。");' + 
	'	/*页面重计时*/' + 
	'	if(window.resetCounter) {' + 
	'		window.resetCounter();' + 
	'	} else {' + 
	'		if(window.PCButtonRefresh) {' + 
	'			PCButtonRefresh.TriggerControl();' + 
	'			window.RestartCounter();' + 
	'		}' + 
	'	}' + 
	'</SCRIPT>' + 
	'<SCRIPT TYPE="text/javascript" FOR="EasyInputOcx" EVENT="SignOkEvent">' + 
	'	/*签名面板点击“确定”按钮触发此事件*/' + 
	'	window.__easyInput.signOkCallback();' + 
	'</SCRIPT>' + 
	'<SCRIPT TYPE="text/javascript" FOR="EasyInputOcx" EVENT="SignCancelEvent">' + 
	'	/*签名面板点击“取消”按钮触发此事件*/' + 
	'	window.__easyInput.signCancelCallback();' + 
	'</SCRIPT>' + 
	'<SCRIPT TYPE="text/javascript" FOR="EasyInputOcx" EVENT="InputModeChanged">' + 
	'	/*输入面板切换输入模式时触发此事件*/' + 
//	'	jQuery("#msg").html("输入面板切换到：" + arguments[0]);' + 
	'	var inputMode = window.__easyInput.getInputMode({"inputMode" : arguments[0]});' + 
	'	window.__easyInput.changeMode(inputMode);' + 
	'</SCRIPT>' + 
	'<SCRIPT TYPE="text/javascript" FOR="EasyInputOcx" EVENT="ClearStringEvent">' + 
	'	/*输入面板点击“清空”按钮触发此事件*/' + 
//	'	jQuery("#msg").html("清空");' + 
	'	window.__easyInput.clear();' + 
	'</SCRIPT>' + 
	'<SCRIPT TYPE="text/javascript" FOR="EasyInputOcx" EVENT="HideButtonClicked">' + 
	'	/*输入面板点击“关闭”按钮触发此事件*/' + 
//	'	jQuery("#msg").html("关闭");' + 
	'	window.__easyInput.closed();' + 
	'</SCRIPT>';
	
	document.write(easyInputEventStr);
})(jQuery);
