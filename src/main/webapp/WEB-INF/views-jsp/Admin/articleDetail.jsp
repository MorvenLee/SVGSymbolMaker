<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<title>文章详情</title>
<!-- jquery -->
<script src="/scnu/resources/ui-lib/jquery1x/jquery.min.js"
	type="text/javascript"></script>
<!-- bootstrap -->
<link href="/scnu/resources/ui-lib/bootstrap/css/bootstrap.css"
	type="text/css" rel="stylesheet" />
<script src="/scnu/resources/ui-lib/bootstrap/js/bootstrap.min.js"
	type="text/javascript"></script>


<script type="text/javascript" charset="utf-8" src="/scnu/resources/ui-lib/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="/scnu/resources/ui-lib/ueditor/ueditor.all.min.js"> </script>
    <!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
    <!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
    <script type="text/javascript" charset="utf-8" src="/scnu/resources/ui-lib/ueditor/lang/zh-cn/zh-cn.js"></script>
 <link rel="stylesheet" type="text/css" href="/scnu/resources/ui-lib/ueditor/themes/default/css/ueditor.css" />

<meta name="viewport" content="initial-scale=1.0, user-scalable=no">

<meta charset="utf-8">



</head>
<body onload="">

	<div class="detail">
		<h1 class="title">${article.title}</h1>
		<h4>
			<div class="tit_bar">
				发表于:<span class="ago"><fmt:formatDate
						value='${article.pubTime }' pattern='yyyy-MM-dd HH:mm:ss'></fmt:formatDate></span>|

				来源:<span class="ago">动态地图符号描述研究系统</span>| 作者:<span class="ago">${article.author}</span>
			</div>
		</h4>
		<hr />
		<div class="newscontent">${article.content}</div>



	</div>
</body>
</html>