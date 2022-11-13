"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerLight = void 0;
const light_controller_1 = require("../controllers/light.controller");
const { Router } = require('express');
exports.routerLight = Router();
exports.routerLight.get('/', light_controller_1.returnAllData);
exports.routerLight.get('/turnOffSensor', light_controller_1.changeSensorStatus);
//# sourceMappingURL=light.router.js.map