import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();

        if (passwordConfirmRef.current.value !== passwordRef.current.value) {
            return setError("Passwords do not match");
        }

        const promise = [];
        setError("");
        setLoading(true);

        if (emailRef.current.value !== currentUser.email) {
            promise.push(updateEmail(emailRef.current.value));
        }

        if (passwordRef.current.value) {
            promise.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promise)
            .then(() => {
                history.push("/");
            })
            .catch((error) => {
                setError("Failed to update account");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h1>UPdate profile</h1>
                    </div>
                    <input
                        id="email"
                        type="text"
                        label="email"
                        name="email"
                        placeholder="email"
                        defaultValue={currentUser.email}
                        ref={emailRef}
                        required
                    />
                    <input
                        id="password"
                        type="password"
                        label="password"
                        name="password"
                        placeholder="leave blank to keep same"
                        ref={passwordRef}
                    />
                    <input
                        id="password-confirm"
                        type="password"
                        label="password-confirm"
                        name="password-confirm"
                        placeholder="password"
                        ref={passwordConfirmRef}
                    />
                    <input type="submit" value="SignUp" disabled={loading} />
                </form>
                <div>
                    Cancel
                    <Link to="/">click</Link>
                </div>
                {error && <div>{error}</div>}
            </div>
        </>
    );
}
