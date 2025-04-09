import { Typography } from "@mui/material";

const UserInfo = ({ name, age, goal, setGoal, isEditing }) => {
    return (
        <div className="mb-4">
            <Typography
                variant="subtitle1"
                sx={{
                    color: "#9575cd",
                    fontSize: { xs: "20px", sm: "22px" },
                    fontWeight: 500,
                    marginBottom: "6px",
                }}
            >
                {name}, {age} anos
            </Typography>

            <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-300 whitespace-nowrap">Objetivo:</label>
                <textarea
                    className="p-1 rounded bg-gray-800 text-white text-sm w-96 resize-none"
                    rows={1}
                    disabled={!isEditing}
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    aria-label="objetivo"
                />
            </div>
        </div>
    );
};

export default UserInfo;