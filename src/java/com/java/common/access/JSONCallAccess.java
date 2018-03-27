package com.java.common.access;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.regex.Pattern;

import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.java.common.constant.ICommonConstant;
import com.java.common.constant.ISoapConstant;
import com.java.common.model.ResponseModel;
import com.java.common.model.TransactionObject;

import net.sf.json.JSONObject;

@RequestMapping("/")
@Controller
public class JSONCallAccess implements ApplicationContextAware {
	private static final Logger log = Logger.getLogger(JSONCallAccess.class);
	private static final Pattern SRVCODE_PATTERN = Pattern
			.compile("^([0-9]|[a-z]|[A-Z]){4}$");
	
	ApplicationContext applicationContext = null;
	
	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.applicationContext = applicationContext;
	}
	
	@RequestMapping(value = "/srv.call", method = RequestMethod.POST)
	@ResponseBody
	public ResponseModel serviceCall(
			@RequestParam(value = "req", required = true) String request){
		
		try {
			
			initAccess(request);
			
			if (loadService()) {
				doService();
			}
			
			return TransactionObject.getResponseModel();
			
		} catch (Exception e) {
			
			ResponseModel rm = new ResponseModel(
					ICommonConstant.INTERNAL_ERROR_CODE,
					ICommonConstant.INTERNAL_ERROR_MSG, e.toString());
			
			return rm;
			
		}finally{
			TransactionObject.clear();			
		}
	}
	
	/**
	 * @description 将字符串JSON格式的数据装换为JSONObject对象
	 * @param request
	 * @throws UnsupportedEncodingException
	 */
	private void initAccess(String request) throws UnsupportedEncodingException {
		String reqString = URLDecoder.decode(request, ISoapConstant.UTF8);
		JSONObject reqObj = JSONObject.fromObject(reqString);
		TransactionObject.setRequestObject(reqObj);		
	}
	


	/**
	 * @description 验证前台交易码是否符合既定规则，并获取该交易码对应的业务逻辑Bean
	 * @return boolean
	 */
	private boolean loadService() {
		String srvCode = TransactionObject.getRequestObject().optString(ISoapConstant.JIAOYM);
		
		if (!SRVCODE_PATTERN.matcher(srvCode).matches()) {
			String rtMsg = ISoapConstant.TEMP09;
			String trcMsg = ISoapConstant.TEMP10 + srvCode + ISoapConstant.TEMP07;
			log.error(trcMsg);
			TransactionObject.setResponseModel(new ResponseModel(
					ICommonConstant.INTERNAL_ERROR_CODE, rtMsg, trcMsg));
			return false;
		}
		
		Object jsonService = null;
		
		try {
			jsonService = applicationContext.getBean(srvCode);
		} catch (BeansException e) {
			String rtMsg = ISoapConstant.TEMP11;
			String trcMsg = ISoapConstant.TEMP12 + srvCode + ISoapConstant.TEMP07;
			log.error(trcMsg);
			TransactionObject.setResponseModel(new ResponseModel(
					ICommonConstant.INTERNAL_ERROR_CODE, rtMsg, trcMsg));
			return false;
		}
		
		if (jsonService == null
				|| !(jsonService instanceof JSONService)) {
			
			String rtMsg = ISoapConstant.TEMP11;
			String trcMsg = ISoapConstant.TEMP12 + srvCode + ISoapConstant.TEMP07;
			log.error(trcMsg);
			TransactionObject.setResponseModel(new ResponseModel(
					ICommonConstant.INTERNAL_ERROR_CODE, rtMsg, trcMsg));
			return false;
		}
		
		TransactionObject.setJSONService((JSONService) jsonService);
		return true;
	}
	
	/**
	 *  @description 执行业务逻辑Bean的execute方法
	 */
	private void doService() {
		JSONService service = TransactionObject.getJSONService();
		log.info(ISoapConstant.TEMP13 + TransactionObject.getRequestObject().optString(ISoapConstant.JIAOYM));
		ResponseModel respModel = service.execute(TransactionObject.getRequestObject());
		TransactionObject.setResponseModel(respModel);
	}
}
