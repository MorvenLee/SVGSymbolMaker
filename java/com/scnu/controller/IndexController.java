package com.scnu.controller;




import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;













import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.scnu.flock.compute.LongestDurationFlockComputer;
import com.scnu.flock.type.NeighborsPerTimeSlice;
import com.scnu.flock.type.Point;
import com.scnu.form.TrajectoryPoint;
import com.scnu.service.OriginTrojectoryPathService;
import com.scnu.utils.ReadDataUtil;




@Controller
@RequestMapping(value = "/LBS")

/**
 * 
 * @author Administrator
 * LBS controller
 *
 */
public class IndexController {
	
	private static Logger logger = LoggerFactory.getLogger(IndexController.class);
	
	
	@Autowired
	private OriginTrojectoryPathService OriginTrojectoryPathService;
	
	@RequestMapping(value = "/trajectory.do")
	public String toLBS(){
		return "/LBS/main";
	}

	
	@RequestMapping(value = "/dymapsym.do")
	public String dynamicMapsymbol(){
		return "/DynamicMapSymbol/main";
	}
	
	@RequestMapping(value = "dyPoint.do")
	public String dyPoint(){
		return "/DynamicMapSymbol/point";
	}
	
	
	
	
	@RequestMapping(value = "/flockCompute.do")
	@ResponseBody
	public String flockCompute(String radius,String minpoints,String mintimeslice,String timeinterval, String datapath) throws Exception{
		
		System.out.println(" Params : ==> radius-" + radius + " minpoints-"+ minpoints + " mintimeslice-" + mintimeslice + " timeinterval-" + timeinterval + " datapath-" + datapath);
		NeighborsPerTimeSlice.resultJson = "";
		//long time = LongestDurationFlockComputer.flockFind(radius, minpoints, mintimeslice, timeinterval,datapath);
		Map<String,String> map = new HashMap<String, String>();
		map =  LongestDurationFlockComputer.flockFind(radius, minpoints, mintimeslice, timeinterval,datapath);
		return  JSON.toJSONString(map);
	}
	@RequestMapping(value="/LoadTrajectoryPath.do")
	@ResponseBody
	public String loadPath(String datapath){
		
		System.out.println("data path -- > " + datapath);
		List<Point> ptList = OriginTrojectoryPathService.getOriginTrajectoryPoints(datapath);
		
		if(ptList == null)
			return "ERROR";
		System.out.println("total - > " + ptList.size());
		
		
		/*
		Map<String,List<Point>> map = new HashMap<String,List<Point>>();
		List<Point> ptListTemp = new ArrayList<Point>();
		for (int i = 0 ; i < ptList.size();i++){
			int j = i+1;
//			ptListTemp.add(ptList.get(i));
//			System.out.println("temp first add- >" + i);
			if( (j<ptList.size()) &&  (ptList.get(j).getId().equals(ptList.get(i).getId())) ){
				
				ptListTemp.add(ptList.get(i));
				System.out.println("temp add - >" + i + "   tempsize ->" + ptListTemp.size() );
			}else{
				
				ptListTemp.add(ptList.get(i));
				System.out.println("last temp add - >" + i + "   finaltempsize ->" + ptListTemp.size() );
				System.out.println(ptListTemp.toString());
				map.put(ptListTemp.get(0).getId(),ptListTemp);
				//System.out.println(map.toString());
				ptListTemp.clear();
			}
		}
	*/
//		return JSON.toJSONString(OriginTrojectoryPathService.getOriginTrajectoryPoints());
		return JSON.toJSONString(ptList);
	}
	
	

}
