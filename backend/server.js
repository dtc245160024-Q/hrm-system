const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Dữ liệu bộ nhớ cho toàn hệ thống
let employees = [
  { id: 1, firstName: 'Nguyễn Văn', lastName: 'An', email: 'an.nguyen@hrm.com', position: 'Developer' },
  { id: 2, firstName: 'Trần Thị', lastName: 'Bình', email: 'binh.tran@hrm.com', position: 'HR Manager' }
];

let departments = [
  { id: 1, name: 'Phòng Kỹ Thuật', description: 'Phát triển phần mềm' },
  { id: 2, name: 'Phòng Nhân Sự', description: 'Quản lý tuyển dụng và nhân sự' }
];

let attendances = [
  { id: 1, employeeName: 'Nguyễn Văn An', date: '2026-10-26', checkIn: '08:00', checkOut: '17:00', status: 'Đúng giờ' }
];

let leaveRequests = [
  { id: 1, employeeName: 'Trần Thị Bình', leaveType: 'Nghỉ phép năm', reason: 'Việc gia đình', status: 'Đã duyệt' }
];

// API Đăng nhập
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@hrm.com' && password === '123456') {
    const token = jwt.sign({ email: 'admin@hrm.com' }, 'YOUR_SECRET_KEY', { expiresIn: '24h' });
    return res.json({ token, message: 'Đăng nhập thành công!' });
  }
  return res.status(400).json({ message: 'Sai tài khoản hoặc mật khẩu!' });
});

// API Nhân viên
app.get('/api/employees', (req, res) => res.json(employees));
app.post('/api/employees', (req, res) => {
  const { firstName, lastName, email, position } = req.body;
  const newEmp = { id: employees.length + 1, firstName, lastName, email, position };
  employees.push(newEmp);
  res.json({ message: 'Thêm nhân viên thành công!', employee: newEmp });
});

// API Phòng ban
app.get('/api/departments', (req, res) => res.json(departments));
app.post('/api/departments', (req, res) => {
  const { name, description } = req.body;
  const newDept = { id: departments.length + 1, name, description };
  departments.push(newDept);
  res.json({ message: 'Thêm phòng ban thành công!', department: newDept });
});

// API Chấm công
app.get('/api/attendances', (req, res) => res.json(attendances));
app.post('/api/attendances', (req, res) => {
  const { employeeName, checkIn, checkOut } = req.body;
  const newAtt = { id: attendances.length + 1, employeeName, date: new Date().toISOString().split('T')[0], checkIn, checkOut, status: 'Hoàn thành' };
  attendances.push(newAtt);
  res.json({ message: 'Chấm công thành công!', attendance: newAtt });
});

// API Đơn từ
app.get('/api/leaves', (req, res) => res.json(leaveRequests));
app.post('/api/leaves', (req, res) => {
  const { employeeName, leaveType, reason } = req.body;
  const newLeave = { id: leaveRequests.length + 1, employeeName, leaveType, reason, status: 'Chờ duyệt' };
  leaveRequests.push(newLeave);
  res.json({ message: 'Gửi đơn thành công!', leave: newLeave });
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
