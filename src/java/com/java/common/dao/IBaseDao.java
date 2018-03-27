package com.java.common.dao;

import java.util.List;
import java.util.Map;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;

public interface IBaseDao<T> {

	public int insert(String sqlId, Object obj);

	public int update(String sqlId, Object obj);

	public int update(String sqlId, Map<String, Object> map);

	public int delete(String sqlId, Object obj);

	public int deleteByIds(String sqlId, List<String> ids);

	public List<T> selectList(String sqlId, Map<String, Object> map);

	public List<T> selectList(String sqlId, Object obj);

	public List<T> queryPageList(String sqlId, Map<String, Object> map,
			PageBounds pageBounds);

	public Map<String, Object> selectMap(String sqlId, Object obj);

	public Long selectRecordCount(String sqlId, Map<String, Object> map);

	public T selectOne(String sqlId, Object obj);

	public T selectOne(String sqlId);

}
