"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerMic = void 0;
const mic_controller_1 = require("../controllers/mic.controller");
const { Router } = require('express');
exports.routerMic = Router();
exports.routerMic.get('/', mic_controller_1.returnAllData);
exports.routerMic.get('/turnOffSensor', mic_controller_1.changeSensorStatus);
// routerBebes.get('/:id', returnOneItem);
// routerBebes.delete('/:id', deleteItems);
// routerBebes.post('/', aggregateItem);
//# sourceMappingURL=mic.router.js.map