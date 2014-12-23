package com.scnu.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.scnu.form.TrajectoryPoint;
import com.scnu.mapping.GetTrajectoryMapper;
import com.scnu.service.GetTrojectoryPathService;

@Service("GetTrojectoryPathServiceImpl")
public class GetTrojectoryPathServiceImpl implements GetTrojectoryPathService{
	
	private static Logger logger = LoggerFactory.getLogger(GetTrojectoryPathServiceImpl.class);
	@Autowired
	private GetTrajectoryMapper gettrajectorymapper;
	
	@Override
	public List<TrajectoryPoint> getTrajectoryPointById(String id) {
		
		List<TrajectoryPoint> rtList = new ArrayList<TrajectoryPoint>();
		rtList = gettrajectorymapper.getTrajectoryById(id);
		
		return rtList;
	}

}
