import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}

export default function DashboardPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/employees', { firstName, lastName, email, position });
      setFirstName('');
      setLastName('');
      setEmail('');
      setPosition('');
      fetchEmployees();
    } catch (err: any) {
      alert('Thêm nhân viên thất bại!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '100px', fontSize: '18px', color: '#666' }}>Đang tải hệ thống...</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h2 style={{ color: '#1a3353', margin: 0, fontSize: '26px' }}>Quản lý Nhân Sự</h2>
          <p style={{ color: '#718096', margin: '5px 0 0 0', fontSize: '14px' }}>Hệ thống quản lý thông tin nhân viên toàn diện</p>
        </div>
        <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#fff1f0', color: '#ff4d4f', border: '1px solid #ffa39e', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
          Đăng Xuất
        </button>
      </div>

      {/* Form Thêm nhân viên */}
      <div style={{ background: '#ffffff', padding: '30px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        <h3 style={{ marginBottom: '20px', color: '#2b6cb0', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ✨ Thêm Nhân Viên Mới
        </h3>
        <form onSubmit={handleAddEmployee} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          <input 
            type="text" placeholder="Họ (First Name)" value={firstName} onChange={(e) => setFirstName(e.target.value)} required 
            style={{ padding: '12px 16px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '14px', outline: 'none' }}
          />
          <input 
            type="text" placeholder="Tên (Last Name)" value={lastName} onChange={(e) => setLastName(e.target.value)} required 
            style={{ padding: '12px 16px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '14px', outline: 'none' }}
          />
          <input 
            type="email" placeholder="Địa chỉ Email" value={email} onChange={(e) => setEmail(e.target.value)} required 
            style={{ padding: '12px 16px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '14px', outline: 'none' }}
          />
          <input 
            type="text" placeholder="Chức vụ (Position)" value={position} onChange={(e) => setPosition(e.target.value)} required 
            style={{ padding: '12px 16px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '14px', outline: 'none' }}
          />
          <button type="submit" style={{ gridColumn: 'span 2', padding: '14px', background: 'linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(49,130,206,0.3)' }}>
            + Lưu Nhân Viên Vào Hệ Thống
          </button>
        </form>
      </div>

      {/* Bảng danh sách nhân viên */}
      <div style={{ background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '20px 30px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, color: '#1a3353', fontSize: '18px' }}>Danh Sách Nhân Viên ({employees.length})</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f7fafc', color: '#4a5568', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '15px 30px' }}>ID</th>
              <th style={{ padding: '15px 20px' }}>Họ Tên</th>
              <th style={{ padding: '15px 20px' }}>Email</th>
              <th style={{ padding: '15px 30px' }}>Chức Vụ</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#a0aec0' }}>Chưa có nhân viên nào trong hệ thống.</td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id} style={{ borderBottom: '1px solid #edf2f7', transition: 'background 0.2s' }}>
                  <td style={{ padding: '16px 30px', color: '#718096', fontWeight: '500' }}>#{emp.id}</td>
                  <td style={{ padding: '16px 20px', color: '#2d3748', fontWeight: '600' }}>{emp.firstName} {emp.lastName}</td>
                  <td style={{ padding: '16px 20px', color: '#4a5568' }}>{emp.email}</td>
                  <td style={{ padding: '16px 30px' }}>
                    <span style={{ background: '#ebf8ff', color: '#2b6cb0', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                      {emp.position}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
