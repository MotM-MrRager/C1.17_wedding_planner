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
}

const PLANNER_URL = 'http://localhost:3000/api/';

  export function signupPlanner({password, email}){
    return function(dispatch){
        axios.post(`${PLANNER_URL}wedding_planner`, {password, email}).then(response => {
            dispatch({type: AUTH_USER});

            browserHistory.push('/planner_details');
        }).catch((err) => {
            dispatch("error");
        });
    }
  };

  export function updatePlanner({password, email}){
    return function(dispatch){
        axios.put(`${PLANNER_URL}wedding_planner`, {name, description, website}).then(response => {
            dispatch({type: AUTH_USER});

            browserHistory.push('/planner_profile');
        }).catch((err) => {
            dispatch("error");
        });
    }
  };