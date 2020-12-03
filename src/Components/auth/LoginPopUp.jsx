import React, { useState } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';
import APIURL from '../../helpers/environment';

const LoginPopUp = (props) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');

    const handleClose = () => {
        props.onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${APIURL}/user/login`, { 
            method: 'POST',
            body: JSON.stringify({email: email, password: password}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then((data) => {
            props.updateToken(data.sessionToken);
            handleClose();
        })
    }

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <TextField
                    autoFocus
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                    autoFocus
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default LoginPopUp;

