import React, { Component } from 'react';
import styles from './app.css';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import * as actions from '../actions';


const style = {
    margin: 12,
};

const paperStyle = {
    width: 300,
    backgroundColor: 'white',
    color: 'gray',
    padding: '10px',
    fontSize: '.9em'

};

class Home extends Component {
    constructor(props){
        super(props);
    }

    handleProfile(){
        console.log('yo this is props', this.props);
        this.props.handleProfileClick();
    }

    renderHomePage(){
        const { authenticated } = this.props;
        if(authenticated){
            return (
                <div key='home1' className={`${styles.homePage}`} >
                    <div>
                        <div className={`${styles.homeText}`}>
                            <Paper zDepth={2} style={paperStyle}>
                                <p>
                                    Here at Matchromonie we aim to simplify planning your ideal wedding.
                                    All it takes is five minutes of your time and we will find your wedding planner.
                                </p>
                                <p>
                                    Don't want a wedding planner? No problem.
                                    You can still use our site to help plan your needs.
                                </p>
                                <p>
                                    How does it work? Instead of answering a bunch of forms we will show you an arrangement of pictures
                                    and you decided which picture best represents how you imagine your wedding. No longer do you need to
                                    browse multiple sites, searching for multiple wedding planners, and answering multiple boring forms,
                                    trying to put dreams into words.
                                </p>
                            </Paper>
                            <div>
                                <Link to="/questions"><RaisedButton label='Retake Questionnaire' secondary={true} style={style}/></Link>
                                <br />
                                <RaisedButton onClick={this.handleProfile.bind(this)} label="Profile" secondary={true} style={style}/>
                            </div>
                        </div>

                    </div>
                </div>
            )
        } else {
            return (
                <div key='home2' className={`${styles.homePage}`} >
                    <div>
                        <div className={`${styles.homeText}`}>
                            <Paper zDepth={2} style={paperStyle}>
                                <p>
                                    Here at Matchromonie we aim to simplify planning your ideal wedding.
                                    All it takes is five minutes of your time and we will find your wedding planner.
                                </p>
                                <p>
                                    Don't want a wedding planner? No problem.
                                    You can still use our site to help plan your needs.
                                </p>
                                <p>
                                    How does it work? Instead of answering a bunch of forms we will show you an arrangement of pictures
                                    and you decided which picture best represents how you imagine your wedding. No longer do you need to
                                    browse multiple sites, searching for multiple wedding planners, and answering multiple boring forms,
                                    trying to put dreams into words.
                                </p>
                            </Paper>
                            <div>
                                <Link to="/questions"><RaisedButton label="Get Started" secondary={true} style={style}/></Link>
                                <br />
                                <Link to="/planner_login"><RaisedButton label="Wedding Planner?" secondary={true} style={style}/></Link>
                            </div>
                        </div>

                    </div>
                </div>
                )
        }
    }

    render(){

        return (
            <div className="home">
                {this.renderHomePage()}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        active_client: state.coupleData.active_client,
        authenticated: state.coupleData.authenticated
    }
}

export default connect(mapStateToProps, actions)(Home);