package com.java.common.model;

import net.sf.json.JSONObject;


public class ResponseModel {
	String rtCode;
	String rtMsg;

	JSONObject rtBody;

	/**
	 * <p>
	 * Title:
	 * </p>
	 * <p>
	 * Description:
	 * </p>
	 */
	@SuppressWarnings("unused")
	private ResponseModel() {
		super();
	}

	/**
	 * <p>
	 * Title:
	 * </p>
	 * <p>
	 * Description:
	 * </p>
	 * 
	 * @param rtCode
	 * @param rtMsg
	 */
	public ResponseModel(String rtCode, String rtMsg) {
		super();
		this.rtCode = rtCode;
		this.rtMsg = rtMsg;
	}

	/**
	 * <p>
	 * Title:
	 * </p>
	 * <p>
	 * Description:
	 * </p>
	 * 
	 * @param rtCode
	 * @param rtMsg
	 * @param trcMsg
	 */
	public ResponseModel(String rtCode, String rtMsg, String trcMsg) {
		super();
		this.rtCode = rtCode;
		this.rtMsg = rtMsg;
	}

	/**
	 * @return rtCode
	 */

	public String getRtCode() {
		return rtCode;
	}

	/**
	 * @return rtMsg
	 */

	public String getRtMsg() {
		return rtMsg;
	}

	/**
	 * @param rtMsg
	 *            要设置的 rtMsg
	 */
	public void setRtMsg(String rtMsg) {
		this.rtMsg = rtMsg;
	}

	/**
	 * @return rtBody
	 */

	public JSONObject getRtBody() {
		return rtBody;
	}

	/**
	 * @param rtBody
	 *            要设置的 rtBody
	 */
	public void setRtBody(JSONObject rtBody) {
		this.rtBody = rtBody;
	}
	@Override
	public String toString(){
		JSONObject obj = new JSONObject();
		obj.put("rtCode", rtCode);
		obj.put("rtMsg", rtMsg);
		obj.put("rtBody", rtBody);
		return obj.toString();
	}
}
