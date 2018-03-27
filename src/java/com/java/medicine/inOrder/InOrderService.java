package com.java.medicine.inOrder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.apache.commons.collections.map.HashedMap;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.java.common.access.JSONService;
import com.java.common.constant.ICommonConstant;
import com.java.common.dao.IBaseDao;
import com.java.common.model.ResponseModel;
import com.java.medicine.store.StoreService;

import net.sf.json.JSONObject;

@Service(ICommonConstant.SERVICE_IN01)
public class InOrderService implements JSONService {
	private Logger logger = Logger.getLogger(InOrderService.class);
	
	@Autowired
	private IBaseDao<Map<String,Object>> basedao;
	
	@Override
	public ResponseModel execute(JSONObject reqObj) {
		ResponseModel rm = new ResponseModel(
				ICommonConstant.INTERNAL_SUCCESS_CODE,
				ICommonConstant.INTERNAL_SUCCESS_MSG);
		logger.info("IN01");
		JSONObject json = new JSONObject();
		
		try {
			logger.info("reqObj:["+reqObj+"]");
			int inorderType = reqObj.optInt("inorderType");
			
			switch (inorderType) {
				case 1://插入入库订单
					
					break;
				case 2://修改入库订单
					
					break;
				case 3://删除入库订单
					int deletecode = deleteInorder(reqObj);
					if(deletecode < 0) {//删除失败
						json.put(ICommonConstant.RETCODE, ICommonConstant.IN000D1);
						json.put(ICommonConstant.RETMSG, ICommonConstant.IN000D1_MSG);
					}else if(deletecode == 0){
						
						
					}else {//>0 删除成功
						
					}
					break;
				default://查询入库订单（列表、某订单详情）
					
					break;
			}
			
			logger.info("json:【"+json+"】");
			rm.setRtBody(json);
		} catch (Exception e) {
			logger.info("exception:"+e.toString());
			rm = new ResponseModel(
					ICommonConstant.INTERNAL_ERROR_CODE,
					ICommonConstant.INTERNAL_ERROR_MSG,e.getMessage());
		}

		logger.info("IN01 END");
		return rm;
	}

	/**
	 * 删除入库订单
	 * @param reqObj
	 * @return
	 */
	private int deleteInorder(JSONObject reqObj) {
		List<String> list = reqObj.optJSONArray("ids");
		int cdo;
		try {
			if(list.isEmpty()) {
				return basedao.delete("", reqObj.optInt("id"));
			}else {
				return basedao.deleteByIds("", list);
			}
		} catch (Exception e) {
			return -1;
		}
	}

	
}