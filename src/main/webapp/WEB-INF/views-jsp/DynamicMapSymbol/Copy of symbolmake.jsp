<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html>
<head>
<title>符号制作子系统</title>
<!-- jquery -->
<script src="/scnu/resources/ui-lib/jquery1x/jquery.min.js"
	type="text/javascript"></script>


	
<!-- bootstrap -->
<link href="/scnu/resources/ui-lib/bootstrap/css/bootstrap.css"
	type="text/css" rel="stylesheet" />
<script src="/scnu/resources/ui-lib/bootstrap/js/bootstrap.min.js"
	type="text/javascript"></script>

<!-- colorpicker -->
<script type="text/javascript" src="/scnu/resources/ui-lib/colorpicker/js/colorpicker.js"></script>
<script type="text/javascript" src="/scnu/resources/ui-lib/colorpicker/js/eye.js"></script>
<script type="text/javascript" src="/scnu/resources/ui-lib/colorpicker/js/utils.js"></script>
<script type="text/javascript" src="/scnu/resources/ui-lib/colorpicker/js/layout.js?ver=1.0.2"></script>
<link rel="stylesheet" href="/scnu/resources/ui-lib/colorpicker/css/colorpicker.css" type="text/css" />
<link rel="stylesheet" media="screen" type="text/css" href="/scnu/resources/ui-lib/colorpicker/css/layout.css" />

<script type="text/javascript" src="/scnu/resources/ui-lib/reveal/jquery.reveal.js"></script>
<link rel="stylesheet" href="/scnu/resources/ui-lib/ui-lib/reveal/reveal.css" type="text/css" />


<script type="text/javascript" src="/scnu/resources/js/dynamic/shapemake.js"></script>


<style type="text/css">

.borderframe{
	border:2px solid blue;
	height:120px;
}
.shapeselected{
	border:2px solid red;
}
.row{ margin-left:0px;}

.center{ 
margin-right: auto;
margin-left: auto;
background:#f00;
vertical-align:middle;
}
.title
{
color:red;
font-size:16px;
padding:10px 0;
font-family:"Microsoft Yahei";
}
.colorpicker input{height:15px;}
.clear{padding:5px;}
.preview{
padding:10px;border:1px solid #000;-moz-box-shadow:3px 3px 4px #000;-webkit-box-shadow:3px 3px 4px #000;box-shadow:3px 3px 4px #000;background:#fff;filter:progid:DXImageTransform.Microsoft.Shadow(Strength=4,Direction=135,Color='#000000');
}
</style>

<script language=JavaScript>
$(function(){

	$("#rect_stroke, #rect_fill,#rect_stroke_from,#rect_stroke_to").ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			$(el).val("#"+hex);
			$(el).css("color","#"+hex);
			$(el).ColorPickerHide();
		},
		onBeforeShow: function () {
			$(this).ColorPickerSetColor(this.value);
		}
	})
	.bind('keyup', function(){
		$(this).ColorPickerSetColor(this.value);
	});
   
});	
function selected(type,thisobj){
	
	$("table td").each(function(){
	    if($(this).hasClass("shapeselected")){
	    	$(this).removeClass("shapeselected")
	    }
	  });
	if( !($(thisobj).parent().hasClass("shapeselected"))){
		$(thisobj).parent().addClass("shapeselected");
		$("#currenttext").html(type);
	}
	
	$("#parameters").css("display","block");
	
	$("#parameters div").each(function(){
		 
		 if($(this).attr("id")===type){
			 $(this).css("display","block");
		 }else{
			 $(this).css("display","none");
		 }
	  });
	

}
	
</script>

</head>
<body>
<!-- 预览 -->
<div class="row " style="">

<!-- 地图符号库面板 -->
  <div class="col-md-6 preview"  style="border:0px solid blue;">
  	 <div class="row " style="height:400px;" >

	<!-- insert svg code -->
<svg style="border:1px dashed red;" id="previewSVG" width="500" height="400"  viewBox="0 0 500 400"
     xmlns="http://www.w3.org/2000/svg" version="1.1">
  

</svg>


  	 </div>
  	 <hr style="border:1px dotted #036" />
  	 <div class="row" style="">
  	 <p style="text-align:center;font-family:'Microsoft Yahei';font-size:14px;font-weight:bold;">基本图元选择&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前选中：<font color="red" id="currenttext"></font></p>

			<table  id="shapelist" border="1" style="width:400px;text-align:center;margin:auto;">
				<tr style="height:100px;">
					<td >
						<img src="<%=request.getContextPath()%>/resources/shapeimages/rect.png" onclick="selected('rect',this)" width="100" height="80"/>
					</td>
					<td><img src="<%=request.getContextPath()%>/resources/shapeimages/round.png "  onclick="selected('round',this)" width="100" height="80"/></td>
					<td><img src="<%=request.getContextPath()%>/resources/shapeimages/ellipse.png"  onclick="selected('ellipse',this)" width="100" height="80"/></td>
				</tr>
				<tr style="height:30px">
					<td>矩形</td>
					<td>圆形</td>
					<td>椭圆</td>
				</tr>
				<tr style="height:100px">
					<td><img src="<%=request.getContextPath()%>/resources/shapeimages/path.png" onclick="selected('path',this)" width="100" height="80"/></td>
					<td><img src="<%=request.getContextPath()%>/resources/shapeimages/curve.png" onclick="selected('curve',this)" width="100" height="80"/></td>
					<td><img src="<%=request.getContextPath()%>/resources/shapeimages/polygon.png" onclick="selected('polygon',this)" width="100" height="80"/></td>
				</tr>
				<tr style="height:30px">
					<td>曲线</td>
					<td>弧形</td>
					<td>多边形</td>
				</tr>
			</table>
  	 </div>
  </div>
  
  <div id="parameters" class="col-md-6" style="border:0px solid blue;display:none;">
  	 <div id="rect" style="text-align:left;">
		 		<p class="title">基本属性</p>
		 		起点x坐标: <input id="rectX" style="width:80px;" type="number" value="0"/> 起点y坐标: <input id="rectY" style="width:80px;" type="number" value="0" />
		 		宽度: <input id="rectW" style="width:80px;" type="number" value="50" /> 高度: <input id="rectH" style="width:80px;" type="number" value="80" /> <p class="clear"></p>
		 		圆角rx: <input id="rectRx" style="width:80px;" type="number" value="10" /> 圆角ry: <input id="rectRy" style="width:80px;" type="number" value="10" /> <p class="clear"></p>
		 		
		 		描边颜色:<input  value="#ff002b" style="width:120px;" maxlength="6" size="6" type="text" id="rect_stroke"/>&nbsp;描边线宽:<input id="rect_strokeW" style="width:90px;" type="text" value="2" /> 填充色:<input id="rect_fill" style="width:90px;" type="text" value="#e021e0" /> 
		 		<p class="title">动态属性</p>
		 		<font style="font-weight:bold;">颜色渐变</font><p class="clear"></p>
		 		描边色渐变：&nbsp;from <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_stroke_from"/> to <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_stroke_to"/>
		 		duration:<input value="2" id="rect_strokeDurs" style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p>
		 		填充色渐变：&nbsp;from <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_fill_from"/> to <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_fill_to"/>
		 		duration:<input value="3" id="rect_fillDurs" style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p>
		 		<font style="font-weight:bold;">位置渐变</font><p class="clear"></p>
		 		路径渐变：<p class="clear"></p>
		 		路径序列：<input style="width:320px;"  value="M0 0 ,L150 0,L50 100Z" type="text" id="rect_path"/> duration:<input id="rect_pathDurs" style="width:50px;" maxlength="6" size="3" type="text" value="3" />&nbsp;s<p class="clear"></p>
		 		旋转渐变：<p class="clear"></p>
		 		旋转中心点x坐标 :<input value="50" style="width:50px;"  id="rect_rotateCenterX" type="text" /> 旋转中心点y坐标 :<input value="200" id="rect_rotateCenterY" style="width:50px;"  type="text" /> 旋转角:<input id="rect_rotateAngel" value="90" style="width:50px;"  type="text" /><p class="clear"></p>
		 		duration:<input value="5" id="rect_rotateDurs" style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				&nbsp;&nbsp;loop:<select id="rect_rotateloop">
					<option value="repeat">循环</option>
					<option value="round">来回</option>
				</select><p class="clear"></p>
				缩放渐变：<p class="clear"></p>
				x轴缩放比例:<input id="rect_scaleX" value="0.5" style="width:100px;" type="text"/> 
				y轴缩放比例:<input id="rect_scaleY" value="0.5" style="width:100px;" type="text"/> 
				duration:<input id="rect_scaleDurs" value="3" style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				
				<br><br>
		
				<button type="button" onclick="rectMake()" class="btn btn-info">预览</button>  <button style="margin-left:20px;" type="button" class="btn btn-warning ">查看xml文本</button>
			
		 		
		 	</div>
		 	
		 	<div id="round" style="text-align:left;">
		 	<p class="title">基本属性</p>
		 		圆心x坐标: <input style="width:80px;" type="number" value="0"/> 圆心y坐标: <input style="width:80px;" type="number" value="0" />
		 		半径: <input style="width:80px;" type="number" value="0"/> 
		 	 <p class="clear"></p>
		 		
		 		描边颜色:<input style="width:120px;" maxlength="6" size="6" type="text" id="rect_stoke"/>&nbsp;描边线宽:<input style="width:90px;" type="text" /> 填充色:<input id="rect_fill" style="width:90px;" type="text" /> 
		 		<p class="title">动态属性</p>
		 		<font style="font-weight:bold;">颜色渐变</font><p class="clear"></p>
		 		描边色渐变：&nbsp;from <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_stoke_from"/> to <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_stoke_to"/>
		 		duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p>
		 		填充色渐变：&nbsp;from <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_fill_from"/> to <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_fill_to"/>
		 		duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p>
		 		<font style="font-weight:bold;">位置渐变</font><p class="clear"></p>
		 		路径渐变：<p class="clear"></p>
		 		路径序列：<input style="width:320px;"  type="text" id="rect_loc_from"/> duration:<input style="width:50px;" maxlength="6" size="3" type="text" id="rect_loc_to"/>&nbsp;s<p class="clear"></p>
		 		旋转渐变：<p class="clear"></p>
		 		旋转中心点x坐标 :<input style="width:50px;"  type="text" /> 旋转中心点y坐标 :<input style="width:50px;"  type="text" /> 旋转角:<input style="width:50px;"  type="text" /><p class="clear"></p>
		 		duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				&nbsp;&nbsp;loop:<select>
					<option value="volvo">循环</option>
					<option value="saab">来回</option>
				</select><p class="clear"></p>
				缩放渐变：<p class="clear"></p>
				x轴缩放比例:<input style="width:100px;" type="text"/> 
				y轴缩放比例:<input style="width:100px;" type="text"/> 
				duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				
				<br><br>
				<button type="button" class="btn btn-info">预览</button>  <button style="margin-left:20px;" type="button" class="btn btn-warning">查看xml文本</button>
		 		
		 	</div>
		 	
		 	<div id="ellipse" style="text-align:left;">
		 	<p class="title">基本属性</p>
		 		椭圆中心x坐标: <input style="width:80px;" type="number" value="0"/> 椭圆中心y坐标: <input style="width:80px;" type="number" value="0" />
		 		<p class="clear"></p>
		 		x半轴长度: <input style="width:80px;" type="number" value="0" /> y半轴长度: <input style="width:80px;" type="number" value="0" /> <p class="clear"></p>

		 		
		 		描边颜色:<input style="width:120px;" maxlength="6" size="6" type="text" id="rect_stoke"/>&nbsp;描边线宽:<input style="width:90px;" type="text" /> 填充色:<input id="rect_fill" style="width:90px;" type="text" /> 
		 		<p class="title">动态属性</p>
		 		<font style="font-weight:bold;">颜色渐变</font><p class="clear"></p>
		 		描边色渐变：&nbsp;from <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_stoke_from"/> to <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_stoke_to"/>
		 		duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p>
		 		填充色渐变：&nbsp;from <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_fill_from"/> to <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_fill_to"/>
		 		duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p>
		 		<font style="font-weight:bold;">位置渐变</font><p class="clear"></p>
		 		路径渐变：<p class="clear"></p>
		 		路径序列：<input style="width:320px;"  type="text" id="rect_loc_from"/> duration:<input style="width:50px;" maxlength="6" size="3" type="text" id="rect_loc_to"/>&nbsp;s<p class="clear"></p>
		 		旋转渐变：<p class="clear"></p>
		 		旋转中心点x坐标 :<input style="width:50px;"  type="text" /> 旋转中心点y坐标 :<input style="width:50px;"  type="text" /> 旋转角:<input style="width:50px;"  type="text" /><p class="clear"></p>
		 		duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				&nbsp;&nbsp;loop:<select>
					<option value="volvo">循环</option>
					<option value="saab">来回</option>
				</select><p class="clear"></p>
				缩放渐变：<p class="clear"></p>
				x轴缩放比例:<input style="width:100px;" type="text"/> 
				y轴缩放比例:<input style="width:100px;" type="text"/> 
				duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				
				<br><br>
				<button type="button" class="btn btn-info">预览</button>  <button style="margin-left:20px;" type="button" class="btn btn-warning">查看xml文本</button>
		 		
		 	</div>
		 	
		 	<div id="path" style="text-align:left;">
		 	<p class="title">基本属性</p>
		 		顶点集: <input style="width:380px;" type="text" placeholder="例如：24 64,35 61,73 28"/> 
		 		 <p class="clear"></p>
		 		
		 		描边颜色:<input style="width:120px;" maxlength="6" size="6" type="text" id="rect_stoke"/>&nbsp;描边线宽:<input style="width:90px;" type="text" />  
		 		<p class="title">动态属性</p>
		 		<font style="font-weight:bold;">颜色渐变</font><p class="clear"></p>
		 		描边色渐变：&nbsp;from <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_stoke_from"/> to <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_stoke_to"/>
		 		duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p>
		 		
		 		
		 		<font style="font-weight:bold;">位置渐变</font><p class="clear"></p>
		 		路径渐变：<p class="clear"></p>
		 		路径序列：<input style="width:320px;"  type="text" id="rect_loc_from"/> duration:<input style="width:50px;" maxlength="6" size="3" type="text" id="rect_loc_to"/>&nbsp;s<p class="clear"></p>
		 		旋转渐变：<p class="clear"></p>
		 		旋转中心点x坐标 :<input style="width:50px;"  type="text" /> 旋转中心点y坐标 :<input style="width:50px;"  type="text" /> 旋转角:<input style="width:50px;"  type="text" /><p class="clear"></p>
		 		duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				&nbsp;&nbsp;loop:<select>
					<option value="volvo">循环</option>
					<option value="saab">来回</option>
				</select><p class="clear"></p>
				缩放渐变：<p class="clear"></p>
				x轴缩放比例:<input style="width:100px;" type="text"/> 
				y轴缩放比例:<input style="width:100px;" type="text"/> 
				duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				
				<br><br>
				<button type="button" class="btn btn-info">预览</button>  <button style="margin-left:20px;" type="button" class="btn btn-warning">查看xml文本</button>
		 		
		 	</div>
		 	
		 	<div id="curve" style="text-align:left;">
		 	<p class="title">基本属性</p>
		 		起点x坐标: <input style="width:50px;" type="number" value="0" /> 起点y坐标: <input style="width:50px;" type="number" value="0" /> 
		 		
		 		终点x坐标: <input style="width:50px;" type="number" value="0" /> 终点y坐标: <input style="width:50px;" type="number" value="0" /> 
		 		<p class="clear"></p>
		 		弧半长轴长度rx: <input style="width:80px;" type="number" value="0" /> 弧半短轴长度ry: <input style="width:80px;" type="number" value="0" /> <p class="clear"></p>
		 		x-axis-rotation:<input style="width:80px;" type="number" value="0" /> 
		 		large-arc-flag:<select>
					<option value="volvo">大角度弧线</option>
					<option value="saab">小角度弧线</option>
				</select><p class="clear"></p>
		 		描边颜色:<input style="width:120px;" maxlength="6" size="6" type="text" id="rect_stoke"/>&nbsp;描边线宽:<input style="width:90px;" type="text" /> 填充色:<input id="rect_fill" style="width:90px;" type="text" /> 
		 		<p class="title">动态属性</p>
		 		<font style="font-weight:bold;">颜色渐变</font><p class="clear"></p>
		 		描边色渐变：&nbsp;from <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_stoke_from"/> to <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_stoke_to"/>
		 		duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p>
		 		填充色渐变：&nbsp;from <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_fill_from"/> to <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_fill_to"/>
		 		duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p>
		 		<font style="font-weight:bold;">位置渐变</font><p class="clear"></p>
		 		路径渐变：<p class="clear"></p>
		 		路径序列：<input style="width:320px;"  type="text" id="rect_loc_from"/> duration:<input style="width:50px;" maxlength="6" size="3" type="text" id="rect_loc_to"/>&nbsp;s<p class="clear"></p>
		 		旋转渐变：<p class="clear"></p>
		 		旋转中心点x坐标 :<input style="width:50px;"  type="text" /> 旋转中心点y坐标 :<input style="width:50px;"  type="text" /> 旋转角:<input style="width:50px;"  type="text" /><p class="clear"></p>
		 		duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				&nbsp;&nbsp;loop:<select>
					<option value="volvo">循环</option>
					<option value="saab">来回</option>
				</select><p class="clear"></p>
				缩放渐变：<p class="clear"></p>
				x轴缩放比例:<input style="width:100px;" type="text"/> 
				y轴缩放比例:<input style="width:100px;" type="text"/> 
				duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				
				<br><br>
				<button type="button" class="btn btn-info">预览</button>  <button style="margin-left:20px;" type="button" class="btn btn-warning">查看xml文本</button>
		 		
		 	</div>
		 	
		 	<div id="polygon" style="text-align:left;">
		 	<p class="title">基本属性</p>
		 		封闭顶点集: <input style="width:380px;" type="text" /> 
		 		 <p class="clear"></p>
		 		
		 		描边颜色:<input style="width:120px;" maxlength="6" size="6" type="text" id="rect_stoke"/>&nbsp;描边线宽:<input style="width:90px;" type="text" /> 填充色:<input id="rect_fill" style="width:90px;" type="text" /> 
		 		<p class="title">动态属性</p>
		 		<font style="font-weight:bold;">颜色渐变</font><p class="clear"></p>
		 		描边色渐变：&nbsp;from <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_stoke_from"/> to <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_stoke_to"/>
		 		duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p>
		 		填充色渐变：&nbsp;from <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_fill_from"/> to <input style="width:120px;" maxlength="6" size="6" type="text" id="rect_fill_to"/>
		 		duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p>
		 		<font style="font-weight:bold;">位置渐变</font><p class="clear"></p>
		 		路径渐变：<p class="clear"></p>
		 		路径序列：<input style="width:320px;"  type="text" id="rect_loc_from"/> duration:<input style="width:50px;" maxlength="6" size="3" type="text" id="rect_loc_to"/>&nbsp;s<p class="clear"></p>
		 		旋转渐变：<p class="clear"></p>
		 		旋转中心点x坐标 :<input style="width:50px;"  type="text" /> 旋转中心点y坐标 :<input style="width:50px;"  type="text" /> 旋转角:<input style="width:50px;"  type="text" /><p class="clear"></p>
		 		duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				&nbsp;&nbsp;loop:<select>
					<option value="volvo">循环</option>
					<option value="saab">来回</option>
				</select><p class="clear"></p>
				缩放渐变：<p class="clear"></p>
				x轴缩放比例:<input style="width:100px;" type="text"/> 
				y轴缩放比例:<input style="width:100px;" type="text"/> 
				duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				
				<br><br>
				<button type="button" class="btn btn-info">预览</button>  <button style="margin-left:20px;" type="button" class="btn btn-warning">查看xml文本</button>
		 		
		 	</div>
  </div>
</div>

<!-- 
<div class="row">

  <div class="col-md-6" style="border:2px solid blue;height:300px;">

	<p>基本图元选择&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前选中：<font color="red" id="currenttext"></font></p>

			<table  id="shapelist" border="1" width="400px;">
				<tr style="height:100px;">
					<td >
						<img src="<%=request.getContextPath()%>/resources/shapeimages/rect.png" onclick="selected('rect',this)" width="100" height="80"/>
					</td>
					<td><img src="<%=request.getContextPath()%>/resources/shapeimages/round.png "  onclick="selected('round',this)" width="100" height="80"/></td>
					<td><img src="<%=request.getContextPath()%>/resources/shapeimages/ellipse.png"  onclick="selected('ellipse',this)" width="100" height="80"/></td>
				</tr>
				<tr style="height:30px">
					<td>矩形</td>
					<td>圆形</td>
					<td>椭圆</td>
				</tr>
				<tr style="height:100px">
					<td><img src="<%=request.getContextPath()%>/resources/shapeimages/path.png" onclick="selected('path',this)" width="100" height="80"/></td>
					<td><img src="<%=request.getContextPath()%>/resources/shapeimages/curve.png" onclick="selected('curve',this)" width="100" height="80"/></td>
					<td><img src="<%=request.getContextPath()%>/resources/shapeimages/polygon.png" onclick="selected('polygon',this)" width="100" height="80"/></td>
				</tr>
				<tr style="height:30px">
					<td>曲线</td>
					<td>弧形</td>
					<td>多边形</td>
				</tr>
			</table>


		</div>
		 <div id="parameters" class="col-md-6" style="border:2px solid blue;height:300px;display:none;">
		 	
		 	<div id="rect" style="text-align:left;">
		 		<p >基本属性：</p>
		 		起点x坐标: <input style="width:80px;" type="number" value="0"/> 起点y坐标: <input style="width:80px;" type="number" value="0" />
		 		宽度: <input style="width:80px;" type="number" value="0" /> 高度: <input style="width:80px;" type="number" value="0" /> <br><br>
		 		圆角rx: <input style="width:80px;" type="number" value="0" /> 圆角ry: <input style="width:80px;" type="number" value="0" /> <br>
		 		
		 		描边颜色:<input style="width:120px;" maxlength="6" size="6" type="text" id="rect_stoke"/>&nbsp;描边线宽:<input style="width:90px;" type="text" /> 填充色:<input id="rect_fill" style="width:90px;" type="text" /> 
		 		<p>动态属性</p>
		 		颜色渐变：
		 		
		 	</div>
		 	
		 	<div id="round">圆形配置</div>
		 	
		 	<div id="ellipse">椭圆形配置</div>
		 	
		 	<div id="path">路径配置</div>
		 	
		 	<div id="curve">弧线配置</div>
		 	
		 	<div id="polygon">多边形配置</div>
		 	
		 </div>
		
		
		配置 -->

</body>
</html>