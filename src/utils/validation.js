/**
 * Validation utilities for Checkout, Login, and Signup forms.
 */

export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
};

export const isValidPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  const digits = phone.replace(/\D/g, '');
  // Indian phone numbers are 10 digits (optionally with +91)
  return digits.length === 10 || (digits.length === 12 && digits.startsWith('91'));
};

export const isValidPostalCode = (postal) => {
  if (!postal || typeof postal !== 'string') return false;
  const digits = postal.replace(/\D/g, '');
  // Indian PIN codes are 6 digits
  return digits.length === 6;
};

/**
 * Validates checkout form data
 * @param {object} values 
 * @returns {object} errors map
 */
export const validateCheckoutForm = (values) => {
  const errors = {};

  // Customer Info
  if (!values.fullName || values.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (minimum 2 characters)';
  }

  if (!values.email || !isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!values.phone || !isValidPhone(values.phone)) {
    errors.phone = 'Please enter a valid 10-digit mobile number';
  }

  // Shipping Address
  if (!values.address || values.address.trim().length < 5) {
    errors.address = 'House / flat number and street address are required';
  }

  if (!values.city || values.city.trim().length < 2) {
    errors.city = 'City is required';
  }

  if (!values.state || values.state.trim().length < 2) {
    errors.state = 'State is required';
  }

  if (!values.postalCode || !isValidPostalCode(values.postalCode)) {
    errors.postalCode = 'Please enter a valid 6-digit PIN code';
  }

  return errors;
};

/**
 * Validates login form data
 * @param {object} values 
 * @returns {object} errors map
 */
export const validateLoginForm = (values) => {
  const errors = {};

  if (!values.email || !isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!values.password || values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

/**
 * Validates signup form data
 * @param {object} values 
 * @returns {object} errors map
 */
export const validateSignupForm = (values) => {
  const errors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Full name is required (minimum 2 characters)';
  }

  if (!values.email || !isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!values.password || values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};
