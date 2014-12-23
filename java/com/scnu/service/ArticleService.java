package com.scnu.service;

import java.util.List;

import com.scnu.form.Article;



/**
 * @author Administrator
 *
 */

public interface ArticleService {

	void writeArticle2DB(String title,String classfication,String content);
	
	Article getArticleByID(int id);
	
	List<Article> getAllArticles();
}
