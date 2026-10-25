import { Request, Response } from 'express';
import { AppDataSource } from '../db';
import { Department } from '../entities/Department';

// Lấy danh sách phòng ban
export const getDepartments = async (req: Request, res: Response) => {
    try {
        const deptRepo = AppDataSource.getRepository(Department);
        const departments = await deptRepo.find();
        return res.status(200).json(departments);
    } catch (error) {
        console.error('Lỗi lấy danh sách phòng ban:', error);
        return res.status(500).json({ message: 'Lỗi server nội bộ' });
    }
};

// Tạo phòng ban mới
export const createDepartment = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const deptRepo = AppDataSource.getRepository(Department);

        const existingDept = await deptRepo.findOne({ where: { name } });
        if (existingDept) {
            return res.status(400).json({ message: 'Phòng ban này đã tồn tại!' });
        }

        const newDept = deptRepo.create({ name, description });
        await deptRepo.save(newDept);

        return res.status(201).json({
            message: 'Tạo phòng ban thành công!',
            department: newDept
        });
    } catch (error) {
        console.error('Lỗi tạo phòng ban:', error);
        return res.status(500).json({ message: 'Lỗi server nội bộ' });
    }
};
