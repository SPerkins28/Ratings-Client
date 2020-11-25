import React, { useState } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';


const Navbar = (props) => {

    return (
        <AppBar>
            <ToolBar>
                <IconButton>
                    <MenuIcon />
                </IconButton>
                    <Typography variant="h5">
                        <strong>(Re)ViewIt</strong>
                    </Typography>
                    <Button>
                        <strong>Sign Up</strong>
                    </Button>
                    <Button>
                        <strong>Login</strong>
                    </Button>
            </ToolBar>
        </AppBar>
    )
}

export default Navbar;