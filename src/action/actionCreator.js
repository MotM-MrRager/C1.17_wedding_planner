import {UPDATE_PREFS, GET_COUPLE_PROFILE} from '../action/types';
import axios from 'axios';
import {history} from '../store';


const BASE_URL = 'http://localhost:3000/api';

export function updatePrefs(category, imageValue) {
    return {
        type: UPDATE_PREFS,
        payload: {category, imageValue}
    }
}

export function sendPrefsToServer(prefs) {

    return function (dispatch) {
        axios.post(`${BASE_URL}/search`, prefs).then(resp => {
            console.log('axios update success', resp);
            }).catch(err => {
            console.log('axios failure', err);
        })
    };
}