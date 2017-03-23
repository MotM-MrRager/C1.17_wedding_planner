import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class PlannerSignup extends Component {
    handleFormSubmit(values){
        actions.signupPlanner(values);
    }

    render(){
        const { errorMsg, handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className='form-group'>
                    <label>Email</label>
                    <input className='form-control' {...email} />
                </fieldset>
                <fieldset className='form-group'>
                    <label>Password</label>
                    <input className='form-control' {...password} type='password' />
                </fieldset>
                <fieldset className='form-group'>
                    <label>Confirm Password</label>
                    <input className='form-control' {...passwordConfirm} type='password' />
                </fieldset>
                <button className="btn btn-primary">Sign Up!</button>
            </form>
        );
    }
}

function validate(values){
    const error = {};

    if (!values.email){
        error.email = 'Please enter an email';
    }
    if(!values.password){
        error.password = 'Please enter a password';
    }
    if(!values.passwordConfirm){
        error.passwordConfirm = 'Please confirm password';
    }

    if(values.password !== values.passwordConfirm){
        error.passwordConfirm = 'Passwords don\'t match';
    }

    return error;
}

function mapStateToProps(state){
    return { errorMsg: state.auth.error }
}

export default reduxForm({
    form: 'wedding_planner',
    fields: ['name', 'company', 'email', 'password', 'passwordConfirm', 'websiteurl', 'street', 'city', 'state', 'zip', 'phoneNumber', 'specialty'],
    validate
}, mapStateToProps, actions)(PlannerSignup);