import React, { useContext } from 'react';
import AppContext from '../AppContext.js';
import customerService from '../services/customerService.js';
import useForm from '../utilities/useForm.js';
import { Input, Button } from '@material-ui/core';
import '../App.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const AddCustomerForm = ({ openForm, setOpenForm }) => {
    const app = useContext(AppContext);
    const [values, handleChange] = useForm();

    const handleSubmit = () => {
        customerService
            .create(values)
            .then(response => {
                app.dispatch({
                    type: 'ADD_CUSTOMER',
                    payload: response.data,
                })
            })
        handleChange('cleanup');
    }

    const changeModal = () => {
        setOpenForm(false)
    }

    return (
        <Dialog
            open={openForm}
            onClose={changeModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogContent>
                <form>
                    <Input
                        id="standard-name"
                        value={values.firstname || ''}
                        onChange={handleChange}
                        name="firstname"
                        placeholder="First name"
                        className="customer-form-item"
                    />
                    <Input
                        id="standard-name"
                        value={values.lastname || ''}
                        onChange={handleChange}
                        name="lastname"
                        placeholder="Last name"
                        className="customer-form-item"
                    /><br />
                    <Input
                        id="standard-name"
                        value={values.phone || ''}
                        onChange={handleChange}
                        name="phone"
                        placeholder="Phone"
                        className="customer-form-item"
                    />
                    <Input
                        id="standard-name"
                        value={values.email || ''}
                        onChange={handleChange}
                        name="email"
                        placeholder="Email"
                        className="customer-form-item"
                    /><br />
                    <Input
                        id="standard-name"
                        value={values.streetaddress || ''}
                        onChange={handleChange}
                        name="streetaddress"
                        placeholder="Street address"
                        className="customer-form-item"
                    />
                    <Input
                        id="standard-name"
                        value={values.city || ''}
                        onChange={handleChange}
                        name="city"
                        placeholder="City"
                        className="customer-form-item"
                    /><br />
                    <Input
                        id="standard-name"
                        value={values.postcode || ''}
                        onChange={handleChange}
                        name="postcode"
                        placeholder="Post code"
                        className="customer-form-item"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className="customer-form-item"
                        onClick={handleSubmit}>
                        Submit
            </Button>
                </form>
                <Button variant="contained" color="primary" onClick={changeModal} className="close-button">
                    Close
                </Button>
            </DialogContent>
        </Dialog>
    )
}


export default AddCustomerForm;