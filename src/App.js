import React, { useEffect, useReducer } from 'react';

import CustomerTable from './components/CustomerTable.js';
import Message from './components/Message.js';
import CalendarComponent from './components/CalendarComponent.js';
import customerService from './services/customerService.js';
import trainingService from './services/trainingService.js';
import { AppProvider } from './AppContext.js';
import './App.css';
import appReducer from './appReducer.js';

const initialState = {
  customers: [],
  trainings: [],
  currentCustomer: {},
  currentTrainings: [],
  calendar: false,
  message: { type: 'info', content: 'if you see this message, it means i have broken something,', open: false },
}


const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    customerService
      .getAll()
      .then(res => {
        dispatch({ type: 'GET_CUSTOMERS', payload: res.data.content })
      })
      .catch(error => {
        dispatch({ type: 'SET_MESSAGE', payload: { type: 'error', content: 'Error fetching customer data', open: true } });
      })
  }, [])

  useEffect(() => {
    trainingService
      .getAll()
      .then(res => {
        dispatch({ type: 'GET_TRAININGS', payload: res.data.content })
      })
      .catch(error => {
        dispatch({ type: 'SET_MESSAGE', payload: { type: 'error', content: 'Error fetching training data', open: true } });
      })
  }, [])

  return (
    <div className="container">  
      <AppProvider value={{ state, dispatch }}>
        <Message />
        <CustomerTable />
        <CalendarComponent />
      </AppProvider>
    </div>

  )
}

export default App;
