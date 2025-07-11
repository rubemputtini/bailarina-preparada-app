import React, { useState, useEffect, useCallback } from "react";
import { getRanking } from "../services/rankingService";
import { months } from "shared/utils/constants";
import {
    Box,
    Typography,
    Alert,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
} from "@mui/material";
import { Refresh, FilterList } from "@mui/icons-material";
import { getUserId } from "features/auth/services/auth";
import TopRankingCard from "../components/TopRankingCard";
import RankingRow from "../components/RankingRow";
import PageLayout from "layouts/PageLayout";
import LoadingCard from "shared/ui/LoadingCard";
import PageTitle from "layouts/PageTitle";

const RankingPage = () => {
    const [rankingData, setRankingData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(new Date().getFullYear());
    const [anchorEl, setAnchorEl] = useState(null);
    const currentUserId = getUserId()

    const fetchRanking = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getRanking(month, year);
            setRankingData(data);
        } catch (err) {
            setError("Erro ao carregar o ranking. Por favor, tente novamente.");
        } finally {
            setLoading(false);
        }
    }, [month, year]);

    useEffect(() => {
        fetchRanking();
    }, [fetchRanking]);

    const handleOpenFilters = (event) => setAnchorEl(event.currentTarget);
    const handleCloseFilters = () => setAnchorEl(null);
    const handleSetMonth = (value) => {
        setMonth(value);
        handleCloseFilters();
    };

    const getSelectedPeriod = () => {
        const selectedMonth = months.find((m) => m.value === month)?.label;
        return selectedMonth ? `${selectedMonth}/${year}` : `${year}`;
    };

    const getMedalColor = (index) => {
        return index === 0
            ? "#FFD700"
            : index === 1
                ? "#C0C0C0"
                : index === 2
                    ? "#CD7F32"
                    : "#9c27b0";
    };

    const rankingDataTop3 = rankingData.slice(0, 3);
    const rankingDataOthers = rankingData.slice(3);

    return (
        <PageLayout>
            <PageTitle>
                Ranking CBP
            </PageTitle>

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={3} mb={2}>
                <Tooltip title="Atualizar Ranking">
                    <IconButton style={{ color: "#c5e1e9" }} onClick={fetchRanking}>
                        <Refresh />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Filtros">
                    <IconButton style={{ color: "#c5e1e9" }} onClick={handleOpenFilters}>
                        <FilterList />
                    </IconButton>
                </Tooltip>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseFilters}>
                    <MenuItem onClick={() => handleSetMonth(null)} selected={month === null}>
                        <strong>ANUAL</strong>
                    </MenuItem>
                    <MenuItem disabled><strong>Mês</strong></MenuItem>
                    {months.map((option) => (
                        <MenuItem
                            key={option.value}
                            selected={month === option.value}
                            onClick={() => handleSetMonth(option.value)}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                    <MenuItem disabled><strong>Ano</strong></MenuItem>
                    <MenuItem selected={year === new Date().getFullYear()} onClick={() => setYear(new Date().getFullYear())}>
                        {new Date().getFullYear()}
                    </MenuItem>
                </Menu>
            </Box>

            <Typography
                variant="h6"
                align="center"
                gutterBottom
                className="font-semibold text-[#c5e1e9]"
            >
                {getSelectedPeriod()}
            </Typography>

            {loading ? (
                <LoadingCard />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <Box>
                    {rankingDataTop3.length > 0 && (
                        <Box className="grid md:grid-cols-3 gap-4 mt-6 mb-10">
                            {rankingDataTop3.map((user, index) => (
                                <TopRankingCard
                                    key={index}
                                    user={user}
                                    index={index}
                                    getMedalColor={getMedalColor}
                                />
                            ))}
                        </Box>
                    )}

                    <Box className="mt-6 max-h-[500px] overflow-y-auto text-black">
                        {rankingDataOthers.length === 0 && rankingDataTop3.length === 0 ? (
                            <Box className="text-center mt-20 opacity-70">
                                <Typography variant="h6" className="text-[#c5e1e9] font-semibold" sx={{ marginBottom: 1 }}>
                                    Nenhum treino registrado ainda!
                                </Typography>
                                <Typography variant="body2" className="text-[#c5e1e9]">
                                    Assim que as alunas registrarem seus treinos, o ranking será exibido aqui.
                                </Typography>
                            </Box>
                        ) : (
                            rankingDataOthers.map((user, index) => {
                                const rank = index + 4;
                                const isCurrentUser = user.userId === currentUserId;
                                return (
                                    <RankingRow
                                        key={index + 3}
                                        user={user}
                                        rank={rank}
                                        isCurrentUser={isCurrentUser}
                                        isEven={index % 2 === 0}
                                    />
                                );
                            })
                        )}
                    </Box>

                </Box>
            )}
        </PageLayout>
    );
};

export default RankingPage;
