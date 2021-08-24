import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Breadcrumbs,
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

export default function ListSkeleton(props) {
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