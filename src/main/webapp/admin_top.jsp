<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html>
<head>
<title>欢迎使用</title>
<script language=JavaScript>
function logout(){
	if (confirm("您确定要退出控制面板吗？"))
	top.location = "LBS/trajectory.do";
	return false;
}
</script>
<meta http-equiv=Content-Type content=text/html;charset=utf-8>
<meta http-equiv="refresh" content="60">

<base target="main">
<link href="<%=request.getContextPath()%>/resources/images/skin.css" rel="stylesheet" type="text/css">
</head>
<body leftmargin="0" topmargin="0">
<table width="100%" height="64" border="0" cellpadding="0" cellspacing="0" class="admin_topbg">
  <tr>
    <td width="61%" height="64">
    <!-- <img src="<%=request.getContextPath()%>/resources/images/logo.gif" width="262" height="64"> -->
    </td>
    <td width="39%" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="74%" height="38" class="admin_txt"><b></b> </td>
        <td width="22%"><a href="#" target="_self" onClick="logout();"><img src="<%=request.getContextPath()%>/resources/images/out.gif" alt="安全退出" width="46" height="20" border="0"></a></td>
        <td width="4%">&nbsp;</td>
      </tr>
      <tr>
        <td height="19" colspan="3">&nbsp;</td>
        </tr>
    </table></td>
  </tr>
</table>
</body>
</html>
