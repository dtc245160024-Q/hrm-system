import { Request, Response } from 'express';
import { AppDataSource } from '../db';
import { Employee } from '../entities/Employee';

// Lấy danh sách nhân viên
export const getEmployees = async (req: Request, res: Response) => {
    try {
        const empRepo = AppDataSource.getRepository(Employee);
        const employees = await empRepo.find();
        return res.status(200).json(employees);
    } catch (error) {
        console.error('Lỗi lấy danh sách nhân viên:', error);
        return res.status(500).json({ message: 'Lỗi server nội bộ' });
    }
};

// Thêm nhân viên mới
export const createEmployee = async (req: Request, res: Response) => {
    try {
        const { fullName, email, phone, departmentId, userId } = req.body;
        const empRepo = AppDataSource.getRepository(Employee);

        const existingEmp = await empRepo.findOne({ where: { email } });
        if (existingEmp) {
            return res.status(400).json({ message: 'Email nhân viên đã tồn tại trong hệ thống!' });
        }

        const newEmp = empRepo.create({
            fullName,
            email,
            phone,
            departmentId: departmentId || null,
            userId: userId || null
        });

        await empRepo.save(newEmp);

        return res.status(201).json({
            message: 'Thêm hồ sơ nhân viên thành công!',
            employee: newEmp
        });
    } catch (error) {
        console.error('Lỗi thêm nhân viên:', error);
        return res.status(500).json({ message: 'Lỗi server nội bộ' });
    }
};
