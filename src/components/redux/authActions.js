import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

// Login User
export const loginUser = (formData) => async dispatch => {
    try {
        const res = await axios.post('/api/auth/login', formData);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
        // Save token to localStorage or handle as needed
    } catch (err) {
        dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
};

// Register User
export const registerUser = (formData) => async dispatch => {
    try {
        const res = await axios.post('/api/auth/register', formData);
        dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });
        // Save token to localStorage or handle as needed
    } catch (err) {
        dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
};
