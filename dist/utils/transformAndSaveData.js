"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformAndSaveData = void 0;
const gasData_1 = require("../arduinoController/gasData");
const lightData_1 = require("../arduinoController/lightData");
const micData_1 = require("../arduinoController/micData");
const temperatureData_1 = require("../arduinoController/temperatureData");
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
exports.transformAndSaveData = transformAndSaveData;
//# sourceMappingURL=transformAndSaveData.js.map