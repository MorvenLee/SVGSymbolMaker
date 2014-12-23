package com.scnu.factory;


import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.scnu.shapes.Rect;
import com.scnu.shapes.Shape;
import com.scnu.shapes.Style;


public class RectConstructor implements BasicShapeConstructor {

	private static Logger logger = LoggerFactory.getLogger(RectConstructor.class);

	
	@Override
	public String creat(Shape shape) {
		logger.info("rect constructor working...");
		Rect rectToCreat = (Rect) shape;
		Document doc = DocumentHelper.createDocument();
		Element root = doc.addElement("rect");
		root.addAttribute("x", Double.toString(rectToCreat.getX()));
		root.addAttribute("y", Double.toString(rectToCreat.getY()));
		root.addAttribute("rx", Double.toString(rectToCreat.getRx()));
		root.addAttribute("ry", Double.toString(rectToCreat.getRy()));
		root.addAttribute("width", Double.toString(rectToCreat.getWidth()));
		root.addAttribute("height", Double.toString(rectToCreat.getHeight()));
		
		
		StringBuffer styleStr = new StringBuffer();
		Style style = rectToCreat.getStyle();
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
		if(rectToCreat.getDp().getStrokeColorFrom() !=null && !rectToCreat.getDp().getStrokeColorFrom().equals("")
				&& rectToCreat.getDp().getStrokeColorTo() !=null && !rectToCreat.getDp().getStrokeColorTo().equals("")
				&& rectToCreat.getDp().getStrokeColorDurations() > 0 ){
			Element animate = root.addElement("animate");
			animate.addAttribute("attributeType", "CSS");
			animate.addAttribute("attributeName", "stroke");
			animate.addAttribute("from", rectToCreat.getDp().getStrokeColorFrom());
			animate.addAttribute("to", rectToCreat.getDp().getStrokeColorTo());
			animate.addAttribute("dur", Double.toString(rectToCreat.getDp().getStrokeColorDurations()));
			animate.addAttribute("restart", "always");
			animate.addAttribute("repeatCount", "indefinite");
			
		}
		
//		填充色渐变
//		sample: <animate attributeType="CSS" attributeName="fill" 
//		from="red" to="green" dur="3s" restart="always" repeatCount="3"></animate>
		if(rectToCreat.getDp().getFillColorFrom() !=null && !rectToCreat.getDp().getFillColorFrom().equals("")
				&& rectToCreat.getDp().getFillColorTo() !=null && !rectToCreat.getDp().getFillColorTo().equals("")
				&& rectToCreat.getDp().getFillColorDurations() > 0 ){
			Element animate = root.addElement("animate");
			animate.addAttribute("attributeType", "CSS");
			animate.addAttribute("attributeName", "fill");
			animate.addAttribute("from", rectToCreat.getDp().getFillColorFrom());
			animate.addAttribute("to", rectToCreat.getDp().getFillColorTo());
			animate.addAttribute("dur", Double.toString(rectToCreat.getDp().getFillColorDurations()));
			animate.addAttribute("restart", "always");
			animate.addAttribute("repeatCount", "indefinite");
	
		}
		
//		路径解析
//		 sample:<animateMotion path="M10,80 q100,120 120,20 q140,-50 160,0"
//		 begin="0s" dur="3s" repeatCount="indefinite"/>
		if (rectToCreat.getDp().getPath() != null
				&& !rectToCreat.getDp().getPath().equals("")) {
			Element animateMotion = root.addElement("animateMotion");
			animateMotion.addAttribute("path", rectToCreat.getDp().getPath());
			animateMotion.addAttribute("begin", "0s");
			animateMotion.addAttribute("dur",
					Integer.toString(rectToCreat.getDp().getPathDurations())
					+ "s");
			animateMotion.addAttribute("repeatCount", "indefinite");
		}
		
//		缩放解析
//		sample:<animateTransform attributeName="transform" begin="0s" dur="3s"  type="scale" from="1" to="3" repeatCount="indefinite"/>
		if (rectToCreat.getDp().getScaleX() > 0.0
				&& rectToCreat.getDp().getScaleY() > 0.0
				&& rectToCreat.getDp().getScaleDurations() > 0) {
			Element animateMotion = root.addElement("animateTransform");
			animateMotion.addAttribute("attributeName", "transform");
			animateMotion.addAttribute("type", "scale");
			animateMotion.addAttribute("dur",
					Integer.toString(rectToCreat.getDp().getScaleDurations())
					+ "s");
			animateMotion.addAttribute("from", "1");
			animateMotion.addAttribute("to", 
					Double.toString(rectToCreat.getDp().getScaleX())
					+"s");
			animateMotion.addAttribute("repeatCount", "indefinite");
		}
		
//		旋转解析
//		sample:<animateTransform attributeName="transform" begin="0s" dur="3s"  type="rotate" from="0" to="10" repeatCount="indefinite"/>
		if (rectToCreat.getDp().getRotateCenterX()>0.0
				&& rectToCreat.getDp().getRotateCenterY()>0.0
				&& rectToCreat.getDp().getRotateAngel()>0
				&& rectToCreat.getDp().getRotateDurations()>0) {
			Element animateMotion = root.addElement("animateTransform");
			animateMotion.addAttribute("attributeName", "transform");
			animateMotion.addAttribute("type", "rotate");
			animateMotion.addAttribute("dur",
					Integer.toString(rectToCreat.getDp().getRotateDurations())
					+ "s");
			animateMotion.addAttribute("from", "0");
			animateMotion.addAttribute("to", 
					Double.toString(rectToCreat.getDp().getRotateAngel()));
			animateMotion.addAttribute("repeatCount", "indefinite");
		}
		
		return doc.asXML();
	}

}
