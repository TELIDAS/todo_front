import './App.css';
import {Component} from "react";
import {Switch, Route} from 'react-router-dom';
import Main from './Components/Modal/index';
import Register from './Container/Register.js'
import Login from './Container/Login'


class App extends Component {
    render() {
        return (
            <div className="App">
                    <Switch>
                        <Route exact path='/' component={Main}/>
                        <Route path='/register' component={Register}/>
                        <Route path='/login' component={Login}/>
                    </Switch>
            </div>
        );
    }
}

export default App;
