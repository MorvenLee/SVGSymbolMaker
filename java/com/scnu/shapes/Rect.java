package com.scnu.shapes;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 基本图元-矩形
 * @author Administrator
 *
 */

public class Rect implements Shape{
	
	//基本属性
	
	double x; //起点x坐标
	
	
	double y; //起点y坐标
	
	
	double width; // 宽度
	
	double height; //高度
	
	double rx;
	
	double ry;
	
	
	Style style;
	
	DynamicProperty dp;

	
	public double getX() {
		return x;
	}

	public void setX(double x) {
		this.x = x;
	}

	
	public double getY() {
		return y;
	}

	
	public double getRx() {
		return rx;
	}

	public void setRx(double rx) {
		this.rx = rx;
	}

	public double getRy() {
		return ry;
	}

	public void setRy(double ry) {
		this.ry = ry;
	}

	public void setY(double y) {
		this.y = y;
	}

	
	public double getWidth() {
		return width;
	}

	public void setWidth(double width) {
		this.width = width;
	}

	
	public double getHeight() {
		return height;
	}

	public void setHeight(double height) {
		this.height = height;
	}

	
	

	public Style getStyle() {
		return style;
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


