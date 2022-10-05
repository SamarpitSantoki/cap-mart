import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.use(router);

app.listen(PORT, () => console.log("Listening on Port: ", PORT));
