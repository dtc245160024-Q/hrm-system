import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function LeavePage() {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [employeeName, setEmployeeName] = useState('');
  const [leaveType, setLeaveType] = useState('Nghỉ phép năm');
  const [reason, setReason] = useState('');

  const fetchLeaves = async () => {
    try {
      const res = await api.get('/leaves');
      setLeaves(res.data);
    } catch (e) {}
  };

  useEffect(() => { fetchLeaves(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/leaves', { employeeName, leaveType, reason });
      setEmployeeName(''); setReason('');
      fetchLeaves();
    } catch (err) {
      alert('Gửi đơn thất bại!');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#1a3353' }}>Quản Lý Đơn Từ & Phê Duyệt</h2>
      <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h3 style={{ color: '#2b6cb0', marginBottom: '15px' }}>📝 Tạo Đơn Nghỉ Phép / OT</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
          <input type="text" placeholder="Tên nhân viên" value={employeeName} onChange={e => setEmployeeName(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0' }} />
          <select value={leaveType} onChange={e => setLeaveType(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0' }}>
            <option>Nghỉ phép năm</option>
            <option>Nghỉ ốm</option>
            <option>Đăng ký OT</option>
          </select>
          <input type="text" placeholder="Lý do" value={reason} onChange={e => setReason(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0' }} />
          <button type="submit" style={{ gridColumn: 'span 3', padding: '12px', background: '#3182ce', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Gửi Đơn Duyệt</button>
        </form>
      </div>
      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f7fafc', color: '#4a5568' }}>
              <th style={{ padding: '15px' }}>ID</th>
              <th style={{ padding: '15px' }}>Nhân Viên</th>
              <th style={{ padding: '15px' }}>Loại Đơn</th>
              <th style={{ padding: '15px' }}>Lý Do</th>
              <th style={{ padding: '15px' }}>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map(l => (
              <tr key={l.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                <td style={{ padding: '15px' }}>#{l.id}</td>
                <td style={{ padding: '15px', fontWeight: '600' }}>{l.employeeName}</td>
                <td style={{ padding: '15px' }}>{l.leaveType}</td>
                <td style={{ padding: '15px' }}>{l.reason}</td>
                <td style={{ padding: '15px' }}><span style={{ background: '#feebc8', color: '#744210', padding: '4px 10px', borderRadius: '10px', fontSize: '12px' }}>{l.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
