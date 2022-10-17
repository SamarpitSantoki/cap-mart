"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_fileupload_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/build")));
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "../public")));
const PORT = process.env.PORT;
app.use("/api", routes_1.default);
console.log(path_1.default.join(__dirname, "../../client/build", "index.html"));
app.get("/*", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "../../client/build", "index.html"));
});
app.listen(PORT, () => console.log("Listening on Port: ", PORT));