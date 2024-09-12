import mongoose from "mongoose";

const affiliateStatSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"userModel"
    },
    affiliateSales:{
        type:[mongoose.Types.ObjectId],
        ref:"TransactionModel"
    }
},{timestamps:true})

export const affiliateStatModel= mongoose.model("affiliateStatModel",affiliateStatSchema)