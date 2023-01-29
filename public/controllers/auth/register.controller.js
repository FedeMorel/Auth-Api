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
exports.isMailExist = exports.registerUser = void 0;
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_schema_1 = require("../../schemas/user.schema");
const resultCode_enum_1 = require("../../utils/resultCode.enum");
const schemaRegister = joi_1.default.object({
    name: joi_1.default.string().min(5).max(15).required(),
    mail: joi_1.default.string().min(10).max(50).required().email(),
    password: joi_1.default.string().min(8).max(30).required(),
    address: joi_1.default.object().keys({
        street: joi_1.default.string().max(50),
        location: joi_1.default.string().max(50),
        city: joi_1.default.string().max(50),
        country: joi_1.default.string().max(50),
        cp: joi_1.default.string().alphanum().min(4).max(4),
    }),
    birthday: joi_1.default.date(),
    phone: joi_1.default.string().max(15),
});
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, mail, password, address, birthday, phone } = req.body;
    const { error } = schemaRegister.validate(req.body);
    if (!!error) {
        return res.status(400).json({ header: { resultCode: resultCode_enum_1.resultCode.VALIDATION_ERROR, error: error.details[0].message } });
    }
    if (yield (0, exports.isMailExist)(mail)) {
        return res.status(406).json({ header: { resultCode: resultCode_enum_1.resultCode.MAIL_REGISTRED, error: 'Mail already registered' } });
    }
    const encryptedPassword = yield encryptPassword(password);
    const user = new user_schema_1.User({
        name: name,
        mail: mail,
        password: encryptedPassword,
        address: address,
        birthday: birthday,
        phone: phone
    });
    try {
        const newUser = yield user.save();
        const { id, name, mail, address, birthday, phone, role, date } = newUser;
        res.status(201).json({
            header: {
                message: 'User created successfully',
                resultCode: resultCode_enum_1.resultCode.OK,
            },
            data: {
                user: {
                    id,
                    role,
                    name,
                    mail,
                    address,
                    birthday,
                    phone,
                    date
                }
            }
        });
    }
    catch (error) {
        res.status(500).json({ header: { resultCode: resultCode_enum_1.resultCode.FAIL, error } });
    }
});
exports.registerUser = registerUser;
const isMailExist = (mail) => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield user_schema_1.User.findOne({ mail });
    return !!response;
});
exports.isMailExist = isMailExist;
const encryptPassword = (pass) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    return yield bcrypt_1.default.hash(pass, salt);
});
//# sourceMappingURL=register.controller.js.map