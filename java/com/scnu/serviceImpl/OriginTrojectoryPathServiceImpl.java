package com.scnu.serviceImpl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.scnu.flock.type.Point;
import com.scnu.form.TrajectoryPoint;
import com.scnu.mapping.GetTrajectoryMapper;
import com.scnu.service.GetTrojectoryPathService;
import com.scnu.service.OriginTrojectoryPathService;
import com.scnu.utils.ReadDataUtil;

@Service("OriginTrojectoryPathServiceImpl")
public class OriginTrojectoryPathServiceImpl implements OriginTrojectoryPathService{
	
	private static Logger logger = LoggerFactory.getLogger(OriginTrojectoryPathServiceImpl.class);

	@Override
	public List<Point> getOriginTrajectoryPoints(String datapath) {
		// TODO Auto-generated method stub
		try {
			return ReadDataUtil.readDataFromTxt(datapath);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}

}
