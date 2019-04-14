import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export const KeyComponent = (props) => (
    <div>
        <Grid
            container
        >
            <Grid item>
                <Typography>
                    Title: {props.title}
                </Typography>
                <Typography>
                    Key: {props.key}
                </Typography>
                <Typography>
                    Tip: {props.tip}
                </Typography>
                <Typography>
                    Command: {props.cmd}
                </Typography>

            </Grid>
        </Grid>

    </div>
);