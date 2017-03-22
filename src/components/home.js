import React, { Component } from 'react';
import styles from './app.css';
import { Link } from 'react-router';
import Footer from './footer';

class Home extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={styles.homePage} >
                <div>
                    <div className='text-center'>
                        <h1>Welcome To Matchromonie</h1>
                        <p>Here at Matchromonie we aim to simplify your planning your ideal wedding. All it takes is five minutes of your time, and we will find your wedding planner. Don't want a wedding planner? No Problem, you can still use our site to help plan your needs. How does it work? Instead of answering a bunch of forms we will show you an arrangement of pictures and you decided which picture best represents how you imagine your wedding. No longer do you need to browse multiple sites, searching for multiple wedding planners, and answering multiple boring forms, trying to put dreams into words.</p>
                    </div>
                    <br />
                    <br />
                    <div>
                        <button className='btn btn-info'><Link to="/questions">Get Started</Link></button>
                    </div>
                    <br />
                    <br />
                    <div>
                        <Link className=' planner_login' to="/plannerPageLogin">Wedding Planner? Log in Here</Link>
                    </div>
                </div>
                <div className={styles.footer}>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default Home;