/*    */ package com.scnu.flock.type;
/*    */ 
/*    */ import java.io.PrintStream;
/*    */ import java.util.ArrayList;
/*    */ 
/*    */ public class ObjectEntry
/*    */ {
/*    */   public String id;
/*    */   public ArrayList<PointTimeEntry> pointTimeList;
/*    */ 
/*    */   public ObjectEntry()
/*    */   {
/*    */   }
/*    */ 
/*    */   public ObjectEntry(String id_, ArrayList<PointTimeEntry> pointTimeList_)
/*    */   {
/* 13 */     this.id = id_;
/* 14 */     this.pointTimeList = pointTimeList_;
/*    */   }
/*    */ 
/*    */   public void print(float timeIntervalInFile) {
/* 18 */     System.out.println("id: " + this.id);
/* 19 */     for (int i = 0; i < this.pointTimeList.size(); i++)
/* 20 */       ((PointTimeEntry)this.pointTimeList.get(i)).print(timeIntervalInFile);
/*    */   }
/*    */ }

/* Location:           C:\Users\lhb\Desktop\movingFlockFinder.jar
 * Qualified Name:     types.ObjectEntry
 * JD-Core Version:    0.6.2
 */