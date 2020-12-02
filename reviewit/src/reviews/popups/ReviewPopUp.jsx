import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating'
import '../popups/ReviewPopUp.css';

const ReviewPopUp = (props) => {
  const [movieReviews, setMovieReviews] = useState([]);

  const toggleViews = () => {
    props.handleClose();
    props.showCreate();
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

  useEffect(() => {
    fetch(`https://re-view-it.herokuapp.com/review/${props.movie.imdbID}`, {
      method: 'GET',
      // headers: new Headers({
      //   'Content-Type': 'application/json', //@ <--- This API Still does not like headers lol
      //   'Authorization': props.token
      })
      .then ((res) => res.json())
      .then ((reviews) => {
        setMovieReviews(reviews);
      })
    // })
  },[props.movie.imdbID]);
  
  return (

    <div>
      <Dialog
        id="reviewPopUp"
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle >
          <Typography variant="h6" id="dialogTitle"><strong>Reviews</strong></Typography>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {movieReviews.map(review => {
              return (
                <div key={review.id}>
                <Typography variant="h6" id="reviewTitle"><strong>{review.title}</strong></Typography>
                <Typography id="entryText">{review.entry}</Typography>
                <Box component="fieldset" mb={3} borderColor="transparent" id="ratingReadOnly">
                  <Rating name="read-only" value={review.rating} readOnly />
                </Box>
                <hr/>
                </div>
              )
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions id='dialogBottom'>
            <Grid item xs={6} id='addReviewsButton'>
                <IconButton onClick={() => toggleViews()}>
                    <AddCircleIcon color='primary'/>
                </IconButton>
                <Typography id='typographyText'><strong>Add Review</strong></Typography>
            </Grid>
            <Grid item xs={6} id='addReviewsClose'>
                <Button onClick={props.handleClose} color="primary">
                    <strong>Close</strong>
                </Button>
            </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ReviewPopUp;