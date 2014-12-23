//nancy add 0328
//
	var xmlns='http://www.w3.org/2000/svg';
	var xlinkns='http://www.w3.org/1999/xlink';
		
		var done;
		var overlaped;
		var boxlayer =new Array();
		var IDArray = new Array();   //��������id������
		var count;
		var fillout=new Array();		//�����ָ�ͼ��
		var fillnum=0;			//����������ʾ����Ŀ
		String.prototype.Trim  = function(){return this.replace(/^\s+|\s+$/g,"");}
		
		var svgdoc_overlapLeft;
		
		
	function onPageLoad(){
		svgdoc_overlap = window.document.getElementById("svgfile1").getSVGDocument();
		svgdoc_overlapLeft = window.document.getElementById("svgfileLeft").getSVGDocument();
		
		boxlayer[0] = "road";						//��·
		boxlayer[1] = "building";				//����
		boxlayer[2] = "road_buffer";		//��·������
		boxlayer[3] = "innerBounds";		//��������
		boxlayer[4] = "result";					//���
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
				color = obj.target.parentNode.style.getPropertyValue("stroke");//����parentNode��path��g�£�g�ӵ�style
			
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
	/*���÷�����ť������*/
	function onBuffer(){
		canChoose = false;
		onClear();
		done = true;
		var roads = getRoadPaths(svgdoc_overlap.getElementById("road"), 0);
		if (roads == "#"){
			alert('����δѡ���κδ��Ľ��ĵ�·��');
			return;
		}
		alert("��ʼ���㻺����");
		waitting();
		setTimeout(function(){
		//����applet
		var bufferSize = svgdoc_overlapLeft.getElementById("bufferSize").firstChild.nodeValue;
		//alert(bufferSize);
		var ret = document.all.analysisTool.multiLineBuffer(roads, bufferSize).split("%");
		working();
		alert("���㻺�������");
		//alert(ret);
		//road_bufferͼ���doc
		var doc_road_buffer = svgdoc_overlap.getElementById("road_buffer");

		//innerBoundsͼ���doc�����ڴ洢��������
		var doc_innerBounds = svgdoc_overlap.getElementById("innerBounds");
		for (var i=0; i<ret.length; i++){
			var paths = ret[i].split("#");
			alert("��ʾ��׼����SVG��ͼ�ϼ��ص�"+(i+1)+"��������");
			if (paths.length > 1){
			//alert(paths.length);
			//˫������
			var defs = svgdoc_overlap.createElementNS(xmlns,'defs');
			var mask = svgdoc_overlap.createElementNS(xmlns,'mask');
				
			var now = new Date();
			var maskID = "pathmask"+now.getDate()+now.getHours()+now.getMinutes()+now.getSeconds();
			mask.setAttributeNS(null,"id", maskID);
				
			var node1=svgdoc_overlap.createElementNS(xmlns,'path');
			node1.setAttributeNS(null,"fill","#FFF");	
			node1.setAttributeNS(null,"d",paths[0]);//��������Χ��path
			mask.appendChild(node1);
			//�������������ڲ���������
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
	
	/*���÷�����ť������*/
	function onOverlap(){
		/**1 ��ȡ����ͼ��
		 * 2 ����applet��������
		 * 3 ȡ�ü���������ʾ��svg��
		 **/
		if(!done){
			alert("���Ƚ��е�·���������ɣ�");
			return;
		}
		count = 0;
		overlaped = true;
		//ȡ�ø�ͼ�������е�path��dֵ
		var path_layer1 = getPaths(svgdoc_overlap.getElementById("road_buffer"), 1);
		var path_layer2 = getPaths(svgdoc_overlap.getElementById("building"), 2);
		var path_layer3 = getPaths(svgdoc_overlap.getElementById("innerBounds"), 0);
		alert("׼�����е��÷�������ȷ����ʼ���㣡");
		waitting();

		setTimeout(function(){
		//����applet
		var AB = document.all.analysisTool.overlap(path_layer1, path_layer2).split("D");
		working();
		alert("���÷�����ɣ�");
		hideAllLayer();
		var ret1 = AB[0].split("#");
		var ret2 = AB[1].split("#");
		var ret3 = AB[2].split("#");
		var lay_result = svgdoc_overlap.getElementById("result");
		//alert("��----" + ret2.length);
		for (var i=0; i<ret2.length; i++){
			//�ֽ���
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
		//alert("��----" + ret2.length);
		for (var i=0; i<ret3.length; i++){
			//�ֽ���
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
		//alert("��----" + ret1.length);
		for (var i=0; i<ret1.length; i++){
			//�ֽ���
			var tmp = ret1[i];
			//alert(tmp);
			//�������ȫ�ڿն����棬�򲻸�������ʾ
			var i1 = tmp.indexOf("A1");
			var i2 = tmp.indexOf("A2");
			var p = tmp.substring(0, i1);
			var a1 = tmp.substring(i1+3, i2-1);
//			if(a1!=""&&a1!="0"&&a1!=0)
	//			alert(a1);
			var a2 = tmp.substring(i2+3, tmp.length);
			//��������
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
	
	/*��ѯ�������ʾ�������*/
	function onSearch(){
		if(!overlaped){
			alert("���ȵ��÷�����");
			return;
		}
		if(document.getElementById("areaSize").value=="")
		{
			alert("�������������ֵ!");
			return;
		}
		
		Texta = '<br>���н���Ǳ��ҵ�: <form name="ergForm"> <select name="liste" size=10 MULTIPLE> </select><br><p><input type="button" value="��ʾ" onclick="showme(this.form.liste)"><font color=#C0C0C0>��ʾѡ������</font><br><p><input type="button" value="����" onclick="unfillmap()"><font color=#C0C0C0>�������õ�ͼ</font>';
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
				
				//��¼���������ʽ
				markObjectStyle(tmpObj);
				
				highLightObjectStyle(tmpObj);
				
				fillout[fillnum]=str;
				fillnum++;
				//�����ݿ�����ȡ����ϸ��Ϣ����������ʾ��
				
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
		/*�ָ���һ�������ʽ*/
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
	/*��¼������ʽ*/
	function markObjectStyle(obj){
		var d = obj.getAttribute("d");
		//��������û�������ɫ����Ҳ����䣬����Ϊ�˷�ֹ��ҲΪ���򻯡�
		//if(obj.parentNode.style.getPropertyValue("fill")!=""){
		if (!(d.indexOf("z")==-1 && d.indexOf("Z")==-1)){
			//�趨��precolor����Ϊԭ������ɫֵ�����ڻָ���ɫ
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
			//��¼�ߵ���ɫ
			
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
	/*������ʾ�ö���*/
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


	/*����boxlayer����svg��ͼͼ����ʾ*/
	function updateMap(){
		//��ʾǰ������ͼ��building, road
		for (var i=0; i<2; i++){
			//var tmp = svgdoc_overlap.getElementById(boxlayer[i]);
				svgdoc_overlap.getElementById(boxlayer[i]).style.setProperty("visibility", "visible");
			}
		

		
	}
	
	/*��������ͼ��*/
	function hideAllLayer(){
		//����ǰ��������ʱͼ��
		for (var i=0; i<4; i++){
			svgdoc_overlap.getElementById(boxlayer[i]).style.setProperty("visibility", "hidden");
		}
	}
	
	/*�ָ�svgԭʼ״̬*/
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
		//�ָ�ԭ��·����ʽ��
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
	/*����ͼ��ID��ȡ��ͼ�������е�path��dֵ��ʹ�á�#���ָ�*/
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
					//�������ȡ��dֵ,����������ǰ�����ֵҲ����ȥ,������ÿ��path����������,������path
					//��������������attr,��ô������ͬ���ķ�������ȡ�����ֵ,ͬ�������ַ���ƴ�յķ���
					//��������Ϣ����ȥ.
				}
			}
		}
		rst += "#";
		return rst;
	}
	/*ȡ��roadͼ���£�������path����copy�Ժ���getPaths*/
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
					//�������ȡ��dֵ,����������ǰ�����ֵҲ����ȥ,������ÿ��path����������,������path
					//��������������attr,��ô������ͬ���ķ�������ȡ�����ֵ,ͬ�������ַ���ƴ�յķ���
					//��������Ϣ����ȥ.
				}
			}
		}
		rst += "#";
		return rst;
	}		