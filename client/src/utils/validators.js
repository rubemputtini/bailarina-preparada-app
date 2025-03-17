export const validatePassword = (password) => ({
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[^A-Za-z0-9]/.test(password),
});

export const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isDateValid = (date) => Boolean(date);

export const isPasswordConfirmed = (password, confirmPassword) => password === confirmPassword;
