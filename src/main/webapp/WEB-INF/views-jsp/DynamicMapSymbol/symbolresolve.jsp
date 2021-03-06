<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html>
<head>
<title>符号解析子系统</title>
<!-- jquery -->
<script src="/scnu/resources/ui-lib/jquery1x/jquery.min.js"
	type="text/javascript"></script>

<link type="text/css" rel="stylesheet" href="/scnu/resources/upload/css/style.css">
	
<!-- bootstrap -->
<link href="/scnu/resources/ui-lib/bootstrap/css/bootstrap.css"
	type="text/css" rel="stylesheet" />
<script src="/scnu/resources/ui-lib/bootstrap/js/bootstrap.min.js"
	type="text/javascript"></script>



<script type="text/javascript" src="/scnu/resources/js/dynamic/operation.js"></script>


<style type="text/css">

</style>

<script language=JavaScript>

	
</script>

</head>
<body style="background-color: #E0EEEE;">
		


<br/>


	<table align=center valign=middle border="0">
		<tr>
			<th>上传动态符号XML模型文件</th>
		</tr>
		<tr>
			<th>
				<div class="uploader blue">
					<form enctype="multipart/form-data"
						action="uploadxml.do"
						method="post">
						<input type="text" class="filename" readonly="readonly" /> 
						<input type="button" name="file" class="button" value="Browse..." /> 
						<input type="file" name="fileUpload" size="30" />
						<br/><br/>
						<input type="submit" class="button"  value="开始上传" />
					</form>
				</div>
			</th>
		</tr>
		
		<tr>
			<th><font color="#EE8262">模型上传成功！</font></th>
		</tr>

		<tr>
			<th>请选择下载格式</th>
		</tr>
		<tr>
			<th>
			<select>
					<option value="svg">SVG</option>
					<option value="gis">GIF</option>
				</select>
			</th>
		</tr>
		
	</table>







</body>
</html>
    	<style>.uploader{
position:relative;
display:inline-block;
overflow:hidden;
cursor:default;
padding:0;
margin:10px 0px;
-moz-box-shadow:0px 0px 5px #ddd;
-webkit-box-shadow:0px 0px 5px #ddd;
box-shadow:0px 0px 5px #ddd;

-moz-border-radius:5px;
-webkit-border-radius:5px;
border-radius:5px;
}

.filename{
float:left;
display:inline-block;
outline:0 none;
height:32px;
width:380px;
margin:0;
padding:8px 10px;
overflow:hidden;
cursor:default;
border:1px solid;
border-right:0;
font:9pt/100% Arial, Helvetica, sans-serif; color:#777;
text-shadow:1px 1px 0px #fff;
text-overflow:ellipsis;
white-space:nowrap;

-moz-border-radius:5px 0px 0px 5px;
-webkit-border-radius:5px 0px 0px 5px;
border-radius:5px 0px 0px 5px;

background:#f5f5f5;
background:-moz-linear-gradient(top, #fafafa 0%, #eee 100%);
background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#fafafa), color-stop(100%,#f5f5f5));
filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#fafafa', endColorstr='#f5f5f5',GradientType=0);
border-color:#ccc;

-moz-box-shadow:0px 0px 1px #fff inset;
-webkit-box-shadow:0px 0px 1px #fff inset;
box-shadow:0px 0px 1px #fff inset;

-moz-box-sizing:border-box;
-webkit-box-sizing:border-box;
box-sizing:border-box;
}

.button{
float:left;
height:32px;
display:inline-block;
outline:0 none;
padding:8px 12px;
margin:0;
cursor:pointer;
border:1px solid;
font:bold 9pt/100% Arial, Helvetica, sans-serif;

-moz-border-radius:0px 5px 5px 0px;
-webkit-border-radius:0px 5px 5px 0px;
border-radius:0px 5px 5px 0px;

-moz-box-shadow:0px 0px 1px #fff inset;
-webkit-box-shadow:0px 0px 1px #fff inset;
box-shadow:0px 0px 1px #fff inset;
}


.uploader input[type=file]{
position:absolute;
top:0; right:0; bottom:0;
border:0;
padding:0; margin:0;
height:30px;
cursor:pointer;
filter:alpha(opacity=0);
-moz-opacity:0;
-khtml-opacity: 0;
opacity:0;
}

input[type=button]::-moz-focus-inner{padding:0; border:0 none; -moz-box-sizing:content-box;}
input[type=button]::-webkit-focus-inner{padding:0; border:0 none; -webkit-box-sizing:content-box;}
input[type=text]::-moz-focus-inner{padding:0; border:0 none; -moz-box-sizing:content-box;}
input[type=text]::-webkit-focus-inner{padding:0; border:0 none; -webkit-box-sizing:content-box;}

/* White Color Scheme ------------------------ */

.white .button{
color:#555;
text-shadow:1px 1px 0px #fff;
background:#ddd;
background:-moz-linear-gradient(top, #eeeeee 0%, #dddddd 100%);
background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#eeeeee), color-stop(100%,#dddddd));
filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#dddddd',GradientType=0);
border-color:#ccc;
}

.white:hover .button{
background:#eee;
background:-moz-linear-gradient(top, #dddddd 0%, #eeeeee 100%);
background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#dddddd), color-stop(100%,#eeeeee));
filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#dddddd', endColorstr='#eeeeee',GradientType=0);
}

/* Blue Color Scheme ------------------------ */

.blue .button{
color:#fff;
text-shadow:1px 1px 0px #09365f;
background:#064884;
background:-moz-linear-gradient(top, #3b75b4 0%, #064884 100%);
background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#3b75b4), color-stop(100%,#064884));
filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#3b75b4', endColorstr='#064884',GradientType=0);
border-color:#09365f;
}

.blue:hover .button{
background:#3b75b4;
background:-moz-linear-gradient(top, #064884 0%, #3b75b4 100%);
background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#064884), color-stop(100%,#3b75b4));
filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#064884', endColorstr='#3b75b4',GradientType=0);
}

/* Green Color Scheme ------------------------ */

.green .button{
color:#fff;
text-shadow:1px 1px 0px #6b7735;
background:#7d8f33;
background:-moz-linear-gradient(top, #93aa4c 0%, #7d8f33 100%);
background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#93aa4c), color-stop(100%,#7d8f33));
filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#93aa4c', endColorstr='#7d8f33',GradientType=0);
border-color:#6b7735;
}

.green:hover .button{
background:#93aa4c;
background:-moz-linear-gradient(top, #7d8f33 0%, #93aa4c 100%);
background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#7d8f33), color-stop(100%,#93aa4c));
filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#7d8f33', endColorstr='#93aa4c',GradientType=0);
}

/* Red Color Scheme ------------------------ */

.red .button{
color:#fff;
text-shadow:1px 1px 0px #7e0238;
background:#90013f;
background:-moz-linear-gradient(top, #b42364 0%, #90013f 100%);
background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#b42364), color-stop(100%,#90013f));
filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#b42364', endColorstr='#90013f',GradientType=0);
border-color:#7e0238;
}

.red:hover .button{
background:#b42364;
background:-moz-linear-gradient(top, #90013f 0%, #b42364 100%);
background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#90013f), color-stop(100%,#b42364));
filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#90013f', endColorstr='#b42364',GradientType=0);
}

/* Orange Color Scheme ------------------------ */

.orange .button{
color:#fff;
text-shadow:1px 1px 0px #c04501;
background:#d54d01;
background:-moz-linear-gradient(top, #f86c1f 0%, #d54d01 100%);
background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#f86c1f), color-stop(100%,#d54d01));
filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#f86c1f', endColorstr='#d54d01',GradientType=0);
border-color:#c04501;
}

.orange:hover .button{
background:#f86c1f;
background:-moz-linear-gradient(top, #d54d01 0%, #f86c1f 100%);
background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#d54d01), color-stop(100%,#f86c1f));
filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#d54d01', endColorstr='#f86c1f',GradientType=0);
}

/* Black Color Scheme ------------------------ */

.black .button{
color:#fff;
text-shadow:1px 1px 0px #111111;
background:#222222;
background:-moz-linear-gradient(top, #444444 0%, #222222 100%);
background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#444444), color-stop(100%,#222222));
filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#444444', endColorstr='#222222',GradientType=0);
border-color:#111111;
}

.black:hover .button{
background:#444444;
background:-moz-linear-gradient(top, #222222 0%, #444444 100%);
background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#222222), color-stop(100%,#444444));
filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#222222', endColorstr='#444444',GradientType=0);
}</style>
	    		<script>$(function(){
	$("input[type=file]").change(function(){$(this).parents(".uploader").find(".filename").val($(this).val());});
	$("input[type=file]").each(function(){
	if($(this).val()==""){$(this).parents(".uploader").find(".filename").val("No file selected...");}
	});
});
</script>