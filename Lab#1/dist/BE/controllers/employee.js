"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployee = exports.deleteEmployee = exports.getEmployees = void 0;
const employees = [
    { id: '1', name: 'Mohamed Sayed' },
];
const getEmployees = async (req, res) => {
    res.status(200).json({ data: employees });
};
exports.getEmployees = getEmployees;
const deleteEmployee = async (req, res) => {
    const employeeId = req.params.id;
    if (!employeeId) {
        res.status(409).json({
            message: "The employee's ID is not passed",
        });
        return;
    }
    const employeeIndex = employees.findIndex(e => e.id === employeeId);
    if (employeeIndex < 0) {
        res.status(404).json({
            message: "There is no employee with that passed ID",
        });
        return;
    }
    employees.splice(employeeIndex, 1);
    res.status(200).json({
        message: "The employee is deleted successfully",
    });
};
exports.deleteEmployee = deleteEmployee;
const createEmployee = async (req, res) => {
    const { employeeName, employeeId } = req.body;
    if (!employeeName || !employeeId) {
        res.status(400).json({
            message: "Both employee name and ID are required.",
        });
        return;
    }
    const isExist = employees.some(e => e.id === employeeId || e.name === employeeName);
    if (isExist) {
        res.status(409).json({
            message: `The entered employee's ID already exists, please try again.`,
        });
        return;
    }
    employees.push({ id: employeeId, name: employeeName });
    res.status(201).json({
        message: "The employee is created",
    });
};
exports.createEmployee = createEmployee;
