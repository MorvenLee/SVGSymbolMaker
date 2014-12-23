package com.scnu.utils;

import java.io.IOException;

import org.apache.commons.digester.Digester;
import org.xml.sax.SAXException;


public class Config {
	
	public String DATA_NAME = ""; //数据名称
	
	public String DATA_PATH = ""; //数据path
	
	public String CONFIG_FILE_PATH = "configuration.xml"; //配置文件路径
	
	public String getCONFIG_FILE_PATH() {
		return CONFIG_FILE_PATH;
	}

	public void setCONFIG_FILE_PATH(String cONFIG_FILE_PATH) {
		CONFIG_FILE_PATH = cONFIG_FILE_PATH;
	}

	public String getDATA_NAME() {
		return DATA_NAME;
	}

	public void setDATA_NAME(String dATA_NAME) {
		DATA_NAME = dATA_NAME;
	}

	public String getDATA_PATH() {
		return DATA_PATH;
	}

	public void setDATA_PATH(String dATA_PATH) {
		DATA_PATH = dATA_PATH;
	}

	void config() {
		Digester digester = new Digester();
		digester.setValidating(false);
	}
	
	void loadConfig(){
		Digester digester = new Digester();
		digester.setValidating(false);
		
		digester.push(this);
		digester.addCallMethod("datapath-config/data/name", "setDATA_NAME",0);
		digester.addCallMethod("datapath-config/data/path", "setDATA_PATH",0);
		try {
			
			digester.parse(this.CONFIG_FILE_PATH);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SAXException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
