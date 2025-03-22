import { IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { ptBR } from "@mui/x-data-grid/locales";

const UserTable = ({ users, onView, onEdit, onDelete, page, setPage, pageSize, setPageSize, totalUsers }) => {
    const columns = [
        { field: "name", headerName: "Nome", flex: 1, minWidth: 200 },
        { field: "email", headerName: "Email", flex: 1, minWidth: 250 },
        {
            field: "actions",
            headerName: "Ações",
            flex: 0.5,
            minWidth: 150,
            sortable: false,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                    <IconButton sx={{ color: "#388E3C" }} onClick={() => onView(params.row.id)}>
                        <Visibility />
                    </IconButton>
                    <IconButton sx={{ color: "#1976D2" }} onClick={() => onEdit(params.row.id)}>
                        <Edit />
                    </IconButton>
                    <IconButton sx={{ color: "#D32F2F" }} onClick={() => onDelete(params.row.id)}>
                        <Delete />
                    </IconButton>
                </div>
            ),
        },
    ];

    return (
        <DataGrid
            rows={users}
            columns={columns}
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pagination
            paginationMode="server"
            rowCount={totalUsers}
            disableSelectionOnClick
            disableColumnMenu
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            sx={{
                fontFamily: "var(--primary-font)",
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                border: "1px solid #ddd",
                overflow: "hidden",
                "& .MuiDataGrid-root": {
                    borderRadius: "12px",
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "var(--color-light-blue)",
                    color: "#333",
                    fontSize: "14px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                    borderBottom: "2px solid var(--color-blue)",
                },
                "& .MuiDataGrid-cell": {
                    color: "#333",
                    fontSize: "14px",
                    "&:focus": {
                        outline: "none",
                    },
                },
                "& .MuiDataGrid-row": {
                    backgroundColor: "#fff",
                    "&:nth-of-type(even)": {
                        backgroundColor: "#f5f5f5",
                    },
                    "&:hover": {
                        backgroundColor: "#e0e0e0",
                    },
                },
                "& .MuiDataGrid-footerContainer": {
                    backgroundColor: "#fff",
                    color: "#333",
                    borderBottomLeftRadius: "12px",
                    borderBottomRightRadius: "12px",
                    borderTop: "2px solid #ddd",
                    fontSize: "14px",
                    padding: "8px 16px",
                },
                "& .MuiTablePagination-root, & .MuiTablePagination-caption, & .MuiTablePagination-selectLabel": {
                    fontFamily: "var(--primary-font) !important",
                    fontSize: "14px !important",
                    color: "#333 !important",
                },
            }}
        />
    );
};

export default UserTable;
