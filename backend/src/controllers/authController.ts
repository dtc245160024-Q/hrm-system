import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../db';
import { User } from '../entities/User';
import { Employee } from '../entities/Employee';

const JWT_SECRET = process.env.JWT_SECRET || 'hrm_super_secret_key_123';

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password, fullName, email, roleId } = req.body;

        const userRepository = AppDataSource.getRepository(User);
        const employeeRepository = AppDataSource.getRepository(Employee);

        // Kiểm tra xem username đã tồn tại chưa
        const existingUser = await userRepository.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại!' });
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Tạo user mới
        const newUser = userRepository.create({
            username,
            passwordHash,
            roleId: roleId || 3 // Mặc định roleId = 3 (Employee)
        });
        await userRepository.save(newUser);

        // Tạo hồ sơ nhân viên đi kèm
        const newEmployee = employeeRepository.create({
            fullName,
            email,
            userId: newUser.id
        });
        await employeeRepository.save(newEmployee);

        return res.status(201).json({
            message: 'Đăng ký tài khoản thành công!',
            userId: newUser.id
        });
    } catch (error) {
        console.error('Lỗi đăng ký:', error);
        return res.status(500).json({ message: 'Lỗi server nội bộ' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { username } });
        
        if (!user) {
            return res.status(400).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng!' });
        }

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng!' });
        }

        // Tạo JWT Token có hiệu lực trong 1 ngày
        const token = jwt.sign(
            { id: user.id, username: user.username, roleId: user.roleId },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            message: 'Đăng nhập thành công!',
            token,
            user: {
                id: user.id,
                username: user.username,
                roleId: user.roleId
            }
        });
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        return res.status(500).json({ message: 'Lỗi server nội bộ' });
    }
};
