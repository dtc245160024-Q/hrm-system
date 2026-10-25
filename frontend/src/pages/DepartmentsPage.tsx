import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Department {
  id: number;
  name: string;
  description: string;
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const fetchDepartments = async () => {
    try {
      const response = await api.get('/departments');
      setDepartments(response.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAddDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/departments', { name, description });
      setName('');
      setDescription('');
      fetchDepartments();
    } catch (err: any) {
      alert('Thêm phòng ban thất bại!');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#1a3353', margin: 0, fontSize: '26px' }}>Quản lý Phòng Ban</h2>
        <p style={{ color: '#718096', margin: '5px 0 0 0', fontSize: '14px' }}>Cơ cấu tổ chức và các bộ phận trong doanh nghiệp</p>
      </div>

      {/* Form thêm phòng ban */}
      <div style={{ background: '#ffffff', padding: '30px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        <h3 style={{ marginBottom: '20px', color: '#2b6cb0', fontSize: '18px' }}>🏢 Thêm Phòng Ban Mới</h3>
        <form onSubmit={handleAddDepartment} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          <input 
            type="text" placeholder="Tên phòng ban" value={name} onChange={(e) => setName(e.target.value)} required 
            style={{ padding: '12px 16px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '14px', outline: 'none' }}
          />
          <input 
            type="text" placeholder="Mô tả chức năng" value={description} onChange={(e) => setDescription(e.target.value)} 
            style={{ padding: '12px 16px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '14px', outline: 'none' }}
          />
          <button type="submit" style={{ gridColumn: 'span 2', padding: '14px', background: 'linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(49,130,206,0.3)' }}>
            + Lưu Phòng Ban Mới
          </button>
        </form>
      </div>

      {/* Danh sách phòng ban */}
      <div style={{ background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '20px 30px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, color: '#1a3353', fontSize: '18px' }}>Danh Sách Phòng Ban ({departments.length})</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f7fafc', color: '#4a5568', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '15px 30px' }}>ID</th>
              <th style={{ padding: '15px 20px' }}>Tên Phòng Ban</th>
              <th style={{ padding: '15px 30px' }}>Mô Tả</th>
            </tr>
          </thead>
          <tbody>
            {departments.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ textAlign: 'center', padding: '40px', color: '#a0aec0' }}>Chưa có phòng ban nào.</td>
              </tr>
            ) : (
              departments.map((dept) => (
                <tr key={dept.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                  <td style={{ padding: '16px 30px', color: '#718096', fontWeight: '500' }}>#{dept.id}</td>
                  <td style={{ padding: '16px 20px', color: '#2d3748', fontWeight: '600' }}>{dept.name}</td>
                  <td style={{ padding: '16px 30px', color: '#4a5568' }}>{dept.description}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
