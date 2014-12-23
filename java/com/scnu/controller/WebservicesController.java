package com.scnu.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping(value = "/webservices")

/**
 * 
 * @author Administrator

 *
 */
public class WebservicesController {
	private static Logger logger = LoggerFactory.getLogger(IndexController.class);
	
	
	@RequestMapping(value = "/test.do")
	public String services(){
		
		return "/Webservices/test";
	}
}
