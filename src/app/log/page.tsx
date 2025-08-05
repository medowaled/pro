'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'حدث خطأ أثناء تسجيل الدخول.');
        return;
      }

      alert('تم تسجيل الدخول بنجاح');
      window.location.href = '/'; // أو ضع المسار المناسب للوحة التحكم مثل "/admin/dashboard"
    } catch (err) {
      setError('حدث خطأ غير متوقع.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>تسجيل الدخول</h1>
      <input
        type="text"
        placeholder="رقم الهاتف"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem' }}
      />
      <input
        type="password"
        placeholder="كلمة المرور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem' }}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'جاري...' : 'دخول'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
