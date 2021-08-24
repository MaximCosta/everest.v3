import React from "react";
import {
    Card,
    CardContent,
    CardActions,
    Button,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
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

export default function EventSkeleton() {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Skeleton animation="wave" variant="rect" height={140} />
            <CardContent>
                <React.Fragment>
                    <Skeleton
                        animation="wave"
                        height={10}
                        style={{ marginBottom: 6 }}
                    />
                    <Skeleton animation="wave" height={10} width="80%" />
                </React.Fragment>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}