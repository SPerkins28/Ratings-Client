import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import ReviewPopUp from '../../reviews/popups/ReviewPopUp';
import ReviewCreate from '../../reviews/ReviewCreate';
import Grid from '@material-ui/core/Grid';
import SearchBar from '../home/SearchBar';
import Paper from '@material-ui/core/Paper'
import './Movies.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '80%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const Movies = (props) => {
  const classes = useStyles();
  const [showReviews, setShowReviews] = useState(false);
  const [createReview, setCreateReview] = useState(false);
  const [movie, setMovie] = useState();
  const [movies, setMovies] = useState([]);

  console.log(props.sessionToken);

  return (
    <>
    {props.token ?
    <Grid container>
    <SearchBar setMovies={setMovies} token={props.sessionToken} />
    <Grid item xs={2}></Grid>
    <Grid item xs={8} id="movieContent">
    {!movies ? <div className={classes.root}>No Movies Found</div> : 
    <div className={classes.root} id="buttonHousing">
      {movies.map((movie) => (
        <ButtonBase
          id="movieButton"
          focusRipple
          key={movie.imdbID}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: 330,
            height: 550
          }}
          onClick={() => {setShowReviews(true); setMovie(movie)}}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${movie.Poster})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {movie.Title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    {showReviews ? 
    <ReviewPopUp open={showReviews} movie={movie} handleClose={() => setShowReviews(false)} showCreate={() => setCreateReview(true)}/> : null}
    {createReview ?
    <ReviewCreate open={createReview} token={props.token} movie={movie} handleClose={() => setCreateReview(false)} showReviews={() => setShowReviews(true)}/> : null}
    </div>}
    </Grid>
    <Grid item xs={2}></Grid>
    </Grid> : <Paper id="movieMessage"><strong>Please Login or Sign Up to view this page</strong></Paper>}
    </>
  );
}

export default Movies;