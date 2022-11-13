"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.login = void 0;
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const user_1 = require("../../schemas/user");
dotenv.config();
const schemaLogin = joi_1.default.object({
    email: joi_1.default.string().min(6).max(255).required().email(),
    password: joi_1.default.string().min(6).max(1024).required()
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { error } = schemaLogin.validate(req.body);
    if (error)
        return res.status(400).json({ error: error.details[0].message });
    const user = yield user_1.User.findOne({ email });
    if (!user) {
        return res.status(204).json({ error: 'User not found' });
    }
    if (!(yield isValidPassword(password, user.password))) {
        return res.status(400).json({ error: 'Invalid password' });
    }
    const token = generateToken(user.name, user.id);
    res.header('auth-token', token).json({
        message: 'authenticated user',
        token: token
    });
});
exports.login = login;
const isValidPassword = (pass, encryptedPass) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bcrypt_1.default.compare(pass, encryptedPass);
    return !!result;
});
const generateToken = (nameUser, id) => {
    return jsonwebtoken_1.default.sign({
        name: nameUser,
        id: id
    }, process.env.TOKEN_SECRET);
};
//# sourceMappingURL=login.controller.js.map