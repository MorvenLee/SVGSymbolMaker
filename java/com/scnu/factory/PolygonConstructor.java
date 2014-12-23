package com.scnu.factory;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import com.scnu.shapes.Polygon;
import com.scnu.shapes.Shape;
import com.scnu.shapes.Style;

public class PolygonConstructor implements BasicShapeConstructor{

	private static Logger logger = LoggerFactory.getLogger(PolygonConstructor.class);
	@Override
	public String creat(Shape shape) {
		
		logger.info("polygon constructor working...");
		Polygon polygonToCreat = (Polygon) shape;
		Document doc = DocumentHelper.createDocument();
		Element root = doc.addElement("polygon");
		
		root.addAttribute("points", polygonToCreat.getPointsStr());
		
		
		StringBuffer styleStr = new StringBuffer();
		Style style = polygonToCreat.getStyle();
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
		if(polygonToCreat.getDp().getStrokeColorFrom() !=null && !polygonToCreat.getDp().getStrokeColorFrom().equals("")
				&& polygonToCreat.getDp().getStrokeColorTo() !=null && !polygonToCreat.getDp().getStrokeColorTo().equals("")
				&& polygonToCreat.getDp().getStrokeColorDurations() > 0 ){
			Element animate = root.addElement("animate");
			animate.addAttribute("attributeType", "CSS");
			animate.addAttribute("attributeName", "stroke");
			animate.addAttribute("from", polygonToCreat.getDp().getStrokeColorFrom());
			animate.addAttribute("to", polygonToCreat.getDp().getStrokeColorTo());
			animate.addAttribute("dur", Double.toString(polygonToCreat.getDp().getStrokeColorDurations()));
			animate.addAttribute("restart", "always");
			animate.addAttribute("repeatCount", "indefinite");
			
		}
		
//		填充色渐变
//		sample: <animate attributeType="CSS" attributeName="fill" 
//		from="red" to="green" dur="3s" restart="always" repeatCount="3"></animate>
		if(polygonToCreat.getDp().getFillColorFrom() !=null && !polygonToCreat.getDp().getFillColorFrom().equals("")
				&& polygonToCreat.getDp().getFillColorTo() !=null && !polygonToCreat.getDp().getFillColorTo().equals("")
				&& polygonToCreat.getDp().getFillColorDurations() > 0 ){
			Element animate = root.addElement("animate");
			animate.addAttribute("attributeType", "CSS");
			animate.addAttribute("attributeName", "fill");
			animate.addAttribute("from", polygonToCreat.getDp().getFillColorFrom());
			animate.addAttribute("to", polygonToCreat.getDp().getFillColorTo());
			animate.addAttribute("dur", Double.toString(polygonToCreat.getDp().getFillColorDurations()));
			animate.addAttribute("restart", "always");
			animate.addAttribute("repeatCount", "indefinite");
	
		}
		
//		路径解析
//		 sample:<animateMotion path="M10,80 q100,120 120,20 q140,-50 160,0"
//		 begin="0s" dur="3s" repeatCount="indefinite"/>
		if (polygonToCreat.getDp().getPath() != null
				&& !polygonToCreat.getDp().getPath().equals("")) {
			Element animateMotion = root.addElement("animateMotion");
			animateMotion.addAttribute("path", polygonToCreat.getDp().getPath());
			animateMotion.addAttribute("begin", "0s");
			animateMotion.addAttribute("dur",
					Integer.toString(polygonToCreat.getDp().getPathDurations())
					+ "s");
			animateMotion.addAttribute("repeatCount", "indefinite");
		}
		
//		缩放解析
//		sample:<animateTransform attributeName="transform" begin="0s" dur="3s"  type="scale" from="1" to="3" repeatCount="indefinite"/>
		if (polygonToCreat.getDp().getScaleX() > 0.0
				&& polygonToCreat.getDp().getScaleY() > 0.0
				&& polygonToCreat.getDp().getScaleDurations() > 0) {
			Element animateMotion = root.addElement("animateTransform");
			animateMotion.addAttribute("attributeName", "transform");
			animateMotion.addAttribute("type", "scale");
			animateMotion.addAttribute("dur",
					Integer.toString(polygonToCreat.getDp().getScaleDurations())
					+ "s");
			animateMotion.addAttribute("from", "1");
			animateMotion.addAttribute("to", 
					Double.toString(polygonToCreat.getDp().getScaleX())
					+"s");
			animateMotion.addAttribute("repeatCount", "indefinite");
		}
		
//		旋转解析
//		sample:<animateTransform attributeName="transform" begin="0s" dur="3s"  type="rotate" from="0" to="10" repeatCount="indefinite"/>
		if (polygonToCreat.getDp().getRotateCenterX()>0.0
				&& polygonToCreat.getDp().getRotateCenterY()>0.0
				&& polygonToCreat.getDp().getRotateAngel()>0
				&& polygonToCreat.getDp().getRotateDurations()>0) {
			Element animateMotion = root.addElement("animateTransform");
			animateMotion.addAttribute("attributeName", "transform");
			animateMotion.addAttribute("type", "rotate");
			animateMotion.addAttribute("dur",
					Integer.toString(polygonToCreat.getDp().getRotateDurations())
					+ "s");
			animateMotion.addAttribute("from", "0");
			animateMotion.addAttribute("to", 
					Double.toString(polygonToCreat.getDp().getRotateAngel()));
			animateMotion.addAttribute("repeatCount", "indefinite");
		}
		
		return doc.asXML();
	}

}
