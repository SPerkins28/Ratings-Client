import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Button from '@material-ui/core/Button';
import LoginPopUp from '../auth/LoginPopUp';
import SignUpPopUp from '../auth/SignUpPopUp';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import './SideDrawer.css';
import ReviewTable from '../../reviews/popups/ReviewTable';
import HomeIcon from '@material-ui/icons/Home';
import TheatersIcon from '@material-ui/icons/Theaters';
import Movies from '../Movies/Movies';
import Home from '../home/Home';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.appBar + 1000,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const SideDrawer = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [openLogin, setOpenLogin] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar
            id="appBar"
            position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}
        >
            <Toolbar id='toolbar'>
                <Grid item xs={4} id="routerButton">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                        [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={4} id='title'>
                    <Typography variant="h5">
                        <strong>(Re)ViewIt</strong>
                    </Typography>
                </Grid>
                {!props.sessionToken ? 
                    <Grid item xs={4} id='titleButtons'>
                        <Button onClick={() => setOpenSignUp(true)} id="signupBut">
                            <strong>Sign Up</strong>
                        </Button>
                        <Button onClick={() => setOpenLogin(true)} >
                            <strong>Login</strong>
                        </Button>
                    </Grid> : <Grid item xs={4} id='titleButtons'>
                        <Button onClick={props.clickLogout} >
                            <strong>Logout</strong>
                        </Button>
                    </Grid>}
            </Toolbar>
        </AppBar>
        <LoginPopUp open={openLogin} onClose={() => setOpenLogin(false)} updateToken={props.updateToken}/>
        <SignUpPopUp open={openSignUp} onClose={() => setOpenSignUp(false)} updateToken={props.updateToken}/>
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon id="drawerClose" /> : <ChevronLeftIcon />}
            </IconButton>
            </div>
            <Divider />
            <List>
            <Link to="/" className="links" >
                <ListItem button >
                  <ListItemIcon>
                    <HomeIcon className="sideIcons"/>
                  </ListItemIcon>
                  <ListItemText>Home</ListItemText>
                </ListItem>
              </Link>
              <Link to="/myreviews" className="links" >
                <ListItem button >
                  <ListItemIcon>
                    <RateReviewIcon className="sideIcons"/>
                  </ListItemIcon>
                  <ListItemText>My Reviews</ListItemText>
                </ListItem>
              </Link>
              <Link to="/movies" className="links" >
                <ListItem button >
                  <ListItemIcon>
                    <TheatersIcon className="sideIcons"/>
                  </ListItemIcon>
                  <ListItemText>Movie Search</ListItemText>
                </ListItem>
              </Link>
            </List>
            <Divider />
        </Drawer>
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/myreviews"><ReviewTable token={props.sessionToken}/></Route>
          <Route exact path="/movies"><Movies token={props.sessionToken}/></Route>
        </Switch>
        </div>
    )
}

export default SideDrawer;