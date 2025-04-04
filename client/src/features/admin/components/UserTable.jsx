import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import ActionMenuCell from "./ActionMenuCell";

const UserTable = ({
    users,
    onView,
    onEdit,
    onViewEvaluations,
    onSchedule,
    onDelete,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalUsers,
}) => {
    const columns = [
        { field: "name", headerName: "Nome", flex: 1, minWidth: 200 },
        { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
        {
            field: "actions",
            headerName: "Ações",
            flex: 0.5,
            minWidth: 200,
            sortable: false,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <ActionMenuCell
                    row={params.row}
                    onView={onView}
                    onEdit={onEdit}
                    onViewEvaluations={onViewEvaluations}
                    onSchedule={onSchedule}
                    onDelete={onDelete}
                />
            ),
        },
    ];

    return (
        <Box sx={{ overflowX: "auto" }}>
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
                    minWidth: "800px",
                    fontFamily: "var(--primary-font)",
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #ddd",
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
                        "&:focus": { outline: "none" },
                    },
                    "& .MuiDataGrid-row": {
                        backgroundColor: "#fff",
                        "&:nth-of-type(even)": { backgroundColor: "#f5f5f5" },
                        "&:hover": { backgroundColor: "#e0e0e0" },
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
        </Box>
    );
};

export default UserTable;
