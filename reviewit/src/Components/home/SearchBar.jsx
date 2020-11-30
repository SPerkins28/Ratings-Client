import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '5em',
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
            // headers: new Headers({   //@ Had to remove headers section to remove preflight CORS Issues
            //     'Content-Type': 'application/json'
            // })
        })
        .then((res) => res.json())
        .then((movies) => {
            props.setMovies(movies.Search);
        })
    }
    
    // const enterPressed = (e) => {
    //     e.preventDefault();
    //     if (e.key === 13) {
    //         handleSubmit();
    //     }
    // }

    return (
        <>
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Movie Title"
                onChange={(e) => setSearch(e.target.value)}
                // onSubmit={enterPressed}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton type="submit" className={classes.iconButton} >
                <SearchIcon onClick={handleSubmit}/>
            </IconButton>
        </Paper>
        </>
    )
}

export default SearchBar;