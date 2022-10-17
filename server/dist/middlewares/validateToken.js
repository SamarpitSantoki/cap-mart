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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema_1 = __importDefault(require("../models/UserSchema"));
function validateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const auhorizationHeader = req.headers.authorization;
        let result;
        if (!auhorizationHeader) {
            return res.status(401).json({
                error: true,
                message: "Access token is missing",
            });
        }
        const token = req.headers.authorization.split(" ")[1];
        const options = {
            expiresIn: "24h",
        };
        try {
            let user = yield UserSchema_1.default.findOne({
                accessToken: token,
            });
            if (!user) {
                result = {
                    error: true,
                    message: "Authorization error",
                };
                return res.status(403).json(result);
            }
            result = jsonwebtoken_1.default.verify(token, process.env.jwtSecret, options);
            if (!user.email === result.email) {
                result = {
                    error: true,
                    message: "Invalid token",
                };
                return res.status(401).json(result);
            }
            if (user.isAdmin)
                result.isadmin = true;
            req.headers = result;
            next();
        }
        catch (error) {
            console.error(error);
            if (error.name === "TokenExpiredError") {
                return res.status(403).json({
                    error: true,
                    message: "Token expired",
                });
            }
            return res.status(403).json({
                error: true,
                message: "Authentication error",
            });
        }
    });
}
exports.default = validateToken;
