package com.scnu.shapes;

public class Curve implements Shape{
	
	double startX;
	
	double startY;
	
	double endX;
	
	double endY;
	
	double semiAxisX;
	
	double semiAxisY;
	
	double xAxisRotation; //沿x轴逆时针旋转角度，如果是负值代表顺时针方向旋转角度
	
	short largeArcFlag; //是否大角度弧线
	
	short sweepFlag;
	
	Style style;
	
	DynamicProperty dp;

	public double getStartX() {
		return startX;
	}

	public void setStartX(double startX) {
		this.startX = startX;
	}

	public double getStartY() {
		return startY;
	}

	public void setStartY(double startY) {
		this.startY = startY;
	}

	public double getEndX() {
		return endX;
	}

	
	public short isSweepFlag() {
		return sweepFlag;
	}

	public void setSweepFlag(short sweepFlag) {
		this.sweepFlag = sweepFlag;
	}

	public void setEndX(double endX) {
		this.endX = endX;
	}

	public double getEndY() {
		return endY;
	}

	public void setEndY(double endY) {
		this.endY = endY;
	}

	public double getSemiAxisX() {
		return semiAxisX;
	}

	public void setSemiAxisX(double semiAxisX) {
		this.semiAxisX = semiAxisX;
	}

	public double getSemiAxisY() {
		return semiAxisY;
	}

	public void setSemiAxisY(double semiAxisY) {
		this.semiAxisY = semiAxisY;
	}

	public double getxAxisRotation() {
		return xAxisRotation;
	}

	public void setxAxisRotation(double xAxisRotation) {
		this.xAxisRotation = xAxisRotation;
	}

	public short isLargeArcFlag() {
		return largeArcFlag;
	}

	public void setLargeArcFlag(short largeArcFlag) {
		this.largeArcFlag = largeArcFlag;
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
