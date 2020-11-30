import React, { useState } from 'react';
import {Button, form, FormGroup, Label, InputLabel} from '@material-ui/core'; 

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
                        <Label htmlFor="title" value={title} />
                        <InputLabel name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="date" value={date} />
                        <InputLabel name="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="entry" value={entry} />
                        <InputLabel name="entry" onChange={(e) => setEntry(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="rating" value={rating} />
                        <InputLabel name="rating" onChange={(e) => setRating(e.target.value)}>
                            <option value="radiobtn">Rating Button</option>
                        </InputLabel>
                    </FormGroup>
                    <Button type="submit">Submit your Movie Review</Button>  
                </form>
            </div>
        </div>
    )
}

export default ReviewCreate;


