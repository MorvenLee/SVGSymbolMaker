var svgDoc;   	
var xmlns='http://www.w3.org/2000/svg';
var xlinkns='http://www.w3.org/1999/xlink';
		
var leftBanner = 110;
var	bwidth=200;
var	barheight=20;
var textheight = 20;
var recordHeight = 50; 

var TopGapH = 206;
 
 	function initPara(evt)
 	{
 	 	svgDoc = evt.target.ownerDocument;  
 	 	//alert(svgDoc);
 	 	//svgDoc.addEventListener("load", addDNDListeners, false);
 	 	document.getElementById("SvgLev1").addEventListener("load", addDNDListeners, false);
 	 	//document.addEventListener("load",addDNDListeners,false);
 	 	addDNDListeners();
 	 	//alert("aaaaaaaa");

 	}
    	
    	
    	function addDNDListeners(){
    		//alert("bbbbbb");
    		var container = document.getElementById("RectContainer");
				var fileList = document.getElementById("fileList");
				//alert("ccccccccccc");
				
				
				
				container.addEventListener("dragenter", function(evt){
					//alert("dddddddd");
					//清空原数据
					var UpTopgObj = document.getElementById("UpTopg");
					fileList.removeChild(UpTopgObj);
					
					
					evt.stopPropagation();
					evt.preventDefault();
					}, false);
				container.addEventListener("dragover", function(evt){
					evt.stopPropagation();
					evt.preventDefault();
					}, false);
				container.addEventListener("drop", handleDrop, false);
				container.addEventListener("click", clicktest, false);
    	}
    	
    	
    	function clicktest(evt)
    	{
    		//alert("--------clicktest----------");
    	}
    	function handleDrop(evt){

    		//alert("-------drop-------");
    		
    		var files = evt.dataTransfer.files;
				evt.stopPropagation();
				evt.preventDefault();
				
				var fileList = document.getElementById("fileList");
				var TopGroup = document.createElementNS(xmlns,"g");
				TopGroup.setAttributeNS(null,"id","UpTopg");
				fileList.appendChild(TopGroup);
				
				
				for (var i = 0; i < files.length; i++) {
					var file = files[i];
					var group = document.createElementNS(xmlns,"g");
					var progressbgRect = document.createElementNS(xmlns,"rect");
					var progressbar = document.createElementNS(xmlns,"rect");
					var BarText = document.createElementNS(xmlns,"text");
					var FileNameText = document.createElementNS(xmlns,"text");
	
					var img = document.createElement('img');
					
					//document.documentElement.appendChild(group);
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

					document.getElementById("inputchange").firstChild.nodeValue = file.name;
					
	var displayText = file.name;
	tv=document.createTextNode(displayText);		
	FileNameText.appendChild(tv);
	
	var displayText = "";
	tv=document.createTextNode(displayText);		
	BarText.appendChild(tv);	
					
					//li.appendChild(img);			
										
					uploadFile(file, progressbar)
				}
    	}
    	function uploadFile(file, progressbar) {
				var xhr = new XMLHttpRequest();
				var	upload = xhr.upload;
				
							
				upload.progressbar = progressbar;				
				upload.addEventListener("progress", uploadProgress, false);
				upload.addEventListener("load", uploadSucceed, false);
				upload.addEventListener("error", uploadError, false);

				xhr.open("POST", "../../dataProcess/DragUpload.jsp?fileName="+file.name);
				xhr.overrideMimeType("application/octet-stream");

				//xhr.sendAsBinary(file.getAsBinary());//chrome不支持
				if ("getAsBinary" in file) {
                //FF 3.5+
					xhr.sendAsBinary(file.getAsBinary());
			   } else {
				  xhr.send(file);
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
						document.getElementById(pBarID).setAttributeNS(null,"width",(percentage*bwidth)/100);
						
						document.getElementById(pBar_BarTextID).firstChild.nodeValue =  "  " + percentage + "%";
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
				document.getElementById(pBarID).setAttributeNS(null,"width",bwidth);
				document.getElementById(pBar_BarTextID).firstChild.nodeValue = "  " + "100%";				
				//evt.target.progressbar.firstChild.style.width = "200px";
				//evt.target.progressbar.firstChild.textContent = "100%";
			}			
			function uploadError(error) {
				alert("error: " + error);
			}
			

			
    	