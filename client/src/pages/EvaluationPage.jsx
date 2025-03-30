import { useState, useEffect } from "react";
import { getUsers } from "../services/adminService";
import { getExercises } from "../services/exerciseService";
import { createEvaluation } from "../services/evaluationService";
import { getUserId } from "../services/auth";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ConfirmationDialog from "../components/dialogs/ConfirmationDialog";
import SuccessDialog from "../components/dialogs/SuccessDialog";
import { Typography } from "@mui/material";
import UserSelect from "../components/evaluation/UserSelect";
import ExerciseCard from "../components/evaluation/ExerciseCard";

const EvaluationPage = () => {
    const [users, setUsers] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [scores, setScores] = useState({});
    const [observations, setObservations] = useState({});
    const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [nextEvaluationDate, setNextEvaluationDate] = useState(dayjs().add(6, "month").format("YYYY-MM-DD"));
    const [selectedTab, setSelectedTab] = useState("FMS");
    const [errors, setErrors] = useState({});
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [createdEvaluationId, setCreatedEvaluationId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const userRes = await getUsers(1, 500);
            const exerciseRes = await getExercises();
            setUsers(userRes.users);
            setExercises(exerciseRes);
        };
        fetchData();
    }, []);

    const handleScoreChange = (exerciseId, side, value) => {
        setScores((prev) => ({
            ...prev,
            [exerciseId]: {
                ...prev[exerciseId],
                [side]: value,
            },
        }));
    };

    const handleObservationChange = (exerciseId, side, value) => {
        setObservations((prev) => ({
            ...prev,
            [exerciseId]: {
                ...prev[exerciseId],
                [side]: value,
            },
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!selectedUser) {
            newErrors.user = "Selecione o usuário";
        }

        exercises.forEach((exercise) => {
            const entry = scores[exercise.exerciseId] || {};
            const sides = exercise.isUnilateral ? ["Right", "Left"] : ["None"];
            const maxScore = exercise.category === "FMS" ? 3 : 100;

            sides.forEach((side) => {
                const value = entry[side];

                const isMissing = value === undefined || value === "";
                const isOverLimit = Number(value) > maxScore;

                if (isMissing || isOverLimit) {
                    newErrors[`${exercise.exerciseId}-${side}`] = true;
                }
            });
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const resetForm = () => {
        setScores({});
        setObservations({});
        setSelectedUser(null);
        setErrors({});
        setDate(dayjs().format("YYYY-MM-DD"));
        setNextEvaluationDate(dayjs().add(6, "month").format("YYYY-MM-DD"));
    };

    const handleSaveConfirmed = async () => {
        if (!selectedUser) return;
        setIsLoading(true);

        const payload = {
            adminId: getUserId(),
            userId: selectedUser.id,
            date,
            exercises: [],
        };

        exercises.forEach((exercise) => {
            const entry = scores[exercise.exerciseId] || {};
            const sides = exercise.isUnilateral ? ["Right", "Left"] : ["None"];

            sides.forEach((side) => {
                if (entry[side] != null) {
                    payload.exercises.push({
                        exerciseId: exercise.exerciseId,
                        score: Number(entry[side]),
                        observation: observations[exercise.exerciseId]?.[side] || "",
                        side,
                    });
                }
            });
        });

        const result = await createEvaluation(payload);
        const evaluationId = result.evaluationId;

        setCreatedEvaluationId(evaluationId);
        setIsLoading(false);
        setConfirmOpen(false);
        resetForm();
        setSuccessOpen(true);
    };

    const handleSave = () => {
        if (validateForm()) {
            setConfirmOpen(true);
        }
    };

    return (
        <div className="min-h-screen text-white">
            <Nav />
            <div className="max-w-6xl mx-auto py-10 px-4">
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "800",
                        textAlign: "center",
                        background: "linear-gradient(90deg, #ffffff 0%, #c5e1e9 60%, #c5e1e9 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        marginBottom: "24px",
                        fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                >
                    Criar Avaliação Física
                </Typography>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div>
                        <UserSelect
                            users={users}
                            selectedUser={selectedUser}
                            setSelectedUser={setSelectedUser}
                            error={errors.user}
                        />

                        {errors.user && <p className="text-red-500 text-sm mt-1">{errors.user}</p>}
                    </div>

                    <div>
                        <label className="text-sm text-gray-300">Data da Avaliação</label>
                        <input
                            type="date"
                            className="w-full mt-1 rounded-xl bg-white text-black p-3 border border-gray-600 focus:outline-none"
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                                setNextEvaluationDate(dayjs(e.target.value).add(6, "month").format("YYYY-MM-DD"));
                            }}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-300">Próxima Avaliação</label>
                        <input
                            type="date"
                            disabled
                            className="w-full mt-1 rounded-xl bg-gray-700 text-white p-3 border border-gray-600"
                            value={nextEvaluationDate}
                        />
                    </div>
                </div>

                <div className="flex gap-4 mb-6 overflow-x-auto">
                    <button
                        onClick={() => setSelectedTab("FMS")}
                        className={`px-5 py-2 rounded-full font-semibold focus:outline-none focus:ring-0 focus:ring-offset-0 ${selectedTab === "FMS" ? "bg-purple-700" : "bg-gray-800"}`}
                    >
                        FMS
                    </button>

                    <button
                        onClick={() => setSelectedTab("CAPACIDADES")}
                        className={`px-5 py-2 rounded-full font-semibold focus:outline-none focus:ring-0 focus:ring-offset-0 ${selectedTab === "CAPACIDADES" ? "bg-purple-700" : "bg-gray-800"}`}
                    >
                        Capacidades Físicas
                    </button>

                </div>

                <div className="space-y-6">
                    {exercises
                        .filter((e) => selectedTab === "FMS" ? e.category === "FMS" : e.category !== "FMS")
                        .map((exercise) => {
                            const currentSide = scores[exercise.exerciseId]?.__side || "Right";
                            const toggleSide = () => {
                                setScores((prev) => ({
                                    ...prev,
                                    [exercise.exerciseId]: {
                                        ...(prev[exercise.exerciseId] || {}),
                                        __side: currentSide === "Right" ? "Left" : "Right"
                                    }
                                }));
                            };

                            return (
                                <ExerciseCard
                                    key={exercise.exerciseId}
                                    exercise={exercise}
                                    score={scores[exercise.exerciseId]}
                                    observation={observations[exercise.exerciseId]}
                                    error={errors[`${exercise.exerciseId}-${exercise.isUnilateral ? currentSide : "None"}`]}
                                    onScoreChange={handleScoreChange}
                                    onObservationChange={handleObservationChange}
                                    toggleSide={toggleSide}
                                    currentSide={currentSide}
                                />
                            );
                        })}
                </div>

                {Object.keys(errors).length > 0 && (
                    <div className="mt-8 bg-red-100 text-red-900 border border-red-300 px-4 py-3 rounded-xl text-center font-medium max-w-lg mx-auto">
                        Existem erros ou campos obrigatórios incompletos.
                    </div>
                )}

                <div className="flex justify-center mt-12">
                    <button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white text-lg font-bold py-3 px-12 rounded-full shadow-xl uppercase"
                    >
                        Salvar Avaliação
                    </button>
                </div>
            </div>

            {confirmOpen && (
                <ConfirmationDialog
                    message="Tem certeza que deseja salvar esta avaliação?"
                    onConfirm={handleSaveConfirmed}
                    onCancel={() => setConfirmOpen(false)}
                    isLoading={isLoading}
                />
            )}

            {successOpen && (
                <SuccessDialog
                    message="Avaliação salva com sucesso!"
                    onClose={() => {
                        setSuccessOpen(false);
                        if (createdEvaluationId) {
                            navigate(`/avaliacao/${createdEvaluationId}`);
                        }
                    }}
                />
            )}

            <Footer />
        </div>
    );
};

export default EvaluationPage;