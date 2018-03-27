package com.java.medicine;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.common.access.JSONService;
import com.java.common.constant.ICommonConstant;
import com.java.common.dao.IBaseDao;
import com.java.common.model.ResponseModel;
import com.java.test.TestService;

import net.sf.json.JSONObject;

@Service(ICommonConstant.SERVICE_LN01)
public class LoginService implements JSONService{
	private Logger logger = Logger.getLogger(LoginService.class);
	
	@Autowired
	private IBaseDao<Map<String,Object>> basedao;
	
	@Override
	public ResponseModel execute(JSONObject reqObj) {
		ResponseModel rm = new ResponseModel(
				ICommonConstant.INTERNAL_SUCCESS_CODE,
				ICommonConstant.INTERNAL_SUCCESS_MSG);
		logger.info("LN01");
		JSONObject json = new JSONObject();
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		try {
			logger.info("reqObj:["+reqObj+"]");
			
			list = basedao.selectList("CM.selectPwByName", reqObj.optString("username"));
			
			if(list.equals("")||list== null) {
				json.put("RETCODE", "0000001");
				json.put("RETMSG", "该用户不存在");
			}else {
				String password = (String) list.get(0).get("password");
				if(password.equals(reqObj.optString("password"))) {
					json.put("RETCODE", "0000000");
					json.put("RETMSG", "登录成功");
				}else {
					json.put("RETCODE", "0000002");
					json.put("RETMSG", "用户密码错误");
				}
			}
			rm.setRtBody(json);
			
		} catch (Exception e) {
			logger.info(e.toString());
			rm = new ResponseModel(
					ICommonConstant.INTERNAL_ERROR_CODE,
					ICommonConstant.INTERNAL_ERROR_MSG,e.getMessage());
		}
		logger.info("LN01 END");
		return rm;
	}
}
