package com.java.common.constant;

public enum TnxState {
	
	SUCCESS("0000000"),
	CHECK_MAC_FAILURE("00000A0"),
	CHECK_QANTLS_FAILURE("0006666"),
	EXCEED_MAX_CONNECTION_POOL("0007777"),
	REQUEST_URL_ERROR("0008888"),
	UNKNOWN_ERROR("0009999")
	;
	private TnxState(String retCode) {
		this.retCode = retCode;
	}
	
	public String toString() {
		return retCode;
	}
	
	private String retCode;
}
