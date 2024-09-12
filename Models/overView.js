import mongoose from "mongoose";

const overViewSchema= new mongoose.Schema({
    totalCustomers:Number,
    yearlySalesTotal:Number,
    yearlyTotalSoldUnits:Number,
    year:Number,
    monthlyData: [
        {month:String,
        totalSales:Number,
        totalUnits:Number,}
    ],
    dailyData:[
        {
        date:String,
        totalSales:Number,
        totalUnits:Number
    }
],
    salesByCategory:{
        type:Map,
        of:Number
    }
},{timestamps:true})

export const overViewModel=mongoose.model("overViewModel",overViewSchema);