import { useState, useEffect } from "react";
import { getUserDetails, updateUserDetails } from "../services/userService";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "react-phone-input-2/lib/style.css";
import { Edit, Check, Close } from "@mui/icons-material";
import { Box, CardContent, CircularProgress, IconButton } from "@mui/material";
import useAddressAutocomplete from "../hooks/useAddressAutocomplete";
import Input from "../components/forms/Input";
import PhoneInputStyled from "../components/forms/PhoneInputStyled";

const tabs = ["Informações Pessoais", "Endereço"];

const AccountPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState("");
    const [formValues, setFormValues] = useState({});
    const [originalValues, setOriginalValues] = useState({});

    const handleChange = (field, value) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const { suggestions, setValue, handleSelect } = useAddressAutocomplete(handleChange);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserDetails();
                setFormValues(data);
                setOriginalValues(data);
            } catch {
                setError("Erro ao carregar dados.");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleSave = async () => {
        try {
            setLoading(true);
            setError("");
            const updated = await updateUserDetails(formValues.id, formValues);
            setFormValues(updated);
            setOriginalValues(updated);
            setEditing(false);
        } catch {
            setError("Erro ao salvar alterações.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormValues(originalValues);
        setEditing(false);
    };

    return (
        <div className="min-h-screen text-white">
            <Nav />
            <div className="max-w-3xl mx-auto p-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-purple-800">Minha Conta</h2>
                        {!editing ? (
                            <IconButton onClick={() => setEditing(true)} sx={{ color: "#4A148C" }}>
                                <Edit />
                            </IconButton>
                        ) : (
                            <div className="flex gap-2">
                                <IconButton onClick={handleCancel} sx={{ color: "#F44336" }}>
                                    <Close />
                                </IconButton>
                                <IconButton onClick={handleSave} sx={{ color: "#4CAF50" }}>
                                    <Check />
                                </IconButton>
                            </div>
                        )}
                    </div>

                    <div className="flex border-b border-gray-200 mb-6">
                        {tabs.map((tab, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTab(i)}
                                className={`py-2 px-4 text-sm font-medium transition-all duration-200 border-b-2 focus:outline-none focus:ring-0 rounded-none ${activeTab === i
                                    ? "border-purple-700 text-purple-700"
                                    : "border-transparent text-gray-500 hover:text-purple-700"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <CardContent>
                            <Box display="flex" justifyContent="center" my={10}>
                                <CircularProgress size={24} sx={{ color: "#000" }} />
                            </Box>
                        </CardContent>
                    ) : (
                        <form className="space-y-4">
                            {activeTab === 0 && (
                                <>
                                    <Input label="Nome" value={formValues.name} onChange={(v) => handleChange("name", v)} disabled={!editing} />
                                    <Input label="Email" value={formValues.email} onChange={(v) => handleChange("email", v)} disabled={!editing} />
                                    <Input
                                        label="Data de Nascimento"
                                        value={formValues.dateOfBirth?.split("T")[0]}
                                        onChange={(v) => handleChange("dateOfBirth", v)}
                                        disabled={!editing}
                                        type="date"
                                    />
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-1 block">Telefone</label>
                                        <PhoneInputStyled
                                            value={formValues.phoneNumber}
                                            onChange={(value) => handleChange("phoneNumber", value)}
                                            disabled={!editing}
                                        />
                                    </div>
                                </>
                            )}

                            {activeTab === 1 && (
                                <>
                                    <Input
                                        label="Rua"
                                        value={formValues.street}
                                        onChange={(v) => {
                                            handleChange("street", v);
                                            setValue(v);
                                        }}
                                        disabled={!editing}
                                    />
                                    {editing && suggestions.status === "OK" && (
                                        <ul className="bg-white border rounded-md shadow p-2 text-black mb-4">
                                            {suggestions.data.map((suggestion) => (
                                                <li
                                                    key={suggestion.place_id}
                                                    onClick={() => handleSelect(suggestion.description)}
                                                    className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                                >
                                                    {suggestion.description}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {[
                                        { label: "Número", key: "number" },
                                        { label: "Complemento", key: "complement" },
                                        { label: "Bairro", key: "neighborhood" },
                                        { label: "Cidade", key: "city" },
                                        { label: "Estado", key: "state" },
                                        { label: "País", key: "country" },
                                        { label: "CEP", key: "postalCode" },
                                    ].map(({ label, key }) => (
                                        <Input
                                            key={key}
                                            label={label}
                                            value={formValues[key]}
                                            onChange={(v) => handleChange(key, v)}
                                            disabled={!editing}
                                        />
                                    ))}
                                </>
                            )}
                            {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AccountPage;