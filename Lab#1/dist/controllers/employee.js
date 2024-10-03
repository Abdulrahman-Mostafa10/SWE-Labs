"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployee = exports.deleteEmployee = exports.getEmployees = void 0;
const employees = [
    { id: '1', name: 'Mohamed Sayed' },
];
const getEmployees = async (req, res) => {
    return res.status(200).json({ data: employees });
};
exports.getEmployees = getEmployees;
const deleteEmployee = async (req, res) => {
    const employeeId = req.params.id;
    if (!employeeId) {
        return res.status(400).json({ message: "The employee's id is not passed." });
    }
    const employeeIndex = employees.findIndex(e => e.id === employeeId);
    if (employeeIndex < 0) {
        return res.status(404).json({ message: "There is no employee with that passed Id." });
    }
    employees.splice(employeeIndex, 1);
    return res.status(200).json({ message: "The employee has been deleted successfully." });
};
exports.deleteEmployee = deleteEmployee;
const createEmployee = async (req, res) => {
    const { employeeName, employeeId } = req.body;
    if (!employeeName || !employeeId) {
        return res.status(400).json({ message: "Both employee name and ID are required." });
    }
    const isExist = employees.some(e => e.id === employeeId || e.name === employeeName);
    if (isExist) {
        return res.status(409).json({ message: "The entered employee's id already exists, please try again." });
    }
    employees.push({ id: employeeId, name: employeeName });
    return res.status(201).json({ message: "The employee has been created." });
};
exports.createEmployee = createEmployee;
