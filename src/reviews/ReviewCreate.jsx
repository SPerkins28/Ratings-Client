import React, { useState, useEffect, useRef } from 'react';
import {
    Button,
    FormGroup,
    FormLabel,
    FormControl,
    InputLabel,
    Box,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Typography,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import './ReviewCreate.css';
import APIURL from '../helpers/environment';

const ReviewCreate = (props) => {
    const [title, setTitle] = useState();
    const [date, setDate] = useState('');
    const [entry, setEntry] = useState('');
    const [rating, setRating] = useState(null);

    const toggleViews = () => { //created to switch which pop up you are viewing.
        props.handleClose();
        props.showReviews();
    }

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (props.open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
            descriptionElement.focus();
        }
}
    }, [props.open]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${APIURL}/review/create`, {
            method: 'POST',
            body: JSON.stringify({review: {title, date, entry, rating, imdbID: props.movie.imdbID}}),
            headers: new Headers({
                'Content-Type': 'application/json', 
                'Authorization': props.token
            })
        })
        .then ((res) => res.json())
        .then((reviewData) => {
            setTitle('');
            setDate('');
            setEntry('');
            setRating('');
            props.handleClose();
        })
    }

    return (
        <div className="main">
            <div className="mainDiv">
            <Dialog
                fullWidth
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">
                <Typography variant="h6" id="dialogTitle"><strong>Leave a Review</strong></Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <form onSubmit={handleSubmit} id="reviewForm">
                            <FormGroup>
                                <InputLabel htmlFor="title" value='Title'id="titleLabel">Title</InputLabel>
                                <TextField name="title" value={title} variant="outlined" id="titleInput" onChange={(e) => setTitle(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <InputLabel htmlFor="date" value='Date' id="dateLabel">Date</InputLabel>
                                <TextField
                                    id="dateInput"
                                    type="date"
                                    value={date}
                                    justify="center"
                                    variant="outlined"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    onChange={(e) => setDate(e.target.value)}
                            >Date</TextField>
                            </FormGroup>
                            <FormGroup>
                                <InputLabel htmlFor="entry" value='Entry' id="entryLabel">Entry</InputLabel>
                                <TextField name={entry} multiline rowsMax={6}  variant="outlined" id="entryInput" onChange={(e) => setEntry(e.target.value)} />
                            </FormGroup>
                            <FormControl component="fieldset" id="ratingLabel">
                            <FormLabel component="legend" id="ratingLabel"><strong>Rating</strong></FormLabel>
                            <Box component="fieldset" mb={3} borderColor="transparent" id="ratingsBox">
                                <Rating name="pristine" value={Number(rating)} onChange={(e, newValue) => setRating(Number(newValue))}/>
                            </Box>
                            </FormControl>
                            <Box justifyContent="center">
                            <Button onClick={() => toggleViews()} className="createReviewButton">
                                <SkipPreviousIcon id="backIcon" />{" "}{" "}Back</Button>
                            <Button type="submit" className="createReviewButton" id="submitButton"><strong>Submit Review</strong></Button>
                            </Box>  
                        </form>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            </div>
        </div>
    )
}


export default ReviewCreate;