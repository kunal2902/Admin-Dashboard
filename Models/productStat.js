import mongoose from "mongoose";

const productStatSchema=new mongoose.Schema({
    productId:String,
    yearlySalesTotal:Number,
    yearlyTotalSoldUnits:Number,
    year:Number,
    monthlyData:[
        {
            month:String,
            totalSales:Number,
            totalUnits:Number
        }
    ],
    dailyData:[
        {
data:String,
totalSales:Number,
totalUnits:Number
        }
    ]
},{timestamps:true})


const productStatModal= mongoose.model("productStatModal",productStatSchema)

export default productStatModal