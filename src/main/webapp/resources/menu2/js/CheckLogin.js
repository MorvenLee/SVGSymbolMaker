//nancy add 20130526

function setLoginUser(evt)
{
	//alert("setLoginUser");
	var xmlHttpReq = new XMLHttpRequest();
	
	var url = "../../dataProcess/CheckLogin.jsp";
	xmlHttpReq.open("GET",url,true);
	xmlHttpReq.onreadystatechange = function() { disLoginUser(xmlHttpReq);};
	xmlHttpReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttpReq.send(null);
	
}

function　disLoginUser(xmlHttpReq)
{
	//alert("disLoginUser");
	if(xmlHttpReq.readyState == 4)
	{
		if(xmlHttpReq.status == 200)
		{
			var rt = xmlHttpReq.responseText.trim();
			//alert(rt);
							
			if (rt == "" || rt == "null" || rt == null){
				//尚未登录
				document.getElementById("LogisUser").firstChild.nodeValue = "尚未登录！";
			}
			else
			{				
				document.getElementById("LogisUser").firstChild.nodeValue = "欢迎您：" + rt;
			}
			
			return rt;
		}
	}	
	
}
	