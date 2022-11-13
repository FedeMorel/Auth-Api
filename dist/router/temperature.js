"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerTemperature = void 0;
const temperature_controller_1 = require("../controllers/temperature.controller");
const { Router } = require('express');
exports.routerTemperature = Router();
exports.routerTemperature.get('/', temperature_controller_1.returnAllData);
exports.routerTemperature.get('/turnOffSensor', temperature_controller_1.changeSensorStatus);
// routerBebes.get('/:id', returnOneItem);
// routerBebes.delete('/:id', deleteItems);
// routerBebes.post('/', aggregateItem);
//# sourceMappingURL=temperature.js.map