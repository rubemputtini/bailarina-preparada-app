import React from "react";
import { Box, TextField, List, ListItem, ListItemText } from "@mui/material";
import useAddressAutocomplete from "../../hooks/useAddressAutocomplete";

const AddressForm = ({ data, onChange }) => {
    const updateAddressField = (field, value) => {
        onChange(field, value);
    };

    const { suggestions, setValue, handleSelect, clearSuggestions } = useAddressAutocomplete(updateAddressField);

    return (
        <Box className="form-style">
            <TextField
                label="Rua"
                fullWidth
                required
                variant="outlined"
                size="small"
                value={data.street}
                onChange={(e) => {
                    setValue(e.target.value);
                    updateAddressField("street", e.target.value);
                }}
                onBlur={() => setTimeout(() => clearSuggestions(), 200)}
                sx={{ mb: 2 }}
            />

            {suggestions.status === "OK" && (
                <List>
                    {suggestions.data.map((suggestion) => (
                        <ListItem button key={suggestion.place_id} onClick={() => handleSelect(suggestion.description)}>
                            <ListItemText primary={suggestion.description} />
                        </ListItem>
                    ))}
                </List>
            )}

            <TextField label="Número"
                fullWidth
                required
                variant="outlined"
                size="small"
                value={data.number}
                onChange={(e) => updateAddressField("number", e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField label="Complemento"
                fullWidth
                variant="outlined"
                size="small"
                value={data.complement}
                onChange={(e) => updateAddressField("complement", e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField label="Bairro"
                fullWidth
                required
                variant="outlined"
                size="small"
                value={data.neighborhood}
                onChange={(e) => updateAddressField("neighborhood", e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                label="Cidade"
                fullWidth
                required
                variant="outlined"
                size="small"
                value={data.city}
                onChange={(e) => updateAddressField("city", e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                label="Estado"
                fullWidth
                required
                variant="outlined"
                size="small"
                value={data.state}
                onChange={(e) => updateAddressField("state", e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                label="País"
                fullWidth
                required
                variant="outlined"
                size="small"
                value={data.country}
                onChange={(e) => updateAddressField("country", e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                label="CEP"
                fullWidth
                required
                variant="outlined"
                size="small"
                value={data.postalCode}
                onChange={(e) => updateAddressField("postalCode", e.target.value)}
                sx={{ mb: 2 }}
            />
        </Box>
    );
};

export default AddressForm;