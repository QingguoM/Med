package com.java.common.access;


import com.java.common.model.ResponseModel;
import net.sf.json.JSONObject;

public interface JSONService {

	public ResponseModel execute(JSONObject reqObj);
}
