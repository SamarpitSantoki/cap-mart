import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import router from "./routes";
import fileupload from "express-fileupload";
import path from "path";
import dbConnect from "./db/connect";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());
app.use("/static", express.static(path.join(__dirname, "../public")));
const PORT = process.env.PORT || 8000;

dbConnect();

app.use("/api", router);
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});


app.listen(PORT, () => console.log("Listening on Port: ", PORT));
