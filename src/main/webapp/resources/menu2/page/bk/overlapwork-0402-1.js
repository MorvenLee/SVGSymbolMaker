//nancy add 0328
//
	var xmlns='http://www.w3.org/2000/svg';
	var xlinkns='http://www.w3.org/1999/xlink';
		var boxlayer; 
		var done;
		
		var svgdoc_overlap;
		var svgdoc_overlapleft;
		var boxLayerStatus; //nancy add 
		
	function onPageLoad(){
		svgdoc_overlap = window.document.getElementById("svgfile1").getSVGDocument();
		svgdoc_overlapleftp = window.document.getElementById("svgfileLeft").getSVGDocument();
		boxlayer = svgdoc_overlapleftp.getElementsByName("ckboxlayer");
		
		var tmp = svgdoc_overlapleftp.svgWnd;
		boxLayerStatus = svgdoc_overlapleftp.svgWnd.sLayerStatusArr;
		
		updateMap();
		done = false;
	}
	
	/*叠置分析按钮处理函数*/
	function onOverlap(){
		/**1 获取两个图层
		 * 2 调用applet函数计算
		 * 3 取得计算结果，显示在svg上
		 **/
		onClear();


		//------------nancy edit 0328---------------------
		var index ;
		var lid ;
		var layerID = new Array();
		var cnt = 0;
		for (var i=0; i<boxLayerStatus.length; i++){
			index = i + 1;
			lid = "layer" + index;
		
			if (boxLayerStatus[i] == true){
				layerID[cnt++] = lid;
			}
		}
		if (cnt < 2){
			alert("不能选择少于2个图层");
			return;
		}
		alert("准备进行叠置分析，请按确定开始计算！");
		waitting();
		
		setTimeout(function(){
		//alert("aaa");
		//alert(layerID[0]);
		//取得该图层下所有的path的d值
		var path_layer1 = getPaths(svgdoc_overlap.getElementById(layerID[0]));
		var path_layer2 = getPaths(svgdoc_overlap.getElementById(layerID[1]));
		
		//alert("bbb");
		var tempres = document.all.analysisTool.overlap(path_layer1, path_layer2);
		//alert("ccc");

		for(var i = 2;i<cnt;i++){
				//tempres += " #";
				var _AB = tempres.split("D");
				var _ret1 = _AB[0].split("#");		//交
				var _ret2 = _AB[1].split("#");		//差
				var _ret3 = _AB[2].split("#");		//差
				tempres = _AB[0] + "#" + _AB[1] + "#" + _AB[2] + "#";
				//alert(tempres);
				var path_layer = getPaths(svgdoc_overlap.getElementById(layerID[i]));
		//		alert(path_layer);
				//tempres = document.all.analysisTool.overlap(tempres, path_layer);       //出错！！，顺序有关系，未查明原因！
				tempres = document.all.analysisTool.overlap(path_layer, tempres);		//新加入图层应该在前面，前一结果图层应该在后面，原因未明！！
		}
		//调用applet
		var AB = tempres.split("D");
		var ret1 = AB[0].split("#");		//交
		var ret2 = AB[1].split("#");		//差
		var ret3 = AB[2].split("#");		//差
		//在图层result上显示结果，同时将另外2个图层隐藏
		hideAllLayer();
		var lay_result = svgdoc_overlap.getElementById("result");
	
//		alert("差是:  " + ret2.length);
		for (var i=0; i<ret2.length; i++){
			//分解结果
			var tmp = ret2[i];
//			alert(tmp);
			var i1 = tmp.indexOf("A1");
			var i2 = tmp.indexOf("A2");
			var p = tmp.substring(0, i1);
			//创建对象
			var path = svgdoc_overlap.createElementNS(xmlns,"path");
			path.setAttributeNS(null,"fill","none");
			path.setAttributeNS(null,"stroke","black");
			path.setAttributeNS(null,"stroke-width","1");
			path.setAttributeNS(null,"d", p);
			path.setAttributeNS(null,"onmouseover", "onOverPolygon(evt, 'red')");
			lay_result.appendChild(path);
		}
//		alert("差是:  " + ret3.length);
//		output.value += ret3;
		for (var i=0; i<ret3.length; i++){
			//分解结果
			var tmp = ret3[i];
			//alert(tmp);
			var i1 = tmp.indexOf("A1");
			var i2 = tmp.indexOf("A2");
			var p = tmp.substring(0, i1);
			//alert(p);
			//创建对象
			var path = svgdoc_overlap.createElementNS(xmlns,"path");
			path.setAttributeNS(null,"fill","none");
			path.setAttributeNS(null,"stroke","black");
			path.setAttributeNS(null,"stroke-width","1");
			path.setAttributeNS(null,"d", p);
			path.setAttributeNS(null,"onmouseover", "onOverPolygon(evt, 'red')");
			lay_result.appendChild(path);
		}
//		alert("交是:  " + ret1.length);
		for (var i=0; i<ret1.length; i++){
			//分解结果
			var tmp = ret1[i];
			var i1 = tmp.indexOf("A1");
			var i2 = tmp.indexOf("A2");
			var p = tmp.substring(0, i1);
			//创建对象
			var path = svgdoc_overlap.createElementNS(xmlns,"path");
			path.setAttributeNS(null,"fill","none");
			path.setAttributeNS(null,"stroke","black");
			path.setAttributeNS(null,"stroke-width","1");
			path.setAttributeNS(null,"d", p);
			path.setAttributeNS(null,"onmouseover", "onOverPolygon(evt, 'red')");
			lay_result.appendChild(path);
		}
		
		working();
		alert("叠置完成！");
		done = true;
		},1);
	}
	
	/*根据boxlayer更新svg地图图层显示*/
	function updateMap(){
	
		/*
		for (var i=0; i<boxlayer.length; i++){
			if (boxlayer[i].checked == true){
				svgdoc_overlap.getElementById(boxlayer[i].value).style.setProperty("visibility", "visible");
			}else{
				svgdoc_overlap.getElementById(boxlayer[i].value).style.setProperty("visibility", "hidden");
			}
		}
		*/
		
		//-------nancy edit 0328-------------		
		var Layerid;
		var index;
		for (var i=0; i<boxLayerStatus.length; i++){
		
			index = i + 1;
			Layerid = "layer" + index;
			if (boxLayerStatus[i] == true){
				svgdoc_overlap.getElementById(Layerid).style.setProperty("visibility", "visible");
			}else{
				svgdoc_overlap.getElementById(Layerid).style.setProperty("visibility", "hidden");
			}
		}
		//		
		
	}
	
	
	/*隐藏所有图层*/
	function hideAllLayer(){
		var Layerid;
		var index;
		for (var i=0; i<boxLayerStatus.length; i++){
			index = i + 1;
			Layerid = "layer" + index;
			svgdoc_overlap.getElementById(Layerid).style.setProperty("visibility", "hidden");
		}
	}
	
	
	/*恢复svg原始状态*/
	function onClear(){
		updateMap();
		var lay_result = svgdoc_overlap.getElementById("result");
		var childs = lay_result.childNodes;
		if (childs.length != 0){
			for (var i=childs.length-1; i>=0; i--){
				var c = childs.item(i);
				if (c.nodeName == "path"){
					//c.setAttribute("fill","yellow");
					//alert(c.getAttribute("A1"));
					lay_result.removeChild(c);
				}
			}
		}
		done = false;
	}
	/*checkbox的选择事件*/
	function onSelect(index,status){
		/*
		if (obj.checked == true){
			svgdoc_overlap.getElementById(obj.value).style.setProperty("visibility", "visible");
		}else
			svgdoc_overlap.getElementById(obj.value).style.setProperty("visibility", "hidden");
		*/
		//-----------nancy edit 0328----------------
		var Layerid = "layer" + index ; 
		if (status == true){
			svgdoc_overlap.getElementById(Layerid).style.setProperty("visibility", "visible");
		}else
			svgdoc_overlap.getElementById(Layerid).style.setProperty("visibility", "hidden");
			
	}
	/*查询分析处理函数*/
	function onQuery(){
		if (!done){
			alert("您还未执行叠置分析，请先运行叠置分析！");
			return false;
		}
		//1 获取查询条件
		var tudi = document.getElementById("tudiInput").value;
		var senlin = document.getElementById("senlinInput").value;
		var tudiV = 0, senlinV = 0;
		var large1 = 0;
		var large2 = 0;

		var i = 0;
		while(i<tudi.length)
		{
			if((tudi.substring(i, i+1)<"0" || tudi.substring(i, i+1)>"9")&&tudi.substring(i, i+1)!="."&&tudi.substring(i, i+1)!=">"&&tudi.substring(i, i+1)!="<")
			{
				alert("土地项输入不合法，请重新输入！");
				return false;
			}
			i++;
		}
		i = 0;
		while(i<senlin.length)
		{
			if((senlin.substring(i, i+1)<"0" || senlin.substring(i, i+1)>"9")&&senlin.substring(i, i+1)!="."&&senlin.substring(i, i+1)!=">"&&senlin.substring(i, i+1)!="<")
			{
				alert("森林项输入不合法，请重新输入！");
				return false;
			}
			i++;
		}
		
		i = tudi.indexOf(">");
		if(i!=-1)
		{
				large1 = 1;
		}
		else
		{
				i = tudi.indexOf("<");
				if(i!=-1)
				{
						large1 = -1;
				}
				else large1 = 0;
		}
		i++;
		while(i<tudi.length&&tudi.substring(i,i+1)==" ")
		{
			i++;
		}
		tudiV = tudi.substring(i, tudi.length);

		i = senlin.indexOf(">");
		if(i!=-1)
		{
				large2 = 1;
		}
		else
		{
				i = senlin.indexOf("<");
				if(i!=-1)
				{
						large2 = -1;
				}
				else large2 = 0;
		}
		i++;
		while(i<senlin.length&&senlin.substring(i,i+1)==" ")
		{
			i++;
		}
		senlinV = senlin.substring(i, senlin.length);
		//判断value的合法性
		//...
		
		
		//2 遍历,查询符合条件的path
		var lay_result = svgdoc_overlap.getElementById("result");
		var childs = lay_result.childNodes;
		if (childs.length != 0){
			for (var i=childs.length-1; i>=0; i--){
				var c = childs.item(i);
				if (c.nodeName == "path"){
					var a1 = c.getAttribute("A1");
					var a2 = c.getAttribute("A2");
	
					if (parseFloat(a1) >= parseFloat(tudiV) && large1==1 && parseFloat(a2) >= parseFloat(senlinV) && large2==1 ||
							parseFloat(a1) >= parseFloat(tudiV) && large1==1 && parseFloat(a2) <= parseFloat(senlinV) && large2==-1 ||
							parseFloat(a1) <= parseFloat(tudiV) && large1==-1 && parseFloat(a2) >= parseFloat(senlinV) && large2==1 ||
							parseFloat(a1) <= parseFloat(tudiV) && large1==-1 && parseFloat(a2) <= parseFloat(senlinV) && large2==-1 ||
							parseFloat(a1) == parseFloat(tudiV) && large1==0 && parseFloat(a2) >= parseFloat(senlinV) && large2==1 ||
							parseFloat(a1) == parseFloat(tudiV) && large1==0 && parseFloat(a2) <= parseFloat(senlinV) && large2==-1 ||
							parseFloat(a1) >= parseFloat(tudiV) && large1==1 && parseFloat(a2) == parseFloat(senlinV) && large2==0 ||
							parseFloat(a1) <= parseFloat(tudiV) && large1==-1 && parseFloat(a2) == parseFloat(senlinV) && large2==0 ||
							parseFloat(a1) == parseFloat(tudiV) && large1==0 && parseFloat(a2) == parseFloat(senlinV) && large2==0 
							){
						c.setAttribute("fill","green");
						
					}else{
						c.setAttribute("fill","white");
					}
					c.setAttribute("onmouseover", "");
				}
			}
		}
		return false;
		
	}
	/*根据图层ID获取该图层下所有的path的d值，使用“#”分割*/
	function getPaths(father){
		var rst = "";
		var childs = father.childNodes;
		if (childs.length != 0){
			for (var i=0; i<childs.length; i++){
				var c = childs.item(i);
				if (c.nodeName == "path"){
					if (rst != "")
						rst += "# ";
					rst += c.getAttribute("d");
					rst += " A1 1 ";

					rst += " A2 1 ";

					//这里仅仅取出d值,但是如果考虑把属性值也传过去,可以在每个path上设置属性,比如在path
					//上增加属性名叫attr,那么用上面同样的方法可以取出这个值,同样采用字符串拼凑的方法
					//把属性信息传过去.
				}
			}
		}
		rst += "#";
		return rst;
	}