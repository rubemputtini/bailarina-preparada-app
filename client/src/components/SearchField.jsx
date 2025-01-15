import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchField = ({ value, onChange }) => {
    return (
        <TextField
            placeholder="Pesquisar Usuário"
            variant="outlined"
            value={value}
            onChange={onChange}
            sx={{
                width: "100%",
                maxWidth: "300px",
                backgroundColor: "white",
                borderRadius: "25px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                transition: "0.3s ease",
                "&:hover": {
                    transform: "scale(1.02)",
                },
                "& .MuiOutlinedInput-root": {
                    borderRadius: "25px",
                },
            }}
            InputProps={{
                style: {
                    borderRadius: "25px",
                    borderColor: "#a08dcf",
                },
                startAdornment: (
                    <InputAdornment position="start">
                        <Search style={{ color: "#8752A3" }} />
                    </InputAdornment>
                ),
            }}
        />
    )
};

export default SearchField;