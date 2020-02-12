import React, { Component } from "react";
import CalendarPicker from '../../modules/popup/Calendar'
import M from 'moment'

let defaultPayload = {
    "accountNonExpired": true,
    "accountNonLocked": true,
    "address": "",
    "birthDate": "",
    "birthPlace": "",
    "contactNumber": "",
    "credentialsNonExpired": true,
    "email": "",
    "employeePhotoURL": "",
    "enabled": true,
    "firstName": "",
    "id": "",
    "lastName": "",
    "nik": "",
    "password": "",
    "position": {
        "id": "",
        "positionName": ""
    },
    "role": "ROLE_USER",
    "username": ""
}

class FormEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataDetail: props.payload 
                ? {
                    ...props.payload,
                    // birthDate: props.payload.birthDate ? M(props.payload.birthDate, "DD-MM-YYYY").format("YYYY-MM-DD") : null,
                }
                : defaultPayload
        }
    }

    componentDidMount() {
        console.log('mount', this.state.dataDetail)
    }

    render() {
        let {dataDetail} = this.state
        return (
            <div className={"app-popup app-popup-show"}>
                <div className="padding-top-20px" />
                <div className="popup-content background-white border-radius">
                    <div className="padding-15px background-green grid grid-2x">
                        <div className="col-1">
                            <div className="txt-site txt-12 txt-bold post-center">
                                {this.props.type === "create"
                                    ? "Tambah - Pegawai"
                                    : this.props.type === "update"
                                        ? "Edit - Pegawai"
                                        : "View - Pegawai"}
                            </div>
                        </div>
                        <div className="col-2 content-right">
                            <button
                                className="btn btn-circle background-green"
                                onClick={this.props.onClickClose}
                            >
                                <i className="fa fa-lg fa-times" />
                            </button>
                        </div>
                    </div>

                    <form 
                        action="#" 
                        onSubmit={(e) => { 
                            e.preventDefault() 
                            this.props.onSave(this.state.dataDetail) 
                        }}>
                            
                        <div className="border-bottom padding-15px grid grid-2x grid-mobile-none gap-20px">
                            <div className="col-1">
                                <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            Name Depan
                                        </span>
                                    </div>
                                    <input
                                        readOnly={this.props.type === "view" ? true : false}
                                        style={
                                            this.props.type === "view"
                                                ? { backgroundColor: "#E6E6E6" }
                                                : null
                                        }
                                        type="text"
                                        className="txt txt-sekunder-color"
                                        placeholder=""
                                        required
                                        onChange={(e) => {
                                            this.setState({
                                                dataDetail: {
                                                    ...this.state.dataDetail,
                                                    firstName: e.target.value
                                                }
                                            })
                                        }}
                                        value={dataDetail.firstName}
                                    />
                                </div>
                                <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            Name Belakang
                                        </span>
                                    </div>
                                    <input
                                        readOnly={this.props.type === "view" ? true : false}
                                        style={
                                            this.props.type === "view"
                                                ? { backgroundColor: "#E6E6E6" }
                                                : null
                                        }
                                        type="text"
                                        className="txt txt-sekunder-color"
                                        placeholder=""
                                        required
                                        onChange={(e) => {
                                            this.setState({
                                                dataDetail: {
                                                    ...this.state.dataDetail,
                                                    lastName: e.target.value
                                                }
                                            })
                                        }}
                                        value={dataDetail.lastName}
                                    />
                                </div>
                                <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            Tempat Lahir
                                        </span>
                                    </div>
                                    <input
                                        readOnly={this.props.type === "view" ? true : false}
                                        style={
                                            this.props.type === "view"
                                                ? { backgroundColor: "#E6E6E6" }
                                                : null
                                        }
                                        type="text"
                                        className="txt txt-sekunder-color"
                                        placeholder=""
                                        required
                                        onChange={(e) => {
                                            this.setState({
                                                dataDetail: {
                                                    ...this.state.dataDetail,
                                                    birthPlace: e.target.value
                                                }
                                            })
                                        }}
                                        value={dataDetail.birthPlace}
                                    />
                                </div>
                                <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            Tanggal Lahir
                                        </span>
                                    </div>
                                    <CalendarPicker
                                        date={dataDetail.birthDate}
                                        disabled={this.props.type === 'view' ? true : false}
                                        onChange={e => this.setState({
                                            dataDetail: {
                                                ...this.state.dataDetail,
                                                birthDate: e
                                            }
                                        })} />
                                </div>
                                <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            Username
                                        </span>
                                    </div>
                                    <input
                                        readOnly={this.props.type === "view" ? true : false}
                                        style={
                                            this.props.type === "view"
                                                ? { backgroundColor: "#E6E6E6" }
                                                : null
                                        }
                                        type="text"
                                        className="txt txt-sekunder-color"
                                        placeholder=""
                                        required
                                        onChange={(e) => {
                                            this.setState({
                                                dataDetail: {
                                                    ...this.state.dataDetail,
                                                    username: e.target.value
                                                }
                                            })
                                        }}
                                        value={dataDetail.username}
                                    />
                                </div>
                                <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            Password
                                        </span>
                                    </div>
                                    <input
                                        readOnly={this.props.type === "view" ? true : false}
                                        style={
                                            this.props.type === "view"
                                                ? { backgroundColor: "#E6E6E6" }
                                                : null
                                        }
                                        type="text"
                                        className="txt txt-sekunder-color"
                                        placeholder=""
                                        required
                                        onChange={(e) => {
                                            this.setState({
                                                dataDetail: {
                                                    ...this.state.dataDetail,
                                                    password: e.target.value
                                                }
                                            })
                                        }}
                                        value={dataDetail.password}
                                    />
                                </div>
                            </div>


                            <div className="col-2">
                                <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            Role
                                        </span>
                                    </div>
                                    <input
                                        readOnly={this.props.type === "view" ? true : false}
                                        style={
                                            this.props.type === "view"
                                                ? { backgroundColor: "#E6E6E6" }
                                                : null
                                        }
                                        type="text"
                                        className="txt txt-sekunder-color"
                                        placeholder=""
                                        required
                                        onChange={(e) => {
                                            this.setState({
                                                dataDetail: {
                                                    ...this.state.dataDetail,
                                                    role: e.target.value
                                                }
                                            })
                                        }}
                                        value={dataDetail.role}
                                    />
                                </div>
                                <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            Alamat
                                        </span>
                                    </div>
                                    <input
                                        readOnly={this.props.type === "view" ? true : false}
                                        style={
                                            this.props.type === "view"
                                                ? { backgroundColor: "#E6E6E6" }
                                                : null
                                        }
                                        type="text"
                                        className="txt txt-sekunder-color"
                                        placeholder=""
                                        required
                                        onChange={(e) => {
                                            this.setState({
                                                dataDetail: {
                                                    ...this.state.dataDetail,
                                                    address: e.target.value
                                                }
                                            })
                                        }}
                                        value={dataDetail.address}
                                    />
                                </div>
                                <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            Nomor Telpon
                                        </span>
                                    </div>
                                    <input
                                        readOnly={this.props.type === "view" ? true : false}
                                        style={
                                            this.props.type === "view"
                                                ? { backgroundColor: "#E6E6E6" }
                                                : null
                                        }
                                        type="text"
                                        className="txt txt-sekunder-color"
                                        placeholder=""
                                        required
                                        onChange={(e) => {
                                            this.setState({
                                                dataDetail: {
                                                    ...this.state.dataDetail,
                                                    contactNumber: e.target.value
                                                }
                                            })
                                        }}
                                        value={dataDetail.contactNumber}
                                    />
                                </div>
                                <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            Email
                                        </span>
                                    </div>
                                    <input
                                        readOnly={this.props.type === "view" ? true : false}
                                        style={
                                            this.props.type === "view"
                                                ? { backgroundColor: "#E6E6E6" }
                                                : null
                                        }
                                        type="email"
                                        className="txt txt-sekunder-color"
                                        placeholder=""
                                        required
                                        onChange={(e) => {
                                            this.setState({
                                                dataDetail: {
                                                    ...this.state.dataDetail,
                                                    email: e.target.value
                                                }
                                            })
                                        }}
                                        value={dataDetail.email}
                                    />
                                </div>
                                <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            NIK
                                        </span>
                                    </div>
                                    <input
                                        readOnly={this.props.type === "view" ? true : false}
                                        style={
                                            this.props.type === "view"
                                                ? { backgroundColor: "#E6E6E6" }
                                                : null
                                        }
                                        type="number"
                                        className="txt txt-sekunder-color"
                                        placeholder=""
                                        required
                                        onChange={(e) => {
                                            this.setState({
                                                dataDetail: {
                                                    ...this.state.dataDetail,
                                                    nik: e.target.value
                                                }
                                            })
                                        }}
                                        value={dataDetail.nik}
                                    />
                                </div>
                                {this.props.type === "edit" ? <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            Upload foto
                                        </span>
                                    </div>
                                    <input
                                        readOnly={this.props.type === "view" ? true : false}
                                        style={
                                            this.props.type === "view"
                                                ? { backgroundColor: "#E6E6E6" }
                                                : null
                                        }
                                        type="text"
                                        className="txt txt-sekunder-color"
                                        placeholder=""
                                        required
                                        onChange={(e) => {
                                            this.setState({
                                                dataDetail: {
                                                    ...this.state.dataDetail,
                                                    employeePhotoURL: e.target.value
                                                }
                                            })
                                        }}
                                        value={dataDetail.employeePhotoURL}
                                    />
                                </div> : null}
                            </div>
                        </div>

                        <div className="padding-15px">
                            <div className="grid grid-2x">
                                <div className="col-1" />
                                <div className="col-2 content-right">
                                    {this.props.type !== "view" ? (
                                        <button
                                            style={{ marginLeft: "15px" }}
                                            className="btn btn-green"
                                            type="submit"
                                        >
                                            <span>SAVE</span>
                                        </button>
                                    ) : null}
                                    <button
                                        style={{ marginLeft: "15px" }}
                                        className="btn btn-white"
                                        type="button"
                                        onClick={this.props.onClickClose}
                                    >
                                        <span>CLOSE</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
                <div className="padding-top-20px" />
            </div>
        )
    }
}

export default FormEmployee