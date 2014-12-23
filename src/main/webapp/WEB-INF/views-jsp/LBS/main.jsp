<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Flock Pattern Visualization</title>
<!-- jquery -->
<script src="/scnu/resources/ui-lib/jquery1x/jQuery-1.9.1.js"
	type="text/javascript"></script>

<!-- bootstrap -->
<link href="/scnu/resources/ui-lib/bootstrap/css/bootstrap.css"
	type="text/css" rel="stylesheet" />
<script src="/scnu/resources/ui-lib/bootstrap/js/bootstrap.min.js"
	type="text/javascript"></script>
	
<!-- main.js -->	
<script src="/scnu/resources/js/main.js"
	type="text/javascript"></script>

<meta name="viewport" content="initial-scale=1.0, user-scalable=no">

<meta charset="utf-8">
<style>
#map-canvas,#left,#info {
	height: 600px;
	border: 1px solid #999999;
}
.pre_li li {
	padding:2px;
	list-style:none; 
	align:center;
}
.pre_li li button{
	padding : 5px;
}
.panel{
	padding-left : 2px;
	padding-right : 1px;
}
.table td{
padding:4px;
}
</style>
<script
	src="http://maps.google.com/maps/api/js?sensor=false"></script>

</head>
<body onload="init()">
	<!--  <div id="map-canvas"></div>  -->

		<div class="row" style="background-color: #668B8B">
			<div class="col-md-12">
				<h3 align="center">Flock 模式</h3>
			</div>
		</div>
		<div class="row">
			<div class="col-md-2 panel panel-primary" id="left">
				<div class="panel-heading">数据源</div>
				<div class="panel-body" style="border: 1px solid">
					<select class="form-control" id="trajectorypath">
						<option>--选择数据--</option>
						
					</select>
					<br>
					<button type="button" class="btn btn-info" onclick="selectpath()">源数据展示</button>
					
					
				</div>
				
				<div class="panel-heading">预处理</div>
				<div class="panel-body" style="border: 1px solid">
				<div class="btn-group btn-group-vertical">
					<button type="button"  class="btn btn-info" onclick="datapre(this)">高斯平滑</button>
					<button type="button"  class="btn btn-info" onclick="datapre(this)">高斯平放大放大发</button>
					<button type="button"  class="btn btn-info" onclick="datapre(this)">高斯平滑</button>
					<button type="button"  class="btn btn-info" onclick="datapre(this)">高斯平滑</button>
				</div>
				</div>
				
				

			</div>
			<div class="col-md-7" id="map-canvas"></div>
			
			<div class="col-md-3 panel panel-primary" id="info">
				
				<div class="panel-heading">参数设置</div>
				<div class="panel-body" style="border: 1px solid">
					<table class="table">
						<tr>
							<td>RADIUS :<br><input type="number" id="radius" value="10"/></td>
						</tr>
						<tr>
							<td>MIN_POINTS : <br><input type="number" id="minpoints" value="4"/></td>
						</tr>
						<tr>
							<td>MIN_TIME_SLICES : <br><input type="number" id="mintimeslice" value="3"/></td>	 	
						</tr>
						<tr>
							<td>TIME_INTERVAL_IN_INPUT_FILE : <br><input type="number" id="timeinterval" value="5"/></td>		 	
						</tr>
					</table>
				</div>
				
				<div class="panel-heading">Flock 计算</div>
				<div class="panel-body" style="border: 1px solid">
					<button type="button" class="btn btn-info" onclick="compute()">开始计算</button>
					计算用时 ：<font size="3" color="red" id="timedur"></font>&nbsp;ms
				</div>
				
				
				<div class="panel-heading">Flock计算结果</div>
				<div class="panel-body" style="border: 1px solid">
					<select class="form-control" id="flockresult">
						<option>--模式结果--</option>
						
					</select>
				</div>
			</div>

		</div>
	
</body>
</html>