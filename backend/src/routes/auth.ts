import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Tài khoản và mật khẩu chuẩn cố định ban đầu
  if (email === 'admin@hrm.com' && password === '123456') {
    const token = jwt.sign({ email: 'admin@hrm.com' }, 'YOUR_SECRET_KEY', { expiresIn: '24h' });
    return res.json({ token, message: 'Đăng nhập thành công!' });
  }

  return res.status(400).json({ message: 'Sai tài khoản hoặc mật khẩu (dùng admin@hrm.com / 123456)' });
});

export default router;
