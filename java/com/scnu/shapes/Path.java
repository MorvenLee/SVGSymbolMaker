package com.scnu.shapes;


/**
 * 基本图元-折线
 * @author Administrator
 *
 */
public class Path implements Shape{
	
	
//	List<Point> pathPointSet;
	String pathDescriStr; //描述一条路径的字符串
	
	Style style;
	
	DynamicProperty dp;

//	public List<Point> getPathPointSet() {
//		return pathPointSet;
//	}
//
//	public void setPathPointSet(List<Point> pathPointSet) {
//		this.pathPointSet = pathPointSet;
//	}

	

	public Style getStyle() {
		return style;
	}

	public String getPathDescriStr() {
		return pathDescriStr;
	}

	public void setPathDescriStr(String pathDescriStr) {
		this.pathDescriStr = pathDescriStr;
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
