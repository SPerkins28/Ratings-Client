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
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';

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
    <TableContainer component={Paper} id="tableContainer">
        <Table className="table" aria-label="simple table">
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
          {userReviews.map((myreview, index) => (
            <TableRow key={index} id="tableRow">
              <TableCell component="th" scope="row">
                {myreview.id}
              </TableCell>
              <TableCell align="right">{myreview.title}</TableCell>
              <TableCell align="right">{myreview.date}</TableCell>
              <TableCell align="right">{myreview.entry}</TableCell>
              <TableCell align="right">{myreview.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default ReviewTable;