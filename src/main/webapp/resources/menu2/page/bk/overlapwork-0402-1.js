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
	
	/*���÷�����ť������*/
	function onOverlap(){
		/**1 ��ȡ����ͼ��
		 * 2 ����applet��������
		 * 3 ȡ�ü���������ʾ��svg��
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
			alert("����ѡ������2��ͼ��");
			return;
		}
		alert("׼�����е��÷������밴ȷ����ʼ���㣡");
		waitting();
		
		setTimeout(function(){
		//alert("aaa");
		//alert(layerID[0]);
		//ȡ�ø�ͼ�������е�path��dֵ
		var path_layer1 = getPaths(svgdoc_overlap.getElementById(layerID[0]));
		var path_layer2 = getPaths(svgdoc_overlap.getElementById(layerID[1]));
		
		//alert("bbb");
		var tempres = document.all.analysisTool.overlap(path_layer1, path_layer2);
		//alert("ccc");

		for(var i = 2;i<cnt;i++){
				//tempres += " #";
				var _AB = tempres.split("D");
				var _ret1 = _AB[0].split("#");		//��
				var _ret2 = _AB[1].split("#");		//��
				var _ret3 = _AB[2].split("#");		//��
				tempres = _AB[0] + "#" + _AB[1] + "#" + _AB[2] + "#";
				//alert(tempres);
				var path_layer = getPaths(svgdoc_overlap.getElementById(layerID[i]));
		//		alert(path_layer);
				//tempres = document.all.analysisTool.overlap(tempres, path_layer);       //��������˳���й�ϵ��δ����ԭ��
				tempres = document.all.analysisTool.overlap(path_layer, tempres);		//�¼���ͼ��Ӧ����ǰ�棬ǰһ���ͼ��Ӧ���ں��棬ԭ��δ������
		}
		//����applet
		var AB = tempres.split("D");
		var ret1 = AB[0].split("#");		//��
		var ret2 = AB[1].split("#");		//��
		var ret3 = AB[2].split("#");		//��
		//��ͼ��result����ʾ�����ͬʱ������2��ͼ������
		hideAllLayer();
		var lay_result = svgdoc_overlap.getElementById("result");
	
//		alert("����:  " + ret2.length);
		for (var i=0; i<ret2.length; i++){
			//�ֽ���
			var tmp = ret2[i];
//			alert(tmp);
			var i1 = tmp.indexOf("A1");
			var i2 = tmp.indexOf("A2");
			var p = tmp.substring(0, i1);
			//��������
			var path = svgdoc_overlap.createElementNS(xmlns,"path");
			path.setAttributeNS(null,"fill","none");
			path.setAttributeNS(null,"stroke","black");
			path.setAttributeNS(null,"stroke-width","1");
			path.setAttributeNS(null,"d", p);
			path.setAttributeNS(null,"onmouseover", "onOverPolygon(evt, 'red')");
			lay_result.appendChild(path);
		}
//		alert("����:  " + ret3.length);
//		output.value += ret3;
		for (var i=0; i<ret3.length; i++){
			//�ֽ���
			var tmp = ret3[i];
			//alert(tmp);
			var i1 = tmp.indexOf("A1");
			var i2 = tmp.indexOf("A2");
			var p = tmp.substring(0, i1);
			//alert(p);
			//��������
			var path = svgdoc_overlap.createElementNS(xmlns,"path");
			path.setAttributeNS(null,"fill","none");
			path.setAttributeNS(null,"stroke","black");
			path.setAttributeNS(null,"stroke-width","1");
			path.setAttributeNS(null,"d", p);
			path.setAttributeNS(null,"onmouseover", "onOverPolygon(evt, 'red')");
			lay_result.appendChild(path);
		}
//		alert("����:  " + ret1.length);
		for (var i=0; i<ret1.length; i++){
			//�ֽ���
			var tmp = ret1[i];
			var i1 = tmp.indexOf("A1");
			var i2 = tmp.indexOf("A2");
			var p = tmp.substring(0, i1);
			//��������
			var path = svgdoc_overlap.createElementNS(xmlns,"path");
			path.setAttributeNS(null,"fill","none");
			path.setAttributeNS(null,"stroke","black");
			path.setAttributeNS(null,"stroke-width","1");
			path.setAttributeNS(null,"d", p);
			path.setAttributeNS(null,"onmouseover", "onOverPolygon(evt, 'red')");
			lay_result.appendChild(path);
		}
		
		working();
		alert("������ɣ�");
		done = true;
		},1);
	}
	
	/*����boxlayer����svg��ͼͼ����ʾ*/
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
	
	
	/*��������ͼ��*/
	function hideAllLayer(){
		var Layerid;
		var index;
		for (var i=0; i<boxLayerStatus.length; i++){
			index = i + 1;
			Layerid = "layer" + index;
			svgdoc_overlap.getElementById(Layerid).style.setProperty("visibility", "hidden");
		}
	}
	
	
	/*�ָ�svgԭʼ״̬*/
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
	/*checkbox��ѡ���¼�*/
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
	/*��ѯ����������*/
	function onQuery(){
		if (!done){
			alert("����δִ�е��÷������������е��÷�����");
			return false;
		}
		//1 ��ȡ��ѯ����
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
				alert("���������벻�Ϸ������������룡");
				return false;
			}
			i++;
		}
		i = 0;
		while(i<senlin.length)
		{
			if((senlin.substring(i, i+1)<"0" || senlin.substring(i, i+1)>"9")&&senlin.substring(i, i+1)!="."&&senlin.substring(i, i+1)!=">"&&senlin.substring(i, i+1)!="<")
			{
				alert("ɭ�������벻�Ϸ������������룡");
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
		//�ж�value�ĺϷ���
		//...
		
		
		//2 ����,��ѯ����������path
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
	/*����ͼ��ID��ȡ��ͼ�������е�path��dֵ��ʹ�á�#���ָ�*/
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

					//�������ȡ��dֵ,����������ǰ�����ֵҲ����ȥ,������ÿ��path����������,������path
					//��������������attr,��ô������ͬ���ķ�������ȡ�����ֵ,ͬ�������ַ���ƴ�յķ���
					//��������Ϣ����ȥ.
				}
			}
		}
		rst += "#";
		return rst;
	}