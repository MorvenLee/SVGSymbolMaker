	var svgDoc;   	
	var xmlns='http://www.w3.org/2000/svg';
	var xlinkns='http://www.w3.org/1999/xlink';
			
	//var leftBanner = 130;
	var leftBanner = 210;
	var	bwidth=200;
	var	barheight=20;
	var textheight = 20;
	//var recordHeight = 60; 
	var recordHeight = 72; 
	
	var TopGapH = 100;
	var SvgRightDoc ;
	var SvgLeftDoc ;
	var destfileSrcArr = new Array() ;
	var defUploadUrl = "";
	
	var PicNum = 0;
 
 	function initPara()
 	{
 	 	//svgDoc = evt.target.ownerDocument;  
 	 	SvgRightDoc=window.document.rightContent.getSVGDocument();
 	 	SvgLeftDoc=window.document.leftContent.getSVGDocument();
 	 	
 	 	//alert(svgDoc);
 	 	//svgDoc.addEventListener("load", addDNDListeners, false);
 	 	//SvgRightDoc.getElementById("SvgLev1").addEventListener("load", addDNDListeners, false);
 	 	//SvgRightDoc.addEventListener("load",addDNDListeners,false);
 	 	//addDNDListeners();
 	 	//alert("aaaaaaaa");

 	}
 
 	function transSubmit(speed,midframe,mark,filestr)
 	{			
			var sendStr = "speed=" + speed + "&midframe=" + midframe + "&mark=" + mark + "&filestr=" + filestr;
			///*	
 			//---nancy edit 20130422---
			subXMLHTTP = createXMLHttpRequestCom();			

			subXMLHTTP.onreadystatechange = function() { createAnimationRes(subXMLHTTP);};
			subXMLHTTP.open("post","../../dataProcess/makeAnimation.jsp",true);
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

//判断是否是图片
 function isImg(filename){
       //var filename= "aa.PNG3";
       if(filename==""){
          alert("请上传图片!");return false;
       }else {
         if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(filename)) {
           //alert("图片类型必须是.gif,jpeg,jpg,png中的一种!")
           return false;
         }
       }  
       return true;
		//alert("图片");	  
 }   
   
function createAnimationRes(xmlHttp)
{
	if(xmlHttp.readyState == 4)
	{
		if(xmlHttp.status == 200)
		{
      		var rt = xmlHttp.responseText;   		    		  		
    		//alert(rt);
    		//var tmp = window.document.rightContent;
    		//window.document.rightContent.src = "../../tools/antimation/img-lod.svg";//不起作用
    		//alert(document.embeds["rightContent"].src);
    		//document.embeds["rightContent"].src = "/SircNancy/tools/antimation/img-lod.svg";
    		//alert(document.embeds["rightContent"].src);
    		/*
    		//此种方式会有图片缓存
    		var embedSrc = "/SircNancy/tools/antimation/temp/img-lod-new.svg";
    		embedStr = "<embed name='rightContent' pluginspage='http://www.adobe.com/svg/viewer/install/' align='top' src='" 
    					+ embedSrc + "' height='100%' width='100%' type='image/svg+xml'/>";
                                 
    		document.getElementById("sidebarRcontent").innerHTML = embedStr;  
    		*/
    		
    		/*
    		//index文件中加入了不用缓存--------还是无法解决缓存
    		var embedSrc = "/SircNancy/tools/antimation/index.htm";
    		embedStr = "<embed name='rightContent' align='top' src='" 
    					+ embedSrc + "' height='100%' width='100%' type='image/svg+xml'/>";
                   
            //alert(embedStr);                     
    		document.getElementById("sidebarRcontent").innerHTML = embedStr;  
    		*/
    		
    		window.location.href = "/SircNancy/tools/antimation/index.htm";
    		
		}
		else{alert("创建动画失败!");}
	}
} 

//重置：重新加载左边和右边的svg文件
function reloadMainSvg()
{
	var embedSrc;
	/*
	//此种方法加载，js会有问题的，需重新加载整个页面
	//重新加载左边的embed src
    var embedSrc = "../svg/MotionPicLeft.svg";
    embedStr = "<embed name='leftContent' pluginspage='http://www.adobe.com/svg/viewer/install/' align='top' src='" 
    			+ embedSrc + "' height='100%' width='100%' type='image/svg+xml'/>";                               
    document.getElementById("sidebarL").innerHTML = embedStr; 
 
    
    //重新加载右边的embed src
    var embedSrc = "../svg/MotionPic_Upload.svg";
    embedStr = "<embed name='rightContent' pluginspage='http://www.adobe.com/svg/viewer/install/' align='top' src='" 
    			+ embedSrc + "' height='100%' width='100%' type='image/svg+xml'/>";                               
    document.getElementById("sidebarRcontent").innerHTML = embedStr;  
    */
       
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
    		SvgRightDoc=window.document.rightContent.getSVGDocument();
    		var RectContainer = SvgRightDoc.getElementById("RectContainer");
				var fileList = SvgRightDoc.getElementById("fileList");
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
					ClearUpImgprogress();
					
    	}
    	
    	function ClearUpImgprogress()
    	{
    				//清空原数据
					var fileList = SvgRightDoc.getElementById("fileList");
					var UpTopgObj = SvgRightDoc.getElementById("UpTopg");
					//alert(UpTopgObj);
					if(UpTopgObj!=null)
					{
						destfileSrcArr.length = 0;
						fileList.removeChild(UpTopgObj);
					}
					
			var disImgObj = SvgRightDoc.getElementById("disUpImg");
			if(disImgObj!="" && disImgObj!=null)
			{
				//清空显示的数据
				fileList.removeChild(disImgObj);
			}
    	}
    	
    	function handleDrop(evt){

    		//alert("-------drop-------");
    		//return true;
    		var testtest= evt;
    		//alert(evt);
  
    		
    		var files = evt.dataTransfer.files;
				evt.stopPropagation();
				evt.preventDefault();
				
				var fileList = SvgRightDoc.getElementById("fileList");
				var TopGroup = SvgRightDoc.createElementNS(xmlns,"g");
				TopGroup.setAttributeNS(null,"id","UpTopg");
				fileList.appendChild(TopGroup);
				
				if(files.length>6)
				{
					alert("一次最多上传6张图片！");
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
				
				
				for (var i = 0; i < files.length; i++) {
				
					//检查图片类型
					if(!isImg(files[i].name))
					{
						alert("文件类型不正确!图片类型必须是.gif,jpeg,jpg,png中的一种!");
						continue;
					}
				
					var file = files[i];
					var group = SvgRightDoc.createElementNS(xmlns,"g");
					var progressbgRect = SvgRightDoc.createElementNS(xmlns,"rect");
					var progressbar = SvgRightDoc.createElementNS(xmlns,"rect");
					var BarText = SvgRightDoc.createElementNS(xmlns,"text");
					var FileNameText = SvgRightDoc.createElementNS(xmlns,"text");

					
					//SvgRightDoc.documentElement.appendChild(group);
					var gid = "g_" + i;
					group.setAttributeNS(null,"id",gid);
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
					
					var imgSrc = "";
					　if (window.URL.createObjectURL) {
						　　//FF4+
						　　imgSrc = window.URL.createObjectURL (files[i]);
						　} else if (window.webkitURL.createObjectURL) {
						　　//Chrome8+
						　　imgSrc = window.webkitURL.createObjectURL (files[i]);
						　} 
						else {
							imgSrc = "";
						}
					//img.width = 32;
					//img.height = 32;					

					SvgRightDoc.getElementById("inputchange").firstChild.nodeValue = file.name;
					
	var displayText = file.name;
	tv=SvgRightDoc.createTextNode(displayText);		
	FileNameText.appendChild(tv);
	
	var displayText = "";
	tv=SvgRightDoc.createTextNode(displayText);		
	BarText.appendChild(tv);	
					
					//li.appendChild(img);			
										
					//uploadFile(file, progressbar,i);					
					uploadFile(file, progressbar,i);
					
				}
    	}
    	//function uploadFile(file, progressbar,index) {
    	function uploadFile(file, progressbar,index) {
				var xhr = new XMLHttpRequest();
				var	upload = xhr.upload;
				
							
				upload.progressbar = progressbar;				
				upload.addEventListener("progress", uploadProgress, false);
				upload.addEventListener("load", uploadSucceed, false);
				upload.addEventListener("error", uploadError, false);

				xhr.open("POST", "../../dataProcess/animationPic_Upload.jsp?fileName="+file.name);
				xhr.overrideMimeType("application/octet-stream");

				xhr.onreadystatechange = function() { setFileHiddenSrc(xhr,index);};
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
			SvgRightDoc.getElementById("upload_fileSrc").firstChild.nodeValue = rt.trim();
			//alert(SvgRightDoc.getElementById("upload_fileSrc").firstChild.nodeValue);	
			
			setPicList(rt.trim());
			displayImg(rt.trim(),index);	
			
			return rt;
		}
	}
}

function displayImg(UpimgSrc,index)
{
	var x = leftBanner - 80;
	var y = index*recordHeight + TopGapH -12;
							
	var svg_img = SvgRightDoc.createElementNS(xmlns,'image');
	svg_img.setAttributeNS(null,"width",72);
	svg_img.setAttributeNS(null,"height",72);
	svg_img.setAttributeNS(null,"x",x);
	svg_img.setAttributeNS(null,"y",y);
	
	//设置图片路径
	svg_img.href.baseVal = UpimgSrc;
	
	var gId = "g_" + index;
	var gobj = SvgRightDoc.getElementById(gId);
	
	gobj.appendChild(svg_img);	
}

function setPicList(filename)
{
	SvgLeftDoc.getElementById("gPicInfo").setAttribute('visibility','visible');
	
	var comboPicListObj = SvgLeftDoc.defaultView.comboPicList;
	
	var tmpStr;
	var tmpNum;
	var tmpOpt;
	var tmpMark;
	var tmpArr = filename.split("\\");
	
	//alert(tmpArr);
	defUploadUrl = "";
	for(var i=1;i<tmpArr.length-1;i++)
	{
		defUploadUrl += "\\" + tmpArr[i] ;
	}
	//alert(defUploadUrl);

	tmpStr = tmpArr[tmpArr.length-1];
	tempNum = comboPicListObj.elementsArray.length-10;
	//tmpOpt = new Option( tmpStr );
//	alert(tmpStr);
	tmpMark = isInList( tmpStr);

	if( tmpMark == -1 )
	{
		if(PicNum<10)//删除前边10个空余的项目
		{
			var deletePicListElements = new Array(" ");
			comboPicListObj.deleteElementsByName(deletePicListElements,false);
		}
		//comboPicListObj.addElementAtPosition({key:tmpStr,value:true},0,false);
		//alert(tmpStr);
		comboPicListObj.addElementAtPosition({key:tmpStr,value:true},PicNum,false);
		comboPicListObj.deselectAll(false);
		PicNum=PicNum+1;
	}
	else
	{
	/*
		var deletePicListElements = new Array(tmpStr); 
		//alert(deletePicListElements);
		comboPicListObj.deleteElementsByName(deletePicListElements,false);
		PicNum=PicNum-1;
		if(PicNum==0)
		{
		   SvgLeftDoc.getElementById("gPicInfo").setAttribute('visibility','hidden');
		}
		*/
	}
	
}



function isInList( tmpStr )
{
	var comboPicListObj = SvgLeftDoc.defaultView.comboPicList;
	var temp = comboPicListObj.elementExists(tmpStr);
	return temp;
}

	//上移
	function moveup(index,fname)
	{
		//alert(index + ":" + fname);
		if(index>=1)
		{
			var comboPicListObj = SvgLeftDoc.defaultView.comboPicList;
			comboPicListObj.deleteElementsByName(fname,false);
			//alert(fname);
			comboPicListObj.addElementAtPosition({key:fname,value:true},index-1,false);
			
		}
	}
	
	//下移
	function movedown(index,fname)
	{
		//alert(PicNum);
		var insPos = parseInt(index) + 1;
		//alert(index + "---" + fname + "---" + insPos);
		if(index<PicNum-1)
		{
			var comboPicListObj = SvgLeftDoc.defaultView.comboPicList;
			comboPicListObj.deleteElementsByName(fname,false);
			//alert(fname);
			comboPicListObj.addElementAtPosition({key:fname,value:true},insPos,false);
		}		
	}	
	//移除
	function removePic(index,fname)
	{
		var comboPicListObj = SvgLeftDoc.defaultView.comboPicList;
		comboPicListObj.deleteElementsByName(fname,false);
		
		PicNum = PicNum-1;
	}		
	
	//显示当前选中的图片
	function showselImg(fname)
	{								
		//清楚上传进度信息
		ClearUpImgprogress();
		var imgSrc = defUploadUrl + "\\" + fname[0];
		
		//alert(fname[0]);
		if(fname[0].trim()=="")return true;
		
		var disImgObj = SvgRightDoc.getElementById("disUpImg");
		if(disImgObj!="" && disImgObj!=null)
		{
			//设置图片路径
			disImgObj.href.baseVal = imgSrc;
		}
		else
		{	
			var svg_img = SvgRightDoc.createElementNS(xmlns,'image');
			svg_img.setAttributeNS(null,"id","disUpImg");
			svg_img.setAttributeNS(null,"width",480);
			svg_img.setAttributeNS(null,"height",384);
			svg_img.setAttributeNS(null,"x",100);
			svg_img.setAttributeNS(null,"y",110);
			
			
			//alert(imgSrc);
			//设置图片路径
			svg_img.href.baseVal = imgSrc;
			
			var fileList = SvgRightDoc.getElementById("fileList");		
			fileList.appendChild(svg_img);	
		}
			
	}
	
//////////////////////////////////上传进度设置////////////////////////////////////////			
			function uploadProgress(evt){				
				if (evt.lengthComputable) {
					var percentage = Math.round((evt.loaded * 100) / evt.total);
					console.log("percentage:" + percentage);
					if (percentage < 100) {
					var test = evt.target;
					//alert(test);
						var pBarID = evt.target.progressbar.id; 
						var pBar_BarTextID = pBarID + "_Bartext"; 
						SvgRightDoc.getElementById(pBarID).setAttributeNS(null,"width",(percentage*bwidth)/100);
						
						SvgRightDoc.getElementById(pBar_BarTextID).firstChild.nodeValue =  "  " + percentage + "%";
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
				SvgRightDoc.getElementById(pBarID).setAttributeNS(null,"width",bwidth);
				SvgRightDoc.getElementById(pBar_BarTextID).firstChild.nodeValue = "  " + "100%";				
				//evt.target.progressbar.firstChild.style.width = "200px";
				//evt.target.progressbar.firstChild.textContent = "100%";
				
				//
				
			}			
			function uploadError(error) {
				alert("error: " + error);
			}
			

	window.addEventListener("load", addDNDListeners, false);			
    	