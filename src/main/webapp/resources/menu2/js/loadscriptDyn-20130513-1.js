function loadScr(url,ID){
   var script = document.createElement("script")
   script.type = "text/javascript";
   //script.id = "transE00ToGml";
   script.id = ID;
   if (script.readyState){ //IE
      script.onreadystatechange = function(){
         if (script.readyState == "loaded" ||
            script.readyState == "complete"){
            script.onreadystatechange = null;
            //callback();
            init_subDoc();
         }
      };
   } else { //Others: Firefox, Safari, Chrome, and Opera
      script.onload = function(){
          //callback();
          init_subDoc();
      };
   }
   script.src = url;
   var tmp = document;
   //document.documentElement.appendChild(script);
   window.parent.document.documentElement.appendChild(script);
  
}

function RemoveScr(ID){ //ID为script标签的ID
	try{
		var id  = getScrId(ID);//id对应的document对象
		if(id)
			window.parent.document.documentElement.removeChild(id);//删除ID的对应标签
	}
	catch(e){}
}

//获取id对应的document对象
function getScrId(id) {//所有的情况都列出来了 不会出错··呵呵
    if (window.parent.document.getElementById) return window.parent.document.getElementById(id);
    else if (window.parent.document.all) return window.parent.window.parent.document.all[id]; 
    else if (window.parent.document.layers) return window.parent.document.layers[id];
    else {return null;}
}

function init_subDoc()
{
	initPara();//初始化html中的参数
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
