import mongoose from "mongoose";
import userModel from "../Models/userModel.js";
import { transactionModel } from "../Models/TransactionModel.js";

export const getAdmins=async(req,res)=>{
    try{
    const admins=await userModel.find({role:"admin"}).select("-password")
    res.status(200).json(admins)}
    catch(error){
        res.status(400).json(`error found:${error}`)
    }
}

export const getAffiliateStats=async(req,res)=>{
    try{
        const {id}=req.params
    const affiliateStat=await userModel.aggregate([
        {$match:{_id:new mongoose.Types.ObjectId(id)}},
        {
            $lookup:{
                from:"affiliatestatmodels",
                localField:"_id",
                foreignField:"userId",
                as:"affiliateStats"
            }
        },
        {$unwind:"$affiliateStats"}
    ])

    const saleTransactions=await Promise.all(
        affiliateStat[0].affiliateStats.affiliateSales.map((id)=>{
             return transactionModel.findById(id)
        })
    )

    const filteredTransactions= saleTransactions.filter(
        (transaction)=> transaction!==null
    )

    res.status(200).json({user:affiliateStat[0], sales:filteredTransactions})}
    catch(error){
        res.json(`error found:${error}`)
    }
}