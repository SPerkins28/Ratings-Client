import React, { useState } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';

const SignUpPopUp = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');
    
    const handleClose = () => {
        props.onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://re-view-it.herokuapp.com/user/signup', { 
            method: 'POST',
            body: JSON.stringify({firstName: firstName, lastName: lastName, email: email, password: password}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            props.updateToken(data.sessionToken);
            handleClose();
        })
    }

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="First Name"
                    type="text"
                    fullWidth
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                    autoFocus
                    margin="dense"
                    label="Last Name"
                    type="text"
                    fullWidth
                    onChange={(e) => setLastName(e.target.value)}
                    />
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
                        Sign Up
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SignUpPopUp;

