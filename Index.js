import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import Client from "./Routes/Client.js";
import General from "./Routes/General.js";
import Management from "./Routes/Management.js";
import Sales from "./Routes/Sales.js";


//Configurations
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Routes
app.use("/Client", Client);
app.use("/General", General);
app.use("/Management", Management);
app.use("/Sales", Sales);

const port = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(
    app.listen(port, () => {
      console.log(`Server Port :${port}`);
      // userModel.insertMany(dataUser);
      // productModel.insertMany(dataProduct)
      // productStatModal.insertMany(dataProductStat)
      // transactionModel.insertMany(dataTransaction);
      // overViewModel.insertMany(dataOverallStat);
      // affiliateStatModel.insertMany(dataAffiliateStat)
    })
  )
  .catch((e) => {
    console.log(e);
  });
