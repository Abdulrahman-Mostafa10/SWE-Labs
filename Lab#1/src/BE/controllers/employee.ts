import { Request, Response } from 'express';

interface Employee {
  id: string;
  name: string;
}

const employees: Employee[] = [
  { id: '1', name: 'Mohamed Sayed' },
];

export const getEmployees = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ data: employees });
};

export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
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

export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  const { employeeName, employeeId }: { employeeName?: string; employeeId?: string } = req.body;

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
