import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import router from "./routes";
import fileupload from "express-fileupload";
import path from "path";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());
app.use(express.static(path.join(__dirname, "../../client/build")));
app.use("/static", express.static(path.join(__dirname, "../public")));

const PORT = process.env.PORT;
app.use("/api", router);
console.log(path.join(__dirname, "../../client/build", "index.html"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

app.listen(PORT, () => console.log("Listening on Port: ", PORT));
