import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch (e) {
            setError("Failed to connect");
        }
        setLoading(false);
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h1>Login</h1>
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
                    <input
                        id="password"
                        type="password"
                        label="password"
                        name="password"
                        placeholder="password"
                        ref={passwordRef}
                        required
                    />
                    <input type="submit" value="Login" disabled={loading} />
                </form>
                <div>
                    Need an account ?<Link to="/signup">Signup</Link>
                </div>
                <div>
                    Password forget ?<Link to="/forgot-password">Click</Link>
                </div>
                {error && <div>{error}</div>}
            </div>
        </>
    );
}
