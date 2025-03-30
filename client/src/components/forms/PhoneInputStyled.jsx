import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInputStyled = ({ value, onChange, disabled }) => {
    return (
        <PhoneInput
            country="pt"
            value={value}
            onChange={onChange}
            disabled={disabled}
            inputStyle={{
                width: "100%",
                height: "44px",
                fontSize: "16px",
                fontFamily: '"Montserrat", sans-serif',
                borderRadius: "8px",
                border: disabled ? "1px solid #D1D5DB" : "1px solid #D8B4FE",
                backgroundColor: disabled ? "#F3F4F6" : "#FFFFFF",
                color: "#000",
                paddingLeft: "52px",
                transition: "border-color 0.2s ease",
            }}
            buttonStyle={{
                backgroundColor: disabled ? "#F3F4F6" : "#FFFFFF",
                border: disabled ? "1px solid #D1D5DB" : "1px solid #D8B4FE",
                borderRight: "none",
                borderRadius: "8px 0 0 8px",
                transition: "all 0.2s ease",
            }}
            containerStyle={{
                borderRadius: "8px",
                width: "100%",
                border: "none",
            }}
            dropdownStyle={{
                backgroundColor: "#FFFFFF",
                color: "#000",
                fontFamily: '"Montserrat", sans-serif',
                fontSize: "14px",
            }}
            searchStyle={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: "14px",
                padding: "8px",
            }}
        />
    );
};

export default PhoneInputStyled;