package com.java.common.dao.impl;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Repository;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.java.common.dao.IBaseDao;

/**
 * 
 * 类描述： 数据库访问底层通用类
 * @param <T>
 */
@Repository("baseDao")
public class BaseDao<T> extends SqlSessionDaoSupport implements IBaseDao<T>,Serializable {
	
	private static final long serialVersionUID = 3809069716964466041L;
	
	/**
	 * 方法描述 : 通过注解获取SqlSessionTemplate 模板实例
	 * @param sqlSessionTemplate
	 */
	@Resource(name = "sqlSessionTemplate")
	public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	
	/**
	 * 
	 * 方法描述 : 实现数据插入
	 * @param sqlId Mapper.xml 中配置的SQL ID
	 * @param obj 需插入数据的JAVABEAN或者Map对象
	 */
	public int insert(String sqlId, Object obj) {
		return getSqlSession().insert(sqlId, obj);
	}
	
	/**
	 * 
	 * 方法描述 : 实现数据修改
	 * @param sqlId Mapper.xml 中配置的SQL ID
	 * @param obj 需修改数据的JAVABEAN或者Map对象
	 */
	@CacheEvict(value = "methodCache", allEntries = true)
	public int update(String sqlId, Object obj) {
		return getSqlSession().update(sqlId, obj);
	}
	
	/**
	 * 
	 * 方法描述 : 实现数据修改功能
	 * @param sqlId Mapper.xml 中配置的SQL ID
	 * @param map 以集合方式存储更新数据
	 */
	public int update(String sqlId, Map<String,Object> map) {
		return getSqlSession().update(sqlId, map);
	}
	
	/**
	 * 方法描述 : 实现删除一条数据功能
	 * @param sqlId Mapper.xml 中配置的SQL ID
	 * @param obj 需删除数据的JAVABEAN或者Map对象
	 */
	public int delete(String sqlId, Object obj) {
		System.out.println("getSqlSession():"+getSqlSession());
		System.out.println("getSqlSession().delete(sqlId, obj):"+getSqlSession().delete(sqlId, obj));
		return getSqlSession().delete(sqlId, obj);
	}
	
	/**
	 * 
	 * 方法描述 : 实现删除多条数据，根据传入多个唯一键值进行数据删除
	 * @param sqlId  Mapper.xml 中配置的SQL ID
	 * @param ids  需删除数据的键编号集合
	 */
	@CacheEvict(value = "methodCache", allEntries = true)
	public int deleteByIds(String sqlId, List<String> ids) {
		return getSqlSession().delete(sqlId, ids);
	}
	
	/**
	 * 
	 * 方法描述 : 根据传入不同参数进行数据查询
	 * 实际使用中建议使用JavaBean或HashMap，也可以使用其他集合类型
	 * @param sqlId Mapper.xml 中配置的SQL ID
	 * @param map 传入的查询参数
	 * @return List<T>
	 */
	public List<T> selectList(String sqlId, Map<String, Object> map) {
		@SuppressWarnings("unchecked")
		List<T> selectList = ((List<T>) getSqlSession().selectList(sqlId, map));
		return selectList;
	}
	
	/**
	 * 
	 * 方法描述 : 根据传入不同参数进行数据查询
	 * 实际使用中建议使用JavaBean或HashMap，也可以使用其他集合类型
	 * @param sqlId Mapper.xml 中配置的SQL ID
	 * @param obj 传入的查询参数，以JavaBean 方式传入
	 * @return List<T>
	 */
	public List<T> selectList(String sqlId, Object obj) {
		return getSqlSession().selectList(sqlId, obj);
	}
	
	/**
	 * 方法描述 : 根据传入不同参数进行分页数据查询
	 * @param sqlId Mapper.xml 中配置的SQL ID
	 * @param map 传入的查询参数，存储在HashMap中以集合方式传入
	 * @param pageBounds 分页查询对象
	 * @return List<T>
	 */
	public List<T> queryPageList(String sqlId, Map<String, Object> map, PageBounds pageBounds) {
		return getSqlSession().selectList(sqlId, map, pageBounds);
	}
	
	/**
	 * 方法描述 : 根据传入参数查询返回一条数据，以Map集合方式返回
	 * @param sqlId Mapper.xml 中配置的SQL ID
	 * @param obj 传入的查询参数，以JavaBean 方式传入
	 * @return List<T> 返回一条数据集，以HashMap 方式返回
	 */
	public Map<String,Object> selectMap(String sqlId, Object obj) {
		return getSqlSession().selectMap(sqlId, obj, "");
	}
	
	/**
	 * 方法描述 : 根据传入参数查询数据行数
	 * @param sqlId Mapper.xml 中配置的SQL ID
	 * @param map  传入的查询参数，存储在HashMap中以集合方式传入 
	 * @return Long 查询总行数
	 */
	public Long selectRecordCount(String sqlId, Map<String, Object> map) {
		return getSqlSession().selectOne(sqlId, map);
	}
	
	/**
	 * 方法描述 : 根据传入参数查询数据,返回泛型
	 * @param sqlId Mapper.xml 中配置的SQL ID
	 * @param obj  传入的查询参数，以JavaBean 方式传入
	 * @return  T 泛型，通常返回一个JavaBean对象或者Map 
	 */
	public T selectOne(String sqlId, Object obj) {
		return getSqlSession().selectOne(sqlId, obj);
	}
	
	/**
	 * 方法描述 : 根据SQL ID查询数据,返回泛型
	 * @param sqlId Mapper.xml 中配置的SQL ID
	 * @return T 泛型，通常返回一个JavaBean对象或者Map 
	 */
	public T selectOne(String sqlId) {
		return getSqlSession().selectOne(sqlId);
	}
  
}
