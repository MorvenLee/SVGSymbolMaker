<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<!-- jquery -->
<script src="/scnu/resources/ui-lib/jquery1x/jquery.min.js"
	type="text/javascript"></script>
	
<!-- bootstrap -->
<link href="/scnu/resources/ui-lib/bootstrap/css/bootstrap.css"
	type="text/css" rel="stylesheet" />
<script src="/scnu/resources/ui-lib/bootstrap/js/bootstrap.min.js"
	type="text/javascript"></script>
<title>发布信息</title>


<style>
	table .title{
		color:#6E8B3D;
		font-weight:bold;
	}
	.table tbody tr td {
		vertical-align: middle;
	}
	.table tbody tr:hover{background-color:#CAE1FF;}
	.tooltip-inner{
		max-width:400px;
		background-color: #668B8B;
	}
	
#dlg .close {
	font-size:14px;
	font-weight:normal;
	opacity: 1;
	color:white;
	text-shadow:none;
	line-height:1.3;
	
}
</style>

</head>
<body >
	<div id="publishedList" style="padding:20px 10px 0 10px">
		<div class="row clearfix">
			<div class="col-md-12 column">
				<div class="list-group">
					<a href="#" class="list-group-item active"><span class="badge">总数：<%=request.getAttribute("artilceNum")%></span>文章汇总</a>
					<div class="list-group-item">
						<table class="table publishedList" width="100%" border="0">
							<tr>
								<td width="5%" align="center" valign="middle">&nbsp;</td>
								<td width="30%" align="center" valign="middle"><span class="title">标题</span></td>
								<td width="15%" align="center" valign="middle"><span class="title">类型</span></td>
								<td width="15%" align="center" valign="middle"><span class="title">发布时间</span></td>
								<td width="25%" align="center" valign="middle"><span class="title">操作</span></td>
														
							</tr>
							
						
							
							<c:if test="${!empty artilceList}">
							<c:forEach var="al" items="${artilceList}">			
							<tr>
							
								<td align="center" valign="middle"><img style="width:40px;height:40px" src="/scnu/resources/images/news.png"/></td>
								<td align="left" valign="middle">${al.title }<span class="atip"></span></td>
								<td align="center" valign="middle">${al.classfication }</td>
								<td align="center" valign="middle"><fmt:formatDate value='${al.pubTime }' pattern='yyyy-MM-dd HH:mm:ss'></fmt:formatDate></td>
								<td align="center" valign="middle" class="trainFunction">
									<div style="margin-left: 20px;margin-right: auto;">
										<a href="readArticle.do?id=${al.id}"  class="detail">查看</a>
										<a href="jobseek-edit.action" onFocus="this.blur()" class="edit">编辑</a>
										<a href="jobseek-delect.action" onClick="return confirm('确定删除此记录吗？')" onFocus="this.blur()" class="delete">删除</a>
									</div>
								</td>
							
							</tr>
							</c:forEach>
							</c:if>
																														
						</table>
					</div>										
				</div>
			</div>
		</div>
	</div>		
</body>
</html>