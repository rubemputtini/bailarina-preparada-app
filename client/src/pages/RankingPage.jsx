import React, { useState, useEffect, useCallback } from "react";
import { getRanking } from "../services/rankingService";
import { months } from "../utils/constants";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    CircularProgress,
    Box,
    Alert,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
} from "@mui/material";
import { Refresh, FilterList, EmojiEvents } from "@mui/icons-material";

const RankingPage = () => {
    const [rankingData, setRankingData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(new Date().getFullYear());
    const [anchorEl, setAnchorEl] = useState(null);

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

    const handleOpenFilters = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseFilters = () => {
        setAnchorEl(null);
    };

    const handleSetMonth = (value) => {
        setMonth(value);
        handleCloseFilters();
    };

    const getSelectedPeriod = () => {
        const selectedMonth = months.find((m) => m.value === month)?.label;
        return selectedMonth ? `${selectedMonth}/${year}` : `${year}`;
    };

    return (
        <div className="min-h-screen flex flex-col ">
            <Nav />
            <Container className="flex-grow py-8">
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    className="text-[#c5e1e9]"
                    sx={{ fontWeight: "bold" }}
                >
                    Ranking CBP
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
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
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseFilters}
                    >
                        <MenuItem
                            onClick={() => handleSetMonth(null)}
                            selected={month === null}
                            style={{ fontWeight: "bold" }}
                        >
                            ANUAL
                        </MenuItem>
                        <MenuItem disabled>
                            <strong>Mês</strong>
                        </MenuItem>
                        {months.map((option) => (
                            <MenuItem
                                key={option.value}
                                selected={month === option.value}
                                onClick={() => handleSetMonth(option.value)}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                        <MenuItem disabled>
                            <strong>Ano</strong>
                        </MenuItem>
                        {Array.from({ length: 1 }).map((_, idx) => {
                            const yearOption = new Date().getFullYear() - idx;
                            return (
                                <MenuItem
                                    key={yearOption}
                                    selected={year === yearOption}
                                    onClick={() => setYear(yearOption)}
                                >
                                    {yearOption}
                                </MenuItem>
                            );
                        })}
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
                    <Box display="flex" justifyContent="center" my={22}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : (
                    <Box sx={{ overflowX: "auto" }}>
                        <Table className="bg-white">
                            <TableHead style={{ backgroundColor: "#9c27b0" }}>
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        style={{ color: "white", fontWeight: "bold" }}
                                    >
                                        Posição
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        style={{ color: "white", fontWeight: "bold" }}
                                    >
                                        Nome
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        style={{ color: "white", fontWeight: "bold" }}
                                    >
                                        Pontos
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        style={{ color: "white", fontWeight: "bold" }}
                                    >
                                        Dias Treinados
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rankingData.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        style={{
                                            backgroundColor:
                                                index < 3 ? "#f3f3f3" : "transparent"
                                        }}
                                        className="hover:bg-gray-100 transition-all duration-200"
                                    >
                                        <TableCell>
                                            <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                                {index < 3 ? (
                                                    <EmojiEvents
                                                        style={{
                                                            color:
                                                                index === 0
                                                                    ? "#FFD700"
                                                                    : index === 1
                                                                        ? "#C0C0C0"
                                                                        : "#CD7F32",
                                                        }}
                                                    />
                                                ) : (
                                                    <Box
                                                        style={{
                                                            width: "24px",
                                                            height: "24px",
                                                        }}
                                                    />
                                                )}
                                                {index + 1}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            {item.userName}
                                        </TableCell>
                                        <TableCell align="center">{item.points}</TableCell>
                                        <TableCell align="center">{item.daysTrained}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                )}
            </Container>
            <Footer />
        </div>
    );
};

export default RankingPage;
