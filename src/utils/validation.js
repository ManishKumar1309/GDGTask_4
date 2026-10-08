/**
 * Validation utilities for Checkout and Login forms.
 */

export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
};

export const isValidPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  // Allows optional +, digits, spaces, hyphens, min 7 digits
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
};

export const isValidPostalCode = (postal) => {
  if (!postal || typeof postal !== 'string') return false;
  const trimmed = postal.trim();
  return trimmed.length >= 3 && trimmed.length <= 10;
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
    errors.fullName = 'Full name is required (at least 2 characters)';
  }

  if (!values.email || !isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!values.phone || !isValidPhone(values.phone)) {
    errors.phone = 'Please enter a valid phone number (at least 7 digits)';
  }

  // Shipping Address
  if (!values.address || values.address.trim().length < 5) {
    errors.address = 'Street address is required (at least 5 characters)';
  }

  if (!values.city || values.city.trim().length < 2) {
    errors.city = 'City is required';
  }

  if (!values.state || values.state.trim().length < 2) {
    errors.state = 'State / Province is required';
  }

  if (!values.postalCode || !isValidPostalCode(values.postalCode)) {
    errors.postalCode = 'Valid postal / ZIP code is required';
  }

  if (!values.country || values.country.trim().length < 2) {
    errors.country = 'Country is required';
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
