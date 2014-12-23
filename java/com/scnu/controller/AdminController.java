package com.scnu.controller;



import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.scnu.form.Article;
import com.scnu.service.ArticleService;





@Controller
@RequestMapping(value = "/admin")

/**
 * 
 * @author Administrator

 *
 */
public class AdminController {
	
	private static Logger logger = LoggerFactory.getLogger(AdminController.class);
	
	@Autowired
	private ArticleService articleService;
	
	private List<Article> arcticleList;
	
	@RequestMapping(value = "/articleList.do")
	public String articleList(HttpServletRequest request){
		arcticleList = articleService.getAllArticles();
		System.out.println("文章总数：" + arcticleList.size());
		System.out.println("文章：" + arcticleList.get(0).getContent());
		request.setAttribute("artilceList", arcticleList);
		request.setAttribute("artilceNum", arcticleList.size());
		return "/Admin/articleList";
	}
	
	@RequestMapping(value = "/writeArticle.do")
	public String writeArticle(){
		return "/Admin/writeArticle";
	}
	
	@RequestMapping(value = "/readArticle.do")
	public String readArticle(int id,HttpServletRequest request){
		Article article = articleService.getArticleByID(id);
		request.setAttribute("article", article);
		return "/Admin/articleDetail";
	}
	
	@RequestMapping(value = "/publishArticle.do")
	public String publishArticle(String title,String classfication,String content){
		articleService.writeArticle2DB(title, classfication, content);
		return "/Admin/articleList";
	}
	

	

	

}
