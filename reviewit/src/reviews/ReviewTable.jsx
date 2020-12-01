import React from 'react';
import {Table, Button} from '@material-ui/core';

const ReviewTable = (props) => {
    const deleteReview = ( review ) => {
        fetch(`http://localhost:4000/post/${review.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'appliction/json',
                'Authorization': props.token
            })
        })
        .then(() => props.fetchReview())
    }
    const reviewMapper = () => {
        return props.review.map((review, index) => {
            <tr key={index}>
                <th scope='row'>{review.id}</th>
                <td>{review.title}</td>
                <td>{review.date}</td>
                <td>{review.entry}</td>
                <td>{review.rating}</td>
                <td>
                //* <dialogBox open = {openDialog} onClose ={() => setOpenDialog(false)}/>
                    <Button color='warning' onClick={() => {props.editUpdateReview(review); props.updateOn()}} >Edit</Button>
                    <Button color='danger' onClick={() => {deleteReview(review)}}>Delete</Button>
                </td> 
            </tr>
        })
    }

return(
    <div>
        <h3>Review Display</h3> 
        <hr />
            <Table striped>
                <thead>
                    <tr>
                        <th>title</th>
                        <th>date</th>
                        <th>entry</th>
                        <th>rating</th>
                    </tr>
                </thead>
                <tbody>
                    {reviewMapper()}
                </tbody>
            </Table>
    </div>
    )
}

export default ReviewTable;
