import express from "express";

import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from "./../controllers/transactionsController.js";

import validateToken from "./../middlewares/tokenValidationMiddleware.js";

const transactionsRouter = express.Router();
transactionsRouter.use(validateToken);

transactionsRouter.post("/transactions", createTransaction);
transactionsRouter.get("/transactions", getTransactions);
transactionsRouter.put("/transactions/:transactionId", updateTransaction);
transactionsRouter.delete("/transactions/:transactionId", deleteTransaction);

export default transactionsRouter;
