package com.scnu.form;

import java.util.Date;

/**
 * @author Administrator
 * 轨迹点form对象
 *
 */
public class TrajectoryPoint {
	
	private String id;  //轨迹id
	
	private String lat; 
	
	private String lon;
	
	private String time;   //时刻
	
	public TrajectoryPoint(String id,String time,String lat,String lon){
		this.id = id;
		this.time = time;
		this.lat = lat;
		this.lon = lon;
	}
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}

	public String getLon() {
		return lon;
	}

	public void setLon(String lon) {
		this.lon = lon;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	
	
	
}
