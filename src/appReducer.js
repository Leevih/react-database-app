
  const appReducer = (state, action) => {
    switch (action.type) {
      case 'GET_CUSTOMERS':
        {
          return {
            ...state,
            customers: action.payload,
          }
        }
      case 'GET_TRAININGS':
        {
          return {
            ...state,
            trainings: action.payload,
          }
        }
      case 'ADD_CUSTOMER':
        {
          return {
            ...state,
            customers: state.customers.concat(action.payload)
          }
        }
      case 'SET_CURRENT':
        {
          return {
            ...state,
            currentCustomer: action.payload,
          }
        }
      case 'UPDATE_CUSTOMER':
        {
          return {
            ...state,
            customers: state.customers.map(item => item.links[0].href !== action.payload.links[0].href ? item : action.payload)
          }
        }
      case 'ADD_TRAINING':
        {
          return {
            ...state,
            trainings: state.trainings.concat(action.payload)
          }
        }
      case 'SET_CURRENT_TRAININGS':
        {
          return {
            ...state,
            currentTrainings: action.payload
          }
        }
      case 'DELETE_CUSTOMER':
        {
          return {
            ...state,
            customers: state.customers.filter(item => item.links[0].href !== action.payload.links[0].href)
          }
        }
      case 'DELETE_TRAINING':
        {
          return {
            ...state,
            trainings: state.trainings.filter(item => item.links[0].href !== action.payload.links[0].href)
          }
        }
      default: {
        return state;
      }
    }
  }

export default appReducer