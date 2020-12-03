import React from 'react';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import './Home.css';

const Welcome = () => {

    return(
        <>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
        <Paper id='welcomMessage'>
            <Typography variant='h3'>
                Welcome to (Re)ViewIt!
            </Typography>
            <br/>
            (Re)ViewIt is the place to checkout any movies that you are interested in. You can see reviews on movies from others as well as leave your own reviews! Login or Sign Up to check it out!
        </Paper>
        </Grid>
        <Grid item xs={3}></Grid>
        </>
    )
}

export default Welcome;