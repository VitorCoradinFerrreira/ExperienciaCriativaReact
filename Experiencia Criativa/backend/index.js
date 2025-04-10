import express from "express";
import cors from "cors";
import userRouter from "./routes/users.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", userRouter)

app.listen(8800);