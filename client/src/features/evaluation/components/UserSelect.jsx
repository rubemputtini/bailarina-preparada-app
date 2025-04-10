import { useState, useEffect, useRef } from "react";

const UserSelect = ({ users, selectedUser, setSelectedUser, error }) => {
    const [query, setQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const dropdownRef = useRef();

    useEffect(() => {
        if (selectedUser) setQuery(selectedUser.name);
    }, [selectedUser]);

    useEffect(() => {
        const normalized = query.toLowerCase();

        setFilteredUsers(
            users.filter((user) => user.name.toLowerCase().includes(normalized))
        );
    }, [query, users]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setFilteredUsers([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="text-sm text-gray-300">Aluno</label>
            <input
                type="text"
                placeholder="Digite para buscar"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`w-full mt-1 p-3 h-[52px] rounded-xl bg-white text-black border ${error ? "border-red-500" : "border-gray-600"
                    } focus:outline-none`}
            />

            {filteredUsers.length > 0 && query && (
                <div className="absolute z-10 w-full bg-white text-black rounded-xl shadow-lg mt-1 max-h-56 overflow-y-auto border border-gray-300">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                            onClick={() => {
                                setSelectedUser(user);
                                setQuery(user.name);
                                setTimeout(() => {
                                    setFilteredUsers([]);
                                }, 0);
                            }}
                        >
                            {user.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserSelect;