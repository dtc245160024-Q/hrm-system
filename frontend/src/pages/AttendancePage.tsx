import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function AttendancePage() {
  const [attendances, setAttendances] = useState<any[]>([]);
  const [employeeName, setEmployeeName] = useState('');
  const [checkIn, setCheckIn] = useState('08:00');
  const [checkOut, setCheckOut] = useState('17:00');

  const fetchAttendances = async () => {
    try {
      const res = await api.get('/attendances');
      setAttendances(res.data);
    } catch (e) {}
  };

  useEffect(() => { fetchAttendances(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/attendances', { employeeName, checkIn, checkOut });
      setEmployeeName('');
      fetchAttendances();
    } catch (err) {
      alert('Chấm công thất bại!');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#1a3353' }}>Chấm Công & Thời Gian Làm Việc</h2>
      <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h3 style={{ color: '#2b6cb0', marginBottom: '15px' }}>⏱️ Ghi Nhận Chấm Công</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
          <input type="text" placeholder="Tên nhân viên" value={employeeName} onChange={e => setEmployeeName(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0' }} />
          <input type="text" placeholder="Giờ vào (VD: 08:00)" value={checkIn} onChange={e => setCheckIn(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0' }} />
          <input type="text" placeholder="Giờ ra (VD: 17:00)" value={checkOut} onChange={e => setCheckOut(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0' }} />
          <button type="submit" style={{ gridColumn: 'span 3', padding: '12px', background: '#3182ce', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Xác Nhận Chấm Công</button>
        </form>
      </div>
      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f7fafc', color: '#4a5568' }}>
              <th style={{ padding: '15px' }}>ID</th>
              <th style={{ padding: '15px' }}>Nhân Viên</th>
              <th style={{ padding: '15px' }}>Ngày</th>
              <th style={{ padding: '15px' }}>Giờ Vào</th>
              <th style={{ padding: '15px' }}>Giờ Ra</th>
              <th style={{ padding: '15px' }}>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {attendances.map(a => (
              <tr key={a.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                <td style={{ padding: '15px' }}>#{a.id}</td>
                <td style={{ padding: '15px', fontWeight: '600' }}>{a.employeeName}</td>
                <td style={{ padding: '15px' }}>{a.date}</td>
                <td style={{ padding: '15px' }}>{a.checkIn}</td>
                <td style={{ padding: '15px' }}>{a.checkOut}</td>
                <td style={{ padding: '15px' }}><span style={{ background: '#c6f6d5', color: '#22543d', padding: '4px 10px', borderRadius: '10px', fontSize: '12px' }}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
