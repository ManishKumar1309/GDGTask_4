import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateLoginForm } from '../utils/validation';
import { User, Lock, Mail, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: 'member@aura.com',
    password: 'password123',
    name: '',
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  // If already authenticated, redirect to profile
  if (isAuthenticated) {
    navigate('/profile', { replace: true });
    return null;
  }

  const handleChange = (field, val) => {
    const updated = { ...formData, [field]: val };
    setFormData(updated);
    if (touched[field]) {
      setErrors(validateLoginForm(updated));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validateLoginForm(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    login({
      email: formData.email,
      name: formData.name,
    });

    const from = location.state?.from?.pathname || '/profile';
    navigate(from, { replace: true });
  };

  return (
    <div className="container" style={{ padding: '60px 20px 100px', maxWidth: '480px' }}>
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '40px 32px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <User size={28} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
            Member Sign In
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Access your orders, saved addresses, and member benefits.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="loginName">
              Display Name (Optional)
            </label>
            <input
              id="loginName"
              type="text"
              placeholder="e.g. Alex Morgan"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="loginEmail">
              Email Address <span className="required">*</span>
            </label>
            <input
              id="loginEmail"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className={`form-input ${touched.email && errors.email ? 'has-error' : ''}`}
            />
            {touched.email && errors.email && (
              <p className="form-error">{errors.email}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="loginPassword">
              Password <span className="required">*</span>
            </label>
            <input
              id="loginPassword"
              type="password"
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              className={`form-input ${touched.password && errors.password ? 'has-error' : ''}`}
            />
            {touched.password && errors.password && (
              <p className="form-error">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '8px', gap: '8px' }}
          >
            <span>Sign In to Account</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-light)', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <p>
            Demo mode active: Pre-filled credentials work instantly. No real authentication required.
          </p>
        </div>
      </div>
    </div>
  );
}
