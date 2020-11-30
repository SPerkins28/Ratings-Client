import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import LoginPopUp from '../auth/LoginPopUp';
import SignUpPopUp from '../auth/SignUpPopUp';
// import { makeStyles } from '@material-ui/styles';
import './Navbar.css';

// const useStyles = makeStyles(theme => ({
//     offset: theme.mixins.toolbar,
// }))

const Navbar = (props) => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    // const classes = useStyles();

        return (
        <>
            <AppBar postion='sticky'>
                <ToolBar id='toolbar'>
                    {/* <IconButton>
                        <MenuIcon />
                    </IconButton> */}
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4} id='title'>
                        <Typography variant="h5">
                            <strong>(Re)ViewIt</strong>
                        </Typography>
                    </Grid>
                    {!props.sessionToken ? 
                    <Grid item xs={4} id='titleButtons'>
                        <Button onClick={() => setOpenSignUp(true)} id="signupBut">
                            <strong>Sign Up</strong>
                        </Button>
                        <Button onClick={() => setOpenLogin(true)} >
                            <strong>Login</strong>
                        </Button>
                    </Grid> : <Grid item xs={4} id='titleButtons'>
                        <Button onClick={props.clickLogout} >
                            <strong>Logout</strong>
                        </Button>
                    </Grid>}
                </ToolBar>
            </AppBar>
            {/* <div className={classes.offset} /> */}
            <LoginPopUp open={openLogin} onClose={() => setOpenLogin(false)} updateToken={props.updateToken}/>
            <SignUpPopUp open={openSignUp} onClose={() => setOpenSignUp(false)} updateToken={props.updateToken}/>
        </>
    )} 

export default Navbar;