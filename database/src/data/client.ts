import { MongoClient } from "mongodb";

const url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mongo:27017`;
const client = new MongoClient(url);

export const db = client.db("msbd");