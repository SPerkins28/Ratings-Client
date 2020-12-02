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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#3F51B5',
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
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const SideDrawer = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [openLogin, setOpenLogin] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [open, setOpen] = React.useState(false);

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
            variant="permanent"
            style={{backgroundColor: "lightslategray"}}
            className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            })}
            classes={{
              paper:
                  clsx({
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
              }),
            }}
        >
            <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon id="drawerClose" /> : <ChevronLeftIcon />}
            </IconButton>
            </div>
            <Divider />
            <List>
            {['My Reviews'].map((text, index) => (
                  <Link to="/myreviews" className="links">
                <ListItem button key={text}>
                  <ListItemIcon>
                      {index % 2 === 0 ? <RateReviewIcon id="myReviews"/> : <RateReviewIcon />}
                  </ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
                  </Link>
            ))}
            </List>
            <Divider />
        </Drawer>
        <Switch>
          <Route exact path="/myreviews"></Route>
        </Switch>
        </div>
    )
}

export default SideDrawer;