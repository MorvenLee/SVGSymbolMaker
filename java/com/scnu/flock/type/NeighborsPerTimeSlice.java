/*    */ package com.scnu.flock.type;
/*    */ 
/*    */ import java.io.BufferedWriter;
/*    */ import java.util.ArrayList;
/*    */ import java.util.Calendar;
/*    */ 
/*    */ public class NeighborsPerTimeSlice
/*    */   implements Comparable
/*    */ {
/*    */   public long startTime;
/*    */   public long endTime;
/*    */   public ArrayList<Integer> neighborsIdxList;
/*    */   public boolean isProcessed;
/*    */   public ArrayList<Double> heightList;
/*    */   public ArrayList<Double> widthList;
/*    */   public Double height;
/*    */   public Double width;
/*    */   public Double shortestExtent;
/*    */   public int baseIdx;


public static String  resultJson = "";
/*    */ 
/*    */   public NeighborsPerTimeSlice()
/*    */   {
/* 16 */     this.shortestExtent = Double.valueOf(9999999.9900000002D);
/*    */   }
/*    */ 
/*    */   public NeighborsPerTimeSlice(long currTime) {
/* 20 */     this.startTime = (this.endTime = currTime);
/*    */   }
/*    */ 
/*    */   public boolean print(int minTimeDuration, int timeInterval, BufferedWriter bufWrite, ArrayList<ObjectEntry> objList, double radius) throws Exception {
/* 24 */     if ((this.endTime - this.startTime + 1L >= minTimeDuration) && (this.shortestExtent.doubleValue() >= radius))
	         //��С����Ҫ�Ȱ뾶��
/*    */     {
	resultJson +="{";
/* 26 */       Calendar calendar = Calendar.getInstance();
/* 27 */       double temp = this.startTime * timeInterval * 1000.0D; //flockģʽ��ʼʱ��
/* 28 */       calendar.setTimeInMillis(new Double(temp).longValue());
/*    */ 
/* 30 */       bufWrite.write("Number of Time Slices: " + (this.endTime - this.startTime + 1L) + "\n");
/*    */ 	   
resultJson += ( "\"timesliceNumber\":" + (this.endTime - this.startTime + 1L)+ "," );
/* 32 */       bufWrite.write("Start and End Time: " + this.startTime + "\t" + this.endTime + "\t");
resultJson += ( "\"startTime\":" + this.startTime + "," );
resultJson += ( "\"endTime\":" + this.endTime + "," );
/*    */ 
/* 34 */       bufWrite.write(calendar.getTime() + "\t");//flockģʽ����ʱ��
/* 35 */       temp = this.endTime * timeInterval * 1000.0D;
/* 36 */       calendar.setTimeInMillis(new Double(temp).longValue());
/*    */ 
/* 39 */       bufWrite.write(calendar.getTime() + "\nNeighbors: ");
/*    */ 
/* 41 */       for (int i = 0; i < this.neighborsIdxList.size(); i++)
/*    */       {
/* 43 */         bufWrite.write(((ObjectEntry)objList.get(((Integer)this.neighborsIdxList.get(i)).intValue())).id + "\n");
       
/*    */       resultJson += ( "\"nNeighbors"+ i + "\":\"" + ((ObjectEntry)objList.get(((Integer)this.neighborsIdxList.get(i)).intValue())).id + "\",");
               }
/*    */ 
/* 59 */       bufWrite.write("Base " + ((ObjectEntry)objList.get(this.baseIdx)).id + "\n");
/*    */ 		resultJson += ("\"base\":\"" +  ((ObjectEntry)objList.get(this.baseIdx)).id + "\"," );
				
/* 71 */       bufWrite.write("Flock Extent:" + this.shortestExtent + "\n");
				
				resultJson += ( "\"flockExtent\":" + this.shortestExtent  );
				resultJson +="},";
/* 72 */       return true;
/*    */     }
/* 74 */     return false;
/*    */   }
/*    */ 
/*    */   public int compareTo(Object obj) {
/* 78 */     if ((obj instanceof NeighborsPerTimeSlice)) {
/* 79 */       NeighborsPerTimeSlice slice = (NeighborsPerTimeSlice)obj;
/* 80 */       if (this.shortestExtent.doubleValue() > slice.shortestExtent.doubleValue())
/* 81 */         return -1;
/* 82 */       if (this.shortestExtent.doubleValue() < slice.shortestExtent.doubleValue())
/* 83 */         return 1;
/*    */     }
/* 85 */     return 0;
/*    */   }
/*    */ }

/* Location:           C:\Users\lhb\Desktop\movingFlockFinder.jar
 * Qualified Name:     types.NeighborsPerTimeSlice
 * JD-Core Version:    0.6.2
 */