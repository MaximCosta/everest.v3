import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    Divider,
    Breadcrumbs,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
} from "@material-ui/core";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import { makeStyles } from "@material-ui/core/styles";
import { ViewModule, ViewList } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";

const ELEC = gql`
    query SearchProducts {
        products(options: { sort: { name: ASC } }) {
            totalItems
            items {
                id
                name
                description
                slug
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

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    products: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

function CardProduct({ item }) {
    const classes = useStyles();
    const [idVar, setIdVar] = React.useState(0);

    const handleChange = (event) => {
        setIdVar(event.target.value);
    };
    return (
        <Grid key={item.slug} item>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    image={item.assets[0].preview}
                    title={item.assets[0].name}
                />
                <Breadcrumbs aria-label="breadcrumb" separator="›">
                    {item.collections.map((category) => (
                        <Typography color="inherit">{category.name}</Typography>
                    ))}
                </Breadcrumbs>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {item.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{ height: 60, overflowY: "auto" }}
                    >
                        {item.description}
                    </Typography>
                </CardContent>
                <Divider />
                <CardContent className={classes.products}>
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                    >
                        <InputLabel id="demo-simple-select-outlined-label">
                            Produit
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={idVar}
                            onChange={handleChange}
                            label="produit"
                        >
                            {item.variants.map((variant, index) => (
                                <MenuItem value={index}>
                                    {variant.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {item.variants[idVar].price}€
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

function ListProduct({ item }) {
    const classes = useStyles();
    const [idVar, setIdVar] = React.useState(0);

    const handleChange = (event) => {
        setIdVar(event.target.value);
    };

    return (
        <Grid key={item.slug} item xs={12}>
            <Card style={{ display: "flex" }}>
                <CardMedia
                    style={{
                        height: 200,
                        width: 200,
                        backgroundSize: "cover",
                        alignSelf: "center",
                    }}
                    image={item.assets[0].preview}
                    title={item.assets[0].name}
                />
                <div style={{ flex: 1 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {item.name}
                            <Breadcrumbs aria-label="breadcrumb" separator="›">
                                {item.collections.map((category) => (
                                    <Typography color="inherit">
                                        {category.name}
                                    </Typography>
                                ))}
                            </Breadcrumbs>
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            style={{ height: 60, overflowY: "auto" }}
                        >
                            {item.description}
                        </Typography>
                    </CardContent>
                    <CardContent className={classes.products}>
                        <FormControl
                            variant="outlined"
                            className={classes.formControl}
                        >
                            <InputLabel id="demo-simple-select-outlined-label">
                                Produit
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={idVar}
                                onChange={handleChange}
                                label="produit"
                            >
                                {item.variants.map((variant, index) => (
                                    <MenuItem value={index}>
                                        {variant.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            {item.variants[idVar].price}€
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        </Grid>
    );
}

function ListSkeleton(props) {
    const classes = useStyles();
    const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return data.map((item) => (
        <Grid key={item} item xs={12}>
            <Card style={{ display: "flex" }}>
                <Skeleton animation="wave" height={230} width={200} />
                <div style={{ flex: 1 }}>
                    <CardContent style={{ paddingBottom: 0 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            <Skeleton />
                            <Breadcrumbs aria-label="breadcrumb" separator="›">
                                {[0, 1].map((category) => (
                                    <Typography color="inherit">
                                        <Skeleton width={80} height={40} />
                                    </Typography>
                                ))}
                            </Breadcrumbs>
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            <Skeleton height={90} />
                        </Typography>
                    </CardContent>
                    <CardContent
                        style={{
                            paddingTop: 0,
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Skeleton height={40} width={120} />
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            <Skeleton height={40} width={40} />
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        </Grid>
    ));
}

function ExchangeRates({ mode }) {
    const { loading, error, data } = useQuery(ELEC);

    if (loading) {
        if (mode === "list") return <ListSkeleton />;
    }
    if (error) return <p>Error :(</p>;

    if (mode === "list") {
        return data.products.items.map((item) => <ListProduct item={item} />);
    }

    return data.products.items.map((item) => <CardProduct item={item} />);
}

export default function Dashboard() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const [mode, setMode] = useState("list");

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

    return (
        <div>
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
