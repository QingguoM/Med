package com.java.medicine.store;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.common.access.JSONService;
import com.java.common.constant.ICommonConstant;
import com.java.common.dao.IBaseDao;
import com.java.common.model.ResponseModel;
import com.java.common.util.TooUtil;
import com.sun.org.apache.regexp.internal.recompile;

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
				case 2://条件查询
					if(reqObj.optInt("id")==0 &&
					   reqObj.optString("code").equals("")&&
					   reqObj.optString("name").equals("")&&
					   reqObj.optString("number").equals("")) {
						json.put(ICommonConstant.RETCODE, "0000000");
						json.put(ICommonConstant.RETMSG, "请输入查询条件");
					}else {
						list = selectStoreOrder(reqObj);
						if(list.isEmpty()) {
							json.put("DATA", "没有相关信息");
							json.put(ICommonConstant.RETCODE, "0000000");
							json.put(ICommonConstant.RETMSG, "没有相关信息");
						}else {
							if("error".equals(MapUtils.getString(list.get(0), "error"))) {
								//查询异常
								json.put(ICommonConstant.RETCODE, ICommonConstant.ST000Q1);
								json.put(ICommonConstant.RETMSG, ICommonConstant.ST000Q1_MSG);
							}else {
								json.put("DATA", TooUtil.formatDate(list));
								json.put(ICommonConstant.RETCODE, "0000000");
								json.put(ICommonConstant.RETMSG, "查询成功");
							}
						}
					}
					
					break;
				default://全部查询库存
					list = selectALLStoreOrder(reqObj);
					if(list.isEmpty()) {
						json.put("DATA", "没有相关信息");
						json.put(ICommonConstant.RETCODE, "0000000");
						json.put(ICommonConstant.RETMSG, "没有相关信息");
					}else {
						if("error".equals(MapUtils.getString(list.get(0), "error"))) {
							//查询异常
							json.put(ICommonConstant.RETCODE, ICommonConstant.ST000Q1);
							json.put(ICommonConstant.RETMSG, ICommonConstant.ST000Q1_MSG);
						}else {
							json.put("DATA", TooUtil.formatDate(list));
							json.put(ICommonConstant.RETCODE, "0000000");
							json.put(ICommonConstant.RETMSG, "查询成功");
						}
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
	 * TODO 分页 
	 * 全部查询库存订单 
	 * @param reqObj
	 * @return
	 */
	private List<Map<String, Object>> selectALLStoreOrder(JSONObject reqObj) {
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		Map<String,Object> map = new HashMap<String, Object>();
		
		try {
			logger.info("selectALLStoreOrder start");
			logger.info("selectALLStoreOrder reqObj:" +reqObj);
			
			list = basedao.selectList("CM.selectAllStoreOrder", map);
			logger.info("selectALLStoreOrder list:" +list);
		} catch (Exception e) {
			logger.info("selectALLStoreOrder error:"+e.toString());
			map.put("error", "error");
			list.add(map);
		}
		logger.info("selectALLStoreOrder end");
		return list;
	}

	/**
	 * TODO 分页 
	 * 条件查询库存订单 
	 * @param reqObj
	 * @return
	 */
	private List<Map<String, Object>> selectStoreOrder(JSONObject reqObj) {
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		Map<String,Object> map = new HashMap<String, Object>();
		
		try {
			logger.info("selectStoreOrder start");
			logger.info("selectStoreOrder reqObj:" +reqObj);
			int id =reqObj.optInt("id");
			
			if(id == 0) {
				map.put("name", reqObj.optString("name"));
				map.put("number", reqObj.optString("number"));
				map.put("code", reqObj.optString("code"));
				list = basedao.selectList("CM.selectStoreOrder", map);
			}else {
				map.put("id", id);
				list = basedao.selectList("CM.selectStoreOrderById", map); 
			}
			logger.info("selectStoreOrder list:" +list);
		} catch (Exception e) {
			logger.info("selectStoreOrder error:"+e.toString());
			map.put("error", "error");
			list.add(map);
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
				logger.info("deleteStoreOrder end id"+map.toString());
				return basedao.delete("CM.deleteStoreById", map);
			}else {
				logger.info("deleteStoreOrder end list:"+list);
				return basedao.deleteByIds("CM.deleteStoresByIds", list);
			}
			
		} catch (Exception e) {
			logger.info("exception:"+e);
			return -1;
		}
	}
	
	
	/**
	 * 查询库存中是否有同等价格的该药品
	 * @param reqObj
	 * @return
	 */
	public Object isExist(JSONObject reqObj) {
		Map<String,Object> map = new HashMap<String, Object>();
		Map<String, Object> returnmap = new HashMap<String, Object>();
		map.put("code", reqObj.optString("code"));
		map.put("number", reqObj.optString("number"));
		map.put("name", reqObj.optString("name"));
		map.put("made_date", reqObj.opt("made_date"));
		map.put("useless_date", reqObj.opt("useless_date"));
		map.put("unit", reqObj.opt("unit"));
		map.put("price", reqObj.opt("price"));
		map.put("input_com", reqObj.opt("input_com"));
		
		try {
			returnmap = basedao.selectMap("CM.selectStoreOrder", map);
		} catch (Exception e) {
			returnmap = null;
		}
		
		return returnmap;
	}
	
}
