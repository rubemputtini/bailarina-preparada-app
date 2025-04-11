import { useEffect, useRef, useState } from "react";
import { getActivityLinks } from "../services/activityLinkService";
import { tasksColorsMap } from "../../../shared/utils/constants";
import LoadingCard from "shared/ui/LoadingCard";
import DialogButton from "shared/buttons/DialogButton";

const ScheduleActivityDialog = ({ open, onClose, onSave, initialData }) => {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [color, setColor] = useState("lightBlue");
    const [activityLinkId, setActivityLinkId] = useState(null);
    const [activityLinks, setActivityLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        if (open) {
            fetchSuggestions();
            setTitle(initialData?.title || "");
            setLink(initialData?.link || "");
            setColor(initialData?.color || "lightBlue");
            setActivityLinkId(initialData?.activityLinkId || null);
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setTitle("");
            setLink("");
            setColor("lightBlue");
            setActivityLinkId(null);
        }
    }, [open, initialData]);

    const fetchSuggestions = async () => {
        setLoading(true);
        const data = await getActivityLinks();
        setActivityLinks(data?.filter(x => x.isActive) || []);
        setLoading(false);
    };

    const isValidURL = (url) => {
        if (!url) return true;
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setTitle(suggestion.title);
        setLink(suggestion.link);
        setColor(suggestion.defaultColor || "lightBlue");
        setActivityLinkId(suggestion.activityLinkId);
    };

    const handleSubmit = async () => {
        if (!title.trim() || !isValidURL(link)) return;
        setSaving(true);

        try {
            await onSave({ title, link, color, activityLinkId });
            handleClose();
        } finally {
            setSaving(false);
        }
    };

    const handleClose = () => {
        if (!saving) {
            onClose();
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg mx-4 sm:mx-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                    Adicionar Atividade
                </h2>

                <label className="block text-sm text-gray-700 font-medium mb-1">Título</label>
                <input
                    ref={inputRef}
                    className="w-full p-3 border border-gray-300 rounded-xl text-black mb-4"
                    placeholder="Ex: Treino de força"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setActivityLinkId(null);
                    }}
                    disabled={saving}
                />

                <label className="block text-sm text-gray-700 font-medium mb-1">Link da aula (opcional)</label>
                <input
                    className="w-full p-3 border border-gray-300 rounded-xl text-black mb-1"
                    placeholder="https://..."
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    disabled={saving}
                />

                {!isValidURL(link) && (
                    <p className="text-red-500 text-sm mb-3">Insira uma URL válida (ex: https://...)</p>
                )}

                <label className="block text-sm text-gray-700 font-medium mb-2 mt-2">Cor</label>
                <div className="flex justify-center flex-wrap gap-2 mb-6">
                    {Object.keys(tasksColorsMap).map((c) => (
                        <button
                            key={c}
                            className={`w-8 h-8 rounded-full border-2 ${color === c ? "border-black" : "border-transparent"}`}
                            style={{ backgroundColor: tasksColorsMap[c]?.hex }}
                            onClick={() => setColor(c)}
                            disabled={saving}
                        />
                    ))}
                </div>

                <div className="mb-6 text-center">
                    <p className="text-sm text-gray-700 font-medium mb-2">Sugestões:</p>
                    {loading ? (
                        <LoadingCard marginY={4} />
                    ) : activityLinks.length === 0 ? (
                        <p className="text-gray-500 text-sm">Nenhuma sugestão disponível.</p>
                    ) : (
                        <div className="flex flex-wrap justify-center gap-3">
                            {activityLinks.map((s) => (
                                <button
                                    key={s.activityLinkId}
                                    onClick={() => handleSuggestionClick(s)}
                                    className={`px-4 py-1.5 rounded-xl text-sm font-medium ${title === s.title ? "bg-purple-200 text-purple-900 border border-purple-600" : "bg-purple-100 text-purple-800 hover:bg-purple-200"}`}
                                    disabled={saving}
                                >
                                    {s.title}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-center gap-4 mt-6">
                    <DialogButton
                        onClick={handleClose}
                        variant="secondary"
                        loading={saving}
                    >
                        CANCELAR
                    </DialogButton>
                    <DialogButton
                        onClick={handleSubmit}
                        disabled={!title.trim() || !isValidURL(link)}
                        loading={saving}
                    >
                        SALVAR
                    </DialogButton>
                </div>
            </div>
        </div>
    );
};

export default ScheduleActivityDialog;