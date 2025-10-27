import express from "express";
import { connectDB } from "../config/db.js";

const app = express();
connectDB();

app.use(express.json());


app.get("/", (req, res) => {
  res.json({ message: "ServiceDeskAI API online DGARIZAD-GLOBANT" });
});

export default app;
