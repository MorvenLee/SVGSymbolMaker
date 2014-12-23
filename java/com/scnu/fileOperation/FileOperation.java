package com.scnu.fileOperation;



import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import com.scnu.utils.FileTool;


public class FileOperation {
	

	private static Logger logger = LoggerFactory.getLogger(FileOperation.class);
	
	private static final String downloadPath = "E:\\trajectory\\scnu\\src\\main\\resources\\lm_tempsymbol\\tempsymbol.svg";
	private static final String uploadPath   = "E:\\trajectory\\scnu\\src\\main\\resources\\uploadedXMLSymbol";
	
	public static void ConstructSVG(String content) throws DocumentException{
		
		Document pageSVG = DocumentHelper.parseText(content); //将页面传回的svg文本解析为XML文档

		System.out.println(pageSVG.asXML());
        List<Element> elements =  pageSVG.getRootElement().elements(); 
		
        System.out.println(".............." + elements.size());
		
		Document doc = DocumentHelper.createDocument();
		doc.addDocType("svg", "-//W3C//DTD SVG 1.1//EN", "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd");
		doc.addComment("created by online dynamicsymbol maker . BY Morven 2014");
		
//		<svg id="previewSVG" width="500" height="400"  viewBox="0 0 500 400"
//	    xmlns="http://www.w3.org/2000/svg" version="1.1" />
		Element root = doc.addElement("svg", "http://www.w3.org/2000/svg");
		
		root.addAttribute("id","SVG");
		root.addAttribute("width","500");
		root.addAttribute("height","400");
		root.addAttribute("viewBox","0 0 500 400");
	
		root.addAttribute("version","1.1");
		
		root.setContent(elements);

		String dir = "E:\\trajectory\\scnu\\src\\main\\resources\\lm_tempsymbol";
		FileTool.mkdir(dir);
		FileTool.createNewFile( dir + "\\tempsymbol.svg", doc.asXML());
		
	}
	
	/**
	 * 下载文件
	 * @param filePath --要下载的文件完整路径
	 * @param response --HttpServletResponse对象
	 */

	public static void downloadAsSVG(HttpServletResponse response) throws Exception {
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss E");

		BufferedInputStream in = null;
		BufferedOutputStream out = null;
//	
//		String fileName = ""; // 文件名，输出到用户的下载对话框
//		// 从文件完整路径中提取文件名，并进行编码转换，防止不能正确显示中文名
//		try {
//			if (filePath.lastIndexOf("/") > 0) {
//				fileName = new String(filePath.substring(
//						filePath.lastIndexOf("/") + 1, filePath.length())
//						.getBytes("GB2312"), "ISO8859_1");
//			} else if (filePath.lastIndexOf("\\") > 0) {
//				fileName = new String(filePath.substring(
//						filePath.lastIndexOf("\\") + 1, filePath.length())
//						.getBytes("GB2312"), "ISO8859_1");
//			}
//
//		} catch (Exception e) {
//		}
		try {
			File f = new File(FileOperation.downloadPath);
			response.setContentType("application/octet-stream");
			response.setCharacterEncoding("UTF-8");
			response.addHeader("Content-Disposition", "attachment;filename=" + "SVGDynamicSymbol.svg");
			response.addHeader("Content-Length", String.valueOf(f.length()));
			in = new BufferedInputStream(new FileInputStream(f));
			out = new BufferedOutputStream(response.getOutputStream());
			byte[] data = new byte[1024];
			int len = 0;
			while (-1 != (len = in.read(data, 0, data.length))) {
				out.write(data, 0, len);
			}
			logger.info("SVG文件下载完毕，下载时间: {}", sdf.format(new Date()));
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (in != null) {
				in.close();
			}
			if (out != null) {
				out.close();
			}
		}

	}
	
	public static boolean UploadFile(MultipartFile fileUpload){
		try{
			if (!fileUpload.isEmpty()) {
				// && !checkFile(fileUpload.getOriginalFilename())) {

				File dirFile = new File(FileOperation.uploadPath);
				if (!dirFile.exists()) {
					dirFile.mkdirs();
				}
				File uploadFile = new File(dirFile,
						fileUpload.getOriginalFilename());
				InputStream is = fileUpload.getInputStream();
				FileOutputStream fos = new FileOutputStream(uploadFile);
				byte[] tmp = new byte[1024];
				int len = -1;
				while ((len = is.read(tmp)) != -1) {
					fos.write(tmp, 0, len);
				}
				is.close();
				fos.flush();
				fos.close();
				System.out.println("文件上传从成功：" + uploadFile.getParent());
			}
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
		
		return true;

	}

}
