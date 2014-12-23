//nancy add 0328
//
	var xmlns='http://www.w3.org/2000/svg';
	var xlinkns='http://www.w3.org/1999/xlink';
		
		var done;
		var overlaped;
		var boxlayer =new Array();
		var IDArray = new Array();   //用来保存id的数组
		var count;
		var fillout=new Array();		//用来恢复图层
		var fillnum=0;			//描述高亮显示的数目
		String.prototype.Trim  = function(){return this.replace(/^\s+|\s+$/g,"");}
		
		var svgdoc_overlapLeft;
		
		
	function onPageLoad(){
		svgdoc_overlap = window.document.getElementById("svgfile1").getSVGDocument();
		svgdoc_overlapLeft = window.document.getElementById("svgfileLeft").getSVGDocument();
		
		boxlayer[0] = "road";						//道路
		boxlayer[1] = "building";				//建筑
		boxlayer[2] = "road_buffer";		//道路缓冲区
		boxlayer[3] = "innerBounds";		//岛屿多边形
		boxlayer[4] = "result";					//结果
		count = 0;
		updateMap();
		done = false;
		overlaped = false;
	}
	
	
	var canChoose = false;
	function initChooseRoad(){
		//document.all.Layer1.innerHTML='';
		onClear();
		canChoose = true;
	}
	
	function selectRoad(obj){
		if (canChoose){
		//------------nancy edit 0329-----------
			var color = obj.target.style.getPropertyValue("stroke");
			if(color==null)		
				color = obj.target.parentNode.style.getPropertyValue("stroke");//加上parentNode，path在g下，g加的style
			
			if (color == "blue" || color == "#0000ff"){
				obj.target.style.setProperty("stroke", "red");
				obj.target.style.setProperty("stroke-width", "12");
			}
			else{
				obj.target.style.setProperty("stroke", "blue");
				obj.target.style.setProperty("stroke-width", "10");
			}
		}
	}
	/*叠置分析按钮处理函数*/
	function onBuffer(){
		canChoose = false;
		onClear();
		done = true;
		var roads = getRoadPaths(svgdoc_overlap.getElementById("road"), 0);
		if (roads == "#"){
			alert('您尚未选择任何待改建的道路。');
			return;
		}
		alert("开始计算缓冲区");
		waitting();
		setTimeout(function(){
		//调用applet
		var bufferSize = svgdoc_overlapLeft.getElementById("bufferSize").firstChild.nodeValue;
		//alert(bufferSize);
		var ret = document.all.analysisTool.multiLineBuffer(roads, bufferSize).split("%");
		working();
		alert("计算缓冲区完成");
		//alert(ret);
		//road_buffer图层的doc
		var doc_road_buffer = svgdoc_overlap.getElementById("road_buffer");

		//innerBounds图层的doc，用于存储岛屿多边形
		var doc_innerBounds = svgdoc_overlap.getElementById("innerBounds");
		for (var i=0; i<ret.length; i++){
			var paths = ret[i].split("#");
			alert("提示：准备往SVG地图上加载第"+(i+1)+"个缓冲区");
			if (paths.length > 1){
			//alert(paths.length);
			//双缓冲区
			var defs = svgdoc_overlap.createElementNS(xmlns,'defs');
			var mask = svgdoc_overlap.createElementNS(xmlns,'mask');
				
			var now = new Date();
			var maskID = "pathmask"+now.getDate()+now.getHours()+now.getMinutes()+now.getSeconds();
			mask.setAttributeNS(null,"id", maskID);
				
			var node1=svgdoc_overlap.createElementNS(xmlns,'path');
			node1.setAttributeNS(null,"fill","#FFF");	
			node1.setAttributeNS(null,"d",paths[0]);//创建最外围的path
			mask.appendChild(node1);
			//创建缓冲区的内部岛屿区域
			for (var j=1; j<paths.length; j++){
				var node11=svgdoc_overlap.createElementNS(xmlns,'path');
				node11.setAttributeNS(null,"fill","#000");
				node11.setAttributeNS(null,"d",paths[j]);	
				mask.appendChild(node11);
				var t=svgdoc_overlap.createElementNS(xmlns,'path');
				t.setAttributeNS(null,"fill","#000");
				t.setAttributeNS(null,"d",paths[j]);	
				doc_innerBounds.appendChild(t);
			}
			defs.appendChild(mask);
			
			var node2=svgdoc_overlap.createElementNS(xmlns,'path');
			node2.setAttributeNS(null,"fill","red");
			node2.setAttributeNS(null,"style","opacity:0.5;");
			node2.setAttributeNS(null,"d",paths[0]);	
			node2.setAttributeNS(null,"mask","url(#"+maskID+")");
			doc_road_buffer.appendChild(node2);
			doc_road_buffer.appendChild(defs);
			
			}else{
				var node2=svgdoc_overlap.createElementNS(xmlns,'path');
				node2.setAttributeNS(null,"fill","red");
				node2.setAttributeNS(null,"style","opacity:0.5;");
				node2.setAttributeNS(null,"d",paths[0]);	
				doc_road_buffer.appendChild(node2);
			}
		}
		},1);
		
	}
	
	/*叠置分析按钮处理函数*/
	function onOverlap(){
		/**1 获取两个图层
		 * 2 调用applet函数计算
		 * 3 取得计算结果，显示在svg上
		 **/
		if(!done){
			alert("请先进行道路缓冲区生成！");
			return;
		}
		count = 0;
		overlaped = true;
		//取得该图层下所有的path的d值
		var path_layer1 = getPaths(svgdoc_overlap.getElementById("road_buffer"), 1);
		var path_layer2 = getPaths(svgdoc_overlap.getElementById("building"), 2);
		var path_layer3 = getPaths(svgdoc_overlap.getElementById("innerBounds"), 0);
		alert("准备进行叠置分析，按确定开始计算！");
		waitting();

		setTimeout(function(){
		//调用applet
		var AB = document.all.analysisTool.overlap(path_layer1, path_layer2).split("D");
		working();
		alert("叠置分析完成！");
		hideAllLayer();
		var ret1 = AB[0].split("#");
		var ret2 = AB[1].split("#");
		var ret3 = AB[2].split("#");
		var lay_result = svgdoc_overlap.getElementById("result");
		//alert("差----" + ret2.length);
		for (var i=0; i<ret2.length; i++){
			//分解结果
			var tmp = ret2[i];
			//alert(tmp);
			var i1 = tmp.indexOf("A1");
			var i2 = tmp.indexOf("A2");
			var p = tmp.substring(0, i1);
			var a1 = tmp.substring(i1+2, i2);
			var a2 = tmp.substring(i2+2, tmp.length);
			var path = svgdoc_overlap.createElementNS(xmlns,"path");
		//	path.setAttributeNS(null,"fill","none");
			path.setAttributeNS(null,"fill","green");
			path.setAttributeNS(null,"stroke","black");
			path.setAttributeNS(null,"stroke-width","2");
			path.setAttributeNS(null,"fill-opacity", "0.2");
			path.setAttributeNS(null,"d", p);
			path.setAttributeNS(null,"A1", a1);
			path.setAttributeNS(null,"A2", a2);
			//path.setAttributeNS(null,"onmouseover", "onOverPolygon(evt, 'red')");
			lay_result.appendChild(path);
		}
		//alert("差----" + ret2.length);
		for (var i=0; i<ret3.length; i++){
			//分解结果
			var tmp = ret3[i];
			//alert(tmp);
			var i1 = tmp.indexOf("A1");
			var i2 = tmp.indexOf("A2");
			var p = tmp.substring(0, i1);
			var a1 = tmp.substring(i1+2, i2);
			var a2 = tmp.substring(i2+2, tmp.length);
			var path = svgdoc_overlap.createElementNS(xmlns,"path");
//			path.setAttributeNS(null,"fill","none");
			path.setAttributeNS(null,"fill","green");
			path.setAttributeNS(null,"stroke","black");
			path.setAttributeNS(null,"stroke-width","2");
			path.setAttributeNS(null,"fill-opacity", "0.2");
			path.setAttributeNS(null,"d", p);
			path.setAttributeNS(null,"A1", a1);
			path.setAttributeNS(null,"A2", a2);
			//path.setAttributeNS(null,"onmouseover", "onOverPolygon(evt, 'red')");
			lay_result.appendChild(path);
		}
		//alert("交----" + ret1.length);
		for (var i=0; i<ret1.length; i++){
			//分解结果
			var tmp = ret1[i];
			//alert(tmp);
			//如果交完全在空洞里面，则不高亮度显示
			var i1 = tmp.indexOf("A1");
			var i2 = tmp.indexOf("A2");
			var p = tmp.substring(0, i1);
			var a1 = tmp.substring(i1+3, i2-1);
//			if(a1!=""&&a1!="0"&&a1!=0)
	//			alert(a1);
			var a2 = tmp.substring(i2+3, tmp.length);
			//创建对象
			var path = svgdoc_overlap.createElementNS(xmlns,"path");

			if(document.all.analysisTool.PolygonInPolygons(p, path_layer3)){
				path.setAttributeNS(null,"fill","none");
			}
			else{
				path.setAttributeNS(null,"fill","red");
				IDArray[count++] = new Array();
				IDArray[count-1][0] = a1;
				IDArray[count-1][1] = a2;
			}			
			path.setAttributeNS(null,"stroke","black");
			path.setAttributeNS(null,"stroke-width","1");
			path.setAttributeNS(null,"d", p);
			path.setAttributeNS(null,"A1", a1);
			path.setAttributeNS(null,"A2", a2);
			//path.setAttributeNS(null,"onmouseover", "onOverPolygon(evt, 'red')");
			lay_result.appendChild(path);
		}
		},1);
	}
	
	/*查询结果，显示结果区域*/
	function onSearch(){
		if(!overlaped){
			alert("请先叠置分析！");
			return;
		}
		if(document.getElementById("areaSize").value=="")
		{
			alert("请先输入面积阈值!");
			return;
		}
		
		Texta = '<br>下列结果是被找到: <form name="ergForm"> <select name="liste" size=10 MULTIPLE> </select><br><p><input type="button" value="显示" onclick="showme(this.form.liste)"><font color=#C0C0C0>显示选中区域</font><br><p><input type="button" value="重置" onclick="unfillmap()"><font color=#C0C0C0>重新设置地图</font>';
		document.all.Layer1.innerHTML = Texta;
		var t = 0;
		for(j = 0; j < count; j++)
		{
			var value = document.getElementById("areaSize").value;
			if(parseInt(IDArray[j][1])>=parseInt(value)){
				//alert(IDArray[j][1]);
				//alert(value);
				var str = "_autoID_";
				str += IDArray[j][0];
				NeuerEintrag = new Option(str);
				document.all.ergForm.liste.options[t++] = NeuerEintrag;	
			}
		}
	}
	
	function showme(list1)
	{
		//unfillmap();
		for (i = 0; i < list1.length; i++)
		{
			if(list1[i].selected)
			{	
				var str = "_autoID_";
				str += IDArray[i][0];
			   if(str.Trim()=="")
				   return;

				var tmpObj = svgfile1.getSVGDocument().getElementById(str);
				
				//记录本对象的样式
				markObjectStyle(tmpObj);
				
				highLightObjectStyle(tmpObj);
				
				fillout[fillnum]=str;
				fillnum++;
				//从数据库中提取其详细信息，并进行显示。
				
			}
		} 
	}
	function unfillmap()
	{
		var obj;
		for(iCount=0;iCount<fillout.length;iCount++)
		{
			obj = svgfile1.getSVGDocument().getElementById(fillout[iCount]);
			obj.style.setProperty("stroke",obj.parentNode.style.getPropertyValue("stroke"));
			obj.style.setProperty("stroke-width",obj.parentNode.style.getPropertyValue("stroke-width"));
			if(obj.parentNode.style.getPropertyValue("fill")=="none")
			{
				obj.style.setProperty("fill","none");
			}
			else
			{
				obj.style.setProperty("fill",obj.getAttribute('precolor'));
			
			}
			//svgfile1.getSVGDocument().getElementById(fillout[iCount]).style.setProperty("fill","green");
	
		}
		fillout=new Array();	
		fillnum=0;	
	
	}
		/*恢复上一对象的样式*/
	function clearPreObjectStyle(){
		if(curid!=""){
			var d = curid.getAttribute("d");
			if (!(d.indexOf("z")==-1 && d.indexOf("Z")==-1)){
				curid.style.setProperty("fill",curid.getAttribute('precolor'));
			}else{
				curid.style.setProperty("stroke",curid.getAttribute('preStrokeColor'));
			}
		}
	}
	/*记录对象样式*/
	function markObjectStyle(obj){
		var d = obj.getAttribute("d");
		//如果本身就没有填充颜色，则也不填充，这是为了防止线也为区域化。
		//if(obj.parentNode.style.getPropertyValue("fill")!=""){
		if (!(d.indexOf("z")==-1 && d.indexOf("Z")==-1)){
			//设定其precolor属性为原来的颜色值，用于恢复颜色
			if (obj.style.getPropertyValue("fill") == ""){
				if (obj.parentNode.style.getPropertyValue("fill") == "")
					obj.style.setProperty("fill","white");
				else
					obj.style.setProperty("fill",obj.parentNode.style.getPropertyValue("fill"));
			}
			if (obj.getAttribute('precolor') == ""){
				obj.setAttribute('precolor',obj.style.getPropertyValue("fill"));	
			}
		}else{
			//记录线的颜色
			
			if (obj.style.getPropertyValue("stroke") == ""){
				if (obj.parentNode.style.getPropertyValue("stroke") == "")
					obj.style.setProperty("stroke","black");
				else
					obj.style.setProperty("stroke",obj.parentNode.style.getPropertyValue("stroke"));
			}
			if (obj.getAttribute('preStrokeColor') == ""){
				obj.setAttribute('preStrokeColor',obj.style.getPropertyValue("stroke"));	
			}
		}
	}
	/*高亮显示该对象*/
	function highLightObjectStyle(obj){
		var d = obj.getAttribute("d");
		if (!(d.indexOf("z")==-1 && d.indexOf("Z")==-1)){
			obj.style.setProperty("fill","red");
			obj.style.setProperty("opacity",0.7);
		}else{
			obj.style.setProperty("stroke","red");
			obj.style.setProperty("opacity",1);
		}
	}


	/*根据boxlayer更新svg地图图层显示*/
	function updateMap(){
		//显示前面两个图层building, road
		for (var i=0; i<2; i++){
			//var tmp = svgdoc_overlap.getElementById(boxlayer[i]);
				svgdoc_overlap.getElementById(boxlayer[i]).style.setProperty("visibility", "visible");
			}
		

		
	}
	
	/*隐藏所有图层*/
	function hideAllLayer(){
		//隐藏前面三个临时图层
		for (var i=0; i<4; i++){
			svgdoc_overlap.getElementById(boxlayer[i]).style.setProperty("visibility", "hidden");
		}
	}
	
	/*恢复svg原始状态*/
	function onClear(){
		updateMap();
		
		var mainG = svgdoc_overlap.getElementById("mainG");
		mainG.removeChild(svgdoc_overlap.getElementById("result"));
		var g1 = svgdoc_overlap.createElementNS(xmlns,"g");
		g1.setAttributeNS(null,"id", "result");
		mainG.appendChild(g1);
		
		mainG.removeChild(svgdoc_overlap.getElementById("road_buffer"));
		var g1 = svgdoc_overlap.createElementNS(xmlns,"g");
		g1.setAttributeNS(null,"id", "road_buffer");
		mainG.appendChild(g1);
		
		mainG.removeChild(svgdoc_overlap.getElementById("innerBounds"));
		var g1 = svgdoc_overlap.createElementNS(xmlns,"g");
		g1.setAttributeNS(null,"id", "innerBounds");
		g1.style.setProperty("visibility", "hidden");
		mainG.appendChild(g1);

		canChoose = false;
		done = false;
	}
	function recoverRoad(){
		//恢复原道路的样式。
		var lay_road = svgdoc_overlap.getElementById("road");
		var childs = lay_road.childNodes;
		if (childs.length != 0){
			for (var i=childs.length-1; i>=0; i--){
				var c = childs.item(i);
				if (c.nodeName == "path" && c.style.getPropertyValue("stroke")=="red"){
					c.style.setProperty("stroke", "blue");
					c.style.setProperty("stroke-width", "4");
				}
			}
		}
	}
	/*根据图层ID获取该图层下所有的path的d值，使用“#”分割*/
	function getPaths(father, flag){
		var rst = "";
		var childs = father.childNodes;
		if (childs.length != 0){
			for (var i=0; i<childs.length; i++){
				var c = childs.item(i);
				if (c.nodeName == "path"){
					if (rst != "")
						rst += "#";
					rst += c.getAttribute("d");
					if (flag==1){
						rst += " A1 0 A2 0 ";
					}
					else if(flag==2){
						var x1 = c.getAttribute("X1");
						var y1 = c.getAttribute("Y1");
						var x2 = c.getAttribute("X2");
						var y2 = c.getAttribute("Y2");
						var area = (x2-x1)*(y2-y1);
						var str = "";
						str +=area;
						rst += " A1 ";
						var IDstr = c.getAttribute("id");
						if(IDstr=="")
							rst += 0;
						else{
							rst += IDstr.substring(8);
						}
						rst += " A2 ";
						var pos1 = str.indexOf(".");
						if(pos1==-1)
							rst += str;
						else rst += str.substring(0, pos1);
						rst += " ";
					}
					//这里仅仅取出d值,但是如果考虑把属性值也传过去,可以在每个path上设置属性,比如在path
					//上增加属性名叫attr,那么用上面同样的方法可以取出这个值,同样采用字符串拼凑的方法
					//把属性信息传过去.
				}
			}
		}
		rst += "#";
		return rst;
	}
	/*取得road图层下，高亮的path，简单copy自函数getPaths*/
	function getRoadPaths(father, flag){
		var rst = "";
		var childs = father.childNodes;
		if (childs.length != 0){
			for (var i=0; i<childs.length; i++){
				var c = childs.item(i);
				var color;
				if(c.style!=null)
				{
					color = c.style.getPropertyValue("stroke");
				}
				
				if(color==null || color=="")
					color = c.parentNode.style.getPropertyValue("stroke");
							
				if (c.nodeName == "path" && ( color=="red" || color=="#ff0000")){
					if (rst != "")
						rst += "#";
					rst += c.getAttribute("d");
					if (flag==1){
						rst += " A1 0 A2 0 ";
					}
					else if(flag==2){
						var x1 = c.getAttribute("X1");
						var y1 = c.getAttribute("Y1");
						var x2 = c.getAttribute("X2");
						var y2 = c.getAttribute("Y2");
						var area = (x2-x1)*(y2-y1);
						var str = "";
						str +=area;
						rst += " A1 ";
						var IDstr = c.getAttribute("id");
						if(IDstr=="")
							rst += 0;
						else{
							rst += IDstr.substring(8);
						}
						rst += " A2 ";
						var pos1 = str.indexOf(".");
						if(pos1==-1)
							rst += str;
						else rst += str.substring(0, pos1);
						rst += " ";
					}
					//这里仅仅取出d值,但是如果考虑把属性值也传过去,可以在每个path上设置属性,比如在path
					//上增加属性名叫attr,那么用上面同样的方法可以取出这个值,同样采用字符串拼凑的方法
					//把属性信息传过去.
				}
			}
		}
		rst += "#";
		return rst;
	}		