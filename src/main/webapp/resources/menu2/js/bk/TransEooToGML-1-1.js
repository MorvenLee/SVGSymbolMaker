 var svgDoc;   	

 
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
    		alert("--------clicktest----------");
    	}
    	function handleDrop(evt){
    		alert("-------drop-------");
    		
    		var files = evt.dataTransfer.files;
				evt.stopPropagation();
				evt.preventDefault();
				
				var fileList = document.getElementById("fileList");
				for (var i = 0; i < files.length; i++) {
					var file = files[i];
					var li = document.createElement('li');
					var progressbar = document.createElement('div');
					var img = document.createElement('img');
					var name = document.createElement('span');
					
					progressbar.className = "progressBar";
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
				//alert(test);
				
				//evt.target.progressbar.firstChild.style.width = "200px";
				evt.target.progressbar.firstChild.textContent = "100%";
			}			
			function uploadError(error) {
				alert("error: " + error);
			}
			
    	