package com.scnu.mapping;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.scnu.form.Article;


public interface ArticleMapper {
	
	void article2DB(@Param("title")String title,@Param("classfication")String classfication,@Param("content")String content,
			@Param("author")String author,@Param("pubTime")Date pubTime);
	
	List<Article> getAllArticles();
	
	Article getArticleById(int id);
}
