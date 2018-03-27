package com.java.test;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import net.sf.json.JSONObject;

import com.java.common.access.JSONService;
import com.java.common.constant.ICommonConstant;
import com.java.common.model.ResponseModel;

@Service("TS01")
public class TestService implements JSONService {
	private Logger logger = Logger.getLogger(TestService.class);
	
	@Override
	public ResponseModel execute(JSONObject reqObj) {
		ResponseModel rm = new ResponseModel(
				ICommonConstant.INTERNAL_SUCCESS_CODE,
				ICommonConstant.INTERNAL_SUCCESS_MSG);
		logger.info("TS01");
		JSONObject json = new JSONObject();
		json.put("RETCODE", "0000000");
		json.put("RETMSG", "成功");
		rm.setRtBody(json);
		logger.info("TS01 END");
		return rm;
	}

}
