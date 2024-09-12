import productModel from "../Models/products.js";
import productStatModal from "../Models/productStat.js";
import { transactionModel } from "../Models/TransactionModel.js";
import userModel from "../Models/userModel.js";
import countryISO3 from "country-iso-2-to-3"

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    const productStats = await Promise.all(
      products.map(async (product) => {
        const stat = await productStatModal.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );
    res.status(200).json(productStats);
  } catch (error) {
    res.status(400).json({ message: "Error Occured" });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customer = await userModel.find({ role: "user" }).select("-password");
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: "Error found" });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    const transactionSort = () => {
      const parsedSort = JSON.parse(sort);
      const formattedSort = {
        [parsedSort.field]: parsedSort.sort === "asc" ? 1 : -1,
      };
      return formattedSort;
    };
    const formattedSort = Boolean(sort) ? transactionSort() : {};

    const transactionData = await transactionModel
      .find({
        $or: [
          { cost: { $regex: new RegExp(search, "i") } },
          { userId: { $regex: new RegExp(search, "i") } },
        ],
      })
      .sort(formattedSort)
      .skip((page)* pageSize)
      .limit(pageSize);

    const totalCount = await transactionModel.countDocuments({
      userId: { $regex: search, $options: "i" },
    });

    res.status(200).json({ transactions:transactionData, total:totalCount });
  } catch (error) {
    res.status(400).json({ message: "Error Found" });
  }
};

export const getGeography=async(req,res)=>{
 try {const users= await userModel.find()
  
  const locations=users.reduce((acc,{country})=>{
    const standardCountry=countryISO3(country)
    if((!acc[standardCountry])){
      acc[standardCountry]=0;
    }
    acc[standardCountry]++;
    return acc;
  },{})

  const finalLocations=Object.entries(locations).map(([country,count])=>{
    return {id:country , value:count}
  })
  res.status(200).json(finalLocations)}
  catch(error){
    res.status(400).json(`message:${error}`)
  }
}

export default getProducts;
