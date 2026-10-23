/**
 * Validation utilities for form inputs
 */

// Indian phone number validation
// Accepts: +91XXXXXXXXXX, 91XXXXXXXXXX, 0XXXXXXXXXX, XXXXXXXXXX (10 digits after country code)
const INDIAN_PHONE_REGEX = /^(\+91|91|0)?[6-9]\d{9}$/;

export function isValidIndianPhone(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return INDIAN_PHONE_REGEX.test(cleaned);
}

export function formatPhoneForDisplay(phone: string): string {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  if (cleaned.length === 11 && cleaned.startsWith("0")) {
    return `+91 ${cleaned.slice(1, 6)} ${cleaned.slice(6)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  if (cleaned.length === 13 && cleaned.startsWith("+91")) {
    return `+91 ${cleaned.slice(3, 8)} ${cleaned.slice(8)}`;
  }
  return phone;
}

// Email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  if (!email) return false;
  return EMAIL_REGEX.test(email.trim());
}

// Name validation (alphabets, spaces, hyphens, apostrophes, min 2 chars)
const NAME_REGEX = /^[a-zA-Z][a-zA-Z\s\-']{1,}$/;

export function isValidName(name: string): boolean {
  if (!name) return false;
  return NAME_REGEX.test(name.trim());
}

// City validation (alphanumeric with spaces)
export function isValidCity(city: string): boolean {
  if (!city) return false;
  return city.trim().length >= 2 && city.trim().length <= 100;
}

// Message validation
export function isValidMessage(message: string, minLength = 10, maxLength = 1000): boolean {
  if (!message) return false;
  const trimmed = message.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength;
}

// Validation result type
export interface ValidationError {
  field: string;
  message: string;
}

export type ValidationResult = ValidationError[];

// Form-specific validators
export function validateContactForm(data: {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  subject?: string;
  message?: string;
}): ValidationResult {
  const errors: ValidationResult = [];

  if (!data.name?.trim()) {
    errors.push({ field: "name", message: "Name is required" });
  } else if (!isValidName(data.name)) {
    errors.push({ field: "name", message: "Please enter a valid name" });
  }

  if (!data.email?.trim()) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: "email", message: "Please enter a valid email address" });
  }

  if (!data.phone?.trim()) {
    errors.push({ field: "phone", message: "Phone number is required" });
  } else if (!isValidIndianPhone(data.phone)) {
    errors.push({ field: "phone", message: "Please enter a valid Indian phone number" });
  }

  if (!data.city?.trim()) {
    errors.push({ field: "city", message: "City is required" });
  } else if (!isValidCity(data.city)) {
    errors.push({ field: "city", message: "Please enter a valid city name" });
  }

  if (!data.subject) {
    errors.push({ field: "subject", message: "Please select a subject" });
  }

  if (!data.message?.trim()) {
    errors.push({ field: "message", message: "Message is required" });
  } else if (!isValidMessage(data.message)) {
    errors.push({ field: "message", message: "Message must be at least 10 characters" });
  }

  return errors;
}

export function validateEnquiryForm(data: {
  name?: string;
  phone?: string;
  city?: string;
  message?: string;
}): ValidationResult {
  const errors: ValidationResult = [];

  if (!data.name?.trim()) {
    errors.push({ field: "name", message: "Name is required" });
  } else if (!isValidName(data.name)) {
    errors.push({ field: "name", message: "Please enter a valid name" });
  }

  if (!data.phone?.trim()) {
    errors.push({ field: "phone", message: "Phone number is required" });
  } else if (!isValidIndianPhone(data.phone)) {
    errors.push({ field: "phone", message: "Please enter a valid Indian phone number" });
  }

  if (!data.city?.trim()) {
    errors.push({ field: "city", message: "City is required" });
  } else if (!isValidCity(data.city)) {
    errors.push({ field: "city", message: "Please enter a valid city name" });
  }

  if (!data.message?.trim()) {
    errors.push({ field: "message", message: "Please include a message" });
  }

  return errors;
}
