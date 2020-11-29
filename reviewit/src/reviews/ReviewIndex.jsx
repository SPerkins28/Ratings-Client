import React, {useState, useEffect} from 'react';
// import {Container, Row, Col} from 'reactstrap';
import ReviewCreate from './ReviewCreate';
import ReviewTable from './ReviewTable';
import ReviewEdit from './ReviewEdit';

const ReviewIndex = (props) => {
    const [reviews, setReviews] = useState([]);
    const [updateLive, setUpdateLive] = useState(false);
    const [reviewUpdate, setReviewUpdate] = useState({});

    const fetchReviews = () => {
        fetch('http://localhost:4000/user/review', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }) .then((res) => res.json())
        .then((reviewData) => {
            setReviews(reviewData)
            console.log(reviewData);
        })
    }

    const editUpdateReview = (review) => {
        setReviewUpdate(review)
        console.log(review);
    }

    const updateOn = () => {
        setUpdateLive(true);
    }

    const updateOff = () => {
        setUpdateLive(false);
    }

    useEffect(() => {
        fetchReviews();
    }, [])

    return (
        <Container>
            <Row>
                <Col md="3">
                    <ReviewCreate fetchReviews={fetchReviews} token={props.token} /> 
                </Col> 
                <Col md="9">
                   <ReviewTable reviews={reviews} editUpdateReview={editUpdateReview} updateOn={updateOn} fetchReviews={fetchReviews}
                   token={props.token} />
                </Col>
                {updateLive ? <ReviewEdit reviewUpdate = {reviewUpdate} 
                updateOff={updateOff} token={props.token} fetchReviews={fetchReviews}/> : <></>}
            </Row>
        </Container>
    )
}

export default ReviewIndex;