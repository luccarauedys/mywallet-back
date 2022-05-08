import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import db from "./../db.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.collection("users").findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await db.collection("sessions").insertOne({
        userId: user._id,
        token,
      });
      res.status(201).send({ token });
    } else {
      return user
        ? res.status(401).send("Invalid email or password.")
        : res.status(404).send("User does not exist.");
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await db.collection("users").findOne({ email });
    if (user) return res.status(409).send("User already exists");
    const passwordHash = bcrypt.hashSync(password, 10);
    await db
      .collection("users")
      .insertOne({ name, email, password: passwordHash });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
