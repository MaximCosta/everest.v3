import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ELEC = gql`
    query SearchProducts {
        products(options: { sort: { name: ASC } }) {
            totalItems
            items {
                id
                name
                description
                collections {
                    id
                    name
                }
                assets {
                    name
                    source
                    preview
                }
                variants {
                    id
                    name
                    price
                }
            }
        }
    }
`;

function ExchangeRates() {
    const { loading, error, data } = useQuery(ELEC);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.products.items.map((item) => (
        <div key={item.name + "_" + item.id} style={{ width: 300, margin: 20 }}>
            <br />
            <br />
            <br />
            <img
                src={item.assets[0].preview}
                alt={item.assets[0].name}
                height="100"
            />
            <div>
                {item.collections.map((category) => category.name).join(" > ")}
            </div>
            <h2>{item.name}</h2>
            <div>{item.description}</div>

            <ul>
                {item.variants.map((product) => (
                    <li>
                        {product.id} : {product.name} : {product.price}€
                    </li>
                ))}
            </ul>
        </div>
    ));
}

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
            <br />
            <div style={{ display: "flex" }}>
                <ExchangeRates />
            </div>
        </>
    );
}
