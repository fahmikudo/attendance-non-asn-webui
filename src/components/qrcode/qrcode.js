import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter, Redirect, NavLink } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import QRCode from 'qrcode.react';
import uuid from 'uuid';


class QrCode extends Component {

    constructor(){
        super()
        this.state = {
            uuid: 'RSUD#' + uuid.v4(),
            times: 15,
        }
    }

    componentWillMount(){
        this.getData()
    }

    getData() {
        let me =this,times;
        setTimeout(() => {
            times = me.state.times - 1
            this.setState({ times })
            if (times === 0) {
                // this.setState({ uuid: 'RSUD#' + uuid.v4(), times: 15 })
                this.refreshQRCode();
            }
            this.getData()
        }, 1000)
    }

    refreshQRCode() {
        this.setState({ uuid: 'RSUD#' + uuid.v4(), times: 15 })
    }

    render() {
        return (
            <HashRouter history={Router.browserHistory}>
                <div className="main-content">
                    <LoadingBar onRef={ref => (this.LoadingBar = ref)} />
                    <div className="app-login background-green">
                        <div class="login-content background-white">
                            <div class="padding-20px">
                                <h1 class="txt-site txt-20 txt-center txt-main txt-bold">
                                    Scan QR Code Disini Untuk Kehadiran
                                </h1>
                                <div class="padding-10px"></div>
                                <div style={{position: 'relative', width:'250px', margin: 'auto'}}>
                                    <QRCode value={this.state.uuid} level="Q" size={256} />
                                </div>
                            </div>
                            <div class="padding-10px"></div>
                            <div class="txt-site txt-13 txt-center txt-main txt-bold">
                                { this.state.times }
                            </div>
                            <div style={{textAlign: 'center', marginTop: '20px'}}>
                                <button onClick={()=> this.refreshQRCode()} type="button" class="btn btn-primary">
                                    Refresh QR Code Manual
                                </button>
                            </div>
                            <div class="padding-10px"></div>
                        </div>
                    </div>
                </div>
            </HashRouter >
        )
    }

}

export default QrCode