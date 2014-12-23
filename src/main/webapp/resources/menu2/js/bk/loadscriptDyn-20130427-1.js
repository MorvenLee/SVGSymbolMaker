function loadScript(url){
   var script = document.createElement("script")
   script.type = "text/javascript";
   if (script.readyState){ //IE
      script.onreadystatechange = function(){
         if (script.readyState == "loaded" ||
            script.readyState == "complete"){
            script.onreadystatechange = null;
            //callback();
         }
      };
   } else { //Others: Firefox, Safari, Chrome, and Opera
      script.onload = function(){
          //callback();
      };
   }
   script.src = url;
   var tmp = document;
   document.documentElement.appendChild(script);
  
}

/*
function callback()
{
	alert("---------callback:" + str);
	
	test();
	alert("---------callback edit:" + str);
}


//var url = "test.js";
//loadScript(url, callback);
*/
