"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerGas = void 0;
const gas_controller_1 = require("../controllers/gas.controller");
const { Router } = require('express');
exports.routerGas = Router();
exports.routerGas.get('/', gas_controller_1.returnAllData);
exports.routerGas.get('/turnOffSensor', gas_controller_1.changeSensorStatus);
// routerBebes.get('/:id', returnOneItem);
// routerBebes.delete('/:id', deleteItems);
// routerBebes.post('/', aggregateItem);
//# sourceMappingURL=gas.router.js.map