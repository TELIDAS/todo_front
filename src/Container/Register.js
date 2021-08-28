import React, {Component} from 'react';
import './styles.css'
import {connect} from 'react-redux'
import { register } from "../store/actions/loginActions";
import {NavLink} from "react-router-dom";


class Register extends Component {
    state = {
        username: '',
        email: '',
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

    registerHandler = async () => {
        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        await this.props.register(user)
    }

    render() {
        return (
            <div className="register">
                <div className="container">
                    <div>

                        <input
                            type="email"
                            name='email'
                            onChange={(e) => this.inputHandler(e)}
                            placeholder='Email'
                        />
                        <input
                            type="text"
                            name='username'
                            onChange={(e) => this.inputHandler(e)}
                            placeholder='Username'
                        />
                        <input
                            type="password"
                            name='password'
                            onChange={(e) => this.inputHandler(e)}
                            placeholder='password'
                        />
                    </div>
                    <button onClick={this.registerHandler}>Register</button>
                    <p>
                        <NavLink to='/login'>
                            Already register? Login
                        </NavLink>
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    history: state.history,
})

const mapDispatchToProps = (dispatch) => ({
    register: (user) => dispatch(register(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);