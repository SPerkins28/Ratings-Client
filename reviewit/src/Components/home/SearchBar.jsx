import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3em',
        marginBottom: '1em',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

const SearchBar = (props) => {
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const API_KEY = '913c9d93';

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setMovies([]);
        fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`, {
            method: 'GET',
            // headers: new Headers({   //@ <--- This API does not like headers....
            //     'Content-Type': 'application/json'
            // })
        })
        .then((res) => res.json())
        .then((movies) => {
            props.setMovies(movies.Search);
        })
    }
    
    return (
        <>
        <Grid item xs={1}></Grid>
        <Grid item xs={10} id='searchBar'>
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Movie Title"
                onChange={(e) => setSearch(e.target.value)}
                // onSubmit={enterPressed}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton type="submit" className={classes.iconButton} onClick={handleSubmit} id="magGlass" >
                <SearchIcon />
            </IconButton>
        </Paper>
        </Grid>
        <Grid item xs={1}></Grid>
        </>
    )
};

export default SearchBar;