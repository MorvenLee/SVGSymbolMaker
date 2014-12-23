package com.scnu.shapes;

public class DynamicProperty {
	
	public enum LoopType {  
		round , repeat
	} 
	// 描边色渐变
	String strokeColorFrom;

	String strokeColorTo;

	double strokeColorDurations;

	// 填充色渐变
	String fillColorFrom;

	String fillColorTo;

	double fillColorDurations;

	// 路径渐变
	String path;

	int pathDurations;

	// 旋转渐变
	double rotateCenterX; // 旋转中心点x坐标

	double rotateCenterY; // 旋转中心点y坐标

	int rotateAngel; // 旋转角度

	int rotateDurations;
	
	LoopType loop;

	// 缩放渐变
	double scaleX; // x轴缩放比例

	double scaleY; // y轴缩放比例

	int scaleDurations;

	public String getStrokeColorFrom() {
		return strokeColorFrom;
	}

	public void setStrokeColorFrom(String strokeColorFrom) {
		this.strokeColorFrom = strokeColorFrom;
	}

	public String getStrokeColorTo() {
		return strokeColorTo;
	}

	public void setStrokeColorTo(String strokeColorTo) {
		this.strokeColorTo = strokeColorTo;
	}

	public double getStrokeColorDurations() {
		return strokeColorDurations;
	}

	public void setStrokeColorDurations(double strokeColorDurations) {
		this.strokeColorDurations = strokeColorDurations;
	}

	public String getFillColorFrom() {
		return fillColorFrom;
	}

	public void setFillColorFrom(String fillColorFrom) {
		this.fillColorFrom = fillColorFrom;
	}

	public String getFillColorTo() {
		return fillColorTo;
	}

	public void setFillColorTo(String fillColorTo) {
		this.fillColorTo = fillColorTo;
	}

	public double getFillColorDurations() {
		return fillColorDurations;
	}

	public void setFillColorDurations(double fillColorDurations) {
		this.fillColorDurations = fillColorDurations;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public int getPathDurations() {
		return pathDurations;
	}

	public void setPathDurations(int pathDurations) {
		this.pathDurations = pathDurations;
	}

	public double getRotateCenterX() {
		return rotateCenterX;
	}

	public void setRotateCenterX(double rotateCenterX) {
		this.rotateCenterX = rotateCenterX;
	}

	public double getRotateCenterY() {
		return rotateCenterY;
	}

	public void setRotateCenterY(double rotateCenterY) {
		this.rotateCenterY = rotateCenterY;
	}

	public int getRotateAngel() {
		return rotateAngel;
	}

	public void setRotateAngel(int rotateAngel) {
		this.rotateAngel = rotateAngel;
	}

	public int getRotateDurations() {
		return rotateDurations;
	}

	public void setRotateDurations(int rotateDurations) {
		this.rotateDurations = rotateDurations;
	}

	public LoopType getLoop() {
		return loop;
	}

	public void setLoop(LoopType loop) {
		this.loop = loop;
	}

	public double getScaleX() {
		return scaleX;
	}

	public void setScaleX(double scaleX) {
		this.scaleX = scaleX;
	}

	public double getScaleY() {
		return scaleY;
	}

	public void setScaleY(double scaleY) {
		this.scaleY = scaleY;
	}

	public int getScaleDurations() {
		return scaleDurations;
	}

	public void setScaleDurations(int scaleDurations) {
		this.scaleDurations = scaleDurations;
	}

	
}
