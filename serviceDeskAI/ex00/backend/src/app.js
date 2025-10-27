import express from "express";

const app = express();


app.use(express.json());


app.get("/", (req, res) => {
  res.json({ message: "ServiceDeskAI API online DGARIZAD-GLOBANT" });
});

export default app;
