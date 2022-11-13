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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose = require('mongoose');
require('dotenv').config();
const connectionString = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.82gad.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Base de datos conectada');
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
});
exports.dbConnection = dbConnection;
//# sourceMappingURL=mongo.js.map