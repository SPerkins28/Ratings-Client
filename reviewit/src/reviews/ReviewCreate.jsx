import React, { useState } from 'react';
import {Button, FormGroup, InputLabel, Input} from '@material-ui/core'; 
const ReviewCreate = (props) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [entry, setEntry] = useState('');
    const [rating, setRating] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
            fetch('http://localhost:4000/review/create', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': props.token
                })
            }) .then ((res) => res.json())
            .then((reviewData) => {
                console.log(reviewData);
                setTitle('');
                setDate('');
                setEntry('');
                setRating('');
                props.fetchWorks()
            })
    }

    return (
        <div className="main">
            <div className="mainDiv">
                <h3>Write a Movie Review</h3>
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <InputLabel htmlFor="title" value={title} />
                        <Input name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <InputLabel htmlFor="date" value={date} />
                        <Input name="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <InputLabel htmlFor="entry" value={entry} />
                        <Input name="entry" onChange={(e) => setEntry(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <InputLabel htmlFor="rating" value={rating} />
                        <Input name="rating" onChange={(e) => setRating(e.target.value)}>
                            <option value="radiobtn">Rating Button</option>
                        </Input>
                    </FormGroup>
                    <Button type="submit">Submit your Movie Review</Button>  
                </form>
            </div>
        </div>
    )
}

export default ReviewCreate;


