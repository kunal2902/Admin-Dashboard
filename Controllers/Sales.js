import { overViewModel } from "../Models/overView.js"

export const getOverview=async(req,res)=>{
   try{
   const sales=await overViewModel.find()
   res.status(200).json(sales[0])}
   catch(e){
    res.status(400).json(`error found:${e}`)
   }
}