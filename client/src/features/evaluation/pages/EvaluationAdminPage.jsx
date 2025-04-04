import { useState, useEffect } from "react";
import { getUsers } from "features/admin/services/adminService";
import { getExercises } from "../services/exerciseService";
import { createEvaluation } from "../services/evaluationService";
import { getUserId } from "../../auth/services/auth";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import ConfirmationDialog from "shared/dialogs/ConfirmationDialog";
import SuccessDialog from "shared/dialogs/SuccessDialog";
import { Typography } from "@mui/material";
import UserSelect from "../components/UserSelect";
import ExerciseCard from "../components/ExerciseCard";
import EvaluationTabs from "../components/EvaluationTabs";
import PageLayout from "layouts/PageLayout";

const EvaluationAdminPage = () => {
    const [users, setUsers] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [scores, setScores] = useState({});
    const [observations, setObservations] = useState({});
    const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [userGender, setUserGender] = useState("");
    const [nextEvaluationDate, setNextEvaluationDate] = useState(dayjs().add(6, "month").format("YYYY-MM-DD"));
    const [selectedTab, setSelectedTab] = useState("FMS");
    const [errors, setErrors] = useState({});
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [loading, setLoading] = useState(false);
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

        if (!userGender) {
            newErrors.gender = "Selecione o sexo";
        }

        exercises.forEach((exercise) => {
            const entry = scores[exercise.exerciseId] || {};
            const sides = exercise.isUnilateral ? ["Right", "Left"] : ["None"];
            const maxScore = exercise.category === "FMS" ? 3 : 200;

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
        setLoading(true);

        const payload = {
            adminId: getUserId(),
            userId: selectedUser.id,
            date,
            userGender,
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
        setLoading(false);
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
        <PageLayout>
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
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
                    <label className="text-sm text-gray-300">Sexo</label>
                    <select
                        className="w-full mt-1 rounded-xl bg-white text-black p-3 border border-gray-600 focus:outline-none"
                        value={userGender}
                        onChange={(e) => setUserGender(e.target.value)}
                    >
                        <option value="">Selecione</option>
                        <option value="F">Feminino</option>
                        <option value="M">Masculino</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
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

            <EvaluationTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

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

            {confirmOpen && (
                <ConfirmationDialog
                    message="Tem certeza que deseja salvar esta avaliação?"
                    onConfirm={handleSaveConfirmed}
                    onCancel={() => setConfirmOpen(false)}
                    loading={loading}
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
        </PageLayout>
    );
};

export default EvaluationAdminPage;