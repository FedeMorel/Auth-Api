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
const resultCode_enum_1 = require("../../utils/resultCode.enum");
dotenv.config();
const schemaLogin = joi_1.default.object({
    mail: joi_1.default.string().min(10).max(50).required().email(),
    password: joi_1.default.string().min(8).max(30).required()
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mail, password } = req.body;
    const { error } = schemaLogin.validate(req.body);
    if (error)
        return res.status(400).json({ header: { resultCode: resultCode_enum_1.resultCode.VALIDATION_ERROR, error: error.details[0].message } });
    const user = yield user_1.User.findOne({ mail });
    if (!user) {
        return res.status(200).json({ header: { resultCode: resultCode_enum_1.resultCode.USER_NOT_FOUND, error: 'User not found' } });
    }
    if (!(yield isValidPassword(password, user.password))) {
        return res.status(400).json({ header: { resultCode: resultCode_enum_1.resultCode.INVALID_PASSWORD, error: 'Invalid password' } });
    }
    const token = generateToken(user.name, user.id, user.role);
    res.header('auth-token', token).json({
        header: {
            message: 'authenticated user',
            resultCode: resultCode_enum_1.resultCode.OK,
        },
        data: {
            user: {
                id: user.id,
                role: user.role,
                name: user.name,
                mail: user.mail,
                address: user.address,
                birthday: user.birthday,
                phone: user.phone,
            },
            token: token
        }
    });
});
exports.login = login;
const isValidPassword = (pass, encryptedPass) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bcrypt_1.default.compare(pass, encryptedPass);
    return !!result;
});
const generateToken = (nameUser, id, user) => {
    return jsonwebtoken_1.default.sign({
        name: nameUser,
        id: id,
        role: user
    }, process.env.TOKEN_SECRET);
};
//# sourceMappingURL=login.controller.js.map