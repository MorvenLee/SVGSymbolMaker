/*    */ package com.scnu.flock.type;
/*    */ 
/*    */ import java.io.PrintStream;
/*    */ import java.util.ArrayList;
/*    */ import java.util.Calendar;
/*    */ 
/*    */ public class PointTimeEntry
/*    */ {
/*    */   public long timeSlice;
/*    */   public double x;
/*    */   public double y;
/*    */   public ArrayList<Integer> neighborsIdxList;
/*    */   public boolean isInFlock;
/*    */ 
/*    */   public PointTimeEntry()
/*    */   {
/*    */   }
/*    */ 
/*    */   public PointTimeEntry(long timeSlice_, double x_, double y_)
/*    */   {
/* 15 */     this.timeSlice = timeSlice_;
/* 16 */     this.x = x_;
/* 17 */     this.y = y_;
/*    */   }
/*    */ 
/*    */   public void print(float timeIntervalInFile) {
/* 21 */     Calendar calendar = Calendar.getInstance();
/* 22 */     calendar.setTimeInMillis(new Double((float)this.timeSlice * timeIntervalInFile * 1000.0D).longValue());
/* 23 */     System.out.println("x,y,timeSlice: " + this.x + "," + this.y + "," + this.timeSlice);
/* 24 */     System.out.println(calendar.getTime());
/* 25 */     System.out.println("Is it in a flock? " + this.isInFlock);
/* 26 */     System.out.print("neighbors: ");
/* 27 */     if (this.neighborsIdxList != null) {
/* 28 */       for (int i = 0; i < this.neighborsIdxList.size(); i++) {
/* 29 */         System.out.print(this.neighborsIdxList.get(i) + "\t");
/*    */       }
/*    */     }
/* 32 */     System.out.println();
/*    */   }
/*    */ }

/* Location:           C:\Users\lhb\Desktop\movingFlockFinder.jar
 * Qualified Name:     types.PointTimeEntry
 * JD-Core Version:    0.6.2
 */