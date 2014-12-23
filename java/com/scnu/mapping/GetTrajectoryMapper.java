package com.scnu.mapping;

import java.util.List;

import com.scnu.form.TrajectoryPoint;

public interface GetTrajectoryMapper {
	/**
	 * 
	 * @param id
	 * @return
	 */
	List<TrajectoryPoint> getTrajectoryById(String id);
}
