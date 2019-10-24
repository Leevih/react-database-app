import React, { useState, useContext } from 'react';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { Button, Input } from '@material-ui/core/';
import useForm from '../utilities/useForm.js';
import AppContext from '../AppContext.js';
import trainingService from '../services/trainingService.js';
import moment from 'moment';
import Popover from '@material-ui/core/Popover';

const AddNewTrainingForm = () => {
    const [selectedDate, setSelectedDate] = useState(moment().format());
    const [newTraining, handleNewTraining] = useForm();
    const app = useContext(AppContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    //another ugly helper function to prevent user from entering null values.
    //this problem would have been avoided if I just learned how to submit 
    //form data in a proper manner. 
    const validateForm = () => {
        if(Object.values(newTraining)){
            if(Object.values(newTraining).length !== 2) {
                return false;
            } else if (Object.values(newTraining).find(item => item.length === 0)) {
                return false;
            } else {
                console.log('success');
                return true;
            }
        }else {
            return false
        }
    }
    
    const submitNewTraining = () => {
        if(validateForm() === true) {
            trainingService
            .create({
                date: selectedDate,
                activity: newTraining.activity,
                duration: newTraining.duration,
                customer: app.state.currentCustomer.links[0].href
            })
            .then(res => {
                app.dispatch({ type: 'ADD_TRAINING', payload: res.data });
                handleNewTraining('cleanup');
            })
            app.dispatch({ type: 'SET_MESSAGE', payload: { type: 'success', content: 'A New appointment has been succesfully issued', open: true } });
        } else {
            app.dispatch({ type: 'SET_MESSAGE', payload: { type: 'error', content: 'Please do not leave empty fields to the form', open: true } });
        }

    }

    const handleDateChange = (date) => {
        console.log(moment(date).format('DD/MM/YYYY HH:mm'));
        setSelectedDate(moment(date).format());
    }

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="add-training-form">
            <Button
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                className="open-form-button">
                Add another training
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
            >
                <form>
                    <Input
                        id="standard-name"
                        label="Activity"
                        name="activity"
                        placeholder="Activity"
                        className="form-input"
                        value={newTraining.activity || ''}
                        onChange={handleNewTraining}
                    />
                    <Input
                        id="standard-name"
                        label="Duration"
                        type="number"
                        name="duration"
                        placeholder="Duration"
                        className="form-input"
                        value={newTraining.duration || ''}
                        onChange={handleNewTraining}
                    /><br />
                    <div className="form-input">
                        <MuiPickersUtilsProvider utils={MomentUtils} >
                            <DateTimePicker
                                autoOk
                                ampm={false}
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </MuiPickersUtilsProvider>
                        <Button
                            className="training-button"
                            variant="contained"
                            color="primary"
                            onClick={submitNewTraining}>
                            Send
                </Button>
                    </div>
                </form>
            </Popover>
        </div>
    )
}

export default AddNewTrainingForm;