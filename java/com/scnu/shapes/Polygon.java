package com.scnu.shapes;

import java.util.List;

public class Polygon implements Shape{
	
//	List<Point> closedPointSet; //构成多边形的封闭顶点集
	
	String pointsStr; //构成多边形的封闭顶点集字符串
	
	Style style;
	
	DynamicProperty dp;

//	public List<Point> getClosedPointSet() {
//		return closedPointSet;
//	}
//
//	public void setClosedPointSet(List<Point> closedPointSet) {
//		this.closedPointSet = closedPointSet;
//	}

	

	public Style getStyle() {
		return style;
	}

	public String getPointsStr() {
		return pointsStr;
	}

	public void setPointsStr(String pointsStr) {
		this.pointsStr = pointsStr;
	}

	public void setStyle(Style style) {
		this.style = style;
	}

	public DynamicProperty getDp() {
		return dp;
	}

	public void setDp(DynamicProperty dp) {
		this.dp = dp;
	}
	
	
	
}
