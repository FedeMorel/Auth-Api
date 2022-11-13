"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerSensor = void 0;
const sensors_controller_1 = require("../controllers/sensors.controller");
const { Router } = require('express');
exports.routerSensor = Router();
exports.routerSensor.get('/', sensors_controller_1.returnAllData);
exports.routerSensor.get('/:sensor', sensors_controller_1.getDataFromASensor);
exports.routerSensor.get('/turnOffSensor', sensors_controller_1.changeSensorStatus);
//# sourceMappingURL=sensors.router.js.map