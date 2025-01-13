import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Tabs,
    Tab,
    TextField,
    Typography,
    Box,
    MenuItem,
    Rating,
    Grid,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";
import { getUsers } from "../services/adminService";
import { getExercises } from "../services/exerciseService";
import { createEvaluation } from "../services/evaluationService";
import dayjs from "dayjs";
import Nav from "../components/Nav";

const EvaluationPage = () => {
    const [users, setUsers] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [exerciseScores, setExerciseScores] = useState({});
    const [observations, setObservations] = useState({});
    const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [nextEvaluationDate, setNextEvaluationDate] = useState(
        dayjs().add(6, "month").format("YYYY-MM-DD")
    );
    const [selectedCategory, setSelectedCategory] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedUsers = await getUsers();
            const fetchedExercises = await getExercises();
            setUsers(fetchedUsers);
            setExercises(fetchedExercises);
        };
        fetchData();
    }, []);

    const handleSave = async () => {
        await createEvaluation(selectedUser, date, exerciseScores, observations);
        navigate("/success");
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);
        setNextEvaluationDate(dayjs(newDate).add(6, "month").format("YYYY-MM-DD"));
    };

    const handleScoreChange = (exerciseId, newScore) => {
        setExerciseScores((prev) => ({ ...prev, [exerciseId]: newScore }));
    };

    const handleObservationChange = (exerciseId, text) => {
        setObservations((prev) => ({ ...prev, [exerciseId]: text }));
    };

    const categories = [...new Set(exercises.map((e) => e.category))];

    return (
        <>
            <Nav />
            <Box className="p-6 min-h-screen max-w-5xl mx-auto">
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    className="text-white font-bold"
                >
                    Criar Avaliação
                </Typography>

                <Grid container spacing={3} className="mb-6">
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Selecionar Usuário"
                            select
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            variant="outlined"
                        >
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Data da Avaliação"
                            value={date}
                            onChange={(e) => handleDateChange(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Próxima Avaliação"
                            value={nextEvaluationDate}
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            disabled
                        />
                    </Grid>
                </Grid>

                <Tabs
                    value={selectedCategory}
                    onChange={(e, newValue) => setSelectedCategory(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                    className="mb-6 bg-white rounded-lg shadow-lg"
                >
                    {categories.map((category, index) => (
                        <Tab key={index} label={category} />
                    ))}
                </Tabs>

                <Grid container spacing={4}>
                    {exercises
                        .filter((exercise) => exercise.category === categories[selectedCategory])
                        .map((exercise) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={exercise.id}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Card className="shadow-lg flex flex-col  text-center">
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={exercise.photoUrl}
                                        alt={exercise.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {exercise.name}
                                        </Typography>
                                        {exercise.category === "FMS" ? (
                                            <Rating
                                                value={exerciseScores[exercise.id] || 0}
                                                onChange={(e, newValue) =>
                                                    handleScoreChange(exercise.id, newValue)
                                                }
                                                max={3}
                                            />
                                        ) : (
                                            <TextField
                                                label="Pontuação"
                                                type="number"
                                                value={exerciseScores[exercise.id] || ""}
                                                onChange={(e) =>
                                                    handleScoreChange(exercise.id, e.target.value)
                                                }
                                                fullWidth
                                                sx={{ mt: 1 }}
                                            />
                                        )}
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={2}
                                            label="Observações"
                                            value={observations[exercise.id] || ""}
                                            onChange={(e) =>
                                                handleObservationChange(exercise.id, e.target.value)
                                            }
                                            sx={{ mt: 2 }}
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                </Grid>

                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-purple-600 to-purple-900 text-white px-8 py-3 rounded-lg shadow-lg font-extrabold hover:bg-purple-800 transition-colors duration-300"
                    >
                        SALVAR
                    </button>
                </div>

            </Box>
        </>
    );
};

export default EvaluationPage;