/* import React, { useContext } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import WarningIcon from '@material-ui/icons/Warning';
import AppContext from '../AppContext.js';
import Slide from '@material-ui/core/Slide';

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

const Message = () => {
    const app = useContext(AppContext);


    return (
        <Snackbar
        variant={app.state.message.type}
        open={app.state.message.open}
        TransitionComponent={SlideTransition}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{app.state.message.content}</span>}
      />
    )
}

export default Message; */

import AppContext from '../AppContext.js';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];


  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const Message = () =>  {
const app = useContext(AppContext);
  const classes = useStyles2();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    app.dispatch({ type: 'SET_MESSAGE', payload: { open: false, type: app.state.message.type, content: '' } })
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={app.state.message.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={app.state.message.type}
          message={app.state.message.content}
        />
      </Snackbar>
    </div>
  );
}

export default Message;