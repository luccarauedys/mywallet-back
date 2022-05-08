import { ObjectId } from "mongodb";
import dayjs from "dayjs";

import db from "./../db.js";

export const createTransaction = async (req, res) => {
  const { user } = res.locals;
  const { type, value, description } = req.body;

  if (!type || !value || !description) return res.sendStatus(400);

  try {
    const newTransaction = {
      userId: user._id,
      type,
      value,
      description,
      time: dayjs().format("DD/MM"),
    };

    await db.collection("transactions").insertOne(newTransaction);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getTransactions = async (req, res) => {
  const { user } = res.locals;

  try {
    const transactions = await db
      .collection("transactions")
      .find({ userId: user._id })
      .toArray();

    res.send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateTransaction = async (req, res) => {
  const { user } = res.locals;
  const { transactionId } = req.params;
  const { value, description } = req.body;

  try {
    const oldTransaction = await db
      .collection("transactions")
      .findOne({ _id: new ObjectId(transactionId), userId: user._id });

    if (!oldTransaction) return res.sendStatus(404);

    await db
      .collection("transactions")
      .updateOne(
        { _id: new ObjectId(transactionId) },
        { $set: { ...oldTransaction, value, description } }
      );

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteTransaction = async (req, res) => {
  const { user } = res.locals;
  const { transactionId } = req.params;

  try {
    const transaction = await db
      .collection("transactions")
      .findOne({ _id: new ObjectId(transactionId), userId: user._id });

    if (!transaction) return res.sendStatus(404);

    await db
      .collection("transactions")
      .deleteOne({ _id: new ObjectId(transactionId) });

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
};
