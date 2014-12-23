package com.scnu.webservices;

import javax.jws.WebService; 
import javax.xml.ws.Endpoint; 
/** 
 * 第一个WebService服务应用 
 */ 
//通过注解,标明此类发布为一个WebService 
@WebService 
public class Test { 
public String sayHello(){ 
return "Hello World"; 
} 
//在main方法中,使用javax.xml.ws.Endpoint端点发布一个应用 
public static void main(String[] args) { 
Endpoint.publish("http://127.0.0.1:9999/helloworld", 
 new Test()); 
} 
} 
