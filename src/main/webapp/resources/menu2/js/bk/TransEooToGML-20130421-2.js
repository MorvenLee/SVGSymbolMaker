var svgDoc;   	
var xmlns='http://www.w3.org/2000/svg';
var xlinkns='http://www.w3.org/1999/xlink';
		
var leftBanner = 310;
var	bwidth=130;
var	barheight=20;
 
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
					var progressbar = document.createElementNS(xmlns,"rect");
					var text = document.createElementNS(xmlns,"text");
	
					var li = document.createElement('li');
					//var progressbar = document.createElement('div');
					var img = document.createElement('img');
					var name = document.createElement('span');
					
					document.documentElement.appendChild(group);
					//progressbar.className = "progressBar";
					progressbar.setAttributeNS(null,"className","progressBar");
					
					progressbar.setAttributeNS(null,"x",i*(bwidth+2)+leftBanner);
					progressbar.setAttributeNS(null,"y",i*barheight);
					progressbar.setAttributeNS(null,"width",bwidth);
					progressbar.setAttributeNS(null,"height",barheight);
					progressbar.setAttributeNS(null,"fill","white");
					progressbar.setAttributeNS(null,"stroke","black");
					progressbar.setAttributeNS(null,"opacity",.2);
					group.appendChild(progressbar);
					
					text.setAttributeNS(null,"x",Num*(bwidth+2)+10+leftBanner);
					text.setAttributeNS(null,"y",i*barheight+15);
					text.setAttributeNS(null,"fill","black");
					text.setAttributeNS(null,"font-size",12);
					text.setAttributeNS(null,"font-family","garamond");
					text.setAttributeNS(null,"pointer-events","none");
					group.appendChild(text);					

	var displayText="";
	tv=document.createTextNode(displayText);		
	text.appendChild(tv);
					
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
					document.getElementById("fileList").firstChild.nodeValue = file.name;
					
					
					li.appendChild(img);			
					li.appendChild(name);
					li.appendChild(progressbar);
										
					fileList.appendChild(li);
					uploadFile(file, progressbar)
				}
    	}
    	function uploadFile(file, progressbar) {
				var xhr = new XMLHttpRequest();
				var	upload = xhr.upload;
				
				var p = document.createElement('p');
				p.textContent = "0%";
				progressbar.appendChild(p);
							
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
					var test = evt.target.progressbar.firstChild;
					alert(test);
						//evt.target.progressbar.firstChild.style.width = (percentage*2) + "px";
						evt.target.progressbar.firstChild.textContent = percentage + "%";
					}
				}
			}
			function uploadSucceed(evt) {
				var test = evt.target.progressbar.firstChild;
				alert(test);
				
				//evt.target.progressbar.firstChild.style.width = "200px";
				evt.target.progressbar.firstChild.textContent = "100%";
			}			
			function uploadError(error) {
				alert("error: " + error);
			}
			
    	