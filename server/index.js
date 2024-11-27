import express from 'express'
import dotenv from "dotenv";
import connectDB from './Database.config.js';

import cors from "cors"

import errorMiddleWare from './Middleware/errorMiddleware.js';
import Authrouter from './Router/Authrouter.js';
import OrderRouter from './Router/OrderRouter.js';

const app = express();

app.use(express.json());
app.use(cors()) ;
dotenv.config();
connectDB();

app.use(errorMiddleWare);


app.use("/api/v1/auth" , Authrouter);
app.use("/api/v1/orders" , OrderRouter);
// app.use("/api/v1/job" , JobRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT , ()=>{
    console.log("App Running");
});