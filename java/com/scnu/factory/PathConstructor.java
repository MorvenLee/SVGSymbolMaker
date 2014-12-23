package com.scnu.factory;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.scnu.shapes.Path;

import com.scnu.shapes.Shape;
import com.scnu.shapes.Style;

public class PathConstructor implements BasicShapeConstructor{

	private static Logger logger = LoggerFactory.getLogger(PathConstructor.class);
	@Override
	public String creat(Shape shape) {
		
		logger.info("path constructor working...");
		Path pathToCreat = (Path) shape;
		Document doc = DocumentHelper.createDocument();
		Element root = doc.addElement("path");
		
		root.addAttribute("d", pathToCreat.getPathDescriStr());
		
		
		StringBuffer styleStr = new StringBuffer();
		Style style = pathToCreat.getStyle();
		if(style != null){
			if(style.getStrokeColor() != null && 
					!(style.getStrokeColor().equals(""))){
				styleStr.append("stroke:").append(style.getStrokeColor()).append(";");
			}else{
				styleStr.append("stroke:black;");
			}
			if(style.getStrokeWidth() >= 1){
				styleStr.append("stroke-width:").append(style.getStrokeWidth()).append(";");
			}
			if(style.getFillColor() != null && 
					!style.getFillColor().equals("")){
				styleStr.append("fill:").append(style.getFillColor()).append(";");
			}else{
				styleStr.append("fill:white");
			}
			
			root.addAttribute("style", styleStr.toString());
		}
		
//		描边色渐变
//		sample: <animate attributeType="CSS" attributeName="stroke" 
//		from="red" to="green" dur="3s" restart="always" repeatCount="3"></animate>
		if(pathToCreat.getDp().getStrokeColorFrom() !=null && !pathToCreat.getDp().getStrokeColorFrom().equals("")
				&& pathToCreat.getDp().getStrokeColorTo() !=null && !pathToCreat.getDp().getStrokeColorTo().equals("")
				&& pathToCreat.getDp().getStrokeColorDurations() > 0 ){
			Element animate = root.addElement("animate");
			animate.addAttribute("attributeType", "CSS");
			animate.addAttribute("attributeName", "stroke");
			animate.addAttribute("from", pathToCreat.getDp().getStrokeColorFrom());
			animate.addAttribute("to", pathToCreat.getDp().getStrokeColorTo());
			animate.addAttribute("dur", Double.toString(pathToCreat.getDp().getStrokeColorDurations()));
			animate.addAttribute("restart", "always");
			animate.addAttribute("repeatCount", "indefinite");
			
		}
		
//		填充色渐变
//		sample: <animate attributeType="CSS" attributeName="fill" 
//		from="red" to="green" dur="3s" restart="always" repeatCount="3"></animate>
		if(pathToCreat.getDp().getFillColorFrom() !=null && !pathToCreat.getDp().getFillColorFrom().equals("")
				&& pathToCreat.getDp().getFillColorTo() !=null && !pathToCreat.getDp().getFillColorTo().equals("")
				&& pathToCreat.getDp().getFillColorDurations() > 0 ){
			Element animate = root.addElement("animate");
			animate.addAttribute("attributeType", "CSS");
			animate.addAttribute("attributeName", "fill");
			animate.addAttribute("from", pathToCreat.getDp().getFillColorFrom());
			animate.addAttribute("to", pathToCreat.getDp().getFillColorTo());
			animate.addAttribute("dur", Double.toString(pathToCreat.getDp().getFillColorDurations()));
			animate.addAttribute("restart", "always");
			animate.addAttribute("repeatCount", "indefinite");
	
		}
		
//		路径解析
//		 sample:<animateMotion path="M10,80 q100,120 120,20 q140,-50 160,0"
//		 begin="0s" dur="3s" repeatCount="indefinite"/>
		if (pathToCreat.getDp().getPath() != null
				&& !pathToCreat.getDp().getPath().equals("")) {
			Element animateMotion = root.addElement("animateMotion");
			animateMotion.addAttribute("path", pathToCreat.getDp().getPath());
			animateMotion.addAttribute("begin", "0s");
			animateMotion.addAttribute("dur",
					Integer.toString(pathToCreat.getDp().getPathDurations())
					+ "s");
			animateMotion.addAttribute("repeatCount", "indefinite");
		}
		
//		缩放解析
//		sample:<animateTransform attributeName="transform" begin="0s" dur="3s"  type="scale" from="1" to="3" repeatCount="indefinite"/>
		if (pathToCreat.getDp().getScaleX() > 0.0
				&& pathToCreat.getDp().getScaleY() > 0.0
				&& pathToCreat.getDp().getScaleDurations() > 0) {
			Element animateMotion = root.addElement("animateTransform");
			animateMotion.addAttribute("attributeName", "transform");
			animateMotion.addAttribute("type", "scale");
			animateMotion.addAttribute("dur",
					Integer.toString(pathToCreat.getDp().getScaleDurations())
					+ "s");
			animateMotion.addAttribute("from", "1");
			animateMotion.addAttribute("to", 
					Double.toString(pathToCreat.getDp().getScaleX())
					+"s");
			animateMotion.addAttribute("repeatCount", "indefinite");
		}
		
//		旋转解析
//		sample:<animateTransform attributeName="transform" begin="0s" dur="3s"  type="rotate" from="0" to="10" repeatCount="indefinite"/>
		if (pathToCreat.getDp().getRotateCenterX()>0.0
				&& pathToCreat.getDp().getRotateCenterY()>0.0
				&& pathToCreat.getDp().getRotateAngel()>0
				&& pathToCreat.getDp().getRotateDurations()>0) {
			Element animateMotion = root.addElement("animateTransform");
			animateMotion.addAttribute("attributeName", "transform");
			animateMotion.addAttribute("type", "rotate");
			animateMotion.addAttribute("dur",
					Integer.toString(pathToCreat.getDp().getRotateDurations())
					+ "s");
			animateMotion.addAttribute("from", "0");
			animateMotion.addAttribute("to", 
					Double.toString(pathToCreat.getDp().getRotateAngel()));
			animateMotion.addAttribute("repeatCount", "indefinite");
		}
		
		return doc.asXML();
	}

}
