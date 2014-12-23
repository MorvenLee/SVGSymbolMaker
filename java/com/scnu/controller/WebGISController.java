package com.scnu.controller;


import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.dom4j.DocumentException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.scnu.factory.SimpleShapeConstructorFactory;
import com.scnu.fileOperation.FileOperation;

import com.scnu.shapes.Circle;
import com.scnu.shapes.Curve;
import com.scnu.shapes.Ellipse;
import com.scnu.shapes.Path;
import com.scnu.shapes.Polygon;
import com.scnu.shapes.Rect;



@Controller
@RequestMapping(value = "/webgis")

/**
 * 
 * @author Administrator

 *
 */
public class WebGISController {
	private static Logger logger = LoggerFactory.getLogger(IndexController.class);
	
	
	@RequestMapping(value = "/webgis.do")
	public String services(){
		
		return "/DynamicMapSymbol/webgis";
	}
	
	@RequestMapping(value = "/symbolmake.do")
	public String symbolmakes(){
		
		return "/DynamicMapSymbol/symbolmake";
	}
	
	@RequestMapping(value = "/symbolresolve.do")
	public String symbolresolve(){
		
		return "/DynamicMapSymbol/symbolresolve";
	}
	
	@RequestMapping(value = "/rectmake.do")
	@ResponseBody
	public String rectMake(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String str = URLDecoder.decode(request.getParameter("rectParamsStr"),"UTF-8");  
		System.out.println(str);
		Rect rectJson =  JSON.parseObject(str, Rect.class);
		return  SimpleShapeConstructorFactory.getConstructor("rect").creat(rectJson);
	}
	
	@RequestMapping(value = "/circlemake.do")
	@ResponseBody
	public String circleMake(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String str = URLDecoder.decode(request.getParameter("circleParamsStr"),"UTF-8");  
		System.out.println(str);
		Circle circleJson =  JSON.parseObject(str, Circle.class);
		
		return  SimpleShapeConstructorFactory.getConstructor("circle").creat(circleJson);
	}
	
	@RequestMapping(value = "/ellipsemake.do")
	@ResponseBody
	public String ellipseMake(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String str = URLDecoder.decode(request.getParameter("ellipseParamsStr"),"UTF-8");  
		System.out.println(str);
		Ellipse ellipseJson =  JSON.parseObject(str, Ellipse.class);
		return  SimpleShapeConstructorFactory.getConstructor("ellipse").creat(ellipseJson);
	}
	
	
	@RequestMapping(value = "/pathmake.do")
	@ResponseBody
	public String pathMake(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String str = URLDecoder.decode(request.getParameter("pathParamsStr"),"UTF-8");  
		System.out.println(str);
		Path pathJson =  JSON.parseObject(str, Path.class);
		return  SimpleShapeConstructorFactory.getConstructor("path").creat(pathJson);
	}
	
	@RequestMapping(value = "/curvemake.do")
	@ResponseBody
	public String curveMake(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String str = URLDecoder.decode(request.getParameter("curveParamsStr"),"UTF-8");  
		System.out.println(str);
		Curve curveJson =  JSON.parseObject(str, Curve.class);
		return  SimpleShapeConstructorFactory.getConstructor("curve").creat(curveJson);
	}
	
	@RequestMapping(value = "/polygonmake.do")
	@ResponseBody
	public String polygonMake(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String str = URLDecoder.decode(request.getParameter("polygonParamsStr"),"UTF-8");  
		System.out.println(str);
		Polygon polygonJson =  JSON.parseObject(str, Polygon.class);
		return  SimpleShapeConstructorFactory.getConstructor("polygon").creat(polygonJson);
	}
	
	
	@RequestMapping(value = "/saveas.do")
	@ResponseBody
	public String savefile(HttpServletRequest request) throws UnsupportedEncodingException{
		String status = "ERROR"; //文件保存是否成功标识
		String content = URLDecoder.decode(request.getParameter("svgContent"),"UTF-8");
//		System.out.println(content);
		try {
			FileOperation.ConstructSVG(content);
			status = "SUCCESS";
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			status = "ERROR";
		}

		return status;
		
	}
	
	
	@RequestMapping(value="download.do")
	void download(HttpServletResponse response){
		try {
			FileOperation.downloadAsSVG(response);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value = "/uploadxml.do")
	public String uploadxml(HttpServletRequest request,  
            @RequestParam("fileUpload") MultipartFile fileUpload)  
            throws Exception {  
        FileOperation.UploadFile(fileUpload);
        return "redirect:/admin/addcolumn.htm";  
    }  
}
