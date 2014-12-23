

//var isSaved = false; //标识是否做了保存操作

document.onkeydown = keyDown;
//Ctrl+s保存
function keyDown()   {
    if (event.ctrlKey == true && event.keyCode == 83) {//Ctrl+S 
        event.returnvalue = false;
        save();
        
    }

    if (event.ctrlKey == true && event.keyCode == 90) {//Ctrl+Z
        event.returnvalue = false;
        alert("撤销");
    }

    if (event.ctrlKey == true && event.keyCode == 79) {//Ctrl+N
        event.returnvalue = false;
        window.location.href="SetInfo.aspx?ChId=1&ColId=1"; //ID
    }
}


function save(){
	
	var svgContent = encodeURI($('#preview').html()); //获取预览框svg内容

	if(!$('#previewSVG').html()){
//		alert("尚未做任何操作,无法保存并下载！");
		showInfo("尚未做任何操作,无法保存并下载！",1);
	} else {
		$.ajax({
			type : "post",
			url : "saveas.do",
			data : "svgContent=" + svgContent,
			success : function(status) {

				if (status == "SUCCESS") {		
					window.location.href = "download.do";
				}
			},
		});
	}
}

//function downloadFile(){
//	if(!isSaved){
//		alert("请先保存再下载！");
//		return ;
//	}
//	if(!$('#previewSVG').html()){
//		alert("尚未做任何操作！");
//		return ;
//	}
//	window.location.href = "download.do";
//	
//}




/*
 * 信息提示
 */
function showInfo(info,type){ //操作提示  param : info 消息内容 type 消息类型  1表示操作成功和其他一般性提示  2表示操作失败 
	
	var width = $("#symbolmakePage").width();
	var tipoffset = width / 2 - 200;

	var imgsrc = ( type == 1 ? "lm_info.png" : "lm_alert.png" );
	var textDiv =  '<div style="width:200px;padding:10px;">';
		textDiv += '<img style="width:30px;height:30px;" src="/scnu/resources/ui-lib/qtip/'+ imgsrc +'"/>';
		textDiv += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span >' + info + '</span></div>',
	$("#symbolmakePage").qtip({
		content: {
			text: textDiv,
			title: {
				text: "提示信息",
				button: true
			}
		},
		position: {
			target: [tipoffset, 200],
			viewport: $(window),
		},
		show: {
			event: false,
			solo: true,
			ready: true,
		},
		hide: {
	        event: false,
	        inactive: 2000   // 没有手动关闭，提示信息3秒后自动关闭 
	    },
	    events: {
			hide: function(event, api) { 
				  api.destroy(); 
				  $(".qtip").remove();
				},
		},
		style: {
			classes: "qtip-bootstrap",
		    tip: { corner: false },
		},
	});
}

