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
exports.login = void 0;
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../../schemas/user");
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
        return res.status(400).json({ error: 'contraseña no válida' });
    }
    res.json({
        message: 'authenticated user'
    });
});
exports.login = login;
const isValidPassword = (pass, encryptedPass) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bcrypt_1.default.compare(pass, encryptedPass);
    return !!result;
});
//# sourceMappingURL=login.controller.js.map