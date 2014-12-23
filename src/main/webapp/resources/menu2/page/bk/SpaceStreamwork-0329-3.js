//nancy add 0328
//
	var xmlns='http://www.w3.org/2000/svg';
	var xlinkns='http://www.w3.org/1999/xlink';
	
	var svgdoc_Left;
	var svgdoc_Right;
	var svgdoc_DW;
		
var flag1 = 0;
var obj = 'A';
var TextoffsetLeft = 100;

var fileURL="overlap.jsp";
var ObjList = new Array();
var OperatorList = new Array();
var operatorlen = 0;
var layerID = 0;
var direction = new Array();
direction[0] = "Restricted_East";
direction[1] = "Restricted_South";
direction[2] = "Restricted_North";
direction[3] = "Restricted_West";
direction[4] = "West_North";
direction[5] = "West_South";
direction[6] = "East_North";
direction[7] = "East_South";


var directionArr = new Array(51,52,53,54,55,56,57,58);
var dirCNArr = new Array("����","����","����","����",
						"����","����","����","����"
						);

var TextGapWidth = new Array(40,40,40,40,
							55,60,55,55
							);	//��ʾ���


	function init()
	{
		svgdoc_Left = window.document.getElementById("svgfile1").getSVGDocument();
		svgdoc_Right = window.document.getElementById("svgfile2").getSVGDocument();	
		svgdoc_DW = window.document.getElementById("svgfile3").getSVGDocument();	
	}

//-------nancy edit 0329
function setFontSvg(index,textVal){
	flag1++;
	var id = index;
	var disOperVal = textVal;
	var disText = "";
	var tid;
	var posX;
	
	if(index==5)
	{
		id = directionArr[index-1];
		disOperVal = dirCNArr[index-1];		
	}
	else if(index==6)
	{
		var buffVal = svgdoc_DW.getElementById("buffersize").firstChild.nodeValue;
		id = "6" + svgdoc_DW.getElementById("buffersize").firstChild.nodeValue;
		
		if(buffVal=="")
		{
			alert("�����뻺������С��");
			return;
		}
		
		if(flag1==1){
			//��������A1
			tid = "A" + flag1 ;
			disText = "A" + flag1 +��" " + disOperVal ;
			appeTextChild(flag1,tid,posX,disText);	
	
			ObjList[flag1-1] = "layer" + flag1;											
		}
		else{
			tid = "A" + flag1 ;
			disText = " " + disOperVal ;
			TextoffsetLeft = TextoffsetLeft + TextGapWidth[index-1];

			appeTextChild(flag1,tid,TextoffsetLeft,disText);			
		}		
		return;
	}


	OperatorList[operatorlen++] = id;
	if(flag1==1){
					
			//��������A1
			tid = "A" + flag1 ;
			posX = 100;
			disText = "A" + flag1 ;
			appeTextChild(flag1,tid,posX,disText);
			
			ObjList[flag1-1] = "layer" + flag1;							
			layerID = flag1;
			flag1++;
			
			//��������A2
			tid = "A" + flag1;		
			TextoffsetLeft = TextoffsetLeft + 25;
			disText = " " + disOperVal + " " + "A" + flag1;
			appeTextChild(flag1,tid,TextoffsetLeft,disText);
			ObjList[flag1-1] = "layer" + flag1;										
		}
		else{
			tid = "A" + flag1;
			disText = " " + disOperVal + " " + "A" + flag1;
			TextoffsetLeft = TextoffsetLeft + TextGapWidth[index-1];
				
			//��������Ai
			appeTextChild(flag1,tid,TextoffsetLeft,disText);
			ObjList[flag1-1] = "layer" + flag1;			
		
		}
	
}

	//----------nancy add 0329-------------
	function appeTextChild(flag1,tid,posX,disText)
	{
		//alert(posX);
		var lay_result = svgdoc_DW.getElementById("StreamLayerRes");
		var texts = svgdoc_DW.createElementNS(xmlns,"text");
		texts.setAttributeNS(null,"fill","red");
		texts.setAttributeNS(null,"stroke","red");
		texts.setAttributeNS(null,"stroke-width","1");
		texts.setAttributeNS(null,"x", posX);
		texts.setAttributeNS(null,"y", 20);
		texts.setAttributeNS(null,"id", tid);
		texts.setAttributeNS(null,"onclick", "markOp(" + flag1 + ");window.open('selectSVG.htm','','width=500px,height=300px,status=yes');");
		texts.setAttributeNS(null,"font-size",12);
		texts.setAttributeNS(null,"font-family","����");
		texts.setAttributeNS(null,"onclick", "markOp(" + flag1 + ");window.open('selectSVG.htm','','width=500px,height=300px,status=yes');");
		
		lay_result.appendChild(texts);	
		var tv = document.createTextNode(disText);
		texts.appendChild(tv);	
	}


/*��layer����svg��ͼ��*/
function addLayer(layer){
	var svgdoc = document.getElementById("svgfile1").getSVGDocument();
	var svgRoot = svgdoc.rootElement;
	var obj = document.getElementById("svgfile1").window.parseXML("<g id=\"layer"+layerID+"\" fill=\"none\" stroke=\"black\">"+layer+"</g>", svgdoc);
	svgRoot.appendChild(obj.firstChild);
	checkBox_layers.innerHTML += "<input type=\"checkbox\" id=\"layer"+layerID + "\" checked=\"checked\" onClick=\"onSelect(this)\" /> A" + layerID + "<br />";
}
var layerID;
function markOp(op){
	layerID = op;
}
function onSelect(obj){
	var svgdoc = document.getElementById("svgfile1").getSVGDocument();
		if (obj.checked == true){
			svgdoc.getElementById(obj.id).getStyle().setProperty("visibility", "visible");
		}else
			svgdoc.getElementById(obj.id).getStyle().setProperty("visibility", "hidden");
}
/*����ͼ��ID��ȡ��ͼ�������е�path��dֵ��ʹ�á�#���ָ�*/
function getPaths(father){
		var rst = "";
		var childs = father.getChildNodes();
		if (childs.length != 0){
			for (var i=0; i<childs.length; i++){
				var c = childs.item(i);
				if (c.nodeName == "path"){
					if (rst != "")
						rst += "# ";
					rst += c.getAttribute("d");
					rst += " A1 ";
					rst += c.getAttribute("A1");
					rst += " A2 ";
					rst += c.getAttribute("A2");
					rst += " ";
					//�������ȡ��dֵ,����������ǰ�����ֵҲ����ȥ,������ÿ��path����������,������path
					//��������������attr,��ô������ͬ���ķ�������ȡ�����ֵ,ͬ�������ַ���ƴ�յķ���
					//��������Ϣ����ȥ.
				}
			}
		}
		rst += "#";
		return rst;
}
function OnCal(){
	if(flag1==0){
		alert("��ѡ��������ӣ�");
		return;
	}
	var svgdoc = document.getElementById("svgfile1").getSVGDocument();
	var svgdoc2 = document.getElementById("svgfile2").getSVGDocument();
	var lay_result2 = svgdoc2.getElementById("result");
	var childs2 = lay_result2.getChildNodes();
		if (childs2.length != 0){
			for (var i=childs2.length-1; i>=0; i--){
				var c = childs2.item(i);
				lay_result2.removeChild(c);
			}
		}
	var path1, path2;
	var objlen = 0;
	path1 = getPaths(svgdoc.getElementById(ObjList[objlen++]));
	for(var i = 0; i < operatorlen; i++){
		if(OperatorList[i]==1){				//��
			path2 = getPaths(svgdoc.getElementById(ObjList[objlen++]));			
			var tempres = document.all.analysisTool.overlap(path2, path1);		//ע��˳�����⣡������
			var res = tempres.split("D");
			path1 = res[0];		
		}
		else if(OperatorList[i]==2){			//��
			path2 = getPaths(svgdoc.getElementById(ObjList[objlen++]));
			path1 = document.all.analysisTool.GetUnion(path1, path2);
		}
		else if(OperatorList[i]==3){			//��
			path2 = getPaths(svgdoc.getElementById(ObjList[objlen++]));
			var tempres = document.all.analysisTool.overlap(path2, path1);	//ע��˳�����⣡������
			var res = tempres.split("D");
			path1 = res[2];
		}
		else if(OperatorList[i]==4){			//����
			var i1 = path1.indexOf("m");
			if(i1<0)
				i1 = path1.indexOf("M");
			var i2 = path1.lastIndexOf("m");
			if(i2<0)
				i2 = path1.lastIndexOf("M");
			if(i1!=i2){
				alert("���������ĵ�һ��������ֻ����һ������Σ�������ѡ�����");
				return;
			}
			path2 = getPaths(svgdoc.getElementById(ObjList[objlen++]));
			path1 = document.all.analysisTool.PolygonInPolygon(path1, path2);
		}
		else if(OperatorList[i]>50&&OperatorList[i]<60){		//��λ
			if(path1.split("#").length>2){
				alert("���������ĵ�һ��������ֻ����һ������������ѡ�����");
				return;
			}
			var pos = OperatorList[i]%10-1;
			path2 = getPaths(svgdoc.getElementById(ObjList[objlen++]));
			var res = "";
			var first = true;
			var str1 = path1.split("#");
			for(var j=0;j<str1.length;j++){
				if(str1[j].length==0)
					continue;
				var dir = document.all.analysisTool.Position(str1[j], path2);
				alert(dir);
				if(dir==direction[pos]){
					if(!first)
						res+=" # ";
					res+=str1[j];
					first = false;
				}
			}
			path1 = res;
		}
		else if(OperatorList[i]>=60){						//������
			var tempOp = OperatorList[i]+"";
			var bufferPaths = path1.split("#");
			path1 = "";
			var re = new RegExp(/^\s*$/); 
			for (var j=0; j<bufferPaths.length; j++){
				if (re.test(bufferPaths[j])){
					continue;
				}
				if (j != 0)
					path1 += "#";
				path1 += bufferPaths[j].substring(0, bufferPaths[j].indexOf("A1"));
			}
			//����applet			
			var ret = document.all.analysisTool.svgMultiBuffer(path1, tempOp.substring(1, tempOp.length)).split("%");
			path1 = "";
			for (var j=0; j<ret.length; j++){
				var outer = ret[j].split("#")[0];
				if (j != 0)
					path1 += "#";
				path1 += outer + " A1 0 A2 0";
			}
		}
		else if(OperatorList[i]==7){			//����
			path2 = getPaths(svgdoc.getElementById(ObjList[objlen++]));
			var tempres = document.all.analysisTool.overlap(path2, path1);		//ע��˳�����⣡������
			var res = tempres.split("D");
			path1 = res[0] + "#" + res[1] + "#" + res[2] + "#";
		}
		else if(OperatorList[i]==8){			//����
			path2 = getPaths(svgdoc.getElementById(ObjList[objlen++]));
			var tempres = document.all.analysisTool.overlap(path2, path1);		//ע��˳�����⣡������
			var res = tempres.split("D");
			path1 = res[1] + "#" + res[2];
		}
	}
	if(path1==""){
		alert("������ɣ�����ǿգ�");
		return;
	}
	alert("������ɣ�");
	
	var lay_result = svgdoc2.getElementById("result");
	var ret2 = path1.split("#");
	for (var i=0; i<ret2.length; i++){
		var tmp = ret2[i];
		var i1 = tmp.indexOf("A1");
		var i2 = tmp.indexOf("A2");
		var p = "";
		if(i1<0)
			p = tmp;
		else p = tmp.substring(0, i1);
		var path = svgdoc2.createElement("path");
		path.setAttribute("fill","none");
		path.setAttribute("stroke","black");
		path.setAttribute("stroke-width","1");
		path.setAttribute("d", p);
		path.setAttribute("onmouseover", "onOverPolygon(evt, 'red')");
		lay_result.appendChild(path);
	}
}		