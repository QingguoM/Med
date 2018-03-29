package com.java.common.util;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

public class TooUtil {
	
	/**
	 * list中每个bean中都有日期需转换
	 * @param list
	 * @return
	 */
	public static JSONArray formatDate(List<Map<String, Object>> list) {
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(java.sql.Date.class, new JsonValueProcessor() {
		private SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");

		@Override
		public Object processArrayValue(Object arg0, JsonConfig arg1) {
		return null;
		}

		@Override
		public Object processObjectValue(String arg0, Object arg1, JsonConfig arg2) {
		return arg1 == null ? "" : sd.format(arg1);
		}
		});
		JSONArray jsonArray = JSONArray.fromObject(list, config);// 记得把config放进去
		return jsonArray;
	}
}
