import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError("");
        try {
            await logout();
            history.push("/login");
        } catch (error) {
            setError("Failed to logout");
        }
    }

    return (
        <>
            <div>
                <div>{error}</div>
                <h1>Profile</h1>
                <div>Email : {currentUser.email}</div>
                <div>
                    <Link to="update-profile">Update profile</Link>
                </div>
            </div>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
}
