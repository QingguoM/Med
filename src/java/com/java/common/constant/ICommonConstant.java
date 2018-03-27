package com.java.common.constant;

public interface ICommonConstant {
	
	String INTERNAL_SUCCESS_CODE = "ZZ00";
	String INTERNAL_SUCCESS_MSG = "通讯成功";
	String INTERNAL_ERROR_CODE = "ZZ98";
	String INTERNAL_ERROR_MSG = "内部错误";
	
	String SERVICE_IN01 = "IN01";	//入库
	String SERVICE_OT01 = "OT01"; //出库
	String SERVICE_LN01 = "LN01"; //登录
	String SERVICE_OS01 = "OS01"; //管理员
	String SERVICE_ST01 = "ST01"; //库存
	
	String RETCODE = "RETCODE";
	String RETMSG = "RETMSG";
	
	//库存信息管理
	String ST000I1 = "ST000I1"; //插入异常
	String ST000I1_MSG = "插入异常";
	String ST000I2 = "ST000I2"; //插入失败
	String ST000I2_MSG = "插入失败";
		
	String ST000Q1 = "ST000Q1"; //没有查询到此条件的信息  
	String ST000Q1_MSG = "没有查询到此条件的信息";
	String ST000Q2 = "ST000Q2"; //查询库存信息异常 
	String ST000Q2_MSG = "查询异常";
	
	String ST000D1 = "ST000D1";//
	String ST000D1_MSG = "删除失败";
	
	String ST000D2 = "ST000D2";
	String ST000D2_MSG = "此条记录已被删除";
	
	String ST000U1 = "ST000U1";
	String ST000U1_MSG = "更新失败";
	
	String ST000U2 = "ST000U2";
	String ST000U2_MSG = "更新异常";
	
	//入库订单信息管理
	String IN000Q1 ="IN000Q1";
	String IN000Q1_MSG ="查询无数据";

	String IN000Q2 ="IN000Q2";
	String IN000Q2_MSG ="查询异常";
	
	String IN000U1 = "IN000U1";
	String IN000U1_MSG = "修改失败";
	
	String IN000U2 = "IN000U2";
	String IN000U2_MSG = "修改异常";
	
	String IN000D1 = "IN000D1";
	String IN000D1_MSG = "删除异常";
	
	String IN000D2 = "IN000D2";
	String IN000D2_MSG = "删除失败";
	
	String IN000U3 = "IN000U3";
	String IN000U3_MSG = "插入入库订单过程中更新库存订单失败";
	
	
	
	
}
