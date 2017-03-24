import React from 'react';
import styles from './app.css';
import Header from './header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const container = ' container';


const App = (props) => (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
            <Header />
            <div className={styles.app + container}>
                { props.children }
            </div>
        </div>
    </MuiThemeProvider>
);

export default App;