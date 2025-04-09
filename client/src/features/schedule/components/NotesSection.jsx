const NotesSection = ({ value, setValue, isEditing }) => {
    return (
        <div className="mt-4">
            <label className="block text-sm text-gray-300 mb-1">Observações:</label>
            <textarea
                className="w-full p-2 rounded bg-gray-800 text-white resize-none"
                rows={2}
                disabled={!isEditing}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};

export default NotesSection;
