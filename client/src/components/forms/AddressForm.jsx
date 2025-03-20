import React, { useEffect, useState } from "react";
import { Box, TextField, List, ListItem, ListItemText } from "@mui/material";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import useLoadGooglePlaces from "../../hooks/useLoadGooglePlaces";

const AddressForm = ({ data, onChange }) => {
    const googleLoaded = useLoadGooglePlaces();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (googleLoaded) {
            setIsReady(true);
        }
    }, [googleLoaded]);

    const { suggestions, setValue, clearSuggestions } = usePlacesAutocomplete({
        debounce: 300,
        requestOptions: {},
        skip: !isReady,
    });

    const updateAddressField = (field, value) => {
        onChange(field, value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = getLatLng(results[0]);

            const addressComponents = results[0].address_components;
            const getComponent = (types) => addressComponents.find((c) => types.some((type) => c.types.includes(type)))?.long_name || "";

            updateAddressField("street", getComponent(["route"]));
            updateAddressField("number", getComponent(["street_number"]));
            updateAddressField("neighborhood", getComponent(["sublocality"]));
            updateAddressField("city", getComponent(["administrative_area_level_2"]));
            updateAddressField("state", getComponent(["administrative_area_level_1"]));
            updateAddressField("country", getComponent(["country"]));
            updateAddressField("postalCode", getComponent(["postal_code"]));
            updateAddressField("latitude", lat);
            updateAddressField("longitude", lng);
        } catch (error) {
            console.error("Erro ao buscar dados do endereço:", error);
        }
    };

    return (
        <Box>
            <TextField
                label="Rua"
                fullWidth
                required
                variant="outlined"
                size="small"
                value={data.street}
                onChange={(e) => { setValue(e.target.value); updateAddressField("street", e.target.value); }}
                sx={{
                    marginBottom: "1rem",
                    "& .MuiOutlinedInput-root": { borderRadius: "8px" }
                }} />
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
                sx={{
                    marginBottom: "1rem",
                    "& .MuiOutlinedInput-root": { borderRadius: "8px" }
                }} />
            <TextField label="Complemento"
                fullWidth
                variant="outlined"
                size="small"
                value={data.complement}
                onChange={(e) => updateAddressField("complement", e.target.value)}
                sx={{
                    marginBottom: "1rem",
                    "& .MuiOutlinedInput-root": { borderRadius: "8px" }
                }} />
            <TextField label="Bairro"
                fullWidth
                required
                variant="outlined"
                size="small"
                value={data.neighborhood}
                onChange={(e) => updateAddressField("neighborhood", e.target.value)}
                sx={{
                    marginBottom: "1rem",
                    "& .MuiOutlinedInput-root": { borderRadius: "8px" }
                }} />
            <TextField
                label="Cidade"
                fullWidth
                required
                variant="outlined"
                size="small"
                value={data.city}
                onChange={(e) => updateAddressField("city", e.target.value)}
                sx={{
                    marginBottom: "1rem",
                    "& .MuiOutlinedInput-root": { borderRadius: "8px" }
                }} />
            <TextField
                label="Estado"
                fullWidth
                required
                variant="outlined"
                size="small"
                value={data.state}
                onChange={(e) => updateAddressField("state", e.target.value)}
                sx={{
                    marginBottom: "1rem",
                    "& .MuiOutlinedInput-root": { borderRadius: "8px" }
                }} />
            <TextField
                label="País"
                fullWidth
                required
                variant="outlined"
                size="small"
                value={data.country}
                onChange={(e) => updateAddressField("country", e.target.value)}
                sx={{
                    marginBottom: "1rem",
                    "& .MuiOutlinedInput-root": { borderRadius: "8px" }
                }} />
            <TextField
                label="CEP"
                fullWidth
                required
                variant="outlined"
                size="small"
                value={data.postalCode}
                onChange={(e) => updateAddressField("postalCode", e.target.value)}
                sx={{
                    marginBottom: "1rem",
                    "& .MuiOutlinedInput-root": { borderRadius: "8px" }
                }} />
        </Box>
    );
};

export default AddressForm;
