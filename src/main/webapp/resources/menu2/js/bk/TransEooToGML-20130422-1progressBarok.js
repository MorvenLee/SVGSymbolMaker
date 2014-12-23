var svgDoc;   	
var xmlns='http://www.w3.org/2000/svg';
var xlinkns='http://www.w3.org/1999/xlink';
		
var leftBanner = 310;
var	bwidth=130;
var	barheight=20;
var TopGapH = 236;
 
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
					//fileList.innerHTML ='';
					document.getElementById("fileList").firstChild.nodeValue = "";
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
				for (var i = 0; i < files.length; i++) {
					var file = files[i];
					var group = document.createElementNS(xmlns,"g");
					var progressbgRect = document.createElementNS(xmlns,"rect");
					var progressbar = document.createElementNS(xmlns,"rect");
					var text = document.createElementNS(xmlns,"text");
	
					//var li = document.createElement('li');
					//var progressbar = document.createElement('div');
					var img = document.createElement('img');
					
					document.documentElement.appendChild(group);
					//progressbar.className = "progressBar";

					progressbgRect.setAttributeNS(null,"x",180);
					progressbgRect.setAttributeNS(null,"y",i*barheight + TopGapH);
					progressbgRect.setAttributeNS(null,"width",bwidth);
					progressbgRect.setAttributeNS(null,"height",barheight);
					progressbgRect.setAttributeNS(null,"fill","white");
					progressbgRect.setAttributeNS(null,"stroke","black");
					progressbgRect.setAttributeNS(null,"stroke-width","2");
					progressbgRect.setAttributeNS(null,"opacity",.5);
					group.appendChild(progressbgRect);	
					
					var pBarID = "pBar_" + i;
					progressbar.setAttributeNS(null,"id",pBarID);
					progressbar.setAttributeNS(null,"x",180);
					progressbar.setAttributeNS(null,"y",i*barheight + TopGapH);
					progressbar.setAttributeNS(null,"width",0);
					progressbar.setAttributeNS(null,"height",barheight);
					progressbar.setAttributeNS(null,"fill","green");
					progressbar.setAttributeNS(null,"stroke","white");
					progressbar.setAttributeNS(null,"stroke-width","1");
					progressbar.setAttributeNS(null,"opacity",.5);
					group.appendChild(progressbar);
					
					var pBar_TextID = pBarID + "_text"; 
					text.setAttributeNS(null,"id",pBar_TextID);
					text.setAttributeNS(null,"x",180);
					text.setAttributeNS(null,"y",i*barheight+15 + TopGapH);
					text.setAttributeNS(null,"fill","blue");
					text.setAttributeNS(null,"stroke","blue");
					text.setAttributeNS(null,"font-size",15);
					text.setAttributeNS(null,"font-family","garamond");
					text.setAttributeNS(null,"pointer-events","none");
					group.appendChild(text);					


					
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
					//name.innerHTML = file.name;
					//document.getElementById("fileList").firstChild.nodeValue = file.name;
					document.getElementById("inputchange").firstChild.nodeValue = file.name;
					
	var displayText = file.name;
	tv=document.createTextNode(displayText);		
	text.appendChild(tv);
					
					//li.appendChild(img);			
										
					//fileList.appendChild(li);
					uploadFile(file, progressbar)
				}
    	}
    	function uploadFile(file, progressbar) {
				var xhr = new XMLHttpRequest();
				var	upload = xhr.upload;
				
				//var p = document.createElement('p');
				//p.textContent = "0%";
				//progressbar.appendChild(p);
							
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
						var pBar_TextID = pBarID + "_text"; 
						document.getElementById(pBarID).setAttributeNS(null,"width",(percentage*bwidth)/100);
						
						var info = document.getElementById("inputchange").firstChild.nodeValue ;
						document.getElementById(pBar_TextID).firstChild.nodeValue = info + "  " + percentage + "%";
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
				var pBar_TextID = pBarID + "_text"; 
				document.getElementById(pBarID).setAttributeNS(null,"width",bwidth);
				
				var info = document.getElementById("inputchange").firstChild.nodeValue ;
				document.getElementById(pBar_TextID).firstChild.nodeValue = info + "  " + "100%";				
				//evt.target.progressbar.firstChild.style.width = "200px";
				//evt.target.progressbar.firstChild.textContent = "100%";
			}			
			function uploadError(error) {
				alert("error: " + error);
			}
			

			
    	