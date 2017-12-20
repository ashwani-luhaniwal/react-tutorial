import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-dom';
import Home from './Home';
import Login from './Login';

class RouterApp extends Component {
    render() {
        return (
            <Router>
                <div>
                    <h2>Welcome to React Router Tutorial</h2>
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/Login'}>Login</Link></li>
                    </ul>
                    <hr />

                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/Login' component={Login} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default RouterApp;