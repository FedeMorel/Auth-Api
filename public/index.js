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
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongo_1 = require("./mongo");
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./router/user.router");
const post_router_1 = require("./router/post.router");
const comment_router_1 = require("./router/comment.router");
dotenv.config();
const app = (0, express_1.default)();
const openServer = () => {
    const PORT = process.env.PORT || 3003;
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(body_parser_1.default.json());
    app.get('/', (req, res) => {
        res.json({
            message: 'Auth-Api working'
        });
    });
    app.use('/api/user', user_router_1.routerUser);
    app.use('/api/post', post_router_1.routerPost);
    app.use('/api/comment', comment_router_1.routerComment);
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
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    let responseDdConnection = yield (0, mongo_1.dbConnection)();
    responseDdConnection && (yield openServer());
});
startServer();
//# sourceMappingURL=index.js.map