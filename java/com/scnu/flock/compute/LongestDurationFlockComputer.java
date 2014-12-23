package com.scnu.flock.compute;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.StringTokenizer;

import com.scnu.flock.type.NeighborsPerTimeSlice;
import com.scnu.flock.type.ObjectEntry;
import com.scnu.flock.type.PointTimeEntry;
public class LongestDurationFlockComputer
{
/*  13 */   static double RADIUS = 150.0D;
/*  14 */   static int MIN_POINTS = 3;
/*  15 */   static int MIN_TIME_SLICES = 3;
/*  16 */   static int TIME_INTERVAL_IN_INPUT_FILE = 300;
/*     */ 

			
/*     */  
public static Map<String,String> flockFind(String radius,String minpoints,String mintimeslice,String timeinterval,String datapath)
/*     */     throws Exception
/*     */   {
			  //Scanner in = new Scanner(System.in);
			  //System.out.println("������RADIUS��");
/*  22 */     RADIUS = Double.parseDouble(radius);

			  //System.out.println("������MIN_POINTS ��");
/*  23 */     MIN_POINTS = Integer.parseInt(minpoints);

			  //System.out.println("������MIN_TIME_SLICES��");
/*  24 */     MIN_TIME_SLICES = Integer.parseInt(mintimeslice);

			  //System.out.println("������TIME_INTERVAL_IN_INPUT_FILE��");
/*  25 */     TIME_INTERVAL_IN_INPUT_FILE = Integer.parseInt(timeinterval);

NeighborsPerTimeSlice.resultJson+="[";
/*     */ 
/*  27 */     long startTime = System.currentTimeMillis();
/*     *
/*  29 */     ArrayList objList = new ArrayList();
              System.out.println("文件输入路径");
/*  46 */     FileReader input = new FileReader(datapath);
/*  47 */     BufferedReader bufRead = new BufferedReader(input);
/*     */ 
              System.out.println("文件输出路径");
/*  49 */     FileWriter outFile = new FileWriter("D:\\rt.txt");
/*  50 */     BufferedWriter bufWrite = new BufferedWriter(outFile);

/*     */ 
/*  52 */     int count = 0; int objCount = 1;
/*     */ 
/*  54 */     String tempID = null;
/*     */ 
/*  57 */     String currID = null;
/*  58 */     ArrayList tempPointTimeList = new ArrayList();
/*  59 */     String line = bufRead.readLine();
/*     */ 
/*  61 */     while (line != null)
/*     */     {
/*  63 */       StringTokenizer st = new StringTokenizer(line);
/*  64 */       tempID = st.nextToken();
/*  65 */       long tempTimeSlice = Long.parseLong(st.nextToken());
/*  66 */       double tempX = Double.parseDouble(st.nextToken());
/*  67 */       double tempY = Double.parseDouble(st.nextToken());
/*  68 */       if (count == 0) {
/*  69 */         currID = tempID;
/*     */       }
/*  71 */       if (!currID.equals(tempID)) {
/*  72 */         objList.add(new ObjectEntry(currID, tempPointTimeList));
/*  73 */         tempPointTimeList = new ArrayList();
/*  74 */         currID = tempID;
/*  75 */         objCount++;
/*     */       }
/*  77 */       tempPointTimeList.add(new PointTimeEntry(tempTimeSlice, tempX, 
/*  78 */         tempY));
/*     */ 
/*  80 */       line = bufRead.readLine();
/*  81 */       count++;
/*     */     }
/*  83 */     objList.add(new ObjectEntry(tempID, tempPointTimeList));
/*     */ 
/*  87 */     ArrayList neighborsPerTime = null;
/*  88 */     ArrayList neighborsPerTimeAll = new ArrayList();
/*     */ 
/*  90 */     for (int i = 0; i < objCount; i++)
/*     */     {
/*  93 */       neighborsPerTime = computeSpatialRange((ObjectEntry)objList.get(i), objList);
/*     */ 
/*  98 */       mergeAdjSlices(neighborsPerTime);
/*  99 */       markObjsInFlock(objList, neighborsPerTime, i);
/* 100 */       computeExtentOfSegment(objList, neighborsPerTime, i);
/*     */ 
/* 104 */       for (int j = 0; j < neighborsPerTime.size(); j++)
/*     */       {
/* 116 */         neighborsPerTimeAll.add((NeighborsPerTimeSlice)neighborsPerTime.get(j));
/*     */       }
/*     */ 
/*     */     }
/*     */ 
/* 121 */     Collections.sort(neighborsPerTimeAll);
/* 122 */     int flockCnt = 0;
/* 123 */     for (int i = 0; i < neighborsPerTimeAll.size(); i++) {
/* 124 */       if (((NeighborsPerTimeSlice)neighborsPerTimeAll.get(i)).print(MIN_TIME_SLICES, TIME_INTERVAL_IN_INPUT_FILE, bufWrite, objList, RADIUS)) {
/* 125 */       
				flockCnt++;	
/*     */       }

/*     */     }
/*     */ 
/* 135 */     bufWrite.close();
/* 136 */     bufRead.close();

			  long timedur = System.currentTimeMillis() - startTime;
/*     */ 
/* 139 */     System.out.println("running time: " + (timedur));
int len = NeighborsPerTimeSlice.resultJson.length();

NeighborsPerTimeSlice.resultJson = NeighborsPerTimeSlice.resultJson.substring(0, len-1);

NeighborsPerTimeSlice.resultJson+="]";
/*     */ 	System.out.println(NeighborsPerTimeSlice.resultJson); 
			Map<String,String> map = new HashMap<String, String>();
			map.put("time", Long.toString(timedur));
			map.put("rtJson", NeighborsPerTimeSlice.resultJson);
			return map;
/*     */   }
/*     */ 
/*     */   static ArrayList<NeighborsPerTimeSlice> computeSpatialRange(ObjectEntry currObj, ArrayList<ObjectEntry> objList)
/*     */   {
/* 149 */     ArrayList neighborsPerTime = new ArrayList();
/*     */ 
/* 151 */     for (int j = 0; j < currObj.pointTimeList.size(); j++) {
/* 152 */       long currTimeSlice = ((PointTimeEntry)currObj.pointTimeList.get(j)).timeSlice;
/* 153 */       neighborsPerTime.add(new NeighborsPerTimeSlice(currTimeSlice));
/*     */ 
/* 155 */       if (!((PointTimeEntry)currObj.pointTimeList.get(j)).isInFlock)
/*     */       {
/* 160 */         double xi = ((PointTimeEntry)currObj.pointTimeList.get(j)).x;
/* 161 */         double yi = ((PointTimeEntry)currObj.pointTimeList.get(j)).y;
/* 162 */         ((PointTimeEntry)currObj.pointTimeList.get(j)).neighborsIdxList = new ArrayList();
/* 163 */         ((NeighborsPerTimeSlice)neighborsPerTime.get(j)).neighborsIdxList = new ArrayList();
/*     */ 
/* 166 */         for (int k = 0; k < objList.size(); k++) {
/* 167 */           if (!currObj.id.equals(((ObjectEntry)objList.get(k)).id)) {
/* 168 */             for (int m = 0; m < ((ObjectEntry)objList.get(k)).pointTimeList.size(); m++) {
/* 169 */               long otherTimeSlice = 
/* 170 */                 ((PointTimeEntry)((ObjectEntry)objList.get(k)).pointTimeList
/* 170 */                 .get(m)).timeSlice;
/* 171 */               if (currTimeSlice == otherTimeSlice) {
/* 172 */                 double xk = ((PointTimeEntry)((ObjectEntry)objList.get(k)).pointTimeList.get(m)).x;
/* 173 */                 double yk = ((PointTimeEntry)((ObjectEntry)objList.get(k)).pointTimeList.get(m)).y;
/*     */                 
                       
                /*    if ((xk - xi) * (xk - xi) + (yk - yi) * ( yk - yi) <= RADIUS * RADIUS) 
                  {

                  ((PointTimeEntry)currObj.pointTimeList.get(j)).neighborsIdxList.add(new Integer(k));
                  ((NeighborsPerTimeSlice)neighborsPerTime.get(j)).neighborsIdxList.add(new Integer(k));
                }
                 */
                       
				 double lng1,lat1,lng2,lat2;
				 lat1=xi;
			     lng1=yi;
			     lat2=xk;
				 lng2=yk;
				  double radLat1 = lat1 * Math.PI / 180;
				  double radLat2 = lat2 * Math.PI / 180;
				  double a = radLat1 - radLat2;
				  double b = lng1 * Math.PI / 180 - lng2 * Math.PI / 180;
				  double s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1)
				          * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
				  s = s * 6378137.0;// ȡWGS84��׼�ο������еĵ��򳤰뾶(��λ:m) 6378137.0 or 6,371,009
				  //System.out.print(s+"\n");
				//  s = Math.round(s * 10000) / 10000;
/* 175 */                 if (s <= RADIUS) {
/* 176 */                   ((PointTimeEntry)currObj.pointTimeList.get(j)).neighborsIdxList.add(new Integer(k));
/* 177 */                   ((NeighborsPerTimeSlice)neighborsPerTime.get(j)).neighborsIdxList.add(new Integer(k));
/*     */                 }


/*     */               }
/*     */             }
/*     */           }
/*     */         }
/*     */       }
/*     */ 
/*     */     }
/*     */ 
/* 187 */     for (int j = 0; j < neighborsPerTime.size(); j++) {
/* 188 */       if (((NeighborsPerTimeSlice)neighborsPerTime.get(j)).neighborsIdxList == null) {
/* 189 */         neighborsPerTime.remove(j);
/* 190 */         j--;
/*     */       }
/*     */     }
/*     */ 
/* 194 */     return neighborsPerTime;
/*     */   }
/*     */ 
/*     */   static void mergeAdjSlices(ArrayList<NeighborsPerTimeSlice> neighborsPerTime) {
/* 198 */     int toProcessCount = 0;
/*     */ 
/* 203 */     for (int i = 0; i < neighborsPerTime.size(); i++)
/*     */     {
/* 205 */       int matchedCount = 0;
/*     */ 
/* 207 */       if (i == neighborsPerTime.size() - 1) {
/* 208 */         if (((NeighborsPerTimeSlice)neighborsPerTime.get(i)).neighborsIdxList.size() < MIN_POINTS - 1) {
/* 209 */           neighborsPerTime.remove(i);
/*     */         }
/* 211 */         else if ((i != 0) && (((NeighborsPerTimeSlice)neighborsPerTime.get(i - 1)).endTime == ((NeighborsPerTimeSlice)neighborsPerTime.get(i)).endTime))
/* 212 */           neighborsPerTime.remove(i);
/*     */         else {
/* 214 */           ((NeighborsPerTimeSlice)neighborsPerTime.get(i)).isProcessed = true;
/*     */         }
/*     */ 
/*     */       }
/* 222 */       else if (((NeighborsPerTimeSlice)neighborsPerTime.get(i)).neighborsIdxList.size() < MIN_POINTS - 1) {
/* 223 */         neighborsPerTime.remove(i);
/* 224 */         i--;
/*     */       }
/* 226 */       else if (((NeighborsPerTimeSlice)neighborsPerTime.get(i + 1)).neighborsIdxList.size() < MIN_POINTS - 1) {
/* 227 */         if ((i != 0) && (((NeighborsPerTimeSlice)neighborsPerTime.get(i - 1)).endTime == ((NeighborsPerTimeSlice)neighborsPerTime.get(i)).endTime))
/* 228 */           neighborsPerTime.remove(i);
/*     */         else {
/* 230 */           ((NeighborsPerTimeSlice)neighborsPerTime.get(i)).isProcessed = true;
/*     */         }
/*     */ 
/*     */       }
/* 235 */       else if ((((NeighborsPerTimeSlice)neighborsPerTime.get(i)).endTime + 1L == ((NeighborsPerTimeSlice)neighborsPerTime.get(i + 1)).startTime) || (((NeighborsPerTimeSlice)neighborsPerTime.get(i)).endTime >= ((NeighborsPerTimeSlice)neighborsPerTime.get(i + 1)).startTime))
/*     */       {
/* 237 */         NeighborsPerTimeSlice tempNPTS = new NeighborsPerTimeSlice();
/* 238 */         tempNPTS.startTime = ((NeighborsPerTimeSlice)neighborsPerTime.get(i)).startTime;
/* 239 */         tempNPTS.endTime = ((NeighborsPerTimeSlice)neighborsPerTime.get(i + 1)).endTime;
/* 240 */         tempNPTS.neighborsIdxList = new ArrayList();
/* 241 */         for (int j = 0; j < ((NeighborsPerTimeSlice)neighborsPerTime.get(i)).neighborsIdxList.size(); j++) {
/* 242 */           for (int k = 0; k < ((NeighborsPerTimeSlice)neighborsPerTime.get(i + 1)).neighborsIdxList.size(); k++)
/*     */           {
/* 244 */             if (((Integer)((NeighborsPerTimeSlice)neighborsPerTime.get(i)).neighborsIdxList.get(j)).equals(((NeighborsPerTimeSlice)neighborsPerTime.get(i + 1)).neighborsIdxList.get(k)))
/*     */             {
/* 246 */               tempNPTS.neighborsIdxList.add((Integer)((NeighborsPerTimeSlice)neighborsPerTime.get(i)).neighborsIdxList.get(j));
/* 247 */               break;
/*     */             }
/*     */           }
/*     */ 
/*     */         }
/*     */ 
/* 253 */         if (tempNPTS.neighborsIdxList.size() >= MIN_POINTS - 1)
/*     */         {
/* 261 */           neighborsPerTime.remove(i);
/*     */ 
/* 273 */           neighborsPerTime.add(i, tempNPTS);
/*     */         }
/* 282 */         else if ((i != 0) && (((NeighborsPerTimeSlice)neighborsPerTime.get(i - 1)).endTime == ((NeighborsPerTimeSlice)neighborsPerTime.get(i)).endTime)) {
/* 283 */           neighborsPerTime.remove(i);
/*     */         } else {
/* 285 */           ((NeighborsPerTimeSlice)neighborsPerTime.get(i)).isProcessed = true;
/*     */         }
/*     */ 
/*     */       }
/* 289 */       else if ((i != 0) && (((NeighborsPerTimeSlice)neighborsPerTime.get(i - 1)).endTime == ((NeighborsPerTimeSlice)neighborsPerTime.get(i)).endTime)) {
/* 290 */         neighborsPerTime.remove(i);
/*     */       } else {
/* 292 */         ((NeighborsPerTimeSlice)neighborsPerTime.get(i)).isProcessed = true;
/*     */       }
/*     */ 
/*     */     }
/*     */ 
/* 298 */     for (int i = 0; i < neighborsPerTime.size(); i++) {
/* 299 */       if (!((NeighborsPerTimeSlice)neighborsPerTime.get(i)).isProcessed)
/*     */       {
/* 301 */         toProcessCount++;
/*     */       }
/*     */ 
/*     */     }
/*     */ 
/* 306 */     if (toProcessCount > 1)
/*     */     {
/* 308 */       mergeAdjSlices(neighborsPerTime);
/*     */     }
/*     */   }
/*     */ 
/*     */   static void markObjsInFlock(ArrayList<ObjectEntry> objList, ArrayList<NeighborsPerTimeSlice> neighborsPerTime, int baseIdx)
/*     */   {
/* 317 */     for (int i = 0; i < neighborsPerTime.size(); i++)
/* 318 */       if (((NeighborsPerTimeSlice)neighborsPerTime.get(i)).endTime - ((NeighborsPerTimeSlice)neighborsPerTime.get(i)).startTime + 1L >= MIN_TIME_SLICES)
/* 319 */         for (int j = 0; j < ((NeighborsPerTimeSlice)neighborsPerTime.get(i)).neighborsIdxList.size(); j++) {
/* 320 */           int currNeighborIdx = ((Integer)((NeighborsPerTimeSlice)neighborsPerTime.get(i)).neighborsIdxList.get(j)).intValue();
/* 321 */           for (int k = 0; k < ((ObjectEntry)objList.get(currNeighborIdx)).pointTimeList.size(); k++) {
/* 322 */             PointTimeEntry pointTimeEnt = (PointTimeEntry)((ObjectEntry)objList.get(currNeighborIdx)).pointTimeList.get(k);
/* 323 */             if ((pointTimeEnt.timeSlice <= ((NeighborsPerTimeSlice)neighborsPerTime.get(i)).endTime) && (pointTimeEnt.timeSlice >= ((NeighborsPerTimeSlice)neighborsPerTime.get(i)).startTime))
/* 324 */               pointTimeEnt.isInFlock = true;
/*     */           }
/*     */         }
/*     */   }
/*     */ 
/*     */   static void computeExtentOfSegment(ArrayList<ObjectEntry> objList, ArrayList<NeighborsPerTimeSlice> neighborsPerTime, int baseIdx)
/*     */   {
/* 334 */     double shortestExtent = 0.0D;
/*     */     double a=0.0D;
              double b=0.0D;
/* 340 */     for (int j = 0; j < neighborsPerTime.size(); j++) {
/* 341 */       ((NeighborsPerTimeSlice)neighborsPerTime.get(j)).baseIdx = baseIdx;
/* 342 */       ((NeighborsPerTimeSlice)neighborsPerTime.get(j)).heightList = new ArrayList();
/* 343 */       ((NeighborsPerTimeSlice)neighborsPerTime.get(j)).widthList = new ArrayList();
/*     */ 
/* 345 */       for (int i = 0; i < ((NeighborsPerTimeSlice)neighborsPerTime.get(j)).neighborsIdxList.size(); i++) {
/* 346 */         ArrayList xList = new ArrayList();
/* 347 */         ArrayList yList = new ArrayList();
/*     */ 
/* 349 */         int currIdx = ((Integer)((NeighborsPerTimeSlice)neighborsPerTime.get(j)).neighborsIdxList.get(i)).intValue();
/* 350 */         ObjectEntry currObj = (ObjectEntry)objList.get(currIdx);
/*     */ 
/* 353 */         for (int k = 0; k < currObj.pointTimeList.size(); k++) {
/* 354 */           long currTime = ((PointTimeEntry)currObj.pointTimeList.get(k)).timeSlice;
/* 355 */           if ((currTime >= ((NeighborsPerTimeSlice)neighborsPerTime.get(j)).startTime) && (currTime <= ((NeighborsPerTimeSlice)neighborsPerTime.get(j)).endTime)) {
/* 356 */             xList.add(Double.valueOf(((PointTimeEntry)currObj.pointTimeList.get(k)).x));
/* 357 */             yList.add(Double.valueOf(((PointTimeEntry)currObj.pointTimeList.get(k)).y));
/*     */           }
/*     */         }
/*     */         double minX;
/* 371 */         double maxX = minX = ((Double)xList.get(0)).doubleValue();
/* 372 */         for (int k = 1; k < xList.size(); k++)
/* 373 */           if (maxX < ((Double)xList.get(k)).doubleValue())
/* 374 */             maxX = ((Double)xList.get(k)).doubleValue();
/* 375 */           else if (minX > ((Double)xList.get(k)).doubleValue())
/* 376 */             minX = ((Double)xList.get(k)).doubleValue();
/*     */         double minY;
/* 379 */         double maxY = minY = ((Double)yList.get(0)).doubleValue();
/* 380 */         for (int k = 1; k < yList.size(); k++) {
/* 381 */           if (maxY < ((Double)yList.get(k)).doubleValue())
/* 382 */             maxY = ((Double)yList.get(k)).doubleValue();
/* 383 */           else if (minY > ((Double)yList.get(k)).doubleValue()) {
/* 384 */             minY = ((Double)yList.get(k)).doubleValue();
/*     */           }
/*     */ 
/*     */         }


					double n1,e1,n2,e2;
					n1=minX;
					e1=minY;
					n2=maxX;
					e2=maxY;
					double jl_jd = 102834.74258026089786013677476285;    
					double jl_wd = 111712.69150641055729984301412873;    
					 b = Math.abs((e1 - e2) * jl_jd);    
					 a = Math.abs((n1 - n2) * jl_wd); 
/*     */ 
/* 389 */         ((NeighborsPerTimeSlice)neighborsPerTime.get(j)).heightList.add(Double.valueOf(a));
/* 390 */         ((NeighborsPerTimeSlice)neighborsPerTime.get(j)).widthList.add(Double.valueOf(b));
/*     */         
   
				//return Math.sqrt((a * a + b * b)); 
				double extent = a>b?a:b;
/* 392 */       //double extent = maxY - minY > maxX - minX ? maxY - minY : maxX - minX; //shortestExtent���㷽��
/* 393 */         if ((i == 0) || (shortestExtent > extent)) {
/* 394 */           shortestExtent = extent;
/*     */         }
/*     */       }
/*     */ 
/* 398 */       ((NeighborsPerTimeSlice)neighborsPerTime.get(j)).shortestExtent = Double.valueOf(shortestExtent);
/*     */     }
/*     */ 
/* 417 */     ObjectEntry baseObj = (ObjectEntry)objList.get(baseIdx);
/* 418 */     for (int j = 0; j < neighborsPerTime.size(); j++) {
/* 419 */       ArrayList xList = new ArrayList();
/* 420 */       ArrayList yList = new ArrayList();
/* 421 */       for (int i = 0; i < baseObj.pointTimeList.size(); i++)
/* 422 */         if ((((PointTimeEntry)baseObj.pointTimeList.get(i)).timeSlice >= ((NeighborsPerTimeSlice)neighborsPerTime.get(j)).startTime) && (((PointTimeEntry)baseObj.pointTimeList.get(i)).timeSlice <= ((NeighborsPerTimeSlice)neighborsPerTime.get(j)).endTime)) {
/* 423 */           xList.add(Double.valueOf(((PointTimeEntry)baseObj.pointTimeList.get(i)).x));
/* 424 */           yList.add(Double.valueOf(((PointTimeEntry)baseObj.pointTimeList.get(i)).y));
/*     */         }
/*     */       double minX;
/* 437 */       double maxX = minX = ((Double)xList.get(0)).doubleValue();
/* 438 */       for (int k = 1; k < xList.size(); k++)
/* 439 */         if (maxX < ((Double)xList.get(k)).doubleValue())
/* 440 */           maxX = ((Double)xList.get(k)).doubleValue();
/* 441 */         else if (minX > ((Double)xList.get(k)).doubleValue())
/* 442 */           minX = ((Double)xList.get(k)).doubleValue();
/*     */       double minY;
/* 445 */       double maxY = minY = ((Double)yList.get(0)).doubleValue();
/* 446 */       for (int k = 1; k < yList.size(); k++) {
/* 447 */         if (maxY < ((Double)yList.get(k)).doubleValue())
/* 448 */           maxY = ((Double)yList.get(k)).doubleValue();
/* 449 */         else if (minY > ((Double)yList.get(k)).doubleValue()) {
/* 450 */           minY = ((Double)yList.get(k)).doubleValue();
/*     */         }
/*     */ 
/*     */       }
/*     */ 
/* 455 */       ((NeighborsPerTimeSlice)neighborsPerTime.get(j)).height = Double.valueOf(a);
/* 456 */       ((NeighborsPerTimeSlice)neighborsPerTime.get(j)).width = Double.valueOf(b);
/* 455 */      // ((NeighborsPerTimeSlice)neighborsPerTime.get(j)).height = Double.valueOf(maxY - minY);
/* 456 */      //((NeighborsPerTimeSlice)neighborsPerTime.get(j)).width = Double.valueOf(maxX - minX);
/*     */       double extent = a>b?a:b;
/* 458 */       //double extent = maxY - minY > maxX - minX ? maxY - minY : maxX - minX;
/* 459 */       if (((NeighborsPerTimeSlice)neighborsPerTime.get(j)).shortestExtent.doubleValue() > extent)
/* 460 */         ((NeighborsPerTimeSlice)neighborsPerTime.get(j)).shortestExtent = Double.valueOf(extent);
/*     */     }
/*     */   }
/*     */ }

/* Location:           C:\Users\lhb\Desktop\movingFlockFinder.jar
 * Qualified Name:     LongestDurationFlockComputer
 * JD-Core Version:    0.6.2
 */