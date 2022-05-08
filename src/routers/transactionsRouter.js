import express from "express";

import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "./../controllers/transactionsController.js";

const transactionsRouter = express.Router();

transactionsRouter.post("/transactions", createTransaction);
transactionsRouter.get("/transactions", getTransactions);
transactionsRouter.put("/transactions/:id", updateTransaction);
transactionsRouter.delete("/transactions/:id", deleteTransaction);

export default transactionsRouter;
