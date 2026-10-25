import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import DepartmentsPage from './pages/DepartmentsPage';
import AttendancePage from './pages/AttendancePage';
import LeavePage from './pages/LeavePage';

export default function App() {
  const token = localStorage.getItem('token');
  const [currentTab, setCurrentTab] = useState<'employees' | 'departments' | 'attendance' | 'leaves'>('employees');

  if (!token) return <LoginPage />;

  return (
    <div style={{ minHeight: '100vh', background: '#f7fafc' }}>
      <nav style={{ background: '#1a3353', padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <h2 style={{ color: 'white', margin: 0, fontSize: '20px' }}>🚀 HRM Enterprise</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setCurrentTab('employees')} style={{ background: currentTab === 'employees' ? '#3182ce' : 'transparent', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Nhân Sự</button>
            <button onClick={() => setCurrentTab('departments')} style={{ background: currentTab === 'departments' ? '#3182ce' : 'transparent', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Phòng Ban</button>
            <button onClick={() => setCurrentTab('attendance')} style={{ background: currentTab === 'attendance' ? '#3182ce' : 'transparent', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Chấm Công</button>
            <button onClick={() => setCurrentTab('leaves')} style={{ background: currentTab === 'leaves' ? '#3182ce' : 'transparent', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Đơn Từ</button>
          </div>
        </div>
        <div style={{ color: '#cbd5e0', fontSize: '14px' }}>Xin chào, <strong style={{ color: 'white' }}>Admin</strong></div>
      </nav>
      <main>
        {currentTab === 'employees' && <DashboardPage />}
        {currentTab === 'departments' && <DepartmentsPage />}
        {currentTab === 'attendance' && <AttendancePage />}
        {currentTab === 'leaves' && <LeavePage />}
      </main>
    </div>
  );
}
