import axios from 'axios';
import { AUTH_USER } from './types';
import { browserHistory } from 'react-router';

const BASE_URL = 'http://scottbowlerdev.com/api';

export function signinUser({email, password}){
    return function(dispatch){
        axios.post(`${BASE_URL}/signin`, {email, password}).then(resp => {
            dispatch({type: AUTH_USER});

            localStorage.setItem('token', resp.data.token);

            browserHistory.push('/client_login_page');
        }).catch(err => {
            dispatch(authError('Bad Login Info'));
        });
    }
<<<<<<< HEAD
}

const PLANNER_URL = 'localhost:3000/api/';

  export function signupPlanner({email, password}){
    return function(dispatch){
        axios.post(`${PLANNER_URL}wedding_planner`, {email, password}).then(response => {
            dispatch({type: AUTH_USER});

            browserHistory.push('/planner_profile');
        }).catch((err) => {
            dispatch(authError(err.response.data.error));
        });
    }
  };
=======
}
>>>>>>> parent of d427c5d... wedding planner signup form made and submit function is console logging
