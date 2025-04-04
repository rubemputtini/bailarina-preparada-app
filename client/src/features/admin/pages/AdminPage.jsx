import React, { useEffect, useState } from "react";
import { Typography, Alert } from "@mui/material";
import { getUsers } from "../services/adminService";
import ConfirmationDialog from "shared/dialogs/ConfirmationDialog";
import SuccessDialog from "shared/dialogs/SuccessDialog";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "features/account/services/accountService";
import SearchField from "../components/SearchField";
import UserTable from "../components/UserTable";
import PageLayout from "layouts/PageLayout";
import LoadingCard from "shared/ui/LoadingCard";

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");
    const [userToDelete, setUserToDelete] = useState(null);
    const [userDeleted, setUserDeleted] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { users, totalUsers } = await getUsers(page + 1, pageSize);

                setUsers(users);
                setTotalUsers(totalUsers);
                setError("");
            } catch (error) {
                setError("Erro ao buscar usuários: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [page, pageSize]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleViewUser = (userId) => {
        navigate(`/admin/users/${userId}`);
    };

    const handleEditUser = (userId) => {
        console.log("Editar usuário", userId);
    };

    const handleScheduleUser = (userId) => {
        navigate(`/admin/planejamento/${userId}`);
    };

    const handleDeleteUser = (userId) => {
        setUserToDelete(userId);
        setShowDialog(true);
    };

    const handleDialogConfirm = () => {
        setDeleteLoading(true);
        deleteUser(userToDelete);

        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete));
        setUserDeleted(true);
        setShowDialog(false);
        setDeleteLoading(false);
        navigate("/admin");
    };

    const handleDialogCancel = () => {
        setShowDialog(false);
    };

    const handleDialogClose = () => {
        setUserDeleted(false);
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <PageLayout>
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    color: "#c5e1e9",
                    fontWeight: "bold",
                    mb: 4,
                    letterSpacing: 1.2,
                }}
            >
                Gerenciador de Usuários
            </Typography>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <SearchField value={searchTerm} onChange={handleSearch} />
            </div>

            {loading ? (
                <LoadingCard />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <>
                    {filteredUsers.length === 0 ? (
                        <Typography
                            variant="h6"
                            sx={{
                                textAlign: "center",
                                mt: 4,
                                color: "white",
                                fontStyle: "italic",
                            }}
                        >
                            Nenhum usuário encontrado.
                        </Typography>
                    ) : (
                        <>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    textAlign: "center",
                                    mb: 2,
                                    fontStyle: "italic",
                                    color: "white",
                                }}
                            >
                                {filteredUsers.length} usuário(s) encontrado(s)
                            </Typography>
                            <UserTable
                                users={filteredUsers}
                                onView={handleViewUser}
                                onEdit={handleEditUser}
                                onSchedule={handleScheduleUser}
                                onDelete={handleDeleteUser}
                                page={page}
                                setPage={setPage}
                                pageSize={pageSize}
                                setPageSize={setPageSize}
                                totalUsers={totalUsers}
                            />
                        </>
                    )}
                </>
            )}

            {showDialog && (
                <ConfirmationDialog
                    message="Tem certeza de que deseja excluir este usuário?"
                    onConfirm={handleDialogConfirm}
                    onCancel={handleDialogCancel}
                    loading={deleteLoading}
                />
            )}

            {userDeleted &&
                <SuccessDialog
                    message={"Usuário excluído com sucesso!"}
                    onClose={handleDialogClose} />}
        </PageLayout>
    );
};

export default AdminPage;
