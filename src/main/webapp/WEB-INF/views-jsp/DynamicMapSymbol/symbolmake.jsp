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

<script type="text/javascript" src="/scnu/resources/ui-lib/qtip/js/jquery.qtip.js"></script>
<link rel="stylesheet" href="/scnu/resources/ui-lib/qtip/css/jquery.qtip.css" type="text/css" />

<script type="text/javascript" src="/scnu/resources/js/dynamic/shapemake.js"></script>
<script type="text/javascript" src="/scnu/resources/js/dynamic/operation.js"></script>

<style type="text/css">
hr{margin-top:2px;margin-bottom:2px;}
.borderframe{
	border:2px solid blue;
	height:120px;
}
.shapeselected{
	border:2px solid red;
}
.row{ margin-left:0px;}
#shapelist img{width:90;height:70;}
.center{ 
margin-right: auto;
margin-left: auto;
backgcircle:#f00;
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
padding:10px;border:1px solid #000;-moz-box-shadow:3px 3px 4px #000;-webkit-box-shadow:3px 3px 4px #000;box-shadow:3px 3px 4px #000;backgcircle:#fff;filter:progid:DXImageTransform.Microsoft.Shadow(Strength=4,Direction=135,Color='#000000');
}
</style>

<script language=JavaScript>
$(function(){
	
	$('.colorpick').each(function(){
	
	    $(this).css("color",$(this).attr("value"));

	  });
	
	$("#rect_stroke, #rect_fill,#rect_stroke_from,#rect_stroke_to,#rect_fill_from,#rect_fill_to,"+
	 "#circle_stroke, #circle_fill,#circle_stroke_from,#circle_stroke_to,#circle_fill_from,#circle_fill_to,"+
	 "#ellipse_stroke, #ellipse_fill,#ellipse_stroke_from,#ellipse_stroke_to,#ellipse_fill_from,#ellipse_fill_to,"+
	 "#path_stroke,#path_fill,#path_stroke_from,#path_stroke_to,"+
	 "#curve_stroke, #curve_fill,#curve_stroke_from,#curve_stroke_to,#curve_fill_from,#curve_fill_to,"+
	 "#polygon_stroke, #polygon_fill,#polygon_stroke_from,#poly_stroke_to,#polygon_fill_from,#polygon_fill_to").ColorPicker({
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
<div class="row"  id="symbolmakePage" style="">

<!-- 地图符号库面板 -->
  <div class="col-md-6 preview"  style="border:0px solid blue;">
  	 <div class="row "  id="preview" style="height:400px;" >

<svg style="border:1px dashed red;" id="previewSVG" width="500" height="400"  viewBox="0 0 500 400"
     xmlns="http://www.w3.org/2000/svg" version="1.1"></svg>


  	 </div>
  	 <hr style="border:1px dotted #036" />
  	 <div class="row" style="">
  	 <p style="text-align:center;font-family:'Microsoft Yahei';font-size:14px;font-weight:bold;">基本图元选择&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前选中：<font color="red" id="currenttext"></font> 
  	 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  	 <button type="button" onclick="save()" class="btn btn-info">保存并下载</button> 
  
  	 </p>

			<table  id="shapelist" border="1" style="width:400px;text-align:center;margin:auto;">
				<tr style="height:60px;">
					<td >
						<img src="<%=request.getContextPath()%>/resources/shapeimages/rect.png" onclick="selected('rect',this)" />
					</td>
					<td><img src="<%=request.getContextPath()%>/resources/shapeimages/circle.png "  onclick="selected('circle',this)"/></td>
					<td><img src="<%=request.getContextPath()%>/resources/shapeimages/ellipse.png"  onclick="selected('ellipse',this)" /></td>
	
					<td><img src="<%=request.getContextPath()%>/resources/shapeimages/path.png" onclick="selected('path',this)" /></td>
					<td><img src="<%=request.getContextPath()%>/resources/shapeimages/curve.png" onclick="selected('curve',this)" /></td>
					<td><img src="<%=request.getContextPath()%>/resources/shapeimages/polygon.png" onclick="selected('polygon',this)" /></td>
			
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
		 		
		 		描边颜色:<input  value="#ff002b" class="colorpick" style="width:120px;" maxlength="6" size="6" type="text" id="rect_stroke"/>&nbsp;描边线宽:<input id="rect_strokeW" style="width:90px;" type="text" value="2" /> 填充色:<input class="colorpick" id="rect_fill" style="width:90px;" type="text" value="#e021e0" /> 
		 		<p class="title">动态属性</p>
		 		<font style="font-weight:bold;">颜色渐变</font><p class="clear"></p>
		 		描边色渐变：&nbsp;from <input class="colorpick" style="width:120px;" maxlength="6" size="6" type="text" id="rect_stroke_from" value="#de2ade"/> to <input class="colorpick" value="#1f35c2" style="width:120px;" maxlength="6" size="6" type="text" id="rect_stroke_to"/>
		 		duration:<input value="2" id="rect_strokeDurs" style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p>
		 		填充色渐变：&nbsp;from <input class="colorpick" style="width:120px;" maxlength="6" size="6" type="text" value="#fa1231" id="rect_fill_from"/> to <input class="colorpick" value="#19f505" style="width:120px;" maxlength="6" size="6" type="text" id="rect_fill_to"/>
		 		duration:<input value="3" id="rect_fillDurs" style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p>
		 		<font style="font-weight:bold;">位置渐变</font><p class="clear"></p>
		 		路径渐变：<p class="clear"></p>
		 		路径序列：<input style="width:320px;"  value="M0 0 ,L150 0,L50 100Z" type="text" id="rect_path"/> duration:<input id="rect_pathDurs" style="width:50px;" maxlength="6" size="3" type="text" value="3" />&nbsp;s<p class="clear"></p>
		 		<font style="font-weight:bold;">旋转渐变</font><p class="clear"></p>
		 		旋转中心点x坐标 :<input value="50" style="width:50px;"  id="rect_rotateCenterX" type="text" /> 旋转中心点y坐标 :<input value="200" id="rect_rotateCenterY" style="width:50px;"  type="text" /> 旋转角:<input id="rect_rotateAngel" value="90" style="width:50px;"  type="text" /><p class="clear"></p>
		 		duration:<input value="5" id="rect_rotateDurs" style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				&nbsp;&nbsp;loop:<select id="rect_rotateloop">
					<option value="repeat">循环</option>
					<option value="circle">来回</option>
				</select><p class="clear"></p>
				缩放渐变：<p class="clear"></p>
				x轴缩放比例:<input id="rect_scaleX" value="0.5" style="width:100px;" type="text"/> 
				y轴缩放比例:<input id="rect_scaleY" value="0.5" style="width:100px;" type="text"/> 
				duration:<input id="rect_scaleDurs" value="3" style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				
				<br><br>
		
				<button type="button" onclick="rectMake()" class="btn btn-info">预览</button>  <button style="margin-left:20px;" type="button" class="btn btn-warning ">查看xml文本</button>
			
		 		
		 	</div>
		 	
		 	<div id="circle" style="text-align:left;">
		 	<p class="title">基本属性</p>
		 		圆心x坐标: <input id="circleX" style="width:80px;" type="number" value="250"/> 圆心y坐标: <input id="circleY" style="width:80px;" type="number" value="200" />
		 		半径: <input id="circleR" style="width:80px;" type="number" value="50"/> 
		 	 <p class="clear"></p>
		 		
		 		描边颜色:<input class="colorpick" id="circle_stroke"  value="#1039de" style="width:120px;" maxlength="6" size="6" type="text" />&nbsp;描边线宽:<input  id="circle_strokeW" value="4" style="width:90px;" type="text" /> 填充色:<input class="colorpick" value="#e01de0" id="circle_fill" style="width:90px;" type="text" /> 
		 		<p class="title">动态属性</p>
		 		<font style="font-weight:bold;">颜色渐变</font><p class="clear"></p>
		 		描边色渐变：&nbsp;from <input  class="colorpick" style="width:120px;" maxlength="6" size="6" type="text" id="circle_stroke_from"/> to <input class="colorpick" style="width:120px;" maxlength="6" size="6" type="text" id="circle_stroke_to"/>
		 		duration:<input id="circle_strokeDurs" style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p>
		 		填充色渐变：&nbsp;from <input   class="colorpick" style="width:120px;" maxlength="6" size="6" type="text" id="circle_fill_from"/> to <input class="colorpick" style="width:120px;" maxlength="6" size="6" type="text" id="circle_fill_to"/>
		 		duration:<input id="circle_fillDurs" style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p> 
		 		<font style="font-weight:bold;">位置渐变</font><p class="clear"></p>
		 		路径渐变：<p class="clear"></p>
		 		路径序列：<input style="width:320px;"  type="text" id="circle_path"/> duration:<input id="circle_pathDurs" style="width:50px;" maxlength="6" size="3" type="text" id="rect_loc_to"/>&nbsp;s<p class="clear"></p>
		 		<font style="font-weight:bold;">旋转渐变：</font><p class="clear"></p>
		 		旋转中心点x坐标 :<input id="circle_rotateCenterX" style="width:50px;"  type="text" /> 旋转中心点y坐标 :<input id="circle_rotateCenterY" style="width:50px;"  type="text" /> 旋转角:<input id="circle_rotateAngel" style="width:50px;"  type="text" /><p class="clear"></p>
		 		duration:<input id="circle_rotateDurs"  style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				&nbsp;&nbsp;loop:<select id="circle_rotateloop" >
					<option value="round">循环</option>
					<option value="repeat">来回</option>
				</select><p class="clear"></p>
				缩放渐变：<p class="clear"></p>
				x轴缩放比例:<input id="circle_scaleX" style="width:100px;" type="text"/> 
				y轴缩放比例:<input id="circle_scaleY" style="width:100px;" type="text"/> 
				duration:<input id="circle_scaleDurs" style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				
				<br><br>
				<button type="button" onclick="circleMake()" class="btn btn-info">预览</button>  <button style="margin-left:20px;" type="button" class="btn btn-warning">查看xml文本</button>
		 		
		 	</div>
		 	
		 	<div id="ellipse" style="text-align:left;">
		 	<p class="title">基本属性</p>
		 		椭圆中心x坐标: <input id="ellipsecenterX" style="width:80px;" type="number" value="250"/> 椭圆中心y坐标: <input id="ellipsecenterY" style="width:80px;" type="number" value="200" />
		 		<p class="clear"></p>
		 		x半轴长度: <input id="ellipsesemiAxisX" style="width:80px;" type="number" value="50" /> y半轴长度: <input id="ellipsesemiAxisY" style="width:80px;" type="number" value="60" /> <p class="clear"></p>

		 		
		 		描边颜色:<input id="ellipse_stroke" style="width:120px;" maxlength="6" size="6" type="text" />&nbsp;描边线宽:<input id="ellipse_strokeW" style="width:90px;" type="text" /> 填充色:<input id="ellipse_fill" style="width:90px;" type="text" /> 
		 		<p class="title">动态属性</p>
		 		<font style="font-weight:bold;">颜色渐变</font><p class="clear"></p>
		 		描边色渐变：&nbsp;from <input style="width:120px;" maxlength="6" size="6" type="text" id="ellipse_stroke_from"/> to <input style="width:120px;" maxlength="6" size="6" type="text" id="ellipse_stroke_to"/>
		 		duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p>
		 		填充色渐变：&nbsp;from <input style="width:120px;" maxlength="6" size="6" type="text" id="ellipse_fill_from"/> to <input style="width:120px;" maxlength="6" size="6" type="text" id="ellipse_fill_to"/>
		 		duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p>
		 		<font style="font-weight:bold;">位置渐变</font><p class="clear"></p>
		 		路径渐变：<p class="clear"></p>
		 		路径序列：<input id="ellpise_path" style="width:320px;"  type="text" /> duration:<input style="width:50px;" maxlength="6" size="3" type="text" id="ellipse_pathDurs"/>&nbsp;s<p class="clear"></p>
		 		旋转渐变：<p class="clear"></p>
		 		旋转中心点x坐标 :<input id="ellipse_rotateCenterX" style="width:50px;"  type="text" /> 旋转中心点y坐标 :<input id="ellipse_rotateCenterY" style="width:50px;"  type="text" /> 旋转角:<input style="width:50px;"  type="text" /><p class="clear"></p>
		 		duration:<input id="ellipse_rotateDurs" style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				&nbsp;&nbsp;loop:<select>
					<option value="round">循环</option>
					<option value="repeat">来回</option>
				</select><p class="clear"></p>
				缩放渐变：<p class="clear"></p>
				x轴缩放比例:<input id="ellipse_scaleX" style="width:100px;" type="text"/> 
				y轴缩放比例:<input id="ellipse_scaleY" style="width:100px;" type="text"/> 
				duration:<input id="ellipse_scaleDurs"  style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				
				<br><br>
				<button onclick="ellipseMake()" type="button" class="btn btn-info">预览</button>  <button style="margin-left:20px;" type="button" class="btn btn-warning">查看xml文本</button>
		 		
		 	</div>
		 	
		 	<div id="path" style="text-align:left;">
		 	<p class="title">基本属性</p>
		 		顶点集: <input id="pathDescri" style="width:380px;" type="text" value="M153 334
C153 334 151 334 151 334
C151 339 153 344 156 344
C164 344 171 339 171 334
C171 322 164 314 156 314
C142 314 131 322 131 334
C131 350 142 364 156 364
C175 364 191 350 191 334
C191 311 175 294 156 294
C131 294 111 311 111 334
C111 361 131 384 156 384
C186 384 211 361 211 334
C211 300 186 274 156 274"  placeholder="例如：24 64,35 61,73 28"/> 
		 		 <p class="clear"></p>
		 		
		 		描边颜色:<input style="width:120px;" maxlength="6" size="6" type="text" id="path_stroke"/>&nbsp;描边线宽:<input id="path_strokeW" style="width:90px;" type="text" />  
		 		填充颜色:<input style="width:120px;" maxlength="6" size="6" type="text" id="path_fill"/>
		 		<p class="title">动态属性</p>
		 		<font style="font-weight:bold;">颜色渐变</font><p class="clear"></p>
		 		描边色渐变：&nbsp;from <input style="width:120px;" maxlength="6" size="6" type="text" id="path_stroke_from"/> to <input style="width:120px;" maxlength="6" size="6" type="text" id="path_stroke_to"/>
		 		duration:<input id="path_strokeDurs" style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p>
		 		
		 		
		 		<font style="font-weight:bold;">位置渐变</font><p class="clear"></p>
		 		路径渐变：<p class="clear"></p>
		 		路径序列：<input style="width:320px;"  type="text" id="path_path"/> duration:<input style="width:50px;" maxlength="6" size="3" type="text" id="path_pathDurs"/>&nbsp;s<p class="clear"></p>
		 		旋转渐变：<p class="clear"></p>
		 		旋转中心点x坐标 :<input id="path_rotateCenterX" style="width:50px;"  type="text" /> 旋转中心点y坐标 :<input id="path_rotateCenterY" style="width:50px;"  type="text" /> 旋转角:<input id="path_rotateAngel"　style="width:50px;"  type="text" /><p class="clear"></p>
		 		duration:<input　id="path_rotateDurs"  style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				&nbsp;&nbsp;loop:<select>
					<option value="round">循环</option>
					<option value="repeat">来回</option>
				</select><p class="clear"></p>
				缩放渐变：<p class="clear"></p>
				x轴缩放比例:<input id="path_scaleX"  style="width:100px;" type="text"/> 
				y轴缩放比例:<input id="path_scaleY" style="width:100px;" type="text"/> 
				duration:<input id="path_scaleDurs"　style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				
				<br><br>
				<button onclick="pathMake()" type="button" class="btn btn-info">预览</button>  <button style="margin-left:20px;" type="button" class="btn btn-warning">查看xml文本</button>
		 		
		 	</div>
		 	
		 	<div id="curve" style="text-align:left;">
		 	<p class="title">基本属性</p>
		 		起点x坐标: <input id="curve_startX" style="width:50px;" type="number" value="200" /> 起点y坐标: <input  id="curve_startY"  style="width:50px;" type="number" value="40" /> 
		 		
		 		终点x坐标: <input id="curve_endX"  style="width:50px;" type="number" value="32" /> 终点y坐标: <input  id="curve_endY"  style="width:50px;" type="number" value="34" /> 
		 		<p class="clear"></p>
		 		弧半长轴长度rx: <input  id="curve_semiAxisX" style="width:80px;" type="number" value="16" /> 
		 		弧半短轴长度ry: <input id="curve_semiAxisY" style="width:80px;" type="number" value="12" /> <p class="clear"></p>
		 		x-axis-rotation:<input id="curve_xAxisRotation" style="width:80px;" type="number" value="0" /> 
		 		large-arc-flag:<select id="curve_largeArcFlag" >
					<option value="1">大角度弧线</option>
					<option value="0">小角度弧线</option>
				</select>
				sweep-flag:<select id="curve_sweepFlag" >
					<option value="1">顺时针</option>
					<option value="0">逆时针</option>
				</select>
				
				<p class="clear"></p>
		 		描边颜色:<input id="curve_stroke"　style="width:120px;" maxlength="6" size="6" type="text" />&nbsp;描边线宽:<input id="curve_strokeW" style="width:90px;" type="text" /> 填充色:<input id="curve_fill" style="width:90px;" type="text" /> 
		 		<p class="title">动态属性</p>
		 		<font style="font-weight:bold;">颜色渐变</font><p class="clear"></p>
		 		描边色渐变：&nbsp;from <input style="width:120px;" maxlength="6" size="6" type="text" id="curve_stroke_from"/> to <input style="width:120px;" maxlength="6" size="6" type="text" id="curve_stroke_to"/>
		 		duration:<input id="curve_strokeDurs" style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p>
		 		填充色渐变：&nbsp;from <input style="width:120px;" maxlength="6" size="6" type="text" id="curve_fill_from"/> to <input style="width:120px;" maxlength="6" size="6" type="text" id="curve_fill_to"/>
		 		duration:<input id="curve_fillDurs" style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p>
		 		<font style="font-weight:bold;">位置渐变</font><p class="clear"></p>
		 		路径渐变：<p class="clear"></p>
		 		路径序列：<input style="width:320px;"  type="text" id="curve_path"/> duration:<input style="width:50px;" maxlength="6" size="3" type="text" id="curve_pathDurs"/>&nbsp;s<p class="clear"></p>
		 		旋转渐变：<p class="clear"></p>
		 		旋转中心点x坐标 :<input id="curve_rotateCenterX" style="width:50px;"  type="text" /> 旋转中心点y坐标 :<input id="curve_rotateCenterY" style="width:50px;"  type="text" /> 旋转角:<input id="curve_rotateAngel" style="width:50px;"  type="text" /><p class="clear"></p>
		 		duration:<input id="curve_rotateDurs" style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				&nbsp;&nbsp;loop:<select id="curve_rotateloop" >
					<option value="round">循环</option>
					<option value="repeat">来回</option>
				</select><p class="clear"></p>
				缩放渐变：<p class="clear"></p>
				x轴缩放比例:<input id="curve_scaleX"　style="width:100px;" type="text"/> 
				y轴缩放比例:<input id="curve_scaleY" 　style="width:100px;" type="text"/> 
				duration:<input id="curve_scaleDurs" style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				
				<br><br>
				<button type="button" onclick="curveMake()"  class="btn btn-info">预览</button>  <button style="margin-left:20px;" type="button" class="btn btn-warning">查看xml文本</button>
		 		
		 	</div>
		 	
		 	<div id="polygon" style="text-align:left;">
		 	<p class="title">基本属性</p>
		 		封闭顶点集: <input id="polygonPoints" value="220,100 300,210 170,250 123,234" style="width:380px;" type="text" /> 
		 		 <p class="clear"></p>
		 		
		 		描边颜色:<input id="polygon_stroke" style="width:120px;" maxlength="6" size="6" type="text" />&nbsp;描边线宽:<input id="polygon_strokeW" style="width:90px;" type="text" /> 填充色:<input id="polygon_fill" style="width:90px;" type="text" /> 
		 		<p class="title">动态属性</p>
		 		<font style="font-weight:bold;">颜色渐变</font><p class="clear"></p>
		 		描边色渐变：&nbsp;from <input style="width:120px;" maxlength="6" size="6" type="text" id="polygon_stroke_from"/> to <input style="width:120px;" maxlength="6" size="6" type="text" id="polygon_stroke_to"/>
		 		duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p>
		 		填充色渐变：&nbsp;from <input style="width:120px;" maxlength="6" size="6" type="text" id="polygon_fill_from"/> to <input style="width:120px;" maxlength="6" size="6" type="text" id="polygon_fill_to"/>
		 		duration:<input style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s<p class="clear"></p>
		 		<font style="font-weight:bold;">位置渐变</font><p class="clear"></p>
		 		路径渐变：<p class="clear"></p>
		 		路径序列：<input id="polygon_path" style="width:320px;"  value="M0 0 ,L150 0,L50 100Z" type="text" /> duration:<input style="width:50px;" maxlength="6" size="3" type="text" id="polygon_pathDurs"/>&nbsp;s<p class="clear"></p>
		 		旋转渐变：<p class="clear"></p>
		 		旋转中心点x坐标 :<input id="polygon_rotateCenterX" style="width:50px;"  type="text" /> 旋转中心点y坐标 :<input id="polygon_rotateCenterY" style="width:50px;"  type="text" /> 旋转角:<input style="width:50px;"  type="text" /><p class="clear"></p>
		 		duration:<input id="polygon_rotateDurs" style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				&nbsp;&nbsp;loop:<select>
					<option value="round">循环</option>
					<option value="repeat">来回</option>
				</select><p class="clear"></p>
				缩放渐变：<p class="clear"></p>
				x轴缩放比例:<input id="polygon_scaleX" style="width:100px;" type="text"/> 
				y轴缩放比例:<input id="polygon_scaleY" style="width:100px;" type="text"/> 
				duration:<input id="polygon_scaleDurs"  style="width:50px;" maxlength="6" size="3" type="text"/>&nbsp;s
				
				<br><br>
				<button onclick="polygonMake()" type="button" class="btn btn-info">预览</button>  <button style="margin-left:20px;" type="button" class="btn btn-warning">查看xml文本</button>
		 		
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
					<td><img src="<%=request.getContextPath()%>/resources/shapeimages/circle.png "  onclick="selected('circle',this)" width="100" height="80"/></td>
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
		 	
		 	<div id="circle">圆形配置</div>
		 	
		 	<div id="ellipse">椭圆形配置</div>
		 	
		 	<div id="path">路径配置</div>
		 	
		 	<div id="curve">弧线配置</div>
		 	
		 	<div id="polygon">多边形配置</div>
		 	
		 </div>
		
		
		配置 -->

</body>
</html>