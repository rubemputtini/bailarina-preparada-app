import { useState, useEffect } from "react";
import {
    Alert,
    Box,
    CardContent,
    CircularProgress,
    TextField,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import { Edit, Check, Close } from "@mui/icons-material";
import { getUserDetails, updateUserDetails } from "../services/userService";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AccountPage = () => {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        city: "",
        country: "",
        phoneNumber: "",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetails = await getUserDetails();
                if (!userDetails) {
                    throw new Error("Detalhes do usuário não encontrados.");
                }

                setUser(userDetails);
                setFormValues({
                    name: userDetails.name || "",
                    email: userDetails.email || "",
                    city: userDetails.city || "",
                    country: userDetails.country || "",
                    phoneNumber: userDetails.phoneNumber || "",
                });
            } catch (err) {
                console.error("Erro ao carregar os detalhes do usuário:", err);
                setError("Erro ao carregar os detalhes da conta.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    const handleChange = (field, value) => {
        setFormValues((prev) => ({
            ...prev,
            [field]: value || "",
        }));
    };

    const handleSave = async () => {
        if (!user) {
            setError("Os dados do usuário não estão disponíveis.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const updatedUser = await updateUserDetails(user.id, {
                name: formValues.name.trim(),
                email: formValues.email.trim(),
                phoneNumber: formValues.phoneNumber?.trim() || null,
                country: formValues.country?.trim() || null,
                city: formValues.city?.trim() || null,
            });

            setUser(updatedUser);
            setFormValues({
                name: updatedUser.name || "",
                email: updatedUser.email || "",
                city: updatedUser.city || "",
                country: updatedUser.country || "",
                phoneNumber: updatedUser.phoneNumber || "",
            });

            setEditing(false);
        } catch (err) {
            console.error("Erro ao atualizar os dados:", err);
            setError("Erro ao atualizar os dados. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (!user) return;

        setFormValues({
            name: user.name || "",
            email: user.email || "",
            city: user.city || "",
            country: user.country || "",
            phoneNumber: user.phoneNumber || "",
        });
        setEditing(false);
        setError("");
    };

    return (
        <>
            <Nav />
            <Box sx={{ padding: "24px", minHeight: "100vh", }}>
                <Box
                    sx={{
                        maxWidth: "800px",
                        margin: "0 auto",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "12px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                        padding: "32px",
                    }}
                >
                    {loading ? (
                        <Box display="flex" justifyContent="center" my={22}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#4A148C",
                                    }}
                                >
                                    Minha Conta
                                </Typography>
                                {editing ? (
                                    <Box>
                                        <IconButton
                                            onClick={handleSave}
                                            sx={{
                                                color: "#4CAF50",
                                                marginRight: 1,
                                            }}
                                        >
                                            <Check />
                                        </IconButton>
                                        <IconButton
                                            onClick={handleCancel}
                                            sx={{
                                                color: "#F44336",
                                            }}
                                        >
                                            <Close />
                                        </IconButton>
                                    </Box>
                                ) : (
                                    <IconButton
                                        onClick={() => setEditing(true)}
                                        sx={{
                                            color: "#4A148C",
                                        }}
                                    >
                                        <Edit />
                                    </IconButton>
                                )}
                            </Box>
                            <Grid container spacing={3} sx={{ marginTop: 3 }}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Nome"
                                        value={formValues.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        disabled={!editing}
                                        fullWidth
                                        required
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor: editing ? "#9C27B0" : "#CCCCCC",
                                                },
                                                "&.Mui-disabled fieldset": {
                                                    borderColor: "#CCCCCC",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: editing ? "#9C27B0" : "#CCCCCC",
                                                },
                                            },
                                            "& input": {
                                                color: editing ? "#000000" : "#6A6A6A",
                                                backgroundColor: editing ? "#FFFFFF" : "#F5F5F5",
                                            },
                                            "& .MuiInputLabel-root": {
                                                color: editing ? "#9C27B0" : "#6A6A6A",
                                            },
                                            "& .MuiInputLabel-root.Mui-disabled": {
                                                color: "#6A6A6A",
                                            },
                                            "& .MuiInputLabel-root.Mui-focused": {
                                                color: "#9C27B0",
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Email"
                                        type="email"
                                        value={formValues.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        disabled={!editing}
                                        fullWidth
                                        required
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor: editing ? "#9C27B0" : "#CCCCCC",
                                                },
                                                "&.Mui-disabled fieldset": {
                                                    borderColor: "#CCCCCC",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: editing ? "#9C27B0" : "#CCCCCC",
                                                },
                                            },
                                            "& input": {
                                                color: editing ? "#000000" : "#6A6A6A",
                                                backgroundColor: editing ? "#FFFFFF" : "#F5F5F5",
                                            },
                                            "& .MuiInputLabel-root": {
                                                color: editing ? "#9C27B0" : "#6A6A6A",
                                            },
                                            "& .MuiInputLabel-root.Mui-disabled": {
                                                color: "#6A6A6A",
                                            },
                                            "& .MuiInputLabel-root.Mui-focused": {
                                                color: "#9C27B0",
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Cidade"
                                        value={formValues.city}
                                        onChange={(e) => handleChange("city", e.target.value)}
                                        disabled={!editing}
                                        fullWidth
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor: editing ? "#9C27B0" : "#CCCCCC",
                                                },
                                                "&.Mui-disabled fieldset": {
                                                    borderColor: "#CCCCCC",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: editing ? "#9C27B0" : "#CCCCCC",
                                                },
                                            },
                                            "& input": {
                                                color: editing ? "#000000" : "#6A6A6A",
                                                backgroundColor: editing ? "#FFFFFF" : "#F5F5F5",
                                            },
                                            "& .MuiInputLabel-root": {
                                                color: editing ? "#9C27B0" : "#6A6A6A",
                                            },
                                            "& .MuiInputLabel-root.Mui-disabled": {
                                                color: "#6A6A6A",
                                            },
                                            "& .MuiInputLabel-root.Mui-focused": {
                                                color: "#9C27B0",
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="País"
                                        value={formValues.country}
                                        onChange={(e) => handleChange("country", e.target.value)}
                                        disabled={!editing}
                                        fullWidth
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor: editing ? "#9C27B0" : "#CCCCCC",
                                                },
                                                "&.Mui-disabled fieldset": {
                                                    borderColor: "#CCCCCC",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: editing ? "#9C27B0" : "#CCCCCC",
                                                },
                                            },
                                            "& input": {
                                                color: editing ? "#000000" : "#6A6A6A",
                                                backgroundColor: editing ? "#FFFFFF" : "#F5F5F5",
                                            },
                                            "& .MuiInputLabel-root": {
                                                color: editing ? "#9C27B0" : "#6A6A6A",
                                            },
                                            "& .MuiInputLabel-root.Mui-disabled": {
                                                color: "#6A6A6A",
                                            },
                                            "& .MuiInputLabel-root.Mui-focused": {
                                                color: "#9C27B0",
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <PhoneInput
                                        country={"br"}
                                        value={formValues.phoneNumber}
                                        onChange={(value) => handleChange("phoneNumber", value)}
                                        disabled={!editing}
                                        inputStyle={{
                                            width: "100%",
                                            height: "56px",
                                            borderRadius: "8px",
                                            border: editing ? "1px solid #9C27B0" : "1px solid #CCCCCC",
                                            fontSize: "16px",
                                            paddingLeft: "50px",
                                            color: editing ? "#000" : "#6A6A6A",
                                            backgroundColor: editing ? "#FFFFFF" : "#F5F5F5",
                                            boxSizing: "border-box",
                                        }}
                                        buttonStyle={{
                                            backgroundColor: editing ? "#FFFFFF" : "#F5F5F5",
                                            border: editing ? "1px solid #9C27B0" : "1px solid #CCCCCC",
                                            borderRadius: "8px 0 0 8px",
                                        }}
                                        dropdownStyle={{
                                            borderRadius: "8px",
                                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            {error && (
                                <Alert severity="error" sx={{ marginTop: 3 }}>
                                    {error}
                                </Alert>
                            )}
                        </CardContent>
                    )}
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default AccountPage;
