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
exports.registerUser = void 0;
const joi_1 = __importDefault(require("joi"));
const user_1 = require("../schemas/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const schemaRegister = joi_1.default.object({
    name: joi_1.default.string().min(6).max(255).required(),
    email: joi_1.default.string().min(6).max(255).required().email(),
    password: joi_1.default.string().min(6).max(1024).required()
});
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const { error } = schemaRegister.validate(req.body);
    const encryptedPassword = yield encryptPassword(password);
    const user = new user_1.User({
        name: name,
        email: email,
        password: encryptedPassword
    });
    if (!!error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    if (yield isEmailExist(email)) {
        return res.status(400).json({ error: 'Email already registered' });
    }
    try {
        yield user.save();
        res.status(201).json({
            message: 'User created successfully'
        });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.registerUser = registerUser;
const isEmailExist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield user_1.User.findOne({ email });
    return !!response;
});
const encryptPassword = (pass) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    return yield bcrypt_1.default.hash(pass, salt);
});
//# sourceMappingURL=register.controller.js.map