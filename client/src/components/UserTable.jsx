import { IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { ptBR } from "@mui/x-data-grid/locales";

const UserTable = ({ users, onView, onEdit, onDelete }) => {
    const columns = [
        { field: "name", headerName: "Nome", flex: 1, minWidth: 200 },
        { field: "email", headerName: "Email", flex: 1, minWidth: 250 },
        {
            field: "actions",
            headerName: "Ações",
            flex: 0.5,
            minWidth: 150,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton
                        color="primary"
                        onClick={() => onView(params.row.id)}
                    >
                        <Visibility />
                    </IconButton>
                    <IconButton
                        color="secondary"
                        onClick={() => onEdit(params.row.id)}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        color="error"
                        onClick={() => onDelete(params.row.id)}
                    >
                        <Delete />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            disableColumnMenu
            hideFooterSelectedRowCount
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            sx={{
                "& .MuiDataGrid-root": {
                    borderRadius: "8px",
                    border: "none",
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#2D1D35",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                },
                "& .MuiDataGrid-sortIcon": {
                    color: "#C5E1E9",
                },

                "& .MuiDataGrid-cell": {
                    color: "#fff",
                    "&:focus": {
                        outline: "none",
                    },
                },
                "& .MuiDataGrid-row": {
                    backgroundColor: "#462554",
                    "&:nth-of-type(even)": {
                        backgroundColor: "#3E224A"
                    },
                    "&:hover": {
                        backgroundColor: "#2D1D35"
                    },
                    "&.Mui-selected": {
                        backgroundColor: "inherit",
                        border: "none",
                        "&:hover": {
                            backgroundColor: "#2D1D35"
                        },
                    },
                },
                "& .MuiDataGrid-footerContainer": {
                    backgroundColor: "#FFF",
                    color: "#FFF",
                },
            }}
        />
    )
};

export default UserTable;