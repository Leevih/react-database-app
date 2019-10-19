import React, { useContext, useEffect } from 'react';
import { Button, Input } from '@material-ui/core/';
import useForm from '../utilities/useForm.js';
import AppContext from '../AppContext.js';
import customerService from '../services/customerService.js';
import trainingService from '../services/trainingService.js';
import { MDBDataTable } from 'mdbreact';
import moment from 'moment';
import AddNewTrainingForm from './AddNewTrainingForm.js'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const CustomerProfile = ({ openProfile, setOpenProfile }) => {
    const app = useContext(AppContext);
    const [values, handleChange] = useForm();
    const current = app.state.currentCustomer;

    const changeModal = () => {
        setOpenProfile(!openProfile);
    }

    const handleSave = () => {
        customerService
            .update(getItemId(current), { ...current, ...values })
            .then(res => {
                app.dispatch({ type: 'UPDATE_CUSTOMER', payload: res.data })
            })
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
    }, [app, current])

    const deleteTraining = (training) => {
        trainingService
            .remove(training.links[0].href)
            .then(res => {
                app.dispatch({ type: 'DELETE_TRAINING', payload: training })
            })
    }

    const rows = () => {
        if (app.state.currentTrainings !== undefined) {
            return app.state.currentTrainings.map(training => ({
                activity: training.activity,
                duration: training.duration,
                date: moment(training.date).format('DD/MM/YYYY HH:mm'),
                delete: <Button variant="contained" color="secondary" onClick={() => deleteTraining(training)}>Delete</Button>
            }))
        }
    }

    const deleteCustomer = () => {
        if (window.confirm("are you sure?")) {
            customerService
                .remove(current.links[0].href).catch(error => {
                    console.log(error);
                })
            app.dispatch({ type: 'DELETE_CUSTOMER', payload: current })
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
                        <div className="details-form">
                            <form>
                                <Input
                                    id="standard-name"
                                    value={values.firstname || current.firstname}
                                    onChange={handleChange}
                                    name="firstname"
                                    placeholder="First name"
                                    className="customer-form-item"
                                />
                                <Input
                                    id="standard-name"
                                    value={values.lastname || current.lastname}
                                    onChange={handleChange}
                                    name="lastname"
                                    placeholder="Last name"
                                    className="customer-form-item"
                                /><br />
                                <Input
                                    id="standard-name"
                                    value={values.phone || current.phone}
                                    onChange={handleChange}
                                    name="phone"
                                    placeholder="Phone"
                                    className="customer-form-item"
                                />
                                <Input
                                    id="standard-name"
                                    value={values.email || current.email}
                                    onChange={handleChange}
                                    name="email"
                                    placeholder="Email"
                                    className="customer-form-item"
                                /><br />
                                <Input
                                    id="standard-name"
                                    value={values.streetaddress || current.streetaddress}
                                    onChange={handleChange}
                                    name="streetaddress"
                                    placeholder="Street address"
                                    className="customer-form-item"
                                />
                                <Input
                                    id="standard-name"
                                    value={values.city || current.city}
                                    onChange={handleChange}
                                    name="city"
                                    placeholder="City"
                                    className="customer-form-item"
                                /><br />
                                <Input
                                    id="standard-name"
                                    value={values.postcode || current.postcode}
                                    onChange={handleChange}
                                    name="postcode"
                                    placeholder="Post code"
                                    className="customer-form-item"
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="customer-form-item"
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
                        </div>
                        <Button variant="contained" color="secondary" onClick={deleteCustomer} className="delete-user">
                            Delete this user
                        </Button>
                        <Button variant="contained" color="primary" onClick={changeModal} className="close-button">
                            Close
                        </Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CustomerProfile;