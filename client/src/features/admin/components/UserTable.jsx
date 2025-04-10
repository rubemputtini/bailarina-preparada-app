import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import ActionMenuCell from "./ActionMenuCell";

const UserTable = ({
    users,
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
        { field: "name", headerName: "NOME", flex: 1, minWidth: 200 },
        { field: "email", headerName: "EMAIL", flex: 1, minWidth: 150 },
        {
            field: "actions",
            headerName: "AÇÕES",
            flex: 0.5,
            minWidth: 200,
            sortable: false,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <ActionMenuCell
                    row={params.row}
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
                    borderRadius: "16px",
                    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
                    border: "none",

                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#eae4f9",
                        color: "#322b47",
                        fontSize: "13px",
                        fontWeight: 800,
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px",
                        borderBottom: "2px solid #a78bfa"
                    },

                    "& .MuiDataGrid-cell": {
                        color: "#333",
                        fontSize: "13.5px",
                        paddingLeft: "12px",
                        paddingRight: "12px",
                        borderBottom: "1px solid #e3e3e3",
                        "&:focus": { outline: "none" },
                        paddingY: "10px",
                        paddingX: "16px",

                    },

                    "& .MuiDataGrid-row": {
                        backgroundColor: "#fff",
                        "&:nth-of-type(even)": { backgroundColor: "#f9f9f9" },
                        "&:hover": { backgroundColor: "#f1effa" },
                    },

                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: "#fff",
                        color: "#333",
                        borderBottomLeftRadius: "16px",
                        borderBottomRightRadius: "16px",
                        borderTop: "2px solid #eee",
                        fontSize: "13.5px",
                        padding: "8px 16px",
                    },

                    "& .MuiTablePagination-root, & .MuiTablePagination-caption, & .MuiTablePagination-selectLabel": {
                        fontFamily: "var(--primary-font) !important",
                        fontSize: "13px !important",
                        color: "#333 !important",
                    },
                }}

            />
        </Box>
    );
};

export default UserTable;
