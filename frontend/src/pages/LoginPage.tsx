import React from 'react';

export default function LoginPage() {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Tự động lưu token giả lập và chuyển thẳng vào Dashboard
    localStorage.setItem('token', 'fake-jwt-token-for-admin');
    window.location.reload();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Hệ Thống HRM</h2>
        <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>Nhấn nút bên dưới để truy cập vào hệ thống quản lý</p>
        <button 
          onClick={handleLogin}
          style={{ width: '100%', padding: '12px', background: '#1890ff', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
          Vào Hệ Thống Ngay
        </button>
      </div>
    </div>
  );
}
