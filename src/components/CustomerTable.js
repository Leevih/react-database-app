import React, { useContext, useState } from 'react';
import AddCustomerForm from './AddCustomerForm.js';
import { MDBDataTable } from 'mdbreact';
import AppContext from '../AppContext.js';
import { Button, makeStyles, Modal, Backdrop, Fade } from '@material-ui/core/';
import CustomerProfile from './CustomerProfile.js';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const CustomerTable = () => {
  const app = useContext(AppContext);
  const classes = useStyles();
  const [ openForm, setOpenForm ] = useState(false);
  const [ openProfile, setOpenProfile ] = useState(false);

  const handleFormChange = () => {
    setOpenForm(!openForm);
  }

  const rows = () => {
    if (app.state.customers !== undefined) {
      return app.state.customers.map(customer => ({
        name: customer.firstname + ' ' + customer.lastname,
        phone: customer.phone,
        email: customer.email,
        clickEvent: () => showProfileCard(customer)
      }))
    }
  }

  const showProfileCard = (customer) => {
    app.dispatch({ type: 'SET_CURRENT', payload: customer });
    setOpenProfile(!openProfile);

  }

  const data = {
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Phone',
        field: 'phone',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 200
      },

    ],
    rows: rows()
  }

  return (
    <div className="container mt-5">
      <MDBDataTable
        striped
        bordered
        small
        responsive
        data={data}
      />
      <div>
      <Button variant="contained" onClick={handleFormChange}>
          Add a customer
      </Button>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openForm}
          onClose={handleFormChange}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>

          <Fade in={openForm}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Fill this form to add another customer</h2>
              <AddCustomerForm />
              <Button variant="contained" color="secondary" onClick={handleFormChange}>
                  Cancel
              </Button>
            </div>
          </Fade>
        </Modal>
      </div>

      {openProfile ? <CustomerProfile openProfile={openProfile} setOpenProfile={setOpenProfile} /> : null}
    </div>
  )
}

export default CustomerTable;