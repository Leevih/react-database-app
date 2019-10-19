import { useState } from 'react';

const useForm = () => {
    const [state, setState] = useState({});

    const handleChange = (event) => {
        if(event === 'cleanup') {
            setState({});
        } else {
            event.persist();
            setState(state => ({ ...state, [event.target.name]: event.target.value }));
        }
    }

    return [ state, handleChange ];    
}

export default useForm;