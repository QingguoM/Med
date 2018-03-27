package com.java.medicine.store;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.common.access.JSONService;
import com.java.common.constant.ICommonConstant;
import com.java.common.dao.IBaseDao;
import com.java.common.model.ResponseModel;

import net.sf.json.JSONObject;

/**
 * 库存信息管理      TODO
 * @author 马倩
 *
 */
@Service(ICommonConstant.SERVICE_ST01)
public class StoreService implements JSONService{
	
	private Logger logger = Logger.getLogger(StoreService.class);
	
	@Autowired
	private IBaseDao<Map<String,Object>> basedao;
	
	@Override
	public ResponseModel execute(JSONObject reqObj) {
		ResponseModel rm = new ResponseModel(
			ICommonConstant.INTERNAL_SUCCESS_CODE,
			ICommonConstant.INTERNAL_SUCCESS_MSG);
		logger.info("ST01");
		JSONObject json = new JSONObject();
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		
		try {
			logger.info("reqObj:["+reqObj+"]");
			int operatorType = reqObj.optInt("operatorType");
			
			switch (operatorType) {
				case 1://删除某一库存订单
					int delete = deleteStoreOrder(reqObj);
					if(delete <= 0) {
						json.put(ICommonConstant.RETCODE, ICommonConstant.ST000D1);
						json.put(ICommonConstant.RETMSG, ICommonConstant.ST000D1_MSG);
					}else if(delete > 0){
						json.put(ICommonConstant.RETCODE, "0000000");
						json.put(ICommonConstant.RETMSG, "删除成功");
					}
					break;
				default://查询库存
					list = selectStoreOrder(reqObj);
					if(list == null) {//查询异常
						json.put(ICommonConstant.RETCODE, ICommonConstant.ST000Q2);
						json.put(ICommonConstant.RETMSG, ICommonConstant.ST000Q2_MSG);
					}else {
						json.put("DATA", list);
						json.put(ICommonConstant.RETCODE, "0000000");
						json.put(ICommonConstant.RETMSG, "查询成功");
					}
					break;
			}
			
			logger.info("json:["+json+"]");
			rm.setRtBody(json);
			
		} catch (Exception e) {
			logger.info("exception:"+e.toString());
			rm = new ResponseModel(
					ICommonConstant.INTERNAL_ERROR_CODE,
					ICommonConstant.INTERNAL_ERROR_MSG,e.getMessage());
		}
		
		logger.info("ST01 END");
		return rm;
	}

	/**
	 * 查询库存订单 TODO
	 * @param reqObj
	 * @return
	 */
	private List<Map<String, Object>> selectStoreOrder(JSONObject reqObj) {
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		int id = reqObj.optInt("id");
		Map<String,Object> map = new HashMap<String, Object>();
		try {
			logger.info("selectStoreOrder start");
			if("".equals(id)) {
				list = basedao.selectList("", map);
			}else {
				map = basedao.selectOne("", id);
				list.add(map);
			}
		} catch (Exception e) {
			list =null;
		}
		logger.info("selectStoreOrder end");
		return list;
	}

	/**
	 * 删除库存表中的订单 TODO
	 * @param reqObj
	 * @return
	 */
	private int deleteStoreOrder(JSONObject reqObj) {
		List<String> list = new ArrayList<String>();
		
		try {
			logger.info("deleteStoreOrder start");
			Map<String,Object> map = new HashMap<String, Object>();
			list = reqObj.optJSONArray("ids");
			
			if(list==null) {
				map.put("id",  reqObj.optInt("id"));
				logger.info("deleteStoreOrder end id");
				return basedao.delete("CM.deleteStoreById", map);
			}else {
				logger.info("deleteStoreOrder end list");
				return basedao.deleteByIds("CM.deleteStoreById", list);
			}
			
		} catch (Exception e) {
			logger.info("deleteStoreOrder end exception");
			return -1;
		}
	}
	
}
