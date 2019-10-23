import React, { useContext } from 'react';
import AppContext from '../AppContext.js';
import customerService from '../services/customerService.js';
import useForm from '../utilities/useForm.js';
import { TextField, Button } from '@material-ui/core';
import '../App.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


const AddCustomerForm = ({ openForm, setOpenForm }) => {
    const app = useContext(AppContext);
    const [values, handleChange] = useForm();

    //helper function to prevent the user from sending 'null' values
    const checkFields = () => {
        if(Object.values(values)){
            if(Object.values(values).length !== 7) {
                return false;
            } else if (Object.values(values).find(item => item.length === 0)) {
                return false;
            } else {
                return true;
            }
        }else {
            return false
        }
    }

    const handleSubmit = () => {
        if(checkFields() === true){
            customerService
            .create(values)
            .then(response => {
                app.dispatch({
                    type: 'ADD_CUSTOMER',
                    payload: response.data,
                })
            })
            app.dispatch({ type: 'SET_MESSAGE', payload: { type: 'success', content: 'A new customer has been succesfully created ', open: true } });
            handleChange('cleanup');
        } else {
            app.dispatch({ type: 'SET_MESSAGE', payload: { type: 'error', content: 'Please fill out the entire form', open: true } });
        }
    }

    const changeModal = () => {
        setOpenForm(false);
    }

    return (
        <Dialog
            open={openForm}
            onClose={changeModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogContent>
                <div className="">
                    <form>
                        <TextField
                            className="customer-form-item"
                            id="standard-name"
                            label={"First name"}
                            name="firstname"
                            value={values.firstname || ''}
                            onChange={handleChange}
                            margin="normal"
                        />&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField
                            className="customer-form-item"
                            id="standard-name"
                            label={"Last name"}
                            name="lastname"
                            value={values.lastname || ''}
                            onChange={handleChange}
                            margin="normal"
                        /><br />
                        <TextField
                            className="customer-form-item"
                            id="standard-name"
                            label={"Phone"}
                            name="phone"
                            value={values.phone || ''}
                            onChange={handleChange}
                            margin="normal"
                        />&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField
                            className="customer-form-item"
                            id="standard-name"
                            label={"Email"}
                            name="email"
                            value={values.email || ''}
                            onChange={handleChange}
                            margin="normal"
                        /><br />
                        <TextField
                            className="customer-form-item"
                            id="standard-name"
                            label={"Street address"}
                            name="streetaddress"
                            value={values.streetaddress || ''}
                            onChange={handleChange}
                            margin="normal"
                        />&nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField
                            className="customer-form-item"
                            id="standard-name"
                            label={"City"}
                            name="city"
                            value={values.city || ''}
                            onChange={handleChange}
                            margin="normal"
                        /><br />
                        <TextField
                            className="customer-form-item"
                            id="standard-name"
                            label={"Post code"}
                            name="postcode"
                            value={values.postcode || ''}
                            onChange={handleChange}
                            margin="normal"
                        />&nbsp;&nbsp;&nbsp;&nbsp;

                    </form>
                    <Button variant="contained" color="default" onClick={changeModal} className="close-button">
                        Close
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}


export default AddCustomerForm;