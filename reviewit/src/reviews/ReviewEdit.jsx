import React, { useState } from 'react';
import {Button, TextField, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText} from "@material-ui/core";


const ReviewEdit = (props) => {
  const [editTit, setEditTit] = useState('props.reviewToUpdate.title');
  const [editDat, setEditDat] = useState('props.reviewToUpdate.date');
  const [editEnt, setEditEnt] = useState('props.reviewToUpdate.entry');
  const [editRat, setEditRat] = useState('props.reviewToUpdate.rating');
  
  const handleClose = () => {
    props.onClose();
  };
  // const handleClickOpen = () => {
  //   props.onOpen();
  // };

    const reviewUpdate = (event, review) => {
      event.preventDefault();
      fetch(`http://localhost:4000/update/${props.reviewToUpdate.id}`, {
          method: 'PUT',
          body: JSON.stringify({review: {title: editTit, date: editDat, entry: editEnt, rating:editRat }}),
          headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': props.token
          })
      })
      .then((res) => {
          props.fetchReviews();
          props.updateOff();
          handleClose();
          // handleClickOpen();
         
      })
      
    }
return (
    <div>
      <Button variant="outlined" color = "primary" onClick={handleClose}>
        Edit
      </Button>
      <Dialog open={reviewUpdate} onClose={handleClose} >
      <DialogTitle> Update Review </DialogTitle>
      <DialogContent>
        <DialogContentText>
            Update Post Down Below
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            onChange= {(e) => setEditTit(e.target.value)}
            
          />
         <TextField
            autoFocus
            margin="dense"
            label="Date"
            fullWidth
            onChange= {(e) => setEditDat(e.target.value)}
          
          />
          <TextField
            autoFocus
            margin="dense"
            label="Entry"
            type="textarea"
            fullWidth
            onChange= {(e) => setEditEnt(e.target.value)}
            
          />
          <TextField
            autoFocus
            margin="dense"
            label="Rating"
            fullWidth
            onChange= {(e) => setEditRat(e.target.value)}
            
          />
      </DialogContent>
      <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={reviewUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
       </Dialog>
       </div>
)};
export default ReviewEdit; 