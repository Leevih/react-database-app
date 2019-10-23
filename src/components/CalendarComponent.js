import React, { useContext } from 'react';
import AppContext from '../AppContext.js';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const CalendarComponent = () => {
  const app = useContext(AppContext);
  const classes = useStyles();

  const handleCalendar = () => {
    app.dispatch({ type: 'SET_CALENDAR' });
  };

  const renderItems = () => {
    return app.state.trainings.map(item => ({
      title: item.activity + ' duration: ' + item.duration + ' min',
      date: item.date,
    }))
  }

  return (
    <div>
      <Dialog fullScreen open={app.state.calendar} onClose={handleCalendar} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleCalendar} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[ dayGridPlugin]}
          events={renderItems()} />
      </Dialog>
    </div>
  )
}

export default CalendarComponent;
