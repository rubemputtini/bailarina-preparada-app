import { useState, useEffect } from "react";
import {
    Tabs,
    Tab,
    TextField,
    Rating,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Autocomplete,
} from "@mui/material";
import { getUsers } from "../services/adminService";
import { getExercises } from "../services/exerciseService";
import { createEvaluation } from "../services/evaluationService";
import dayjs from "dayjs";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { getUserId } from "../services/auth";

const EvaluationPage = () => {
    const [users, setUsers] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [exerciseScores, setExerciseScores] = useState({});
    const [observations, setObservations] = useState({});
    const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [nextEvaluationDate, setNextEvaluationDate] = useState(
        dayjs().add(6, "month").format("YYYY-MM-DD")
    );
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [errors, setErrors] = useState({
        user: "",
        date: "",
    });

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
        let formErrors = { user: "", date: "" };

        if (!selectedUser) formErrors.user = "Por favor, selecione um usuário.";
        if (!date) formErrors.date = "Por favor, selecione a data da avaliação.";

        setErrors(formErrors);

        if (formErrors.user || formErrors.date) return;

        const exercisesPayload = exercises.map((exercise) => ({
            ExerciseId: String(exercise.exerciseId),
            Score: exerciseScores[exercise.exerciseId] != null
                ? parseInt(exerciseScores[exercise.exerciseId], 10)
                : 0,
            Observation: observations[exercise.exerciseId] || ""
        }));

        const payload = {
            AdminId: getUserId(),
            UserId: selectedUser.id,
            Date: date,
            Exercises: exercisesPayload,
        };

        await createEvaluation(payload);

        setErrors({ user: "", date: "" });
    };

    const handleUserChange = (newValue) => {
        setSelectedUser(newValue);
        setErrors((prev) => ({ ...prev, user: "" }));
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);
        setNextEvaluationDate(dayjs(newDate).add(6, "month").format("YYYY-MM-DD"));
        setErrors((prev) => ({ ...prev, date: "" }));
    };

    const handleScoreChange = (exerciseId, newScore) => {
        setExerciseScores((prev) => ({
            ...prev,
            [exerciseId]: newScore,
        }));
    };

    const handleObservationChange = (exerciseId, text) => {
        setObservations((prev) => ({
            ...prev,
            [exerciseId]: text,
        }));
    };

    const categories = [...new Set(exercises.map((e) => e.category))];
    const formatCategory = (category) =>
        category === "FMS" ? "FMS" : "CAPACIDADES FÍSICAS";

    return (
        <>
            <Nav />
            <section className="p-6 min-h-screen max-w-5xl mx-auto">
                <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
                    <h2 className="text-center text-purple-900 font-bold text-3xl md:text-4xl mb-6">Criar Avaliação</h2>
                    <Grid container spacing={3} className="mb-6">
                        <Grid item xs={12} sm={6} md={4}>
                            <Autocomplete
                                options={users}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Buscar Usuário"
                                        variant="outlined"
                                        required
                                        error={!!errors.user}
                                        helperText={errors.user}
                                    />
                                )}
                                value={selectedUser}
                                onChange={(e, newValue) => handleUserChange(newValue)}
                                noOptionsText="Usuário não encontrado"
                                fullWidth
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "#4A148C",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#6A1B9A",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#8E24AA",
                                        },
                                    },
                                    "& .MuiInputLabel-root": {
                                        color: "#4A148C",
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "#8E24AA",
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Data da Avaliação"
                                value={date}
                                onChange={(e) => handleDateChange(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                required
                                error={!!errors.date}
                                helperText={errors.date}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "#4A148C",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#6A1B9A",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#8E24AA",
                                        },
                                    },
                                    "& .MuiInputLabel-root": {
                                        color: "#4A148C",
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "#8E24AA",
                                    },
                                    "& input": {
                                        color: "#4A148C",
                                    },
                                    "& input::-webkit-calendar-picker-indicator": {
                                        color: "#4A148C",
                                        cursor: "pointer",
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
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

                </div>

                <Tabs
                    value={selectedCategory}
                    onChange={(e, newValue) => setSelectedCategory(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                    className="mb-6 bg-white rounded-lg shadow-lg"
                    TabIndicatorProps={{ style: { backgroundColor: "#4A148C" } }}
                    sx={{
                        "& .MuiTab-root": {
                            "&.Mui-selected": {
                                color: "#8E24AA",
                            },
                        },
                    }}
                >
                    {categories.map((category, index) => (
                        <Tab key={index} label={formatCategory(category)} />
                    ))}
                </Tabs>

                <Grid container spacing={3}>
                    {exercises
                        .filter((exercise) => exercise.category === categories[selectedCategory])
                        .map((exercise) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={exercise.exerciseId}
                            >
                                <Card className="shadow-lg flex flex-col  text-center h-full">
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={exercise.photoUrl}
                                        alt={exercise.name}
                                    />
                                    <CardContent>
                                        <h4 className="mb-2">
                                            {exercise.name}
                                        </h4>
                                        {exercise.category === "FMS" ? (
                                            <Rating
                                                value={exerciseScores[exercise.exerciseId] || 0}
                                                onChange={(e, newValue) =>
                                                    handleScoreChange(exercise.exerciseId, newValue)
                                                }
                                                max={3}
                                            />
                                        ) : (
                                            <TextField
                                                label="Pontuação"
                                                type="number"
                                                value={exerciseScores[exercise.exerciseId] || ""}
                                                onChange={(e) =>
                                                    handleScoreChange(exercise.exerciseId, e.target.value)
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
                                            value={observations[exercise.exerciseId] || ""}
                                            onChange={(e) =>
                                                handleObservationChange(exercise.exerciseId, e.target.value)
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

            </section>
            <Footer />
        </>
    );
};

export default EvaluationPage;