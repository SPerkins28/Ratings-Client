import React, {useState, useEffect} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  // DialogActions,
  // Grid,
  // Button,
  // IconButton,
} from '@material-ui/core';
import './ReviewTable.css';
import '../../helpers/environment';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';



const ReviewTable = (props) => {
  const [userReviews, setUserReviews] = useState([]);
  useEffect (() => {
    fetch(`${APIURL}/review/`, {
          method: 'GET',
          headers: new Headers ({
            'Content-Type': 'application/json',
            'Authorization': props.token
        })
    })
    .then((res) => res.json())
    .then((data) => {
        setUserReviews(data)
    })
  }, [props.token])

  return (
    <>
    {props.token ?
    <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead >
            <TableRow>            
              <TableCell align="left"><strong>Title</strong></TableCell>
              <TableCell align="left"><strong>Date</strong></TableCell>
              <TableCell align="left"><strong>Entry</strong></TableCell>
              <TableCell align="left"><strong>Rating</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {userReviews.length > 0 && userReviews.map((myreview, index) => {
          return (
            <TableRow key={index}>
              <TableCell align="left">{myreview.title}</TableCell>
              <TableCell align="left">{myreview.date}</TableCell>
              <TableCell align="left">{myreview.entry}</TableCell>
              <TableCell align="center">{myreview.rating}</TableCell>
            </TableRow>
          )
        })}
          </TableBody>
        </Table>
        {/* <DialogActions id='dialogBottom'>
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
        </DialogActions> */}
      </TableContainer> : <Paper id="reviewMessage"><strong>Please Login or Sign Up to view this page</strong></Paper>}
      </>
    );
  }

export default ReviewTable;