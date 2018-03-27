package com.java.common.constant;

public interface ISoapConstant {
	
	/** soap constant **/
	String SOAP_PATH = "config/common/soap";   // soap请求报文模板存放路径
	String SERVICEADR = "ServiceAdr";		   // 接口调用url地址存放字段
	String SOAPCACHE = "soapCache";			   // 请求报文缓存	
	String SOAPSUCC = "000000000000";		   // ReturnCode 为12个0，表示请求成功
	
	/** ReqSvcHeader **/
	String REQSVCHEADER_TRANDATE = "TranDate";
	String REQSVCHEADER_TRANTIME = "TranTime";
	String REQSVCHEADER_GLOBALSEQNO = "GlobalSeqNo";
	String SYSDATE = "yyyyMMdd";
	String SYSTIME = "HHmmssSSS";
	String CONSUMERID = "0478";				   // 调用方系统ID
	
	String HTTP = "http://";
	String DOMAIN = "esb.spdbbiz.com";		   // 域名
	String COLON = ":";							
	String PORT = "7701";					   // 端口号
	String SLANT = "/";
	String SERVICE = "services";
	
	/** ReqHeader **/
	String REQHEADER_MAC = "Mac";
	String REQHEADER_MACORGID = "MacOrgId";
	String REQHEADER_MSGID = "MsgId";
	String REQHEADER_SOURCESYSID = "SourceSysId";
	String REQHEADER_CONSUMERID = "ConsumerId";
	String MAC = "0000000000000000";         			// 默认16个0，不进行MAC校验
	String MACORGID = "9993";				 			// Mac机构号
	String MSGID = "00000000000000000000000000000001";	// 服务消息ID
	String SOURCESYSID = "0478";						// 服务提供方ID
	
	
	/** JSONCallAccess **/
	String UTF8 = "UTF-8";
	String TTYPE = "tType";
	String VTM = "VTM";
	
	String TEMP05 = "暂不支持的设备类型";
	String TEMP06 = "暂不支持的设备类型:[";
	String TEMP07 = "]";
	
	String JIAOYM = "JIAOYM";
	
	String TEMP09 = "服务名非法";
	String TEMP10 = "服务名非法:[";
	
	String TEMP11 = "服务名不存在";
	String TEMP12 = "服务名不存在:[";
	
	String TEMP13 = "DO SERVICE:";
	
	
	/** 异常处理返回信息常量 start **/
	String RETURN_CODE = "ReturnCode";		
	String RETURN_MSG = "ReturnMsg";
	
	String PARSE_REQXML_FAIL_CODE = "00000A1";  			// 解析请求报文模板失败返回码
	String PARSE_REQXML_FAIL_MSG = "解析请求报文模板失败";
	
	String WS_CONNECT_FAIL_CODE = "00000A2";		   		// webService接口连接失败返回码
	String WS_CONNECT_FAIL_MSG = "WebService接口连接失败";
	
	String GET_RESPXML_FAIL_CODE = "00000A3";				// 获取响应报文失败返回码
	String GET_RESPXML_FAIL_MSG = "获取响应报文失败";		
	
	String PARSE_RESPXML_FAIL_CODE = "00000A4";			    // 解析响应报文失败返回码
	String PARSE_RESPXML_FAIL_MSG = "解析响应报文失败";
	
	/** 异常处理返回信息常量 end **/
	
	
	/** SoapJournalModel **/
	String DEFAULT_CURRENCY = "CNY";     // 货币代码 
	String LANGUAGE = "chinese";
	String ZHNGDH = "ZHNGDH";
	String QANTLS = "QANTLS";
	String CARDNO = "CARDNO";
	
}
