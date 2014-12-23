package com.scnu.serviceImpl;



import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scnu.form.Article;
import com.scnu.mapping.ArticleMapper;
import com.scnu.service.ArticleService;


@Service("ArticleServiceImpl")
public class ArticleServiceImpl implements ArticleService{
	
	private static Logger logger = LoggerFactory.getLogger(ArticleServiceImpl.class);
	@Autowired
	private ArticleMapper articlemapper;
	@Override
	public void writeArticle2DB(String title, String classfication,
			String content) {
		
		String author = "admin";
		Date pubTime = new Date();
		
		articlemapper.article2DB(title, classfication, content, author, pubTime);
	}
	
	public List<Article> getAllArticles(){
		return articlemapper.getAllArticles();
	}

	@Override
	public Article getArticleByID(int id) {
		
		return articlemapper.getArticleById(id);
	}
	


}
