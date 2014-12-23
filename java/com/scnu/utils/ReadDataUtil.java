package com.scnu.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import com.scnu.flock.type.Point;
import com.scnu.form.TrajectoryPoint;

public class ReadDataUtil {
	/*
	 * 从txt文件中读取数据
	 */
	public static List<Point> readDataFromTxt(String datapath) throws IOException{
		
		List<Point> ptList = new ArrayList<Point>();
		
		File filePath = new File(datapath);
		
		BufferedReader br =new BufferedReader(new FileReader(filePath));
		String s="";
		while ((s = br.readLine()) != null) {
		  //System.out.println(s + "\r\n");
		  String[] pointarray = s.split("   ");
		  ptList.add(new Point(pointarray[0],pointarray[1],pointarray[3],pointarray[2]));
		}
		
		br.close();
	
		
		return ptList;
	
	}
	
	
}
