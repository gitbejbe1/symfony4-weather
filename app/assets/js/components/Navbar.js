import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  navButton: {
    marginRight: theme.spacing(2),
	fontSize: "1.5em"
  },
  title: {
	display: "inline-flex",
    flexGrow: 1
  },
}));

export default function Navbar() {
  
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
           
			<Button component={Link} to="/" edge="start" className={classes.navButton} color="inherit" aria-label="Menu">
				DASHBOARD
			</Button>
			
			<Button component={Link} to="/history" edge="start" className={classes.navButton} color="inherit" aria-label="Menu">
				HISTORY
			</Button>

        </Toolbar>
      </AppBar>
    </div>
  );
}