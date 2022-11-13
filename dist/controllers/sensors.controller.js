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
exports.changeSensorStatus = exports.getDataFromASensor = exports.returnAllData = void 0;
const gasData_schema_1 = require("../schemas/gasData.schema");
const arduinoConexion_1 = require("../arduinoConexion");
const micData_schema_1 = require("../schemas/micData.schema");
const lightData_schema_1 = require("../schemas/lightData.schema");
const temperature_schema_1 = require("../schemas/temperature.schema");
const { request, response } = require('express');
let searchParameters;
const returnAllData = (req = request, res = response) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.query;
    if (!date) {
        getAllSensorsData(req, res);
    }
    else if (date) {
        getAllSensorDataForOneDay(req, res, date);
    }
    else {
        res.status(500);
    }
});
exports.returnAllData = returnAllData;
const getDataFromASensor = (req = request, res = response) => __awaiter(void 0, void 0, void 0, function* () {
    const { sensor } = req.params;
    const { date } = req.query;
    if (!date) {
        getAllDataFromASensor(req, res, sensor);
    }
    else if (date) {
        getDataFromASensorForOneDay(req, res, sensor, date);
    }
    else {
        res.status(500);
    }
});
exports.getDataFromASensor = getDataFromASensor;
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
const getAllSensorsData = (req = request, res = response) => __awaiter(void 0, void 0, void 0, function* () {
    const [gasDataLength, gasData] = yield Promise.all([gasData_schema_1.GasData.countDocuments({}), gasData_schema_1.GasData.find({})]);
    const [micDataLength, micData] = yield Promise.all([micData_schema_1.MicData.countDocuments({}), micData_schema_1.MicData.find({})]);
    const [lightDataLength, lightData] = yield Promise.all([lightData_schema_1.LightData.countDocuments({}), lightData_schema_1.LightData.find({})]);
    const [temperatureDataLegth, temperatureData] = yield Promise.all([gasData_schema_1.GasData.countDocuments({}), gasData_schema_1.GasData.find({})]);
    const totalLegth = gasDataLength + micDataLength + lightDataLength + temperatureDataLegth;
    res.status(200).json({
        totalLegth,
        data: {
            gasData,
            micData,
            lightData,
            temperatureData,
        },
    });
});
const getAllSensorDataForOneDay = (req, res, date) => __awaiter(void 0, void 0, void 0, function* () {
    getSearchParameters(date);
    const [gasData] = yield Promise.all([gasData_schema_1.GasData.find(searchParameters)]);
    const [micData] = yield Promise.all([micData_schema_1.MicData.find(searchParameters)]);
    const [lightData] = yield Promise.all([lightData_schema_1.LightData.find(searchParameters)]);
    const [temperatureData] = yield Promise.all([temperature_schema_1.Temperature.find(searchParameters)]);
    const totalLegth = gasData.length + micData.length + lightData.length + temperatureData.length;
    if (totalLegth === 0) {
        res
            .status(204)
            .json({
            data: {
                message: 'No results found for that date',
            },
        })
            .end();
    }
    else {
        res.status(200).json({
            totalLegth,
            data: {
                gasData,
                micData,
                lightData,
                temperatureData,
            },
        });
    }
});
const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
};
const formatDate = (date) => {
    return [date.getFullYear(), padTo2Digits((date.getMonth() + 1).toString()), padTo2Digits(date.getDate().toString())].join('/');
};
const getSearchParameters = (date) => {
    const DateObj = new Date(date);
    const startDate = formatDate(DateObj);
    const endDate = startDate.substring(0, 8).concat((Number(startDate.substring(8)) + 1).toString());
    searchParameters = { $and: [{ date: { $gte: new Date(startDate) } }, { date: { $lt: new Date(endDate) } }] };
};
const getTable = (sensorName) => {
    let tableName;
    if (sensorName === 'gas')
        tableName = gasData_schema_1.GasData;
    else if (sensorName === 'mic')
        tableName = micData_schema_1.MicData;
    else if (sensorName === 'light')
        tableName = lightData_schema_1.LightData;
    else if (sensorName === 'temperature')
        tableName = temperature_schema_1.Temperature;
    return tableName;
};
const getAllDataFromASensor = (req, res, sensorName) => __awaiter(void 0, void 0, void 0, function* () {
    const tableName = getTable(sensorName);
    const [dataLength, data] = yield Promise.all([tableName.countDocuments({}), tableName.find({})]);
    res.status(200).json({
        leght: dataLength,
        data,
    });
});
const getDataFromASensorForOneDay = (req, res, sensorName, date) => __awaiter(void 0, void 0, void 0, function* () {
    const tableName = getTable(sensorName);
    getSearchParameters(date);
    const [dataLength, data] = yield Promise.all([tableName.countDocuments({}), tableName.find({ searchParameters })]);
    res.status(200).json({
        leght: dataLength,
        data,
    });
});
//# sourceMappingURL=sensors.controller.js.map