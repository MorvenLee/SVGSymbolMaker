package com.scnu.service;

import java.util.List;

import com.scnu.form.TrajectoryPoint;

/**
 * @author Administrator
 *
 */

public interface GetTrojectoryPathService {
	/**
	 * 根据轨迹id 查询返回在此轨迹上的所有轨迹点对象
	 * @param id
	 * @return
	 */
	List<TrajectoryPoint> getTrajectoryPointById(String id);
}
