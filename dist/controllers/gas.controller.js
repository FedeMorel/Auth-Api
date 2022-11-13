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
exports.changeSensorStatus = exports.returnAllData = void 0;
const gasData_schema_1 = require("../schemas/gasData.schema");
const arduinoConexion_1 = require("../arduinoConexion");
const { request, response } = require('express');
const returnAllData = (req = request, res = response) => __awaiter(void 0, void 0, void 0, function* () {
    const [length, data] = yield Promise.all([gasData_schema_1.GasData.countDocuments({}), gasData_schema_1.GasData.find({})]);
    res.json({
        length: length,
        data: data,
    });
});
exports.returnAllData = returnAllData;
const changeSensorStatus = (req = request, res = response) => __awaiter(void 0, void 0, void 0, function* () {
    const { value } = req.query;
    arduinoConexion_1.portSerial.write(value, (err) => {
        if (err) {
            res.status(500).json({ message: err.message, status: 500 });
            console.log('Error on write: ', err.message);
        }
    });
    res.status(202).json({ message: 'Successfully update', status: 202 });
});
exports.changeSensorStatus = changeSensorStatus;
//# sourceMappingURL=gas.controller.js.map