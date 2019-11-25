import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    progress: {
        marginLeft:"50%",
    },
}));

export default function Loading() {
    const classes = useStyles();

    return (
        <div>
            <CircularProgress className={`teal-text ${classes.progress}`} disableShrink />
        </div>
    );
}