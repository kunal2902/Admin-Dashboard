import express from "express";
import getProducts, {
  getCustomers,
  getGeography,
  getTransactions,
} from "../Controllers/Client.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography",getGeography);

export default router;
