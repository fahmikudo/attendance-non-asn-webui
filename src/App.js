import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink, HashRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './components/login/login'
import QrCode from './components/qrcode/qrcode'
import Home from './components/dashboard/home'
import ProfilePopup from './modules/popup/Profile'
import './App.css';
import Position from './components/position/position'
import Room from './components/room/room'
import Schedule from './components/schedule/schedule'

// icon
let angle = 'fa fa-lg fa-angle-right'

// sub menu
let opSubMenu = 'app-menu app-submenu-themes app-submenu'

let opMenu = 'list'

class App extends Component {

  constructor() {

    super()
    this.state = {
      appClass: 'app', //app-side-big-icon
      appButtonClass: 'fa fa-lg fa-bars',
      travelClass: opMenu,
      travelSubmenu: opSubMenu,
      travelMoreIcon: angle,
      timeClass: opMenu,
      timeSubmenu: opSubMenu,
      timeMoreIcon: angle,
      leaveClass: opMenu,
      leaveSubmenu: opSubMenu,
      leaveMoreIcon: angle,
      overtimeClass: opMenu,
      overtimeSubmenu: opSubMenu,
      overtimeMoreIcon: angle,
      employeeClass: opMenu,
      employeeSubmenu: opSubMenu,
      employeeMoreIcon: angle,
    }

  }

  render() {
    return (
      <HashRouter history={Router.browserHistory}>
         
        <div>
          {/* Single Page */}
          <div className="app">
            <Route exact path="/" component={Login} />
          </div>
          <div className="app">
            <Route exact path="/qrcode" component={QrCode} />
          </div>

          {/* Multiple Page */}
          <div className={this.state.appClass}>
            <div className="app-slide">
              <div className="slide-content background-green">
                <div className="app-title">
                  <div className="col-1">
                    <h1 className="txt-site txt-white txt-upp txt-18 txt-bold post-center margin-left-10px">
                      ATTENDANCE
                    </h1>
                  </div>
                  <div className="col-2">
                    <button
                      className="btn btn-grey btn-circle"
                      onClick={this.opSlide}>
                      <i className={this.state.appButtonClass} />
                    </button>
                  </div>
                </div>
                {/* menu */}
                <div className="slide-list change-scrollbar">
                  <div className="app-space">
                    <input type="radio" name="mainmenu" id="mainmenu-dashboard" />
                    <NavLink to='/home'>
                      <label htmlFor="mainmenu-dashboard" className="list">
                        <span className="app-space-icon">
                          <i className="fa fa-1x fa-home" />
                        </span>
                        <span className="app-space-text">
                          DASHBOARD
                            </span>
                      </label>
                    </NavLink>
                  </div>
                  <div className="app-space">
                    <input type="radio" name="mainmenu" id="mainmenu-position" />
                    <NavLink to='/position'>
                      <label htmlFor="mainmenu-dashboard" className="list">
                        <span className="app-space-icon">
                          <i className="fa fa-1x fa-random" />
                        </span>
                        <span className="app-space-text">
                          JABATAN
                        </span>
                      </label>
                    </NavLink>
                  </div>
                  <div className="app-space">
                    <input type="radio" name="mainmenu" id="mainmenu-schedule" />
                    <NavLink to='/room'>
                      <label htmlFor="mainmenu-dashboard" className="list">
                        <span className="app-space-icon">
                          <i className="fa fa-1x fa-building" />
                        </span>
                        <span className="app-space-text">
                          RUANGAN
                        </span>
                      </label>
                    </NavLink>
                  </div>
                  <div className="app-space">
                    <input type="radio" name="mainmenu" id="mainmenu-room" />
                    <NavLink to='/schedule'>
                      <label htmlFor="mainmenu-dashboard" className="list">
                        <span className="app-space-icon">
                          <i className="fa fa-1x fa-calendar" />
                        </span>
                        <span className="app-space-text">
                          JADWAL
                        </span>
                      </label>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="app-main">
              <div className="app-panel">
                <div className="panel-content">

                  <div className="col-1">
                    <div className="app-mobile">
                      <button className="btn btn-circle btn-primary">
                        <i className="fa fa-lg fa-search" />
                      </button>
                    </div>
                    {/* <div className="app-desktop">
                      <SearchPopup />
                    </div> */}
                  </div>
                  <div className="col-2 content-right">
                    <div className="panel-button">
                      <ProfilePopup />
                    </div>
                  </div>
                </div>
              </div>
              <div className="app-place">
                <Route exact path="/home" component={Home} />
                <Route exact path="/position" component={Position} />
                <Route exact path="/room" component={Room} />
                <Route exact path="/schedule" component={Schedule} />
              </div>
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }

}

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps, null)(App)
