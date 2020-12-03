import React, {useState, useEffect} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  DialogActions,
  Grid,
  Button,
  IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';



const ReviewTable = (props) => {
  const [userReviews, setUserReviews] = useState([]);
  useEffect (() => {
    fetch('https://re-view-it.herokuapp.com/review/mine', {
          method: 'GET',
          headers: new Headers ({
            'Content-Type': 'application/json',
            'Authorization': props.token
        })
    })
    .then((res) => res.json())
    .then((data) => {
        setUserReviews(data)
        console.log(data)
    })
  }, [props.token])

  return (
    <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead >
            <TableRow>
              <TableCell>Review Archive</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Entry</TableCell>
              <TableCell align="right">Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {userReviews.map((myreview, index) => {
          return (
            <TableRow key={index}>
              <TableCell scope="row">{myreview.id}</TableCell>
              <TableCell align="right">{myreview.title}</TableCell>
              <TableCell align="right">{myreview.date}</TableCell>
              <TableCell align="right">{myreview.entry}</TableCell>
              <TableCell align="right">{myreview.rating}</TableCell>
            </TableRow>
          )
        })}
          </TableBody>
        </Table>
        <DialogActions id='dialogBottom'>
            <Grid item xs={6} id='addReviewsButton'>
                <IconButton >
                    <EditIcon color='primary'/>
                </IconButton>
                <IconButton >
                    <DeleteIcon color='primary'/>
                </IconButton>
            </Grid>
            <Grid item xs={6} id='addReviewsClose'>
            </Grid>
        </DialogActions>
      </TableContainer>
    );
  }

export default ReviewTable;