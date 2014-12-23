	var svgDoc;   	
	var xmlns='http://www.w3.org/2000/svg';
	var xlinkns='http://www.w3.org/1999/xlink';
			
	var leftBanner = 130;
	var	bwidth=200;
	var	barheight=20;
	var textheight = 20;
	var recordHeight = 50; 
	
	var TopGapH = 100;
	var SvgMainDoc ;
	var destfileSrcArr = new Array() ;
 
 	function initPara()
 	{
 	 	//svgDoc = evt.target.ownerDocument;  
 	 	SvgMainDoc=window.document.TransBoard.getSVGDocument();
 	 	
 	 	//alert(svgDoc);
 	 	//svgDoc.addEventListener("load", addDNDListeners, false);
 	 	//SvgMainDoc.getElementById("SvgLev1").addEventListener("load", addDNDListeners, false);
 	 	//SvgMainDoc.addEventListener("load",addDNDListeners,false);
 	 	//addDNDListeners();
 	 	//alert("aaaaaaaa");

 	}
 
 	function transSubmit(filePath)
 	{			
			var sendStr = "filePath=" + filePath;
			///*	
 			//---nancy edit 20130422---
			subXMLHTTP = createXMLHttpRequestCom();			

			subXMLHTTP.onreadystatechange = function() { disDownRes(subXMLHTTP);};
			subXMLHTTP.open("post","../../dataProcess/doDataCompress.jsp",true);
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
   
function disDownRes(xmlHttp)
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
				/*
				SvgMainDoc.getElementById("disDownInfo").firstChild.nodeValue = "下载";
				makeLink(SvgMainDoc.getElementById("disDownInfo"), rt);
				*/
				var tmp = rt.trim().split("|");
				//alert(tmp.length);
				var disInfoObj = SvgMainDoc.getElementById("disDownInfo");
				for(var i=0;i<tmp.length;i++)
				{
					var tspanText = SvgMainDoc.createElementNS(xmlns,"tspan");

					tspanText.setAttributeNS(null,"x",72);
					tspanText.setAttributeNS(null,"dy",25);
				
					disInfoObj.appendChild(tspanText);	
					
					var tmpFname = tmp[i].split("\\");			
					var displayText = "下载" + "   " + tmpFname[tmpFname.length-1];
					//var displayText = "下载" ;
					tv=SvgMainDoc.createTextNode(displayText);		
					tspanText.appendChild(tv);
					makeLink(tspanText, tmp[i]);
				}
				
				/*
				var height = 500;
				SvgMainDoc.svgWnd.init_scrollbar(height);
				*/
			//初始化滚动条参数
			if(tmp.length>13)
			{
				var svgHeight = 390;
				var contentMaxHeight = (tmp.length-13) * 25 + 390;
				var barheight = 386;
				var diffHeight = -(contentMaxHeight - svgHeight  + 20);
				var percentH = svgHeight/contentMaxHeight;
				
				SvgMainDoc.svgWnd.init_scrollbar(barheight,diffHeight,percentH);//加载滚动条
			}
    		//alert(rt);
		}
		else{alert("数据转换失败!");}
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
				content.addEventListener("drop", handleDropHtml, false);
    	}
    	
    	function handleDropHtml(event)
    	{
    		var testtest = event ;
    		
    		//event.stopPropagation();
			event.preventDefault();
    		//alert("-----html drop-----");
    		handleDrop(event);
    	}
    	
    	window.addEventListener("load", addhtmlEvtListeners, false); 
    	
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
				RectContainer.addEventListener("drop", handleDrop, false);
				RectContainer.addEventListener("click", clicktest, false);
				
    	}
    	
    	
    	function clicktest(evt)
    	{
    		var test = evt;
    		//alert(evt)
    		//alert("--------clicktest----------");
    			evt.stopPropagation();
				evt.preventDefault();
    	}
    	
    	function handleDragenter(evt)
    	{
    		//alert("-----------dragenter---------------");
					evt.stopPropagation();
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
						fileList.removeChild(UpTopgObj);
					}
					
    	}
    	
//判断是否是svg类型文件
 function isSvg(filename){
       //var filename= "aa.PNG3";
       if(filename==""){
          alert("请上传图片!");return false;
       }else {
         if(!/\.(svg)$/.test(filename)) {
           //alert("图片类型必须是.gif,jpeg,jpg,png中的一种!")
           return false;
         }
       }  
       return true;
		//alert("图片");	  
 } 
    	function handleDrop(evt){

    		//alert("-------drop-------");
    		//return true;
    		var testtest= evt;
    		//alert(evt);
  
    		
    		var files = evt.dataTransfer.files;
				evt.stopPropagation();
				evt.preventDefault();
				
				var fileList = SvgMainDoc.getElementById("fileList");
				var TopGroup = SvgMainDoc.createElementNS(xmlns,"g");
				TopGroup.setAttributeNS(null,"id","UpTopg");
				fileList.appendChild(TopGroup);
				
				if(files.length>1)
				{
					alert("一次只能上传一个svg文件！");
					return true;
				}
				
				//alert(files[0].name);
				//检查文件类型
				if(!isSvg(files[0].name))
				{
					alert("文件类型不正确，请上传svg文件!");
					return true;
				}
				/*
				if(files[0].name.indexOf(".svg") < 0  || files[0].name.indexOf(".svg")==null)
				{
					alert("文件类型不正确，请上传svg文件！");
					return true;
				}
				*/
				
				
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
					
					var pBarID = "pBar_" + i;
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
					uploadFile(file, progressbar);
					
				}
    	}
    	//function uploadFile(file, progressbar,index) {
    	function uploadFile(file, progressbar) {
				var xhr = new XMLHttpRequest();
				var	upload = xhr.upload;
				
							
				upload.progressbar = progressbar;				
				upload.addEventListener("progress", uploadProgress, false);
				upload.addEventListener("load", uploadSucceed, false);
				upload.addEventListener("error", uploadError, false);

				xhr.open("POST", "../../dataProcess/DataCompressUpload.jsp?fileName="+file.name);
				xhr.overrideMimeType("application/octet-stream");

				xhr.onreadystatechange = function() { setFileHiddenSrc(xhr,xhr);};
				//xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");//此处如果加上，则上传失败，上传的文件大小为0kb
				
				//xhr.sendAsBinary(file.getAsBinary());//chrome不支持
				if ("getAsBinary" in file) {
                //FF 3.5+
					xhr.sendAsBinary(file.getAsBinary());
			   } else {
				  xhr.send(file);
			   }


			}
			
function setFileHiddenSrc(xmlHttpReq,index)
{
	if(xmlHttpReq.readyState == 4)
	{
		if(xmlHttpReq.status == 200)
		{
			var rt = xmlHttpReq.responseText;
			//返回的rt是文件的名字
			//alert(rt);
			//alert("aaaaa");
			destfileSrcArr.push(rt);
			SvgMainDoc.getElementById("upload_fileSrc").firstChild.nodeValue = rt.trim();
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
			

	window.addEventListener("load", addDNDListeners, false);			
    	