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
exports.arduinoConexion = exports.parser = exports.portSerial = void 0;
const gasData_1 = require("./arduinoController/gasData");
const lightData_1 = require("./arduinoController/lightData");
const micData_1 = require("./arduinoController/micData");
const temperatureData_1 = require("./arduinoController/temperatureData");
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
exports.portSerial = new SerialPort({
    path: 'COM3',
    baudRate: 9600,
});
exports.parser = exports.portSerial.pipe(new ReadlineParser({ delimiter: '\r\n' }));
const arduinoConexion = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.portSerial.on('open', () => {
        console.log('Conexion Abierta');
    });
    exports.parser.on('data', (data) => {
        InformationManagement(data);
    });
    exports.portSerial.on('error', (err) => {
        console.log(err);
    });
});
exports.arduinoConexion = arduinoConexion;
const InformationManagement = (information) => {
    let informationArray = information.split('-');
    transformAndSaveData(informationArray);
};
const transformAndSaveData = (data) => {
    switch (data[0]) {
        case 'TH':
            let objectSensorTHData = {
                humidity: data[1],
                temperature: data[2],
                computeHeatIndex: data[3],
            };
            (0, temperatureData_1.saveTemperatureAndHumidityInDatabase)(objectSensorTHData);
            break;
        case 'G':
            let objectSensorGasData = {
                value: data[1],
            };
            (0, gasData_1.saveGasValueInDatabase)(objectSensorGasData);
            break;
        case 'M':
            let objectSensorMicData = {
                value: data[1],
            };
            (0, micData_1.saveMicValueInDatabase)(objectSensorMicData);
            break;
        case 'L':
            let objectSensorLightData = {
                value: data[1],
            };
            (0, lightData_1.saveLightValueInDatabase)(objectSensorLightData);
            break;
        default:
            break;
    }
};
//# sourceMappingURL=arduinoConexion.js.map