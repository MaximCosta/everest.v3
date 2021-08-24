import React from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    Breadcrumbs,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

export default function ListProduct({ item }) {
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