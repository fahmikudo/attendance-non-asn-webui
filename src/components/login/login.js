import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter, Redirect, NavLink } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import logo from './../../assets/img/logo.jpg';


class Login extends Component {
    render() {
        return (
            <HashRouter history={Router.browserHistory}>
                <div className="main-content">
                    <LoadingBar onRef={ref => (this.LoadingBar = ref)} />
                    <div className="app-login background-green">
                        <div className="login-small">
                            <div className="logo-faded">
                                <div
                                    className="image image-circle background-white border-all"
                                    style={{ margin: "auto" }}>
                                    <img src={logo} alt=""></img>
                                </div>
                            </div>

                            <div className="margin-10px grid grid-2x">
                                <div className="col-1">
                                    <div className="txt-site txt-16 txt-bold txt-main">
                                        Sign In
                                </div>
                                </div>
                            </div>

                            <form onSubmit={this.handleSubmit}>
                                <div className="margin-15px">
                                    <div className="margin-bottom-5px txt-site txt-10 txt-main txt-bold">
                                        Username
                                    </div>
                                    <input
                                        type="text"
                                        className="txt txt-sekunder-color"

                                        onChange={this.handleChangeUsername}
                                        required></input>
                                </div>
                                <div className="margin-15px">
                                    <div className="margin-bottom-5px txt-site txt-10 txt-main txt-bold">
                                        Password
                                    </div>
                                    <input
                                        type="password"
                                        className="txt txt-sekunder-color"

                                        onChange={this.handleChangePassword}
                                        required></input>
                                </div>
                                <div className="margin-15px">
                                    <NavLink to="/home">
                                        <input
                                            type="submit"
                                            value="Sign In"
                                            className="btn btn-width-all background-green"></input>
                                    </NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </HashRouter>
        )
    }

}

export default Login