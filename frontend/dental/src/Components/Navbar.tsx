
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import { Link as RouterLink } from "react-router-dom";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    icon: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  }),
);

const signout = () => {
  localStorage.clear();
  window.location.href = "/";
};




export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            เวชระเบียน
          </Typography>

          

          <Button style={{ float: "right" }}
            onClick={signout}
            variant="outlined"
            color="inherit">
            Logout
          </Button>
          <Avatar src="/broken-image.jpg" className={classes.icon} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
