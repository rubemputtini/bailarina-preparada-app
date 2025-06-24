import { parsePhoneNumberFromString } from "libphonenumber-js";

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

export const isPhoneValid = (phoneNumber) => {
    if (!phoneNumber) return false;

    const formattedPhone = phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;

    try {
        const parsedNumber = parsePhoneNumberFromString(formattedPhone);
        return parsedNumber?.isValid() ?? false;
    } catch (error) {
        console.error("Erro ao validar número de telefone:", error);
        return false;
    }
};

export const isAddressValid = (address) => {
    return Boolean(
        address.street &&
        address.number &&
        address.neighborhood &&
        address.city &&
        address.state &&
        address.country &&
        address.postalCode
    )
};