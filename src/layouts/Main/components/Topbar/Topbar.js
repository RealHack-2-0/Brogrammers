import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  Badge,
  Hidden,
  IconButton,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { connect } from 'react-redux';
import { logout } from 'Actions/USer';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  header: {
    color: '#fff'
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;
  const { history } = props;
  console.log(localStorage.getItem('user'));

  if (!localStorage.getItem('user')) {
    history.push('/sign-in');
  }
  const classes = useStyles();

  const [notifications] = useState([]);

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">
          {/* <img
            alt="Logo"
            src="/images/logos/logo--white.svg"
          /> */}
          <Typography variant="h2" className={clsx(classes.header)}>
            AnswerMe
          </Typography>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={() => {
              localStorage.removeItem('user');
              if (!localStorage.getItem('user')) {
                history.push('/sign-in');
              }
            }}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};
const mapStateToProps = state => ({
  user: state
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});
export default Topbar;
