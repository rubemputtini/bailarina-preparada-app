import { useState, useEffect } from "react";
import {
    Alert,
    Box,
    Card,
    CardContent,
    CircularProgress,
    TextField,
    Button,
    Grid,
} from "@mui/material";
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
            <section className="p-6 min-h-screen max-w-4xl mx-auto">
                <Card className="shadow-lg rounded-lg">
                    {loading ? (
                        <Box display="flex" justifyContent="center" my={22}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <CardContent>
                            <h3
                                className="text-[#302539] font-bold mb-6 text-center text-2xl md:text-3xl"
                            >
                                Minha Conta
                            </h3>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Nome"
                                        value={formValues.name}
                                        onChange={(e) =>
                                            handleChange("name", e.target.value)
                                        }
                                        disabled={!editing}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Email"
                                        type="email"
                                        value={formValues.email}
                                        onChange={(e) =>
                                            handleChange("email", e.target.value)
                                        }
                                        disabled={!editing}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Cidade"
                                        value={formValues.city}
                                        onChange={(e) =>
                                            handleChange("city", e.target.value)
                                        }
                                        disabled={!editing}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="País"
                                        value={formValues.country}
                                        onChange={(e) =>
                                            handleChange("country", e.target.value)
                                        }
                                        disabled={!editing}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <PhoneInput
                                        country={"br"}
                                        value={formValues.phoneNumber}
                                        onChange={(value) =>
                                            handleChange("phoneNumber", value)
                                        }
                                        disabled={!editing}
                                        inputStyle={{
                                            width: "100%",
                                            borderRadius: "4px",
                                            height: "56px",
                                            border: "1px solid #ccc",
                                        }}
                                        buttonStyle={{
                                            borderRadius: "8px 0 0 8px",
                                            border: "1px solid #ccc",
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            {error && (
                                <Alert severity="error" className="mt-4">
                                    {error}
                                </Alert>
                            )}
                            <div className="flex justify-center mt-6 gap-4">
                                {editing ? (
                                    <>
                                        <Button
                                            variant="contained"
                                            style={{
                                                backgroundColor: "#302539",
                                                color: "#fff",
                                                marginRight: "10px",
                                            }}
                                            onClick={handleSave}
                                            disabled={loading || !user}
                                        >
                                            Salvar
                                        </Button>
                                        <Button variant="outlined" onClick={handleCancel}>
                                            Cancelar
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        variant="contained"
                                        style={{
                                            backgroundColor: "#302539",
                                            color: "#fff",
                                        }}
                                        onClick={() => setEditing(true)}
                                    >
                                        Editar
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    )}
                </Card>
            </section>
            <Footer />
        </>
    );
};

export default AccountPage;
