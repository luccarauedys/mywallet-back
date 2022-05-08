import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URI);
try {
  await mongoClient.connect();
  db = mongoClient.db(process.env.DATABASE);
  console.log("Conexão com o MongoDB estabelecida com sucesso!");
} catch (error) {
  console.log("Erro na conexão com o MongoDB.");
}

export default db;
