import React, { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import { getUsers } from "../services/adminService";
import ConfirmationDialog from "shared/dialogs/ConfirmationDialog";
import SuccessDialog from "shared/dialogs/SuccessDialog";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "features/account/services/accountService";
import SearchField from "../components/SearchField";
import UserTable from "../components/UserTable";
import PageLayout from "layouts/PageLayout";
import LoadingCard from "shared/ui/LoadingCard";
import { ROUTES } from "shared/routes/routes";
import ErrorCard from "shared/ui/ErrorCard";
import useDebounce from "shared/services/useDebounce";
import PageTitle from "layouts/PageTitle";

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 400);
    const [error, setError] = useState("");
    const [userToDelete, setUserToDelete] = useState(null);
    const [userDeleted, setUserDeleted] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [totalUsers, setTotalUsers] = useState(0);
    const isFirstRender = useRef(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);

            try {
                const { users, totalUsers } = await getUsers(paginationModel.page + 1, paginationModel.pageSize, debouncedSearchTerm);

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

        isFirstRender.current = false;

    }, [paginationModel, debouncedSearchTerm]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleEditUser = (userId) => {
        navigate(ROUTES.adminEditUser(userId));
    };

    const handleViewEvaluations = (userId) => {
        navigate(ROUTES.adminUserEvaluations(userId));
    };

    const handleScheduleUser = (userId) => {
        navigate(ROUTES.adminUserSchedule(userId));
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
        navigate(ROUTES.adminHome);
    };

    const handleDialogCancel = () => {
        setShowDialog(false);
    };

    const handleDialogClose = () => {
        setUserDeleted(false);
    };

    return (
        <PageLayout>
            <PageTitle>
                Gerenciador de Usuários
            </PageTitle>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <SearchField value={searchTerm} onChange={handleSearch} />
            </div>

            {loading ? (
                <LoadingCard />
            ) : error ? (
                <ErrorCard message={error} />
            ) : (
                <>
                    {users.length === 0 ? (
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
                                {users.length === 1
                                    ? "1 usuário encontrado"
                                    : `${totalUsers} usuários encontrados`}
                            </Typography>
                            <UserTable
                                users={users}
                                onEdit={handleEditUser}
                                onViewEvaluations={handleViewEvaluations}
                                onSchedule={handleScheduleUser}
                                onDelete={handleDeleteUser}
                                paginationModel={paginationModel}
                                onPaginationModelChange={setPaginationModel}
                                totalUsers={totalUsers}
                            />
                        </>
                    )}
                </>
            )}

            {showDialog && (
                <ConfirmationDialog
                    message="Tem certeza que deseja excluir este usuário?"
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
