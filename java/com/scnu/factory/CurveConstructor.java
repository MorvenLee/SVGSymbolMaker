package com.scnu.factory;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.scnu.shapes.Curve;

import com.scnu.shapes.Shape;
import com.scnu.shapes.Style;


//命令A，（rx  ry  x-axis-rotation  large-arc-flag  sweep-flag  x  y），用来画弧线的，一共七个参数，这七个参数代表的意思解释如下：
//rx：弧的半长轴长度；
//ry：弧的半短轴长度；
//x-axis-rotation：此弧段所在的X轴与水平方向的夹角，即X轴的旋转角度；
//large-arc-flag：此参数有两个值，分别为0和1。0代表小角度弧线，1代表大角度弧线；
// sweep-flag：此参数也有两个值，分别为0和1。1代表从起点到终点弧线绕中心顺时针方向，0代表逆时针方向；
//x，y：弧线的终端坐标。
public class CurveConstructor implements BasicShapeConstructor{

	private static Logger logger = LoggerFactory.getLogger(CurveConstructor.class);
	@Override
	public String creat(Shape shape) {
		
		logger.info("curve constructor working...");
		Curve curveToCreat = (Curve) shape;
		Document doc = DocumentHelper.createDocument();
		Element root = doc.addElement("path");
		
		//构造弧线字符串 A RX,RY,XROTATION,FLAG1,FLAG2,X,Y
//		如：M 200 40 A 16 12 0 1 1 32 34
		
		StringBuffer curveStr = new StringBuffer();
		curveStr.append("m ")
				.append(curveToCreat.getStartX()).append(" ")
				.append(curveToCreat.getStartY()).append(" ")
				.append("a ")
				.append(curveToCreat.getSemiAxisX()).append(" ")
				.append(curveToCreat.getSemiAxisY()).append(" ")
				.append(curveToCreat.getxAxisRotation()).append(" ")
				.append(curveToCreat.isLargeArcFlag()).append(" ")
				.append(curveToCreat.isSweepFlag()).append(" ")
				.append(curveToCreat.getEndX()).append(" ")
				.append(curveToCreat.getEndY()).append(" ");
		
	
		root.addAttribute("d", curveStr.toString());
		
		
		StringBuffer styleStr = new StringBuffer();
		Style style = curveToCreat.getStyle();
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
		if(curveToCreat.getDp().getStrokeColorFrom() !=null && !curveToCreat.getDp().getStrokeColorFrom().equals("")
				&& curveToCreat.getDp().getStrokeColorTo() !=null && !curveToCreat.getDp().getStrokeColorTo().equals("")
				&& curveToCreat.getDp().getStrokeColorDurations() > 0 ){
			Element animate = root.addElement("animate");
			animate.addAttribute("attributeType", "CSS");
			animate.addAttribute("attributeName", "stroke");
			animate.addAttribute("from", curveToCreat.getDp().getStrokeColorFrom());
			animate.addAttribute("to", curveToCreat.getDp().getStrokeColorTo());
			animate.addAttribute("dur", Double.toString(curveToCreat.getDp().getStrokeColorDurations()));
			animate.addAttribute("restart", "always");
			animate.addAttribute("repeatCount", "indefinite");
			
		}
		
//		填充色渐变
//		sample: <animate attributeType="CSS" attributeName="fill" 
//		from="red" to="green" dur="3s" restart="always" repeatCount="3"></animate>
		if(curveToCreat.getDp().getFillColorFrom() !=null && !curveToCreat.getDp().getFillColorFrom().equals("")
				&& curveToCreat.getDp().getFillColorTo() !=null && !curveToCreat.getDp().getFillColorTo().equals("")
				&& curveToCreat.getDp().getFillColorDurations() > 0 ){
			Element animate = root.addElement("animate");
			animate.addAttribute("attributeType", "CSS");
			animate.addAttribute("attributeName", "fill");
			animate.addAttribute("from", curveToCreat.getDp().getFillColorFrom());
			animate.addAttribute("to", curveToCreat.getDp().getFillColorTo());
			animate.addAttribute("dur", Double.toString(curveToCreat.getDp().getFillColorDurations()));
			animate.addAttribute("restart", "always");
			animate.addAttribute("repeatCount", "indefinite");
	
		}
		
//		路径解析
//		 sample:<animateMotion path="M10,80 q100,120 120,20 q140,-50 160,0"
//		 begin="0s" dur="3s" repeatCount="indefinite"/>
		if (curveToCreat.getDp().getPath() != null
				&& !curveToCreat.getDp().getPath().equals("")) {
			Element animateMotion = root.addElement("animateMotion");
			animateMotion.addAttribute("path", curveToCreat.getDp().getPath());
			animateMotion.addAttribute("begin", "0s");
			animateMotion.addAttribute("dur",
					Integer.toString(curveToCreat.getDp().getPathDurations())
					+ "s");
			animateMotion.addAttribute("repeatCount", "indefinite");
		}
		
//		缩放解析
//		sample:<animateTransform attributeName="transform" begin="0s" dur="3s"  type="scale" from="1" to="3" repeatCount="indefinite"/>
		if (curveToCreat.getDp().getScaleX() > 0.0
				&& curveToCreat.getDp().getScaleY() > 0.0
				&& curveToCreat.getDp().getScaleDurations() > 0) {
			Element animateMotion = root.addElement("animateTransform");
			animateMotion.addAttribute("attributeName", "transform");
			animateMotion.addAttribute("type", "scale");
			animateMotion.addAttribute("dur",
					Integer.toString(curveToCreat.getDp().getScaleDurations())
					+ "s");
			animateMotion.addAttribute("from", "1");
			animateMotion.addAttribute("to", 
					Double.toString(curveToCreat.getDp().getScaleX())
					+"s");
			animateMotion.addAttribute("repeatCount", "indefinite");
		}
		
//		旋转解析
//		sample:<animateTransform attributeName="transform" begin="0s" dur="3s"  type="rotate" from="0" to="10" repeatCount="indefinite"/>
		if (curveToCreat.getDp().getRotateCenterX()>0.0
				&& curveToCreat.getDp().getRotateCenterY()>0.0
				&& curveToCreat.getDp().getRotateAngel()>0
				&& curveToCreat.getDp().getRotateDurations()>0) {
			Element animateMotion = root.addElement("animateTransform");
			animateMotion.addAttribute("attributeName", "transform");
			animateMotion.addAttribute("type", "rotate");
			animateMotion.addAttribute("dur",
					Integer.toString(curveToCreat.getDp().getRotateDurations())
					+ "s");
			animateMotion.addAttribute("from", "0");
			animateMotion.addAttribute("to", 
					Double.toString(curveToCreat.getDp().getRotateAngel()));
			animateMotion.addAttribute("repeatCount", "indefinite");
		}
		
		return doc.asXML();
	}

}
