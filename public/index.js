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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = require("./router/auth");
const app = (0, express_1.default)();
const connectionString = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.82gad.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const openServer = () => {
    const PORT = process.env.PORT || 3003;
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(body_parser_1.default.json());
    app.get('/', (req, res) => {
        res.json({
            estado: true,
            mensaje: 'funciona!'
        });
    });
    app.use('/api/user', auth_1.routerAuth);
    app.use((req, res) => {
        res.status(400).end();
    });
    try {
        app.listen(PORT, () => {
            console.log(`Escuchando en el puerto ${PORT}`);
        });
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
};
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(connectionString);
        console.log('Base de datos conectada');
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    let responseDdConnection = yield dbConnection();
    responseDdConnection && (yield openServer());
});
startServer();
//# sourceMappingURL=index.js.map