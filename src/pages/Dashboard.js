import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
    Grid,
} from "@material-ui/core";

import Navbar from "../components/Navbar/index";
import RenderEvent from "../components/renderEvent/index";
import ExchangeRates from "../components/exchangeRates/index";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import { ViewModule, ViewList } from "@material-ui/icons";

import firebase from "firebase";

export default function Dashboard() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const [mode, setMode] = useState("list");
    const [events, setEvents] = useState([]);

    const handleChange = (event, nextView) => {
        if (nextView) setMode(nextView);
    };

    async function handleLogout() {
        setError("");
        try {
            await logout();
            history.push("/login");
        } catch (error) {
            setError("Failed to logout");
        }
    }

    useEffect(() => {
        firebase
            .firestore()
            .collection("NewEvents")
            .get()
            .then((snapshot) => {
                let snap_event = [];
                snapshot.forEach((child) => {
                    snap_event.push(child.data());
                });
                setEvents(snap_event);
            });
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                <div>{error}</div>
                <h1>Profile</h1>
                <div>Email : {currentUser.email}</div>
                <div>
                    <Link to="update-profile">Update profile</Link>
                </div>
            </div>
            <button onClick={handleLogout}>Logout</button>
            <br />
            <br />
            <br />
            <RenderEvent events={events} />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <ToggleButtonGroup
                    value={mode}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton value="list" aria-label="list">
                        <ViewList />
                    </ToggleButton>
                    <ToggleButton value="card" aria-label="card">
                        <ViewModule />
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <Grid container spacing={2} justify="center">
                <ExchangeRates mode={mode} />
            </Grid>
        </div>
    );
}
