import { useState } from "react";
import { Stepper, Step, StepLabel, Box, Container, Grid, Typography } from "@mui/material";
import { Person, Home, CheckCircle } from "@mui/icons-material";
import AddressForm from "shared/forms/AddressForm";
import PersonalInfoForm from "shared/forms/PersonalInfoForm";
import { validatePassword, isEmailValid, isDateValid, isPasswordConfirmed, isPhoneValid } from "shared/utils/validators";
import ErrorCard from "shared/ui/ErrorCard";
import DialogButton from "shared/buttons/DialogButton";

const steps = [
    { label: "Usuário", icon: <Person /> },
    { label: "Endereço", icon: <Home /> },
];

const initialFormState = {
    name: "", email: "", dateOfBirth: "", phoneNumber: "", password: "", confirmPassword: "",
    street: "", number: "", complement: "", neighborhood: "", city: "",
    state: "", country: "", postalCode: ""
};

const SignupStepper = ({ onRegister, onLoginRedirect, error, loading }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState(initialFormState);
    const [passwordRequisites, setPasswordRequisites] = useState(validatePassword(""));
    const [showPasswordPopup, setShowPasswordPopup] = useState(false);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (field === "password") {
            setPasswordRequisites(validatePassword(value));
        }
    };

    const isFormValid = formData.name && isEmailValid(formData.email) &&
        isDateValid(formData.dateOfBirth) && isPhoneValid(formData.phoneNumber) &&
        Object.values(passwordRequisites).every(Boolean) &&
        isPasswordConfirmed(formData.password, formData.confirmPassword);

    const handleNext = () => isFormValid && setActiveStep((prevStep) => prevStep + 1);
    const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

    const handleSubmit = async () => {
        await onRegister(formData);
    };

    return (
        <Container
            maxWidth="xs"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "1rem",
            }}
        >
            <Box
                sx={{
                    width: "80%",
                    padding: "1.5rem",
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                }}
            >
                <Typography
                    variant="h5"
                    align="center"
                    sx={{
                        fontWeight: 600,
                        marginBottom: "1rem",
                        fontFamily: "'Montserrat', sans-serif",
                        color: "#403b4d",
                    }}
                >
                    Crie sua conta
                </Typography>
                <Stepper activeStep={activeStep} alternativeLabel sx={{ marginBottom: "1.5rem" }}>
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepLabel StepIconComponent={() => activeStep > index ? <CheckCircle color="success" /> : step.icon}>{""}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === 0 && (
                    <PersonalInfoForm
                        data={formData}
                        onChange={handleChange}
                        passwordRequisites={passwordRequisites}
                        showPasswordPopup={showPasswordPopup}
                        setShowPasswordPopup={setShowPasswordPopup}
                    />
                )}
                {activeStep === 1 && <AddressForm data={formData} onChange={handleChange} />}

                <Grid
                    container
                    spacing={2}
                    sx={{
                        marginTop: "0.3rem",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    {activeStep > 0 && (
                        <Grid item>
                            <DialogButton
                                onClick={handleBack}
                                variant="secondary"
                                fullWidthOnMobile={false}
                            >
                                Voltar
                            </DialogButton>
                        </Grid>
                    )}
                    <Grid item>
                        {activeStep === steps.length - 1 ? (
                            <DialogButton
                                onClick={handleSubmit}
                                loading={loading}
                                fullWidthOnMobile={false}
                            >
                                Registrar
                            </DialogButton>
                        ) : (
                            <DialogButton
                                onClick={handleNext}
                                disabled={!isFormValid}
                                fullWidthOnMobile={false}
                            >
                                Próximo
                            </DialogButton>
                        )}
                    </Grid>
                </Grid>

                {error && (
                    <ErrorCard
                        message={error}
                        sx={{ mt: 3 }}
                    />
                )}

                <Typography
                    variant="body2"
                    align="center"
                    sx={{
                        marginTop: "1rem",
                        color: "#6c5c80",
                    }}
                >
                    <div className="flex items-center justify-center mt-4">
                        <p className="text-gray-400">Já possui uma conta?{' '}</p>
                        <button
                            onClick={onLoginRedirect}
                            className="text-fuchsia-800 hover:underline font-bold ml-1"
                        >
                            Entre aqui
                        </button>
                    </div>
                </Typography>
            </Box>
        </Container>
    );
};

export default SignupStepper;
