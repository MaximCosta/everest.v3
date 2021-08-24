import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordConfirmRef.current.value !== passwordRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch (e) {
            setError("Failed to create an account");
        }
        setLoading(false);
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h1>SignUp</h1>
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
                    <input
                        id="password-confirm"
                        type="password"
                        label="password-confirm"
                        name="password-confirm"
                        placeholder="password"
                        ref={passwordConfirmRef}
                        required
                    />
                    <input type="submit" value="SignUp" disabled={loading} />
                </form>
                <div>
                    Do you have already an account ?
                    <Link to="/login">Login</Link>
                </div>
                {error && <div>{error}</div>}
            </div>
        </>
    );
}
