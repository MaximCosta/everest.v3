import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setMessage("");
            setLoading(true);

            await resetPassword(emailRef.current.value);
        } catch (e) {
            setError("Failed to reset passord");
        }
        setLoading(false);
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h1>Change Password</h1>
                    </div>
                    <input
                        id="email"
                        type="text"
                        label="email"
                        name="email"
                        placeholder="email"
                        ref={emailRef}
                        required
                    />
                    <input type="submit" value="Reset" disabled={loading} />
                </form>
                <div>
                    back ? <Link to="/login">click</Link>
                </div>
                {message && <div>{message}</div>}
                {error && <div>{error}</div>}
            </div>
        </>
    );
}
