import React, { useContext, useState } from 'react';
import AddCustomerForm from './AddCustomerForm.js';
import { MDBDataTable } from 'mdbreact';
import AppContext from '../AppContext.js';
import { Button } from '@material-ui/core/';
import CustomerProfile from './CustomerProfile.js';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    '& > span': {
      margin: theme.spacing(2),
    },
  },
  iconHover: {
    '&:hover': {
      color: red[800],
    },
  },
}));


const CustomerTable = () => {
  const classes = useStyles();
  const app = useContext(AppContext);
  const [openForm, setOpenForm] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const handleFormChange = () => {
    setOpenForm(!openForm);
  }

  const validateCustomerList = () => {
    return app.state.customers.filter(item => 'firstname' in item)
  }

  const rows = () => {
    if (validateCustomerList !== undefined) {
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
    <div className="container mt-5 white">
      
      <MDBDataTable
        className="customers"
        /* striped */
        bordered
        small
        responsive
        data={data}
      />
      <div>
        <div className="some-buttons">
          <Button color="primary" variant="contained" onClick={handleFormChange} className={classes.button}>
            Add a customer
          </Button>
          <Button 
          color="primary"
          variant="contained" 
          onClick={() => app.dispatch({ type: 'SET_CALENDAR' })} className={classes.button}>
            Open calendar
          </Button>
{/*           <Icon className={classes.iconHover} color="error" style={{ fontSize: 30 }}>
        add_circle
      </Icon> */}
        </div>


      </div>
      {openForm ? <AddCustomerForm openForm={openForm} setOpenForm={setOpenForm} /> : null}
      {openProfile ? <CustomerProfile openProfile={openProfile} setOpenProfile={setOpenProfile} /> : null}
    </div>
  )
}

export default CustomerTable;