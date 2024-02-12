import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import todoRouter from "./routes/todo.router.js";
dotenv.config();

const PORT = process.env.PORT || 3005;

const app = express();
app.use(express.json());
app.use(cors());
app.use('/todos',todoRouter);

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ToDo");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};
start();
