"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema_1 = __importDefault(require("../models/UserSchema"));
const generateToken_1 = __importDefault(require("../middlewares/generateToken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phone } = req.body;
    try {
        let user = yield UserSchema_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exists" }] });
        }
        user = new UserSchema_1.default({
            name,
            email,
            phone,
            password,
        });
        const salt = yield bcryptjs_1.default.genSalt(10);
        user.password = yield bcryptjs_1.default.hash(password, salt);
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
        const token = yield (0, generateToken_1.default)(payload);
        user.access_token = token.token;
        yield user.save();
        res.status(200).send({
            name: user.name,
            email: user.email,
            phone: user.phone,
            access_token: user.access_token,
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield UserSchema_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
        }
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
        const token = yield (0, generateToken_1.default)(payload);
        user.access_token = token.token;
        yield user.save();
        res.status(200).send({
            name: user.name,
            email: user.email,
            phone: user.phoneNumber,
            access_token: user.access_token,
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        yield UserSchema_1.default.findOneAndUpdate({
            email,
        }, {
            access_token: "",
        }, {
            new: true,
        });
        res.status(200).send("Logout Successfully");
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
exports.logout = logout;
