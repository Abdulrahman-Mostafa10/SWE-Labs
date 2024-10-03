"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_1 = require("../controllers/employee");
const router = (0, express_1.Router)();
router.get('/', employee_1.getEmployees);
router.post('/', employee_1.createEmployee);
router.delete('/:id', employee_1.deleteEmployee);
exports.default = router;
