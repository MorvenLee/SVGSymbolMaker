package com.scnu.factory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



public class SimpleShapeConstructorFactory {
	
	private static Logger logger = LoggerFactory.getLogger(SimpleShapeConstructorFactory.class);
	
	 public static BasicShapeConstructor getConstructor(String type) throws InstantiationException, IllegalAccessException, ClassNotFoundException {
		
		if(type.equalsIgnoreCase("rect")){
			return new RectConstructor();
		}else if(type.equalsIgnoreCase("circle")){
			return new CircleConstructor();
		}else if(type.equalsIgnoreCase("ellipse")){
			return new EllipseConstructor();
		}else if(type.equalsIgnoreCase("path")){
			return new PathConstructor();
		}else if(type.equalsIgnoreCase("curve")){
			return new CurveConstructor();
		}else if(type.equalsIgnoreCase("polygon")){
			return new PolygonConstructor();
		}else{
			logger.info("找不到对应的实例化类!");
			return null;
		}
		 
		 
		 
	

      }
}
