import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateSignupForm } from '../utils/validation';
import { User, ArrowRight } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  if (isAuthenticated) {
    navigate('/profile', { replace: true });
    return null;
  }

  const handleChange = (field, val) => {
    const updated = { ...formData, [field]: val };
    setFormData(updated);
    if (touched[field]) {
      setErrors(validateSignupForm(updated));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validateSignupForm(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });
    const validationErrors = validateSignupForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    navigate('/profile', { replace: true });
  };

  return (
    <div className="container" style={{ padding: '60px 20px 100px', maxWidth: '460px' }}>
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '40px 32px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 153, 0, 0.12)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <User size={28} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '6px' }}>
            Create Account
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            Join Shopora to track orders and save your wishlist
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="signupName">
              Full Name <span className="required">*</span>
            </label>
            <input
              id="signupName"
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              className={`form-input ${touched.name && errors.name ? 'has-error' : ''}`}
            />
            {touched.name && errors.name && <p className="form-error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signupEmail">
              Email Address <span className="required">*</span>
            </label>
            <input
              id="signupEmail"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className={`form-input ${touched.email && errors.email ? 'has-error' : ''}`}
            />
            {touched.email && errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signupPassword">
              Password <span className="required">*</span>
            </label>
            <input
              id="signupPassword"
              type="password"
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              className={`form-input ${touched.password && errors.password ? 'has-error' : ''}`}
            />
            {touched.password && errors.password && <p className="form-error">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '8px', gap: '8px' }}
          >
            <span>Create Account</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--color-border)', textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
