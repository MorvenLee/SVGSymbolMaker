<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<link href="<%=request.getContextPath()%>/resources/images/skin.css" rel="stylesheet" type="text/css" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	background-color: #EEF2FB;
}
.main_tab tbody{
	height:260px;
	font-family: Arial, Helvetica, sans-serif;
font-size: 12px;
line-height: 25px;
color: #666666;
}
-->
</style>
<body>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="17" valign="top" background="<%=request.getContextPath()%>/resources/images/mail_leftbg.gif"><img src="<%=request.getContextPath()%>/resources/images/left-top-right.gif" width="17" height="29" /></td>
    <td valign="top" background="<%=request.getContextPath()%>/resources/images/content-bg.gif"><table width="100%" height="31" border="0" cellpadding="0" cellspacing="0" class="left_topbg" id="table2">
      <tr>
        <td height="31"><div class="titlebt">系统介绍</div></td>
      </tr>
    </table></td>
    <td width="16" valign="top" background="<%=request.getContextPath()%>/resources/images/mail_rightbg.gif"><img src="<%=request.getContextPath()%>/resources/images/nav-right-bg.gif" width="16" height="29" /></td>
  </tr>
  <tr>
    <td valign="middle" background="<%=request.getContextPath()%>/resources/images/mail_leftbg.gif">&nbsp;</td>
    <td valign="top" bgcolor="#F7F8F9"><table width="98%" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td colspan="2" valign="top">&nbsp;</td>
        <td>&nbsp;</td>
        <td valign="top">&nbsp;</td>
      </tr>
      <tr>
        <td colspan="2" valign="top"><span class="left_bt">动态地图符号描述模型系统介绍</span><br>
              <br>
            <span class="left_txt">&nbsp;<img src="<%=request.getContextPath()%>/resources/images/ts.gif" width="16" height="16"><span class="left_ts"> 研究意义</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="left_txt">当前对动态地图描述模型的研究相对较少，但是对动态地图符号的应用已经相当广泛，大多侧重于技术的实现，各方应用对动态地图符号的需求已经非常迫切，基于XML的动态地图符号描述模型的研究必将为动态地图的发展带来新的动力。
</span></td>




        <td width="7%">&nbsp;</td>
        <td width="40%" valign="top"><table width="100%" height="144" border="0" cellpadding="0" cellspacing="0" class="line_table">
          <tr>
            <td width="7%" height="27" background="<%=request.getContextPath()%>/resources/images/news-title-bg.gif"><img src="<%=request.getContextPath()%>/resources/images/news-title-bg.gif" width="2" height="27"></td>
            <td width="93%" background="<%=request.getContextPath()%>/resources/images/news-title-bg.gif" class="left_bt2">最新新闻</td>
          </tr>
          <tr>
            <td height="102" valign="top">&nbsp;</td>
            <td height="102" valign="top"></td>
          </tr>
          <tr>
            <td height="5" colspan="2">&nbsp;</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td colspan="2">&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td colspan="2" valign="top"><!--JavaScript²¿·Ö-->
              <SCRIPT language="javascript">
function secBoard(n)
{
	secTable = document.getElementById('secTable');
	
for( var i=0;i<secTable.rows[0].cells.length;i++)
	secTable.rows[0].cells[i].className="sec1";
secTable.rows[0].cells[n].className="sec2";

mainTable = document.getElementById('mainTable');
for(var i=0;i<mainTable.tBodies.length;i++)
	mainTable.tBodies[i].style.display="none";
mainTable.tBodies[n].style.display="block";
}
          </SCRIPT>
             
              <TABLE width=72% border=0 cellPadding=0 cellSpacing=0 id="secTable">
                <TBODY>
                  <TR align=middle height=20>
                    <TD align="center" class="sec2" onclick=secBoard(0)>研究目标</TD>
                    <TD align="center" class="sec1" onclick=secBoard(1)>关键问题</TD>
                    <TD align="center" class="sec1" onclick=secBoard(2)>课题特色与创新</TD>
                    
                  </TR>
                </TBODY>
              </TABLE>
          <TABLE class="main_tab" id="mainTable" cellSpacing=0
cellPadding=0 width=100% border=0>
                
                <TBODY style="DISPLAY: block">
                  <TR>
                    <TD vAlign=top align=left><br/>
                 <p>(1) 通过扩展XML的描述应用，研究适用于简单和复杂的动态地图符号描述模型，促进动态地图符号的网络共享，为动态地图符号的“一次设计，到处使用”提供理论基础。</p>
 <p>(2) 规范地图符号中动画效果的统一标识，建立符号动画效果标识库，提高人们对地图的空间认知。</p>
  <p>(3) 基于SVG技术实现提出的动态地图符号描述模型。</p>
                    </TD>
                  </TR>
                </TBODY>
              
                <TBODY style="DISPLAY: none">
                  <TR>
                    <TD vAlign=top align=left><br/>
                          <p>(1) 建立对动态地图符号的规范化、统一化描述模型，包括动态点符号、线符号、面符号的描述，使其能在不同GIS系统下实现地图符号共享，实现跨平台共享和应用，减少资源浪费和重用。</p>
  <p>(2) 基于SVG（可缩放矢量图形）实现动态地图符号描述模型，包括动态点符号、线符号、面符号，如何解决基于SVG的动态地图符号在点、线、面三个层次配置，是本文拟解决的又一大关键问题。</p>
                         </TD>
                  </TR>
                </TBODY>
                
                <TBODY style="DISPLAY: none">
                  <TR>
                    <TD vAlign=top align=left><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;建立动态地图符号描述模型，统一动态符号的表达规范，是本论文的最大特色。利用XML技术跨平台性等诸多优点，实现基于XML的动态地图符号描述模型，有助于实现动态地图符号共享，是一个创新。另外，以SVG五种动画元素实现上述动态地图符号描述模型，也是一个创新。
                    </TD>
                  </TR>
                </TBODY>
              
               
            </TABLE></td>
        <td>&nbsp;</td>
        <td valign="top"><table width="100%" height="257" border="0" cellpadding="0" cellspacing="0" class="line_table">
          <tr>
            <td width="7%" height="27" background="<%=request.getContextPath()%>/resources/images/news-title-bg.gif"><img src="<%=request.getContextPath()%>/resources/images/news-title-bg.gif" width="2" height="27"></td>
            <td width="93%" background="<%=request.getContextPath()%>/resources/images/news-title-bg.gif" class="left_bt2">程序说明</td>
          </tr>
          <tr>
            <td height="102" valign="top">&nbsp;</td>
            <td height="102" valign="top"><label></label>
              <label>
              <!--  <textarea name="textarea" cols="48" rows="8" class="left_txt">  </textarea>-->
              </label></td>
          </tr>
          <tr>
            <td height="5" colspan="2">&nbsp;</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td height="40" colspan="4"><table width="100%" height="1" border="0" cellpadding="0" cellspacing="0" bgcolor="#CCCCCC">
          <tr>
            <td></td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td width="2%">&nbsp;</td>
        <td width="51%" class="left_txt"><img src="<%=request.getContextPath()%>/resources/images/icon-mail2.gif" width="16" height="11"> 邮箱 413419217@qq.com<br>
            
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
    <td background="<%=request.getContextPath()%>/resources/images/mail_rightbg.gif">&nbsp;</td>
  </tr>
  <tr>
    <td valign="bottom" background="<%=request.getContextPath()%>/resources/images/mail_leftbg.gif"><img src="<%=request.getContextPath()%>/resources/images/buttom_left2.gif" width="17" height="17" /></td>
    <td background="<%=request.getContextPath()%>/resources/images/buttom_bgs.gif"><img src="<%=request.getContextPath()%>/resources/images/buttom_bgs.gif" width="17" height="17"></td>
    <td valign="bottom" background="<%=request.getContextPath()%>/resources/images/mail_rightbg.gif"><img src="<%=request.getContextPath()%>/resources/images/buttom_right2.gif" width="16" height="17" /></td>
  </tr>
</table>
</body>
