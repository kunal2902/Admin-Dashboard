import userModel from "../Models/userModel.js";
import { overViewModel } from "../Models/overView.js";
import {transactionModel} from "../Models/TransactionModel.js"

export const user=async(req,res)=>{
    try{const {id}=req.params;
    const userData=await userModel.findById(id);
    res.status(200).json(userData)}
    catch(e){res.status(400).json({message:"error found"})}
}

export const getDashboard=async (req,res)=>{
    try{
         const presentDay="2021-02-01"
         const presentMonth="February"
         const presentYear=2021

         const recentTransactions= await transactionModel.find().limit(50).sort({createdOn:-1})

         const overallStat=await overViewModel.find({year:presentYear})

         const {
            totalCustomers,
            yearlySalesTotal,
            yearlyTotalSoldUnits,
            monthlyData,
            dailyData,
            salesByCategory
         }=overallStat[0]

         const currentMonthStats=monthlyData.find(({month})=>{
            return month===presentMonth
         })
         const currentDayStats=dailyData.find(({date})=>{
            return date===presentDay
         })

         res.status(200).json(
            {totalCustomers,
            yearlySalesTotal,
            yearlyTotalSoldUnits,
            monthlyData,
            dailyData,
            salesByCategory,
            currentMonthStats,
            currentDayStats,
            recentTransactions}
         )
    }catch(error){
        res.status(400).json(`errror found: ${error}`)
    }
}

