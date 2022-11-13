"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAuth = void 0;
const express_1 = require("express");
const login_controller_1 = require("../controllers/auth/login.controller");
const register_controller_1 = require("../controllers/auth/register.controller");
exports.routerAuth = (0, express_1.Router)();
exports.routerAuth.post('/register', register_controller_1.registerUser);
exports.routerAuth.post('/login', login_controller_1.login);
//# sourceMappingURL=auth.js.map