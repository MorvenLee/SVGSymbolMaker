<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<title>发布文章</title>

<script type="text/javascript">
 window.UEDITOR_HOME_URL = "/scnu/resources/ui-lib/ueditor/";
</script>
 
 
<!-- jquery -->
<script src="/scnu/resources/ui-lib/jquery1x/jquery.min.js"
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

<script type="text/javascript" charset="utf-8" src="/scnu/resources/ui-lib/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="/scnu/resources/ui-lib/ueditor/ueditor.all.min.js"> </script>
    <!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
    <!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
    <script type="text/javascript" charset="utf-8" src="/scnu/resources/ui-lib/ueditor/lang/zh-cn/zh-cn.js"></script>

    <style type="text/css">
        div{
            width:100%;
        }
    </style>


</head>
<body onload="">
	<div>
   <br/>
    文章标题<input type="text" id="article_title" value=""/>
      文章分类<select id="article_classfication">
					<option value="FEATRUE">视觉变量</option>
					<option value="XML_DESCRIPTION">XML描述</option>
				</select><br/>
      <br/>
    <script id="editor" type="text/plain" style="width:100%;height:300px;"></script>
</div>



<div>
    <button onclick="publish()">发布</button> 
</div>

<script type="text/javascript">

    //实例化编辑器
    //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
  	
    var ue = UE.getEditor('editor');

	function publish(){
		var title = $("#article_title").attr('value');
		var classfication = $("#article_classfication option:selected").val();
		var content = UE.getEditor('editor').getContent();
		alert(content);
		$.ajax({
			type : "post",
			url : "publishArticle.do",
			data : "title="+title+"&classfication="+classfication+"&content="+content,
			success : function() {
				
			},
		});
	}
   

  
</script>
</body>
</html>