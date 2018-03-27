package com.java.common.model;


import com.java.common.access.JSONService;
import net.sf.json.JSONObject;


public class TransactionObject {

	private static ThreadLocal<JSONObject> requestObjectThreadLocal = new ThreadLocal<JSONObject>();
	private static ThreadLocal<ResponseModel> responseModelThreadLocal = new ThreadLocal<ResponseModel>();
	private static ThreadLocal<JSONService> jsonServiceThreadLocal = new ThreadLocal<JSONService>();

	public static JSONObject getRequestObject() {
		return requestObjectThreadLocal.get();
	}

	public static ResponseModel getResponseModel() {
		return responseModelThreadLocal.get();
	}



	public static JSONService getJSONService() {
		return jsonServiceThreadLocal.get();
	}

	public static void setRequestObject(JSONObject requestObject) {
		requestObjectThreadLocal.set(requestObject);
	}

	public static void setResponseModel(ResponseModel responseModel) {
		responseModelThreadLocal.set(responseModel);
	}



	public static void setJSONService(JSONService spdbJSONService) {
		jsonServiceThreadLocal.set(spdbJSONService);
	}

	public static void clear() {
		requestObjectThreadLocal.remove();
		responseModelThreadLocal.remove();
		jsonServiceThreadLocal.remove();
	}
}
