import express from "express";
import chatRouter from "./api/chat.js";

const app = express();
app.use(express.json());

app.use("/api", chatRouter);

app.get("/", (req, res) => res.send("Server OK"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server started on " + port));
