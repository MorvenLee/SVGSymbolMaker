package com.scnu.shapes;

public class Ellipse implements Shape{
	
	double centerX;
	
	double centerY;
	
	double semiAxisX;
	
	double semiAxisY;
	
	Style style;
	
	DynamicProperty dp;

	public double getCenterX() {
		return centerX;
	}

	public void setCenterX(double centerX) {
		this.centerX = centerX;
	}

	public double getCenterY() {
		return centerY;
	}

	public void setCenterY(double centerY) {
		this.centerY = centerY;
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
