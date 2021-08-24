import React from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
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

export default function EventCard({ event }) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={event.image}
                title="Contemplative Reptile"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {event.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {event.desc}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}