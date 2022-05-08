import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRouter from "./routers/authRouter.js";
// import transactionsRouter from "./routers/transactionsRouter.js";

const app = express().use(cors()).use(express.json());

app.use(authRouter);
// app.use(transactionsRouter);

app.listen(process.env.PORT, () => {
  console.log("Servidor em pé na porta", process.env.PORT);
});
