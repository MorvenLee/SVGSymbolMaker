package com.scnu.factory;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.scnu.shapes.Circle;

import com.scnu.shapes.Shape;
import com.scnu.shapes.Style;

public class CircleConstructor implements BasicShapeConstructor {

	private static Logger logger = LoggerFactory.getLogger(RectConstructor.class);
	
	@Override
	public String creat(Shape shape) {
		
		logger.info("circle constructor working...");
		Circle circleToCreat = (Circle) shape;
		Document doc = DocumentHelper.createDocument();
		Element root = doc.addElement("circle");
		
		root.addAttribute("cx", Double.toString(circleToCreat.getX()));
		root.addAttribute("cy", Double.toString(circleToCreat.getY()));
		root.addAttribute("r", Double.toString(circleToCreat.getRadius()));
		
		StringBuffer styleStr = new StringBuffer();
		Style style = circleToCreat.getStyle();
		if(style != null){
			if(style.getStrokeColor() != null && 
					!(style.getStrokeColor().equals(""))){
				styleStr.append("stroke:").append(style.getStrokeColor()).append(";");
			}
			if(style.getStrokeWidth() >= 1){
				styleStr.append("stroke-width:").append(style.getStrokeWidth()).append(";");
			}
			if(style.getFillColor() != null && 
					!style.getFillColor().equals("")){
				styleStr.append("fill:").append(style.getFillColor()).append(";");
			}
			
			root.addAttribute("style", styleStr.toString());
		}
		
//		描边色渐变
//		sample: <animate attributeType="CSS" attributeName="stroke" 
//		from="red" to="green" dur="3s" restart="always" repeatCount="3"></animate>
		if(circleToCreat.getDp().getStrokeColorFrom() !=null && !circleToCreat.getDp().getStrokeColorFrom().equals("")
				&& circleToCreat.getDp().getStrokeColorTo() !=null && !circleToCreat.getDp().getStrokeColorTo().equals("")
				&& circleToCreat.getDp().getStrokeColorDurations() > 0 ){
			Element animate = root.addElement("animate");
			animate.addAttribute("attributeType", "CSS");
			animate.addAttribute("attributeName", "stroke");
			animate.addAttribute("from", circleToCreat.getDp().getStrokeColorFrom());
			animate.addAttribute("to", circleToCreat.getDp().getStrokeColorTo());
			animate.addAttribute("dur", Double.toString(circleToCreat.getDp().getStrokeColorDurations()));
			animate.addAttribute("restart", "always");
			animate.addAttribute("repeatCount", "indefinite");
			
		}
		
//		填充色渐变
//		sample: <animate attributeType="CSS" attributeName="fill" 
//		from="red" to="green" dur="3s" restart="always" repeatCount="3"></animate>
		if(circleToCreat.getDp().getFillColorFrom() !=null && !circleToCreat.getDp().getFillColorFrom().equals("")
				&& circleToCreat.getDp().getFillColorTo() !=null && !circleToCreat.getDp().getFillColorTo().equals("")
				&& circleToCreat.getDp().getFillColorDurations() > 0 ){
			Element animate = root.addElement("animate");
			animate.addAttribute("attributeType", "CSS");
			animate.addAttribute("attributeName", "fill");
			animate.addAttribute("from", circleToCreat.getDp().getFillColorFrom());
			animate.addAttribute("to", circleToCreat.getDp().getFillColorTo());
			animate.addAttribute("dur", Double.toString(circleToCreat.getDp().getFillColorDurations()));
			animate.addAttribute("restart", "always");
			animate.addAttribute("repeatCount", "indefinite");
	
		}
		
//		路径解析
//		 sample:<animateMotion path="M10,80 q100,120 120,20 q140,-50 160,0"
//		 begin="0s" dur="3s" repeatCount="indefinite"/>
		if (circleToCreat.getDp().getPath() != null
				&& !circleToCreat.getDp().getPath().equals("")) {
			Element animateMotion = root.addElement("animateMotion");
			animateMotion.addAttribute("path", circleToCreat.getDp().getPath());
			animateMotion.addAttribute("begin", "0s");
			animateMotion.addAttribute("dur",
					Integer.toString(circleToCreat.getDp().getPathDurations())
					+ "s");
			animateMotion.addAttribute("repeatCount", "indefinite");
		}
		
//		缩放解析
//		sample:<animateTransform attributeName="transform" begin="0s" dur="3s"  type="scale" from="1" to="3" repeatCount="indefinite"/>
		if (circleToCreat.getDp().getScaleX() > 0.0
				&& circleToCreat.getDp().getScaleY() > 0.0
				&& circleToCreat.getDp().getScaleDurations() > 0) {
			Element animateMotion = root.addElement("animateTransform");
			animateMotion.addAttribute("attributeName", "transform");
			animateMotion.addAttribute("type", "scale");
			animateMotion.addAttribute("dur",
					Integer.toString(circleToCreat.getDp().getScaleDurations())
					+ "s");
			animateMotion.addAttribute("from", "1");
			animateMotion.addAttribute("to", 
					Double.toString(circleToCreat.getDp().getScaleX())
					+"s");
			animateMotion.addAttribute("repeatCount", "indefinite");
		}
		
//		旋转解析
//		sample:<animateTransform attributeName="transform" begin="0s" dur="3s"  type="rotate" from="0" to="10" repeatCount="indefinite"/>
		if (circleToCreat.getDp().getRotateCenterX()>0.0
				&& circleToCreat.getDp().getRotateCenterY()>0.0
				&& circleToCreat.getDp().getRotateAngel()>0
				&& circleToCreat.getDp().getRotateDurations()>0) {
			Element animateMotion = root.addElement("animateTransform");
			animateMotion.addAttribute("attributeName", "transform");
			animateMotion.addAttribute("type", "rotate");
			animateMotion.addAttribute("dur",
					Integer.toString(circleToCreat.getDp().getRotateDurations())
					+ "s");
			animateMotion.addAttribute("from", "0");
			animateMotion.addAttribute("to", 
					Double.toString(circleToCreat.getDp().getRotateAngel()));
			animateMotion.addAttribute("repeatCount", "indefinite");
		}
		
		return doc.asXML();
		
	}
	
	
}
