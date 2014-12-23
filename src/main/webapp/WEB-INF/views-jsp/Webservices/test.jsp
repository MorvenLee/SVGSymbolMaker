<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html>
<head>
<title>webservices</title>
<form target="_blank" 
action='http://w3school.com.cn/webservices/tempconvert.asmx/FahrenheitToCelsius' 
method="POST">

  <label>华氏度转换为摄氏度：</label>
  <p>
  
    <span>
      <input class="frmInput" type="text" size="30" name="Fahrenheit">
    </span>
  
    <span>
      <input type="submit" value="提交" class="button">
    </span>
  
  </p>

</form>
</head>
</html>


<form target="_blank" 
action='http://w3school.com.cn/webservices/tempconvert.asmx/CelsiusToFahrenheit' 
method="POST">

  <label>摄氏度转换为华氏度：</label>
  <p>
  
    <span>
     <input class="frmInput" type="text" size="30" name="Celsius">
    </span>
  
    <span>
     <input type="submit" value="提交" class="button">
    </span>
  
  </p>

</form>