import React, { useContext, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core/';
import useForm from '../utilities/useForm.js';
import AppContext from '../AppContext.js';
import customerService from '../services/customerService.js';
import trainingService from '../services/trainingService.js';
import { MDBDataTable } from 'mdbreact';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import AddNewTrainingForm from './AddNewTrainingForm.js'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const CustomerProfile = ({ openProfile, setOpenProfile }) => {
    const app = useContext(AppContext);
    const [values, handleChange] = useForm();
    const current = app.state.currentCustomer;

    const isConfirmed = '';

    const changeModal = () => {
        setOpenProfile(!openProfile);
    }

    const handleSave = () => {
        if(window.confirm("are you sure you want to save the changes?")) {
            customerService
            .update(getItemId(current), { ...current, ...values })
            .then(res => {
                app.dispatch({ type: 'UPDATE_CUSTOMER', payload: res.data })
            })
        }
    }

    const getItemId = (item) => {
        const splitUrl = item
            .links[0]
            .href
            .split("/")
        return splitUrl[splitUrl.length - 1]
    }

    useEffect(() => {
        trainingService
            .getSpecific(current.links[2].href)
            .then(res => {
                if (res.data.content[0].relTargetType === undefined) {
                    app.dispatch({ type: 'SET_CURRENT_TRAININGS', payload: res.data.content })
                } else {
                    app.dispatch({ type: 'SET_CURRENT_TRAININGS', payload: [] })
                }
            })
    }, [app, current.links])

    const deleteTraining = (training) => {
        trainingService
            .remove(training.links[0].href)
            .then(res => {
                app.dispatch({ type: 'DELETE_TRAINING', payload: training })
            })
    }
//confirm(handleDelete, { description: 'This action is permanent!' })delete: <Button variant="contained" size="small" color="secondary" onClick={() => deleteTraining(training)} startIcon={<DeleteIcon />}>Delete</Button>
    const rows = () => {
        if (app.state.currentTrainings !== undefined) {
            return app.state.currentTrainings.map(training => ({
                activity: training.activity,
                duration: training.duration,
                date: moment(training.date).format('DD/MM/YYYY HH:mm'),
                delete: <Button variant="contained" size="small" color="secondary" onClick={() => deleteTraining(training)} startIcon={<DeleteIcon />}>Delete</Button>
            }))
        }
    }

    const deleteCustomer = () => {
        if (window.confirm("are you sure?")) {
            customerService
                .remove(current.links[0].href).catch(error => {
                    console.log(error);
                })
            setOpenProfile(false)
            app.dispatch({ type: 'DELETE_CUSTOMER', payload: current })
            app.dispatch({ type: 'SET_MESSAGE', payload: { type: 'success', content: `Customer by the name of ${current.firstname, ' ', current.lastname} has been deleted`, open: true } });
        }
    }

    const data = {
        columns: [
            {
                label: 'Activity',
                field: 'activity',
                sort: 'asc',
            },
            {
                label: 'Duration',
                field: 'duration',
                sort: 'asc',
            },
            {
                label: 'Date',
                field: 'date',
                sort: 'asc',
            },
            {
                label: 'Delete',
                field: 'delete',
            }
        ],
        rows: rows()
    }

    return (
        <div className="profile-dialog">
            <Dialog
                open={openProfile}
                onClose={changeModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth={'md'}>
                <DialogContent>
                    <h3 id="transition-modal-title">Profile Page for {current.firstname + ' ' + current.lastname}</h3>
                      <div className="details-container">
                            <form autoComplete="off">
                                <TextField
                                    className="customer-form-item"
                                    id="standard-name"
                                    label={current.firstname}
                                    name="firstname"
                                    value={values.firstname || ''}
                                    onChange={handleChange}
                                    margin="normal"
                                />&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField
                                    className="customer-form-item"
                                    id="standard-name"
                                    label={current.lastname}
                                    name="lastname"
                                    value={values.lastname || ''}
                                    onChange={handleChange}
                                    margin="normal"
                                /><br/>
                                <TextField
                                    className="customer-form-item"
                                    id="standard-name"
                                    label={current.phone}
                                    name="phone"
                                    value={values.phone || ''}
                                    onChange={handleChange}
                                    margin="normal"
                                />&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField
                                    className="customer-form-item"
                                    id="standard-name"
                                    label={current.email}
                                    name="email"
                                    value={values.email || ''}
                                    onChange={handleChange}
                                    margin="normal"
                                /><br/>
                                <TextField
                                    className="customer-form-item"
                                    id="standard-name"
                                    label={current.streetaddress}
                                    name="streetaddress"
                                    value={values.streetaddress || ''}
                                    onChange={handleChange}
                                    margin="normal"
                                />&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField
                                    className="customer-form-item"
                                    id="standard-name"
                                    label={current.city}
                                    name="city"
                                    value={values.city || ''}
                                    onChange={handleChange}
                                    margin="normal"
                                /><br/>
                                <TextField
                                    className="customer-form-item more-to-left"
                                    id="standard-name"
                                    label={current.postcode}
                                    name="postcode"
                                    value={values.postcode || ''}
                                    onChange={handleChange}
                                    margin="normal"
                                />&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button
                                    startIcon={<SaveIcon />}
                                    variant="contained"
                                    color="primary"
                                    className="savebtn"
                                    size="small"
                                    onClick={handleSave}>
                                    Save
                                </Button>
                            </form>
                        </div>  
                        <div className="table-container">
                        <AddNewTrainingForm />
                            <MDBDataTable
                                striped
                                bordered
                                small
                                responsive
                                data={data}
                            />
                        <div className="profile-buttons">
                        <Button variant="contained" color="secondary" onClick={deleteCustomer} className="delete-user" startIcon={<DeleteIcon />}>
                            Delete this user
                        </Button>
                        <Button variant="contained" color="primary" onClick={changeModal} className="close-button">
                            Close
                        </Button>
                        </div>
                        </div>
                        <br/>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CustomerProfile;