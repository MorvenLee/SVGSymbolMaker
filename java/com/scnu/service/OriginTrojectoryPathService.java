package com.scnu.service;

import java.util.List;

import com.scnu.flock.type.Point;


/**
 * @author Administrator
 *
 */

public interface OriginTrojectoryPathService {
	/**
	 * 
	 * 
	 * @return
	 */
	List<Point> getOriginTrajectoryPoints(String datapath);
}
