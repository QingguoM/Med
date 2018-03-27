package com.java.medicine.operator;

import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.common.access.JSONService;
import com.java.common.constant.ICommonConstant;
import com.java.common.dao.IBaseDao;
import com.java.common.model.ResponseModel;

import net.sf.json.JSONObject;

@Service(ICommonConstant.SERVICE_OS01)
public class OperatorService implements JSONService {
	private Logger logger = Logger.getLogger(OperatorService.class);
	
	@Autowired
	private IBaseDao<Map<String,Object>> basedao;
	
	@Override
	public ResponseModel execute(JSONObject reqObj) {
		ResponseModel rm = new ResponseModel(
				ICommonConstant.INTERNAL_SUCCESS_CODE,
				ICommonConstant.INTERNAL_SUCCESS_MSG);
		logger.info("OS01");
		JSONObject json = new JSONObject();
		
		try {
			logger.info("reqObj:["+reqObj+"]");
			int type = reqObj.optInt("type");
			
			switch (type) {
				case 1:
					//展示管理员列表
					break;
				case 2:
					
					break;
				case 3:
					
					break;
				case 4:
					
					break;
			}
						
			rm.setRtBody(json);
			
		} catch (Exception e) {
			logger.info(e.toString());
			rm = new ResponseModel(
					ICommonConstant.INTERNAL_ERROR_CODE,
					ICommonConstant.INTERNAL_ERROR_MSG,e.getMessage());
		}

		logger.info("OS01 END");
		return rm;
	}

}
