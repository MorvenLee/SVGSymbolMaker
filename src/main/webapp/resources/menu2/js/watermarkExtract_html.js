	var svgDoc;   	
	var xmlns='http://www.w3.org/2000/svg';
	var xlinkns='http://www.w3.org/1999/xlink';
			
	var leftBanner = 130;
	var	bwidth=200;
	var	barheight=20;
	var textheight = 20;
	var recordHeight = 50; 
	
	var TopGapH = 100;	
	var TopGapH1 = 100;
	var TopGapH2 = 210;
		
	var SvgMainDoc ;
	var destfileSrcArr = new Array() ;
	var destfileTypeArr = new Array() ;


 
 	function initPara()
 	{
 	 	//svgDoc = evt.target.ownerDocument;  
 	 	SvgMainDoc=window.document.TransBoard.getSVGDocument();
 	 	///*
 	 	addhtmlEvtListeners();
 	 	addDNDListeners();
 	 	//*/

 	 	
 	 	//alert(svgDoc);
 	 	//svgDoc.addEventListener("load", addDNDListeners, false);
 	 	//SvgMainDoc.getElementById("SvgLev1").addEventListener("load", addDNDListeners, false);
 	 	//SvgMainDoc.addEventListener("load",addDNDListeners,false);
 	 	//addDNDListeners();
 	 	//alert("aaaaaaaa");

 	}
 
 	function transSubmit(method,svgfileName,shuiyin_svgfileName,userInfo_Val,sPass_Val,alias_Val,kPass_Val)
 	{
 		alert("开始导入数据库，请耐心等待。。。");			
			var sendStr = "svgfileName=" + svgfileName  + "&shuiyin_svgfName=" + shuiyin_svgfileName; 
			sendStr = sendStr + "&userInfo=" + userInfo_Val;
			sendStr = sendStr +　"&sPass=" + sPass_Val;
			sendStr = sendStr +　"&alias=" + alias_Val;
			sendStr = sendStr +　"&kPass=" + kPass_Val;
	
			///*	
 			//---nancy edit 20130422---
			subXMLHTTP = createXMLHttpRequestCom();			

			subXMLHTTP.onreadystatechange = function() { disSuccessRes(subXMLHTTP,svgfileName);};

			//alert(method);
			if(method=="lineSplit")
			{
				subXMLHTTP.open("post","../../dataProcess/watermarkExtract.jsp",true);
			}
			else if(method=="featurenode")
			{
				subXMLHTTP.open("post","../../dataProcess/wmarkExtract_featurenode.jsp",true);
			}
			else if(method=="promote")
			{
				subXMLHTTP.open("post","../../dataProcess/wmarkExtract_promote.jsp",true);
			}
			else
			{
				subXMLHTTP.open("post","../../dataProcess/watermarkExtract.jsp",true);
			}						
			
			subXMLHTTP.setRequestHeader('Content-type','application/x-www-form-urlencoded');
			//http_request.send('value=1&b=5');//同时又在send方法中使用参数value。
			//alert(sendStr);
			subXMLHTTP.send(sendStr);
			//*/
			
			/*
			alert(sendStr);
			var url = "http://localhost:8080/SircNancy/integration/dataProcess/transformE00ToGML.jsp?";
			url = url + sendStr;
			
			alert(url);
			window.location = url;
			*/
 	}

function makeLink (element, url) { 
	//alert(element);
   var svgNS = 'http:\/\/www.w3.org/2000/svg'; 
   var xlinkNS = 'http://www.w3.org/1999/xlink'; 
   var Llink = element.ownerDocument.createElementNS(svgNS, 'a'); 
   /*
   Llink.setAttributeNS(xlinkNS, 'xlink:href', url); 
   //Llink.setAttributeNS(xlinkNS, 'xlink:show', 'Share_Main'); 
    //Llink.setAttributeNS(xlinkNS, 'target', 'Share_Main'); 
    Llink.setAttributeNS(xlinkNS, 'xlink:show', 'Share_Main'); 
    Llink.setAttributeNS(xlinkNS, 'target', '_top'); 
    */
    /*
      Llink.setAttributeNS(xlinkNS, 'xlink:href', url); 
   Llink.setAttributeNS(xlinkNS, 'xlink:show','new'); 
   Llink.setAttributeNS(xlinkNS, 'xlink:target','_blank');
    */
    
   Llink.setAttributeNS(xlinkNS, 'xlink:href', url); 
   Llink.setAttributeNS(xlinkNS, 'xlink:show','self'); 
   Llink.setAttributeNS(xlinkNS, 'xlink:target','_top');
       
  	element.parentNode.replaceChild(Llink, element); 
   Llink.appendChild(element); 
}    
   
function disSuccessRes(xmlHttp,svgfileName)
{
	if(xmlHttp.readyState == 4)
	{
		if(xmlHttp.status == 200)
		{
      		var rt = xmlHttp.responseText;
      		    		
      		//清空原信息
				var root = SvgMainDoc.rootElement;
				var SvgLev1 = SvgMainDoc.getElementById("SvgLev1");
				//alert(UpTopgObj);
				if(SvgLev1!=null)
				{					
					root.removeChild(SvgLev1);
				}
				
				SvgMainDoc.getElementById("SvgLev2").setAttributeNS(null,"visibility","visible");
				
				//alert(rt);
				var temp = rt.trim().split("|");
				if(temp[0] =="success")
				{
					SvgMainDoc.getElementById("disDownTip").firstChild.nodeValue = "水印检测完毕！";				
					SvgMainDoc.getElementById("disDownInfo").firstChild.nodeValue = "原图与水印图的相似度：" + temp[1];
				}
				else
				{
					SvgMainDoc.getElementById("disDownTip").firstChild.nodeValue = "水印提取失败！";
				}
				

    		//alert(rt);
		}
		else{alert("提取水印失败!");}
	}
}  	
  
 function addhtmlEvtListeners(){
    		var content = document.getElementById("content");
				
				content.addEventListener("dragenter", function(event){
					
					//event.stopPropagation();
					event.preventDefault();
					handleDragenter(event);
					}, false);
				content.addEventListener("dragover", function(event){
					//event.stopPropagation();
					event.preventDefault();
					
					}, false);
								
				
				 if(oriEmbedDropEvent && content.addEventListener){
					content.removeEventListener("drop",handleDropHtml);
					oriEmbedDropEvent = false;
					//return true;
				}else if(oriEmbedDropEvent && content.attachEvent){
						content.detachEvent("on"+"drop",handleDropHtml);
						oriEmbedDropEvent = false;
						//return true;
				}
				
				//content.addEventListener("drop", handleDropHtml1, false);				
				content.addEventListener("drop", handleDropCheckType, false);
				
    	}
    	
    	//nancy add 20130603
    	function handleDropCheckType(event)
    	{
    		event.preventDefault();
    		
			var type = handleCheckType(event);
			
			if(type=="drag1")//RectContainer
				handleDropHtml1(event);
			else if(type=="drag2")//RectContainer2
				handleDropHtml2(event);			
    	}
    	
    	//nancy add 20130603
    	function handleCheckType(event)
    	{
    		event.preventDefault();
    		
			var dropCordStr = GetObjEventCoord(event,'sidebarRcontent');
			var tmp = dropCordStr.split("|");
			//alert(tmp);
			var dropCordX = tmp[0];
			var dropCordY = tmp[1];
	
	
			var oDiv = SvgMainDoc.getElementById("RectContainer");  
	        var dragContaint_left = oDiv.getAttribute("x");		
			var dragContaint_top = oDiv.getAttribute("y");    		
			//alert(dragContaint_left + "---" + dragContaint_top);
			
			var minX1 = parseInt(dragContaint_left) + 20;
			var maxX1 = parseInt(dragContaint_left) + parseInt(oDiv.getAttribute("width"));
			var minY1 = parseInt(dragContaint_top) + 10;
			var maxY1 = parseInt(dragContaint_top) + parseInt(oDiv.getAttribute("height"));
			//alert(minX1 + "，" + maxX1 + "---" + minY1 + "，" + maxY1);
			
			
			oDiv = SvgMainDoc.getElementById("RectContainer2"); 
			dragContaint_left = oDiv.getAttribute("x");		
			dragContaint_top = oDiv.getAttribute("y");    
			var minX2 = parseInt(dragContaint_left) + 20;
			var maxX2 = parseInt(dragContaint_left) + parseInt(oDiv.getAttribute("width"));
			var minY2 = parseInt(dragContaint_top) + 10;
			var maxY2 = parseInt(dragContaint_top) + parseInt(oDiv.getAttribute("height"));
			//alert(minX2 + "，" + maxX2 + "---" + minY2 + "，" + maxY2);
						
			/*
			if(dropCordX>=120 && dropCordX<=450 && dropCordY>=110 && dropCordY<=150)//RectContainer
				handleDropHtml1(event);
			else if(dropCordX>=120 && dropCordX<=450 && dropCordY>=225 && dropCordY<=310)//RectContainer2
				handleDropHtml2(event);
			*/
			
			var type = "";
			if(dropCordX>=minX1 && dropCordX<=maxX1 && dropCordY>=minY1 && dropCordY<=maxY1)//RectContainer
			{
				type = "drag1";
			}
			else if(dropCordX>=minX2 && dropCordX<=maxX2 && dropCordY>=minY2 && dropCordY<=maxY2)//RectContainer2
			{
				type = "drag2";
			}
			return type;
    	}
    	
    	function handleDropHtml1(event)
    	{
    		var testtest = event ;
    		
    		//event.stopPropagation();
			event.preventDefault();
    		//alert("-----html drop-----");
    		handleDrop(event,"drag1");
    	}
    	
    	function handleDropHtml2(event)
    	{
    		var testtest = event ;
    		
    		//event.stopPropagation();
			event.preventDefault();
    		//alert("-----html drop-----");
    		handleDrop(event,"drag2");
    	}
    	
    	
    	
    	function addDNDListeners(){
    		//alert("bbbbbb");
    		SvgMainDoc=window.document.TransBoard.getSVGDocument();
    		var RectContainer = SvgMainDoc.getElementById("RectContainer");
				var fileList = SvgMainDoc.getElementById("fileList");
				//alert("ccccccccccc");
							
				
				RectContainer.addEventListener("dragenter", handleDragenter, false);
				RectContainer.addEventListener("dragover", function(evt){
			
					//alert("-----------dragover---------------");
					evt.stopPropagation();
					evt.preventDefault();
					//var test = evt;
					//alert(evt);
					
					}, false);
				RectContainer.addEventListener("drop", handleDrop1, false);
				RectContainer.addEventListener("click", clicktest, false);
				
				
				//nancy add 20130602
				var RectContainer2 = SvgMainDoc.getElementById("RectContainer2");
				var fileList2 = SvgMainDoc.getElementById("fileList2");
				/*
				RectContainer2.addEventListener("dragenter", handleDragenter2, false);
				RectContainer2.addEventListener("dragover", function(evt){
			
					evt.stopPropagation();
					evt.preventDefault();

					}, false);
				*/
				RectContainer2.addEventListener("drop", handleDrop2, false);
				RectContainer2.addEventListener("click", clicktest2, false);
	
				
    	}
    	
    	
    	function clicktest(evt)
    	{
    		var test = evt;
    		//alert(evt)
    		//alert("--------clicktest----------");
    			evt.stopPropagation();
				evt.preventDefault();
    	}
     	function clicktest2(evt)
    	{
    		var test = evt;
    		//alert(evt)
    		//alert("--------clicktest222222222----------");
    			evt.stopPropagation();
				evt.preventDefault();
    	}
    	
    	function handleDragenter(evt)
    	{
    		var type = handleCheckType(evt);
			
			if(type=="drag1")//RectContainer
				handleDragenter1(evt);
			else if(type=="drag2")//RectContainer2
				handleDragenter2(evt);	
				
    	}
    	function handleDragenter1(evt)
    	{
    		//alert("-----------dragenter---------------");
					//evt.stopPropagation();
					evt.preventDefault();
					//var test = evt;
					//alert(evt);
					
					//清空原数据
					var fileList = SvgMainDoc.getElementById("fileList");
					var UpTopgObj = SvgMainDoc.getElementById("UpTopg");
					//alert(UpTopgObj);
					if(UpTopgObj!=null)
					{
						destfileSrcArr.length = 0;
						destfileTypeArr.length = 0;
						fileList.removeChild(UpTopgObj);
					}
					
    	}
    	
    	function handleDragenter2(evt)
    	{
    		//alert("-----------dragenter---------------");
					//evt.stopPropagation();
					evt.preventDefault();
					//var test = evt;
					//alert(evt);
					
					//清空原数据
					var fileList = SvgMainDoc.getElementById("fileList2");
					var UpTopgObj = SvgMainDoc.getElementById("UpTopg2");
					//alert(UpTopgObj);
					if(UpTopgObj!=null)
					{
						destfileSrcArr.length = 0;
						destfileTypeArr.length = 0;
						fileList.removeChild(UpTopgObj);
					}
					
    	}
    	
  //判断是否是DBF类型文件
  function isSvg(filename){
       //var filename= "aa.PNG3";
       if(filename==""){
         // alert("请上传图片!");
          return false;
       }else {
         if(!/\.(svg)$/.test(filename)) {
           //alert("图片类型必须是.gif,jpeg,jpg,png中的一种!")
           return false;
         }
       }  
       return true;
		//alert("图片");	  
 }   	
    	
function getUploadFileNamePre()
{
	var myDate = new Date(); 

	var yy=myDate.getFullYear();

	var mm=myDate.getMonth()+1;
	var dd=myDate.getDate();
	var hours=myDate.getHours();
	var minutes=myDate.getMinutes();
	var seconds=myDate.getSeconds();
      
	var Milliseconds = myDate.getMilliseconds(); //获取当前毫秒数(0-999) 
      
	//var datestr = yy+'-'+mm+'-'+dd+' '+hours+':'+minutes+':'+seconds + " " + Milliseconds;
	//alert(datestr);
      
	var datestr = "" + yy + mm +dd +hours +minutes +seconds  + Milliseconds;
	//alert(datestr);
	return datestr;
}    	
    	function handleDrop1(evt)
    	{
			handleDrop(evt,"darg1");    	
    	}
    	
    	function handleDrop2(evt)
    	{
    		//alert("----handle drop 22222222----");
			handleDrop(evt,"darg2"); 	
    	}
    	
    	
    	function handleDrop(evt,type){

    		//alert("-------drop-------");
    		//return true;
    		var testtest= evt;
    		//alert(evt);
  
    		
    		var files = evt.dataTransfer.files;
				evt.stopPropagation();
				evt.preventDefault();
			
			var svgStatus = false;
			var zskStatus = false;
			var shuiyinSvgStatus = false;
				
				if(type=="drag1")
				{
					if(files.length!=1)
					{
						alert("一次只能上传一个原svg文件！");
						return true;
					}
					
					if(isSvg(files[0].name))
					{
						if(svgStatus == true)
						{
							alert("只能上传一个svg文件!");
							return true;
						}
						svgStatus = true;
					}
					else
					{
						alert("请上传svg文件！");
						return false;
					}		
								
				}
				else if(type=="drag2")//
				{
					if(files.length!=2)
					{
						alert("一次必须同时上传一个svg水印文件和一个证书库文件！");
						return true;
					}
					
					//alert(files[0].name);
					/*
					if(files[0].name.indexOf(".e00") < 0  || files[0].name.indexOf(".e00")==null)
					{
						alert("文件类型不正确，请上传e00文件！");
						return true;
					}
					*/
					
	
					destfileTypeArr.length = 0;
					for (var i = 0; i < files.length; i++) 
					{
						if(isSvg(files[i].name))
						{
							if(shuiyinSvgStatus == true)
							{
								alert("只能上传一个svg文件!");
								return true;
							}
							shuiyinSvgStatus = true;
							destfileTypeArr.push("shuiyinSvg");
						}
						else if(!isSvg(files[i].name))
						{
							if(zskStatus == true)
							{
								alert("只能上传一个证书库文件!");
								return true;
							}
							zskStatus = true;
							destfileTypeArr.push("zsk");
						}
						else
						{
							alert("文件类型不正确，请上传svg水印文件和证书库文件!");
							return true;
						}
					}//for end
				}//if end
				
				var UploadFileNamePre = getUploadFileNamePre();
				//alert(UploadFileNamePre);
				//alert(destfileTypeArr);
				
				var fileList = "";
				var TopGroupid = "UpTopg";
				//alert(type);
				
				if(type=="drag1")
				{
					fileList = SvgMainDoc.getElementById("fileList");
					TopGroupid = "UpTopg";
					TopGapH = TopGapH1;
				}
				else　if(type=="drag2")
				{
					fileList = SvgMainDoc.getElementById("fileList2");
					TopGroupid = "UpTopg2";
					TopGapH = TopGapH2;
				}
				
				var pre = type  + "_";
				var TopGroup = SvgMainDoc.createElementNS(xmlns,"g");
				TopGroup.setAttributeNS(null,"id",TopGroupid);
				
				fileList.appendChild(TopGroup);
				
				for (var i = 0; i < files.length; i++) {
				
					var file = files[i];
					var group = SvgMainDoc.createElementNS(xmlns,"g");
					var progressbgRect = SvgMainDoc.createElementNS(xmlns,"rect");
					var progressbar = SvgMainDoc.createElementNS(xmlns,"rect");
					var BarText = SvgMainDoc.createElementNS(xmlns,"text");
					var FileNameText = SvgMainDoc.createElementNS(xmlns,"text");
	
					var img = SvgMainDoc.createElement('img');
					
					//SvgMainDoc.documentElement.appendChild(group);
					TopGroup.appendChild(group);
					//progressbar.className = "progressBar";

					progressbgRect.setAttributeNS(null,"x",leftBanner);
					progressbgRect.setAttributeNS(null,"y",i*recordHeight + textheight + TopGapH);
					progressbgRect.setAttributeNS(null,"width",bwidth);
					progressbgRect.setAttributeNS(null,"height",barheight);
					progressbgRect.setAttributeNS(null,"fill","white");
					progressbgRect.setAttributeNS(null,"stroke","black");
					progressbgRect.setAttributeNS(null,"stroke-width","1");
					progressbgRect.setAttributeNS(null,"opacity",1);
					group.appendChild(progressbgRect);	
					
					var pBarID = pre + "pBar_" + i;
					progressbar.setAttributeNS(null,"id",pBarID);
					progressbar.setAttributeNS(null,"x",leftBanner);
					progressbar.setAttributeNS(null,"y",i*recordHeight + textheight + TopGapH +1);
					progressbar.setAttributeNS(null,"width",0);
					progressbar.setAttributeNS(null,"height",barheight-2);
					progressbar.setAttributeNS(null,"fill","#00FF00");
					progressbar.setAttributeNS(null,"stroke","white");
					progressbar.setAttributeNS(null,"stroke-width","1");
					progressbar.setAttributeNS(null,"opacity",1);
					group.appendChild(progressbar);
	
					//文件名显示：eg：3.jpg
					var pBar_FileNameTextID = pBarID + "_FileNametext"; 
					FileNameText.setAttributeNS(null,"id",pBar_FileNameTextID);
					FileNameText.setAttributeNS(null,"x",leftBanner);
					FileNameText.setAttributeNS(null,"y",i*recordHeight +15 + TopGapH);
					FileNameText.setAttributeNS(null,"fill","blue");
					FileNameText.setAttributeNS(null,"stroke","blue");
					FileNameText.setAttributeNS(null,"font-size",15);
					FileNameText.setAttributeNS(null,"font-family","garamond");
					FileNameText.setAttributeNS(null,"pointer-events","none");
					group.appendChild(FileNameText);		
					
					//进度显示：eg：26%
					var pBar_BarTextID = pBarID + "_Bartext"; 
					BarText.setAttributeNS(null,"id",pBar_BarTextID);
					BarText.setAttributeNS(null,"x",leftBanner + 10);
					BarText.setAttributeNS(null,"y",i*recordHeight + textheight + 15 + TopGapH);
					BarText.setAttributeNS(null,"fill","blue");
					BarText.setAttributeNS(null,"stroke","blue");
					BarText.setAttributeNS(null,"font-size",15);
					BarText.setAttributeNS(null,"font-family","garamond");
					BarText.setAttributeNS(null,"pointer-events","none");
					group.appendChild(BarText);					
					
				
					//img.src = files[i].getAsDataURL();
					　if (window.URL.createObjectURL) {
						　　//FF4+
						　　img.src = window.URL.createObjectURL (files[i]);
						　} else if (window.webkitURL.createObjectURL) {
						　　//Chrome8+
						　　img.src = window.webkitURL.createObjectURL (files[i]);
						　} 
						else {
							img.src = "";
						}
					img.width = 32;
					img.height = 32;					

					SvgMainDoc.getElementById("inputchange").firstChild.nodeValue = file.name;
					
	var displayText = file.name;
	tv=SvgMainDoc.createTextNode(displayText);		
	FileNameText.appendChild(tv);
	
	var displayText = "";
	tv=SvgMainDoc.createTextNode(displayText);		
	BarText.appendChild(tv);	
					
					//li.appendChild(img);			
										
					//uploadFile(file, progressbar,i);					
					uploadFile(file, progressbar,i,UploadFileNamePre,type);
					
				}
    	}
    	//function uploadFile(file, progressbar,index) {
    	function uploadFile(file, progressbar,index,UploadFileNamePre,type) {
				var xhr = new XMLHttpRequest();
				var	upload = xhr.upload;
				
							
				upload.progressbar = progressbar;				
				upload.addEventListener("progress", uploadProgress, false);
				upload.addEventListener("load", uploadSucceed, false);
				upload.addEventListener("error", uploadError, false);

				var filetype = destfileTypeArr[index];
				var filename = file.name;
				if(type =="drag2" && filetype=='zsk')
				{
					filename = 'server';
					SvgMainDoc.getElementById("disZSKname").firstChild.nodeValue = "证书库名称：" + file.name;
				}
				else if(type =="drag2" && filetype=='shuiyinSvg')
				{
					filename = file.name;
					SvgMainDoc.getElementById("disShuiyinImgname").firstChild.nodeValue = "水印图：" + file.name;
				}
				
				xhr.open("POST", "../../dataProcess/watermarkExtractUpload.jsp?fileName="+ filename +"&savefilePre="+UploadFileNamePre+"&type="+filetype);
				xhr.overrideMimeType("application/octet-stream");

				xhr.onreadystatechange = function() { setFileHiddenSrc(xhr,index,filetype,type);};
				//xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");//此处如果加上，则上传失败，上传的文件大小为0kb
				
				//xhr.sendAsBinary(file.getAsBinary());//chrome不支持
				if ("getAsBinary" in file) {
                //FF 3.5+
					xhr.sendAsBinary(file.getAsBinary());
			   } else {
				  xhr.send(file);
			   }


			}
			
function setFileHiddenSrc(xmlHttpReq,index,filetype,type)
{
	if(xmlHttpReq.readyState == 4)
	{
		if(xmlHttpReq.status == 200)
		{
			var rt = xmlHttpReq.responseText;
			//返回的rt是文件的名字
			//alert(rt);
			//alert("aaaaa");
			destfileSrcArr.push(rt.trim());
			var tmp = rt.split("|");//
			
			SvgMainDoc.getElementById("filepath_val").firstChild.nodeValue = tmp[0];
			SvgMainDoc.getElementById("upLoadPath_val").firstChild.nodeValue = tmp[1];
			
			if(type=="drag1")
				SvgMainDoc.getElementById("Ori_svgfileName_val").firstChild.nodeValue = tmp[3];
			else if(filetype=="shuiyinSvg")
				SvgMainDoc.getElementById("shuiyin_svgfileName_val").firstChild.nodeValue = tmp[3];
			
			//alert(SvgMainDoc.getElementById("upload_fileSrc").firstChild.nodeValue);		
	
			
			return rt;
		}
	}
}
			
			function uploadProgress(evt){				
				if (evt.lengthComputable) {
					var percentage = Math.round((evt.loaded * 100) / evt.total);
					console.log("percentage:" + percentage);
					if (percentage < 100) {
					var test = evt.target;
					//alert(test);
						var pBarID = evt.target.progressbar.id; 
						var pBar_BarTextID = pBarID + "_Bartext"; 
						SvgMainDoc.getElementById(pBarID).setAttributeNS(null,"width",(percentage*bwidth)/100);
						
						SvgMainDoc.getElementById(pBar_BarTextID).firstChild.nodeValue =  "  " + percentage + "%";
						//evt.target.progressbar.firstChild.style.width = (percentage*2) + "px";
						//evt.target.progressbar.firstChild.textContent = percentage + "%";
					}
				}
			}
			function uploadSucceed(evt) {
				//var test = evt.target.progressbar.firstChild;
				//alert(test);
				var test = evt.target;
				//alert(test.progressbar.id);
				
				var pBarID = evt.target.progressbar.id; 
				var pBar_BarTextID = pBarID + "_Bartext"; 
				SvgMainDoc.getElementById(pBarID).setAttributeNS(null,"width",bwidth);
				SvgMainDoc.getElementById(pBar_BarTextID).firstChild.nodeValue = "  " + "100%";				
				//evt.target.progressbar.firstChild.style.width = "200px";
				//evt.target.progressbar.firstChild.textContent = "100%";
				
				//
				
			}			
			function uploadError(error) {
				alert("error: " + error);
			}
	
	
	
function getObjX(obj){  
        var parObj=obj;    
        var left=obj.offsetLeft;    
        while(parObj=parObj.offsetParent){    
            left+=parObj.offsetLeft;    
        }    
        return left;    
    }    
    
    function getObjY(obj){    
        var parObj=obj;    
        var top=obj.offsetTop;    
        while(parObj = parObj.offsetParent){    
            top+=parObj.offsetTop;    
        }    
     return top;    
    }  	
	
	
 function GetObjEventCoord(event,id){    
        var top,left,oDiv;    
 
		oDiv=document.getElementById(id);  
        top=getObjY(oDiv);    
        left=getObjX(oDiv);    

		var mp_x = event.clientX-left+document.body.scrollLeft;
		var mp_y = event.clientY - top +document.body.scrollTop  ;
		
		//alert("(" + mp_x + ", " + mp_y + ")");
		
		var mp_cord = mp_x + "|" + mp_y;
		return mp_cord;

		/*
        document.getElementById("mp").innerHTML = "(" + mp_x + ", " + mp_y +")px"; 
		
		document.getElementById("clientCord").innerHTML = "clientCord:(" + event.clientX + ", " + event.clientY +")px";
		document.getElementById("scrollDis").innerHTML = "scrollDis:(" + document.body.scrollLeft + ", " + document.body.scrollTop +")px"; 
		document.getElementById("lefttop").innerHTML = "(" + left + ", " + top +")px"; 
		*/

    }    	
	
	
			

	//window.addEventListener("reload", addhtmlEvtListeners, false); 
	//window.addEventListener("reload", addDNDListeners, false);			
    	