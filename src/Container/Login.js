import React, {Component} from 'react';
import { login } from "../store/actions/loginActions";
import './login.css'
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    componentDidMount() {
        if(localStorage.getItem('_todo:user')){
            window.location.pathname = '/'
        }
    }

    inputHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    loginHandler = async () => {
        const res = await this.props.login(this.state)
        if(res) {
            window.location.pathname = '/'
        }
    }

    render() {
        return (
            <div className='login'>
                <div className='container'>
                    <div>
                        <input
                            type="text"
                            name="username"
                            placeholder='Username'
                            onChange={(e) => this.inputHandler(e)}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder='Password'
                            onChange={(e) => this.inputHandler(e)}
                        />
                    </div>
                    <button onClick={this.loginHandler}>
                        Login
                    </button>
                    <p>
                        <NavLink to='/register'>
                            Dont have account? Register
                        </NavLink>
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  history: state.history,
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    login: (user) => dispatch(login(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);