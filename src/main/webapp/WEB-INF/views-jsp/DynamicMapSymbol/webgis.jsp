<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html>
<head>
<title>web gis 应用系统</title>
<!-- jquery -->
<script src="/scnu/resources/ui-lib/jquery1x/jQuery-1.9.1.js"
	type="text/javascript"></script>

<!-- bootstrap -->
<link href="/scnu/resources/ui-lib/bootstrap/css/bootstrap.css"
	type="text/css" rel="stylesheet" />
<script src="/scnu/resources/ui-lib/bootstrap/js/bootstrap.min.js"
	type="text/javascript"></script>
</head>
<body>
<div class="row">
<!-- 地图符号库面板 -->
  <div class="col-md-4" style="border:2px solid blue;height:500px;">
  	 系统符号<br/>
  	自定义符号<br/>
  </div>
  
  <!-- 地图 -->
  <div class="col-md-6" style="border:2px solid blue;height:500px;">
  
  <div id="sidebarR">
<!-- 			<embed name="svgfile1" pluginspage="http://www.adobe.com/svg/viewer/install/"  -->
<!--                                 align="top" src="/scnu/resources/menu2/mainMapgdbnd.svg" height="100%" width="100%" -->
<!--                                  type="image/svg+xml"/> -->
			
			<embed name="svgfile1" pluginspage="http://www.adobe.com/svg/viewer/install/" 
                                align="top" src="/scnu/resources/map.svg" height="100%" width="100%"
                                 type="image/svg+xml"/>
                                 		
			</div>
  
  
  </div>
<div class="col-md-2" style="border:2px solid blue;height:500px;">
  
  <div id="toolbar" >
 <embed name="ToolBar" pluginspage="http://www.adobe.com/svg/viewer/install/" 
                                align="top" src="/scnu/resources/menu2/svg/ToolBar/Toolboard.svg" height="100%" width="100%"
                                 type="image/svg+xml"/>
</div>
  
  
  </div>
</div>
</body>
</html>