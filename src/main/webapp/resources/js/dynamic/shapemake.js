function rectMake() {
//	var dataname = $("#trajectorypath option:selected").val(); //选中的值
//	var path="";
//	for (var k in configdata){
//		configdata[k].name == dataname &&  (path = configdata[k].path) ;
//	}
//	var rectParams = {
//		"x" : document.getElementById("radius").value,
//		"y" : document.getElementById("minpoints").value,
//		"width" : document.getElementById("mintimeslice").value,
//		"height" : document.getElementById("timeinterval").value,
//		"rx": path,
//		"ry" : f,
//	};
	
	var rectParams = {
		"x" : $("#rectX").attr('value'),
		"y" :  $("#rectY").attr('value'),
		"width" : $("#rectW").attr('value'),
		"height" : $("#rectH").attr('value'),
		"rx":$("#rectRx").attr('value'),
		"ry":$("#rectRy").attr('value'),
		"style" : {
			"strokeColor" : $("#rect_stroke").attr('value'),
			"strokeWidth" : $("#rect_strokeW").attr('value'),
			"fillColor" : $("#rect_fill").attr('value'),
		},
		"dp" : {
			"strokeColorFrom" : $("#rect_stroke_from").attr('value'),
			"strokeColorTo" : $("#rect_stroke_to").attr('value'),
			"strokeColorDurations" : $("#rect_strokeDurs").attr('value'),
			"fillColorFrom" : $("#rect_fill_from").attr('value') ,
			"fillColorTo" : $("#rect_fill_to").attr('value'),
			"fillColorDurations" :  $("#rect_fillDurs").attr('value'),
			"path" : $("#rect_path").attr('value'),
			"pathDurations" : $("#rect_pathDurs").attr('value'),
			"rotateCenterX" : $("#rect_rotateCenterX").attr('value'),
			"rotateCenterY" : $("#rect_rotateCenterY").attr('value'),
			"rotateAngel" : $("#rect_rotateAngel").attr('value'),
			"rotateDurations" :$("#rect_rotateDurs").attr('value'),
			"loop":$("#rect_rotateloop option:selected").val(),
			"scaleX":$("#rect_scaleX").attr('value'),
			"scaleY":$("#rect_scaleY").attr('value'),
			"scaleDurations":$("#rect_scaleDurs").attr('value')
		}
	};
	
	var rectParamsStr = encodeURI(JSON.stringify(rectParams));
	
	$.ajax({
		type : "post",
		url : "rectmake.do",
		data : "rectParamsStr="+rectParamsStr,
		success : function(rtXML) {
			
			var original = $("#previewSVG").html();
			var addedHtml = original + rtXML;
			$("#previewSVG").html(addedHtml);
			
		},
	});
}




function circleMake() {
	
	var circleParams = {
		"x" : $("#circleX").attr('value'),
		"y" :  $("#circleY").attr('value'),
		"radius" : $("#circleR").attr('value'),
		"style" : {
			"strokeColor" : $("#circle_stroke").attr('value'),
			"strokeWidth" : $("#circle_strokeW").attr('value'),
			"fillColor" : $("#circle_fill").attr('value'),
		},
		"dp" : {
			"strokeColorFrom" : $("#circle_stroke_from").attr('value'),
			"strokeColorTo" : $("#circle_stroke_to").attr('value'),
			"strokeColorDurations" : $("#circle_strokeDurs").attr('value'),
			"fillColorFrom" : $("#circle_fill_from").attr('value') ,
			"fillColorTo" : $("#circle_fill_to").attr('value'),
			"fillColorDurations" :  $("#circle_fillDurs").attr('value'),
			"path" : $("#circle_path").attr('value'),
			"pathDurations" : $("#circle_pathDurs").attr('value'),
			"rotateCenterX" : $("#circle_rotateCenterX").attr('value'),
			"rotateCenterY" : $("#circle_rotateCenterY").attr('value'),
			"rotateAngel" : $("#circle_rotateAngel").attr('value'),
			"rotateDurations" :$("#circle_rotateDurs").attr('value'),
			"loop":$("#circle_rotateloop option:selected").val(),
			"scaleX":$("#circle_scaleX").attr('value'),
			"scaleY":$("#circle_scaleY").attr('value'),
			"scaleDurations":$("#circle_scaleDurs").attr('value')
		}
	};
	
	var circleParamsStr = encodeURI(JSON.stringify(circleParams));
	
	$.ajax({
		type : "post",
		url : "circlemake.do",
		data : "circleParamsStr="+circleParamsStr,
		success : function(rtXML) {
			
			var original = $("#previewSVG").html();
			var addedHtml = original + rtXML;
			$("#previewSVG").html(addedHtml);
			
		},
	});
}



function ellipseMake() {
	var ellipseParams = {
		"centerX" : $("#ellipsecenterX").attr('value'),
		"centerY" :  $("#ellipsecenterY").attr('value'),
		"semiAxisX" : $("#ellipsesemiAxisX").attr('value'),
		"semiAxisY":$("#ellipsesemiAxisY").attr('value'),
		"style" : {
			"strokeColor" : $("#ellipse_stroke").attr('value'),
			"strokeWidth" : $("#ellipse_strokeW").attr('value'),
			"fillColor" : $("#ellipse_fill").attr('value'),
		},
		"dp" : {
			"strokeColorFrom" : $("#ellipse_stroke_from").attr('value'),
			"strokeColorTo" : $("#ellipse_stroke_to").attr('value'),
			"strokeColorDurations" : $("#ellipse_strokeDurs").attr('value'),
			"fillColorFrom" : $("#ellipse_fill_from").attr('value') ,
			"fillColorTo" : $("#ellipse_fill_to").attr('value'),
			"fillColorDurations" :  $("#ellipse_fillDurs").attr('value'),
			"path" : $("#ellipse_path").attr('value'),
			"pathDurations" : $("#ellipse_pathDurs").attr('value'),
			"rotateCenterX" : $("#ellipse_rotateCenterX").attr('value'),
			"rotateCenterY" : $("#ellipse_rotateCenterY").attr('value'),
			"rotateAngel" : $("#ellipse_rotateAngel").attr('value'),
			"rotateDurations" :$("#ellipse_rotateDurs").attr('value'),
			"loop":$("#ellipse_rotateloop option:selected").val(),
			"scaleX":$("#ellipse_scaleX").attr('value'),
			"scaleY":$("#ellipse_scaleY").attr('value'),
			"scaleDurations":$("#ellipse_scaleDurs").attr('value')
		}
	};
	
	var ellipseParamsStr = encodeURI(JSON.stringify(ellipseParams));
	
	$.ajax({
		type : "post",
		url : "ellipsemake.do",
		data : "ellipseParamsStr="+ellipseParamsStr,
		success : function(rtXML) {
			
			var original = $("#previewSVG").html();
			var addedHtml = original + rtXML;
			$("#previewSVG").html(addedHtml);
			
		},
	});
}



function pathMake() {

	var pathParams = {
		"pathDescriStr":$("#pathDescri").attr('value'),
		"style" : {
			"strokeColor" : $("#path_stroke").attr('value'),
			"strokeWidth" : $("#path_strokeW").attr('value'),
			"fillColor":$("#path_fill").attr('value')
		},
		"dp" : {
			"strokeColorFrom" : $("#path_stroke_from").attr('value'),
			"strokeColorTo" : $("#path_stroke_to").attr('value'),
			"strokeColorDurations" : $("#path_strokeDurs").attr('value'),
			
			"path" : $("#path_path").attr('value'),
			"pathDurations" : $("#path_pathDurs").attr('value'),
			"rotateCenterX" : $("#path_rotateCenterX").attr('value'),
			"rotateCenterY" : $("#path_rotateCenterY").attr('value'),
			"rotateAngel" : $("#path_rotateAngel").attr('value'),
			"rotateDurations" :$("#path_rotateDurs").attr('value'),
			"loop":$("#path_rotateloop option:selected").val(),
			"scaleX":$("#path_scaleX").attr('value'),
			"scaleY":$("#path_scaleY").attr('value'),
			"scaleDurations":$("#path_scaleDurs").attr('value')
		}
	};
	
	var pathParamsStr = encodeURI(JSON.stringify(pathParams));
	
	$.ajax({
		type : "post",
		url : "pathmake.do",
		data : "pathParamsStr="+pathParamsStr,
		success : function(rtXML) {
			
			var original = $("#previewSVG").html();
			var addedHtml = original + rtXML;
			$("#previewSVG").html(addedHtml);
			
		},
	});
}


function curveMake() {
	var curveParams = {
		"startX" : $("#curve_startX").attr('value'),
		"startY" :  $("#curve_startY").attr('value'),
		"endX" : $("#curve_endX").attr('value'),
		"endY" : $("#curve_endY").attr('value'),
		"semiAxisX":$("#curve_semiAxisX").attr('value'),
		"semiAxisY" : $("#curve_semiAxisY").attr('value'),
		"xAxisRotation" : $("#curve_xAxisRotation").attr('value'),
		"largeArcFlag":$("#curve_largeArcFlag").attr('value'),
		"sweepFlag":$("curve_sweepFlag").attr('value'),
		"style" : {
			"strokeColor" : $("#curve_stroke").attr('value'),
			"strokeWidth" : $("#curve_strokeW").attr('value'),
			"fillColor" : $("#curve_fill").attr('value'),
		},
		"dp" : {
			"strokeColorFrom" : $("#curve_stroke_from").attr('value'),
			"strokeColorTo" : $("#curve_stroke_to").attr('value'),
			"strokeColorDurations" : $("#curve_strokeDurs").attr('value'),
			"fillColorFrom" : $("#curve_fill_from").attr('value') ,
			"fillColorTo" : $("#curve_fill_to").attr('value'),
			"fillColorDurations" :  $("#curve_fillDurs").attr('value'),
			"path" : $("#curve_path").attr('value'),
			"pathDurations" : $("#curve_pathDurs").attr('value'),
			"rotateCenterX" : $("#curve_rotateCenterX").attr('value'),
			"rotateCenterY" : $("#curve_rotateCenterY").attr('value'),
			"rotateAngel" : $("#curve_rotateAngel").attr('value'),
			"rotateDurations" :$("#curve_rotateDurs").attr('value'),
			"loop":$("#curve_rotateloop option:selected").val(),
			"scaleX":$("#curve_scaleX").attr('value'),
			"scaleY":$("#curve_scaleY").attr('value'),
			"scaleDurations":$("#curve_scaleDurs").attr('value')
		}
	};
	
	var curveParamsStr = encodeURI(JSON.stringify(curveParams));
	
	$.ajax({
		type : "post",
		url : "curvemake.do",
		data : "curveParamsStr="+curveParamsStr,
		success : function(rtXML) {
			
			var original = $("#previewSVG").html();
			var addedHtml = original + rtXML;
			$("#previewSVG").html(addedHtml);
			
		},
	});
}


function polygonMake() {
	
	var polygonParams = {
		
		"pointsStr" : $("#polygonPoints").attr('value'),
		"style" : {
			"strokeColor" : $("#polygon_stroke").attr('value'),
			"strokeWidth" : $("#polygon_strokeW").attr('value'),
			"fillColor" : $("#polygon_fill").attr('value'),
		},
		"dp" : {
			"strokeColorFrom" : $("#polygon_stroke_from").attr('value'),
			"strokeColorTo" : $("#polygon_stroke_to").attr('value'),
			"strokeColorDurations" : $("#polygon_strokeDurs").attr('value'),
			"fillColorFrom" : $("#polygon_fill_from").attr('value') ,
			"fillColorTo" : $("#polygon_fill_to").attr('value'),
			"fillColorDurations" :  $("#polygon_fillDurs").attr('value'),
			"path" : $("#polygon_path").attr('value'),
			"pathDurations" : $("#polygon_pathDurs").attr('value'),
			"rotateCenterX" : $("#polygon_rotateCenterX").attr('value'),
			"rotateCenterY" : $("#polygon_rotateCenterY").attr('value'),
			"rotateAngel" : $("#polygon_rotateAngel").attr('value'),
			"rotateDurations" :$("#polygon_rotateDurs").attr('value'),
			"loop":$("#polygon_rotateloop option:selected").val(),
			"scaleX":$("#polygon_scaleX").attr('value'),
			"scaleY":$("#polygon_scaleY").attr('value'),
			"scaleDurations":$("#polygon_scaleDurs").attr('value')
		}
	};
	
	var polygonParamsStr = encodeURI(JSON.stringify(polygonParams));
	
	$.ajax({
		type : "post",
		url : "polygonmake.do",
		data : "polygonParamsStr="+polygonParamsStr,
		success : function(rtXML) {
			
			var original = $("#previewSVG").html();
			var addedHtml = original + rtXML;
			$("#previewSVG").html(addedHtml);
			
		},
	});
}