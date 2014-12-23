package com.scnu.factory;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import com.scnu.shapes.Ellipse;
import com.scnu.shapes.Shape;
import com.scnu.shapes.Style;

public class EllipseConstructor implements BasicShapeConstructor{

private static Logger logger = LoggerFactory.getLogger(EllipseConstructor.class);
	
	@Override
	public String creat(Shape shape) {
		
		logger.info("ellipse constructor working...");
		Ellipse ellipseToCreat = (Ellipse) shape;
		Document doc = DocumentHelper.createDocument();
		Element root = doc.addElement("ellipse ");
		
		root.addAttribute("cx", Double.toString(ellipseToCreat.getCenterX()));
		root.addAttribute("cy", Double.toString(ellipseToCreat.getCenterY()));
		root.addAttribute("rx", Double.toString(ellipseToCreat.getSemiAxisX()));
		root.addAttribute("ry", Double.toString(ellipseToCreat.getCenterY()));
		
		StringBuffer styleStr = new StringBuffer();
		Style style = ellipseToCreat.getStyle();
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
		if(ellipseToCreat.getDp().getStrokeColorFrom() !=null && !ellipseToCreat.getDp().getStrokeColorFrom().equals("")
				&& ellipseToCreat.getDp().getStrokeColorTo() !=null && !ellipseToCreat.getDp().getStrokeColorTo().equals("")
				&& ellipseToCreat.getDp().getStrokeColorDurations() > 0 ){
			Element animate = root.addElement("animate");
			animate.addAttribute("attributeType", "CSS");
			animate.addAttribute("attributeName", "stroke");
			animate.addAttribute("from", ellipseToCreat.getDp().getStrokeColorFrom());
			animate.addAttribute("to", ellipseToCreat.getDp().getStrokeColorTo());
			animate.addAttribute("dur", Double.toString(ellipseToCreat.getDp().getStrokeColorDurations()));
			animate.addAttribute("restart", "always");
			animate.addAttribute("repeatCount", "indefinite");
			
		}
		
//		填充色渐变
//		sample: <animate attributeType="CSS" attributeName="fill" 
//		from="red" to="green" dur="3s" restart="always" repeatCount="3"></animate>
		if(ellipseToCreat.getDp().getFillColorFrom() !=null && !ellipseToCreat.getDp().getFillColorFrom().equals("")
				&& ellipseToCreat.getDp().getFillColorTo() !=null && !ellipseToCreat.getDp().getFillColorTo().equals("")
				&& ellipseToCreat.getDp().getFillColorDurations() > 0 ){
			Element animate = root.addElement("animate");
			animate.addAttribute("attributeType", "CSS");
			animate.addAttribute("attributeName", "fill");
			animate.addAttribute("from", ellipseToCreat.getDp().getFillColorFrom());
			animate.addAttribute("to", ellipseToCreat.getDp().getFillColorTo());
			animate.addAttribute("dur", Double.toString(ellipseToCreat.getDp().getFillColorDurations()));
			animate.addAttribute("restart", "always");
			animate.addAttribute("repeatCount", "indefinite");
	
		}
		
//		路径解析
//		 sample:<animateMotion path="M10,80 q100,120 120,20 q140,-50 160,0"
//		 begin="0s" dur="3s" repeatCount="indefinite"/>
		if (ellipseToCreat.getDp().getPath() != null
				&& !ellipseToCreat.getDp().getPath().equals("")) {
			Element animateMotion = root.addElement("animateMotion");
			animateMotion.addAttribute("path", ellipseToCreat.getDp().getPath());
			animateMotion.addAttribute("begin", "0s");
			animateMotion.addAttribute("dur",
					Integer.toString(ellipseToCreat.getDp().getPathDurations())
					+ "s");
			animateMotion.addAttribute("repeatCount", "indefinite");
		}
		
//		缩放解析
//		sample:<animateTransform attributeName="transform" begin="0s" dur="3s"  type="scale" from="1" to="3" repeatCount="indefinite"/>
		if (ellipseToCreat.getDp().getScaleX() > 0.0
				&& ellipseToCreat.getDp().getScaleY() > 0.0
				&& ellipseToCreat.getDp().getScaleDurations() > 0) {
			Element animateMotion = root.addElement("animateTransform");
			animateMotion.addAttribute("attributeName", "transform");
			animateMotion.addAttribute("type", "scale");
			animateMotion.addAttribute("dur",
					Integer.toString(ellipseToCreat.getDp().getScaleDurations())
					+ "s");
			animateMotion.addAttribute("from", "1");
			animateMotion.addAttribute("to", 
					Double.toString(ellipseToCreat.getDp().getScaleX())
					+"s");
			animateMotion.addAttribute("repeatCount", "indefinite");
		}
		
//		旋转解析
//		sample:<animateTransform attributeName="transform" begin="0s" dur="3s"  type="rotate" from="0" to="10" repeatCount="indefinite"/>
		if (ellipseToCreat.getDp().getRotateCenterX()>0.0
				&& ellipseToCreat.getDp().getRotateCenterY()>0.0
				&& ellipseToCreat.getDp().getRotateAngel()>0
				&& ellipseToCreat.getDp().getRotateDurations()>0) {
			Element animateMotion = root.addElement("animateTransform");
			animateMotion.addAttribute("attributeName", "transform");
			animateMotion.addAttribute("type", "rotate");
			animateMotion.addAttribute("dur",
					Integer.toString(ellipseToCreat.getDp().getRotateDurations())
					+ "s");
			animateMotion.addAttribute("from", "0");
			animateMotion.addAttribute("to", 
					Double.toString(ellipseToCreat.getDp().getRotateAngel()));
			animateMotion.addAttribute("repeatCount", "indefinite");
		}
		
		return doc.asXML();
		
	}

}
