//begin code for menus
MenuColors=new	Array("#6996D3","#4380D3");
//第一层菜单
Menus =new Array();
Menus[0]="项目";
Menus[1]="地图操作";
Menus[2]="数据处理";
Menus[3]="数据查询";
Menus[4]="空间分析统计";
Menus[5]="符号化与制图";
Menus[6]="定位";
Menus[7]="工具箱";

//第二层菜单
buttons=new Array();
buttons[0]=new	Array( "打开地图", "导入地图", "载入SVG地图", "另存为SVG", "保存地图","退出");
buttons[1]=new	Array( "全图显示", "地图平移","快速放大","快速缩小","拉框放大","自定义缩放","图层控制","前一视图","后一视图","清理地图");
buttons[2]=new	Array( "数据编辑", "数据转化", "坐标转换", "数据压缩");
buttons[3]=new	Array( "点选查询", "拉框查询", "圆选查询", "数据查询");
buttons[4]=new	Array( "距离量算", "面积量算", "缓冲区分析", "空间查找", "方位查找", "叠置分析", "点统计", "矩形统计", "网络分析", "综合分析");
buttons[5]=new	Array( "填充点符号", "填充线符号", "填充面符号", "添加注记", "制图");
buttons[6]=new	Array( "地理定位", "定位查询");
buttons[7]=new	Array( "版权工具", "动画演播");


//第三层菜单
MenusLevThree=new Array();
MenusLevThree[0]=new Array();
MenusLevThree[1]=new Array();
MenusLevThree[2]=new Array();
MenusLevThree[3]=new Array();
MenusLevThree[4]=new Array();
MenusLevThree[5]=new Array();
MenusLevThree[6]=new Array();
MenusLevThree[7]=new Array();


//////////////2/////////////////

MenusLevThree[0][0] = new Array();
MenusLevThree[0][1] = new Array();
MenusLevThree[0][2] = new Array();
MenusLevThree[0][3] = new Array();
MenusLevThree[0][4] = new Array();
MenusLevThree[0][5] = new Array();
MenusLevThree[0][6] = new Array();
MenusLevThree[0][7] = new Array();
MenusLevThree[0][8] = new Array();
/////////////3////////////////////
MenusLevThree[1][0]=new Array();
MenusLevThree[1][1]=new Array();
MenusLevThree[1][2]=new Array();
MenusLevThree[1][3]=new Array();
MenusLevThree[1][4]=new Array();
MenusLevThree[1][5]=new Array();
MenusLevThree[1][6]=new Array();
MenusLevThree[1][7]=new Array();
MenusLevThree[1][8]=new Array();
MenusLevThree[1][9]=new Array();  

MenusLevThree[2][0]=new Array();
MenusLevThree[2][1]=new Array();
MenusLevThree[2][2]=new Array();
MenusLevThree[2][3]=new Array();
MenusLevThree[2][4]=new Array();
MenusLevThree[2][5]=new Array();
MenusLevThree[2][6]=new Array();
MenusLevThree[2][7]=new Array();
MenusLevThree[2][8]=new Array();
MenusLevThree[2][9]=new Array();  


MenusLevThree[3][0]=new Array();
MenusLevThree[3][1]=new Array();
MenusLevThree[3][2]=new Array();
MenusLevThree[3][3]=new Array();


MenusLevThree[4][0]=new Array();
MenusLevThree[4][1]=new Array();
MenusLevThree[4][2]=new Array();
MenusLevThree[4][3]=new Array();
MenusLevThree[4][4]=new Array();
MenusLevThree[4][5]=new Array();
MenusLevThree[4][6]=new Array();
MenusLevThree[4][7]=new Array();
MenusLevThree[4][8]=new Array();
MenusLevThree[4][9]=new Array();  

MenusLevThree[5][0]=new Array();
MenusLevThree[5][1]=new Array();
MenusLevThree[5][2]=new Array();
MenusLevThree[5][3]=new Array();
MenusLevThree[5][4]=new Array();

MenusLevThree[6][0]=new Array();
MenusLevThree[6][1]=new Array();

MenusLevThree[7][0]=new Array();
MenusLevThree[7][1]=new Array();


//MenuStatus 存储当前显示的是哪一级别的菜单：0,1,2,3 分别存储 level，i,j,k
//当level=0和1时，说明只显示第一级的菜单,0时说明初始状态
MenuStatus = new Array();
MenuStatus[0]="0";
MenuStatus[1]="0";
MenuStatus[2]="0";
MenuStatus[3]="0";
MenuStatus[4]="0";
MenuStatus[5]="0";
MenuStatus[6]="0";
MenuStatus[7]="0";

var bwidth=85;

var LeftGapWidth = 3;
var TopGapHeight = 0;

var GapWidth = 3;

var TextHeight = 6 ;//字体的高度
var GapHeight = 18;//Text 距离 rect的高度

var bgRectHeight = TextHeight + GapHeight;//背景框的高度

var RectY,TextY;

var LastTarget = "";
var Position=new Object();

function createMenu()
{
	for (var i=0;i<Menus.length;i++)
	{
		addMenu(i);
	}
makeLink(document.getElementById('MenuL2G-0-0-0'), "page/OpenMap.html");
makeLink(document.getElementById('MenuL2G-0-1-0'), "page/ImportMap.html");
makeLink(document.getElementById('MenuL2G-0-2-0'), "page/OnloadSVG.html");
makeLink(document.getElementById('MenuL2G-2-1-0'), "page/TransData.html");
makeLink(document.getElementById('MenuL2G-2-2-0'), "page/TransCoord.html");
makeLink(document.getElementById('MenuL2G-2-3-0'), "page/DataCompression.html");
makeLink(document.getElementById('MenuL2G-4-5-0'), "page/Overlap.html");
makeLink(document.getElementById('MenuL2G-4-9-0'), "page/SpaceAnApp.html");
makeLink(document.getElementById('MenuL2G-5-4-0'), "page/MapDecroSave.html");
makeLink(document.getElementById('MenuL2G-7-0-0'), "page/Copyright.html");
makeLink(document.getElementById('MenuL2G-7-1-0'), "page/MotionPic.html");
//makeLink2(document.getElementById('MenuL2G-1-0-0'), "svg/sub_indexLshowAll.svg","rightContent" );


//makeLink(document.getElementById('MenuL2G-0-1-1'), "../test.svg");
//makeLink(document.getElementById('MenuL2G-1-0-0'), "../move.svg");
}


function makeLink (element, url) { 
   var svgNS = 'http://www.w3.org/2000/svg'; 
   var xlinkNS = 'http://www.w3.org/1999/xlink'; 
   var Llink = element.ownerDocument.createElementNS(svgNS, 'a'); 
   Llink.setAttributeNS(xlinkNS, 'xlink:href', url); 
   Llink.setAttributeNS(xlinkNS, 'xlink:show','new'); 
   Llink.setAttributeNS(xlinkNS, 'xlink:target','_blank');
   element.parentNode.replaceChild(Llink, element); 
   Llink.appendChild(element); 
} 


function makeLink2 (element, url, target) { 
   var svgNS = 'http://www.w3.org/2000/svg'; 
   var xlinkNS = 'http://www.w3.org/1999/xlink'; 
   var Llink = element.ownerDocument.createElementNS(svgNS, 'a'); 
   Llink.setAttributeNS(xlinkNS, 'xlink:href', url); 
   Llink.setAttributeNS(xlinkNS, 'xlink:show','new'); 
   Llink.setAttributeNS(xlinkNS, 'xlink:target',target);
   element.parentNode.replaceChild(Llink, element); 
   Llink.appendChild(element); 
} 


/*function gredient()
{
	var x1="0%";
	var y1="0%";
	var x2="100%";
	var y2="0%";
    var off="0%";
	var style1="stop-color:rgb(255,255,0);stop-opacity:1";

var gra = document.createElementNS(xmlns,"defs");
	gre.setAttributeNS(null,"id",menuGradient);

	//document.documentElement.appendChild(menu);
var linGra = document.createElementNS(xmlns,"linearGradient");

	linGra.setAttributeNS(null,"x1","0%");
	linGra.setAttributeNS(null,"y1","0%");
	linGra.setAttributeNS(null,"x2","100%");
	linGra.setAttributeNS(null,"y2","0%");
var sty1 = document.createElementNS(xmlns,"stop");
	sty1.setAttributeNS(null,"offset","0%");
	sty1.setAttributeNS(null,"style",style1);

//var sty2 = document.createElementNS(xmlns,"stop");
//	sty2.setAttributeNS(null,"offset","0%");
//	sty2.setAttributeNS(null,"style","stop-color:rgb(255,0,0);stop-opacity:1");
}*/

function addMenu(i)
{
	//gredient();
	//var style2="fill:url(#menuGradient)";
	var menu = document.createElementNS(xmlns,"g");
	menu.setAttributeNS(null,"id","MenuL1M"+i);

	document.documentElement.appendChild(menu);
	var rect = document.createElementNS(xmlns,"rect");

	rect.setAttributeNS(null,"x",LeftGapWidth);
	rect.setAttributeNS(null,"y",0);
	
	rect.setAttributeNS(null,"width",bwidth);
	rect.setAttributeNS(null,"height",bgRectHeight);
	
	rect.setAttributeNS(null,"fill","none");
	rect.setAttributeNS(null,"stroke","none");
	rect.setAttributeNS(null,"stroke-width",1);
	rect.setAttributeNS(null,"id","MenuL0R"+i);
	//rect.SetAttributeNS(null,"style",style2);
	menu.appendChild(rect);

	populateMenus(i,"#0F4FA8");//top menu
	
	
	for(var t=0; t < buttons[i].length; t++)//sub menu
	{
		populateButtons(i,t,0,MenuColors[(t+1)%MenuColors.length],2);//最后一个数是级层。第二层菜单

	}
	//makeLink(document.getElementById('MenuL2G-0-0-0'), "../move.svg");
		//document.documentElement.addEventListener("mousemove",updateCoords,false);
}
//第一层菜单
function populateMenus(i,color)
{
	var group = document.createElementNS(xmlns,"g");
	var rect = document.createElementNS(xmlns,"rect");
	var text = document.createElementNS(xmlns,"text");
	
	var group_id = "MenuL1G"+i;
	var rectX = LeftGapWidth + i*bwidth;
	var rectY =  TopGapHeight;
	
	var textX = GapWidth + LeftGapWidth  + i*bwidth+6;
	var textY = GapHeight + TopGapHeight;
	
	//alert(rectY + "---" + textY);
	
	
	group.setAttributeNS(null,"id",group_id);	

	
	var menu = document.getElementById('MenuL1M'+i);
	menu.appendChild(group);

	//document.documentElement.appendChild(group);
	
	//设置背景框
	rect.setAttributeNS(null,"x",rectX);
	rect.setAttributeNS(null,"y",rectY);	
	
	rect.setAttributeNS(null,"width",bwidth);
	rect.setAttributeNS(null,"height",bgRectHeight );
	rect.setAttributeNS(null,"fill",color);
	rect.setAttributeNS(null,"stroke","black");
	rect.setAttributeNS(null,"stroke-width",1);
	rect.setAttributeNS(null,"opacity",.5);

	
	rect.setAttributeNS(null,"id","MenuL1R"+i);
	
	group.appendChild(rect);
	
	//设置文字属性
	text.setAttributeNS(null,"x",textX);
	text.setAttributeNS(null,"y",textY);
	
	text.setAttributeNS(null,"fill","black");
	text.setAttributeNS(null,"font-size",12);
	text.setAttributeNS(null,"font-family","宋体");
	text.setAttributeNS(null,"pointer-events","none");
	
	text.setAttributeNS(null,"id","MenuL1T"+i);
		
	group.appendChild(text);	
	
	//var displayText=Menus[i].replace(/[A-Z]/g, ' $&').toLowerCase().replace(/\d/g, '');
	var displayText=Menus[i];

	//displayText = group_id + "---" + displayText;

	tv=document.createTextNode(displayText);		


	text.appendChild(tv);
	
	//加链接
	//group.setAttributeNS(xlinkns, "xlink:href", "www.baidu.com"); 
	//group.setAttributeNS(xlinkns, "xlink:href", "move.svg"); 
	//makeLink(document.getElementById(group_id), "../move.svg");//当前页打开	
	

			
	group.addEventListener("mouseover",function(evt){hilight(evt);},false);	
	group.addEventListener("mouseover",function(evt){showHide('visible',i,0,0,2);hilight(evt);},false);	
	group.addEventListener("mouseout",function(evt){hilight(evt);},false);	
}

var clearCoord = function(coords,i,j){
    var coords = document.getElementById(coords);
	//var x=i;
	//var y=j;

   coords.onmousemove = function(e){
      var pointer = getCoordInDocument(e);
	  if(pointer.x<i*85||pointer.x>((i+1)*85)||pointer.y<0||pointer.y>250)
		{
	  ClearEqualLevelMenu();
	  }
	  //alert("x"+pointer.x+"y"+pointer.y);
  //    var coord = document.getElementById("coord");
     // coord.innerHTML = "X,Y=("+pointer.x+", "+pointer.y+")";
    }
  }

var getCoordInDocument = function(e) {
    e = e||window.event;
    var x = e.pageX || (e.clientX +
      (document.documentElement.scrollLeft
      || document.body.scrollLeft));
    var y= e.pageY || (e.clientY +
      (document.documentElement.scrollTop
      || document.body.scrollTop));
    return {'x':x,'y':y};
  }
 // window.onload = function(){
 //    getCoordInDocumentExample();


function SetLastTarget(evt)
{
//alert("over set last target is :" + evt.CurrentTarget);
	LastTarget = evt.currentTarget;;
}

//第二三层菜单
function populateButtons(i,j,k,color,Level){
	var group = document.createElementNS(xmlns,"g");
	var rect = document.createElementNS(xmlns,"rect");
	var text = document.createElementNS(xmlns,"text");

	var rectX = LeftGapWidth + i* bwidth ;
	var rectY = (j+1)* bgRectHeight + TopGapHeight;
	
	var textX = GapWidth + 3*LeftGapWidth + i* bwidth;
	var textY = (j+1)* bgRectHeight + GapHeight + TopGapHeight;


	if(Level==2)
	{
		//alert(i+"---"+j);
		//alert(MenusLevThree[j].length);
		//调用第三层菜单
		for(var t=0;t<MenusLevThree[i][j].length;t++)//sub menu
		{
			populateButtons(i,j,t,MenuColors[(t+1)%MenuColors.length],3);//最后一个数是级层。第三层菜单
		}
		
	}
	else if(Level==3)
	{
		 rectX += bwidth;
		 rectY = (j+k+1)* bgRectHeight + TopGapHeight;
	
		 textX =textX+ bwidth+2;
		 textY = (j+k+1)* bgRectHeight + GapHeight + TopGapHeight;	
	}
	
	group.setAttributeNS(null,"visibility","hidden");
	//group.setAttributeNS(null,"visibility","visible");

				var action = function(evt){
					showHide('hidden',i);
					hilight(evt);
				 //window[buttons[B][i]]();
				}
				
	var menu = document.getElementById('MenuL1M'+i);
	menu.appendChild(group);
	
	group.addEventListener("mouseover",hilight,false);
	group.addEventListener("mouseout",hilight,false);

	if(Level==2)
	{
		group.addEventListener("mouseover",function(evt){clearCoord(group_id,i,j);},false);

		if (MenusLevThree[i][j]=="")
		{     
           // group.addEventListener("mousedown",function(evt){ClearEqualLevelMenu();},false);
			//group.addEventListener("mousedown",function(evt){alert("MenusLevThree[i][j]");},false);
		}
		else
		group.addEventListener("mouseover",function(evt){showHide('visible',i,j,0,3);hilight(evt);},false);
	}
	else if(Level==3)
	{
		group.addEventListener("mousedown",function(evt){ClearEqualLevelMenu();},false);			
	}

	//设置背景框
	rect.setAttributeNS(null,"x",rectX);
	rect.setAttributeNS(null,"y",rectY);
	
	rect.setAttributeNS(null,"width",bwidth);
	rect.setAttributeNS(null,"height",bgRectHeight);
	rect.setAttributeNS(null,"fill",color);
	rect.setAttributeNS(null,"opacity",.9);
	group.appendChild(rect);
	
	//设置文字框
	text.setAttributeNS(null,"x",textX);
	text.setAttributeNS(null,"y",textY);
	
	text.setAttributeNS(null,"fill","black");
	text.setAttributeNS(null,"font-size",12);
	text.setAttributeNS(null,"font-family","宋体");
	text.setAttributeNS(null,"pointer-events","none");
	group.appendChild(text);

	
	var group_id = "MenuL"+Level+"G-"+ i + "-" + j + "-" + k;
	group.setAttributeNS(null,"id",group_id);
    
	//var displayText=buttons[i][j].replace(/[A-Z]/g, ' $&').toLowerCase().replace(/\d/g, '');
	//alert(group_id);
	var displayText=buttons[i][j];
	
	if(Level==3)
	{
		displayText=MenusLevThree[i][j][k];
		//alert(i+"---"+j);

	}

	//displayText = group_id + "---" + displayText;


	//if(Level==2)alert(displayText);
	tv=document.createTextNode(displayText);

	
	//makeLink(document.getElementById(group_id), "http:\/\/www.baidu.com"); 

	//makeLink(document.getElementById('MenuL2G-0-0-0'), "../move.svg");
	//alert(group_id);
	text.appendChild(tv);
	rect.addEventListener("click",function(evt){menuonclick(i,j,k);},false);
}
function menuonclick(i,j,k){//whw

var menuno="menu"+i+j;
if(menuno=="menu10"){
window.parent.clicktool(1,'全幅显示');
window.parent.SwitchBtn(1,'Down');
}
else if(menuno=="menu11"){
window.parent.clicktool(6,'地图平移');
window.parent.SwitchBtn(6,'Down')
} 
else if(menuno=="menu12"){
window.parent.clicktool(2,'快速放大');
window.parent.SwitchBtn(2,'Over');
} 
else if(menuno=="menu13"){
window.parent.clicktool(3,'快速缩小');
window.parent.SwitchBtn(3,'Over');
} 
else if(menuno=="menu14"){
window.parent.clicktool(4,'拉框放大');
window.parent.SwitchBtn(4,'Down');
} 
else if(menuno=="menu15"){
window.parent.clicktool(10,'自定义缩放');
window.parent.SwitchBtn(10,'Down');
} 
else if(menuno=="menu16"){
window.parent.clicktool(9,'图层控制');
window.parent.SwitchBtn(9,'Down');
} 
else if(menuno=="menu17"){
window.parent.clicktool(7,'前一视图');
window.parent.SwitchBtn(7,'Down');
} 
else if(menuno=="menu18"){
window.parent.clicktool(8,'后一视图');
window.parent.SwitchBtn(8,'Down');
} 
else if(menuno=="menu19"){
window.parent.clicktool(39,'清理地图');
window.parent.SwitchBtn(39,'Down');
} 
else if(menuno=="menu40"){
window.parent.clicktool(15,'距离量算');
window.parent.SwitchBtn(15,'Down');
} 
else if(menuno=="menu41"){
window.parent.clicktool(16,'面积量算');
window.parent.SwitchBtn(16,'Down');
} 

}
function hilight(evt){

	//alert(evt.type);

	if(evt.type=="mouseover"){
	var o=evt.currentTarget;
	//alert(o);
		o.firstChild.setAttributeNS(null,"opacity",.3);
		o.firstChild.nextSibling.setAttributeNS(null,"fill","white");
		//o.setAttributeNS(null,"opacity",.5);
		//o.nextSibling.setAttributeNS(null,"fill","white");
	}
	else{
	//var o = LastTarget;
	//alert("LastTarget is: " + o);
	//alert("bbbbbbbbb");
		var o=evt.currentTarget;
		o.firstChild.setAttributeNS(null,"opacity",.9);
		o.firstChild.nextSibling.setAttributeNS(null,"fill","black");
	}
}



function GetTopRectTextY(DisNum,SetNum,action)
{
	var Num = SetNum;
	

	if(SetNum>DisNum && action == "openMenu")
	{
		Num = SetNum + buttons[DisNum].length;
	}
	
	RectY = Num* bgRectHeight + TopGapHeight;
	TextY = Num* bgRectHeight  + GapHeight + TopGapHeight;	
}


function ClearEqualLevelMenu()
{
	var group_id ;
	var i,j,k;
	//alert(ShowLevel+"--"+MenuStatus[0]+"--"+MenuStatus[1]+"--"+MenuStatus[2]+"--"+MenuStatus[3]);

		i=MenuStatus[1];
		k=0;
		var level = 2;
		//alert(i+"---"+j);

		for(var t=0;t<buttons[i].length;t++)
		{
			group_id = "MenuL"+ level +"G-"+ i + "-" + t + "-" + k;
			//alert(group_id+"2层");
			document.getElementById(group_id).setAttributeNS(null,"visibility","hidden");
		}

		j=MenuStatus[2];
		//alert(i+"---"+j);
		level = 3;

		for(var t=0;t<MenusLevThree[i][j].length;t++)
		{
			group_id = "MenuL"+ level +"G-"+ i + "-" + j + "-" + t;
			//alert(group_id+"3层");

			document.getElementById(group_id).setAttributeNS(null,"visibility","hidden");

		}

		MenuStatus[0]=0;


}

function ShowLevelMenu(Vis,i,j,k,ShowLevel)
{
	var group_id ;

	if(ShowLevel==2 || ShowLevel==3)
	{
		for(var t=0;t<buttons[i].length;t++)
		{
			group_id = "MenuL"+ "2" +"G-"+ i + "-" + t + "-" + k;
			//document.getElementById("b"+Num+":"+t).setAttributeNS(null,"visibility",Vis);
			document.getElementById(group_id).setAttributeNS(null,"visibility",Vis);
			

			MenuStatus[0]=2;
			MenuStatus[1]=i;
			MenuStatus[2]=t;
			MenuStatus[3]=k;
		}
	}
	if(ShowLevel==3)
	{
		for(var t=0;t<MenusLevThree[i][j].length;t++)
		{
			group_id = "MenuL"+ ShowLevel +"G-"+ i + "-" + j + "-" + t;
			//document.getElementById("b"+Num+":"+t).setAttributeNS(null,"visibility",Vis);
			document.getElementById(group_id).setAttributeNS(null,"visibility",Vis);

			MenuStatus[0]=3;
			MenuStatus[1]=i;
			MenuStatus[2]=j;
			MenuStatus[3]=t;

		}
		//makeLink(document.getElementById('MenuL2G-0-0-0'), "../move.svg");
		
	}
	

}

//ShowLevel：需要显示的是第几层的菜单，如果是2，则说明当前是第一层，需要显示第二层的菜单
function showHide(Vis,i,j,k,ShowLevel){

	//alert(ShowLevel);

	ClearEqualLevelMenu();
	ShowLevelMenu(Vis,i,j,k,ShowLevel);
	
}


function updateCoords(evt){
	Position.x=evt.clientX;
	Position.y=evt.clientY;
}