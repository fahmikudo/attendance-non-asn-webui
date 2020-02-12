import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables-bitozen";
import TimePicker from "../../modules/popup/Time";

let ct = require("../../modules/custom/customTable");

let defaultPayload = {
    "description": "",
    "employee": {
        "id": 1
    },
    "endTime": "",
    "id": "",
    "room": {
        "id": ""
    },
    "shift": "",
    "startTime": ""
  }


class FormSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataDetail: props.payload 
                ? props.payload
                : defaultPayload,
            dataRoom: props.payloadRoom ? props.payloadRoom : [],
            dataTableRoom: [],
            visibleChooseRoom: false,
            visibleChooseEmployee: false,
        }
    }

    getMuiTheme = () => createMuiTheme(ct.customTable())
    options = ct.customOptions()

    columns = [
        "No",
        "ID",
        "Nama Ruangan",
        {
            name: "Action",
            options: {
                customBodyRender: (val, tableMeta) => {
                    return (
                        <div className="display-flex-normal">
                            <button
                                className="btn btn-green btn-small-circle"
                                onClick={() =>
                                    this.handleChooseRoom(tableMeta)
                                }
                            >
                                <i className="fa fa-lw fa-plus" />
                            </button>
                        </div>
                    )
                }
            }
        }
    ]

    componentDidMount() {
        console.log(this.props.payloadRoom)

        if (this.props.payloadRoom) {
            let dataTableRoom = this.props.payloadRoom.map((value, index) => {
                let {id, roomName} = value
                return [
                    index += 1,
                    id,
                    roomName
                ]
            })

            this.setState({dataTableRoom})
        }
    }

    handleChooseRoom = (data) => {
        this.setState({
            dataDetail: {
                ...this.state.dataDetail,
                room: {
                    id: data.rowData[1],
                }
            }
        })
        this.opChooseRoom()
    }

    opChooseRoom = () => {
        this.setState({visibleChooseRoom: !this.state.visibleChooseRoom})
    }

    opChooseEmployee = () => {
        this.setState({visibleChooseEmployee: !this.state.visibleChooseEmployee})
    }

    renderChooseRoom () {
        return (
            <div className={"app-popup app-popup-show"}>
                <div className="padding-top-20px" />
                <div className="popup-content-small background-white border-radius">

                    <div className="padding-15px background-green grid grid-2x">
                        <div className="col-1">
                            <div className="txt-site txt-12 txt-bold post-center">
                                Pilih Ruangan
                            </div>
                        </div>
                        <div className="col-2 content-right">
                            <button
                                className="btn btn-circle background-green"
                                onClick={this.opChooseRoom}
                            >
                                <i className="fa fa-lg fa-times" />
                            </button>
                        </div>
                    </div>

                    <div className="padding-15px">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                                title={"Ruangan"}
                                data={this.state.dataTableRoom}
                                columns={this.columns}
                                options={this.options}
                            />
                        </MuiThemeProvider>
                    </div>

                    <div className="padding-15px border-top">
                        <div className="grid grid-2x">
                            <div className="col-1" />
                            <div className="col-2 content-right">
                                <button
                                    style={{ marginLeft: "15px" }}
                                    className="btn btn-white"
                                    type="button"
                                    onClick={this.opChooseRoom}
                                >
                                    <span>CLOSE</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderChooseEmployee () {
        return (
            <div className={"app-popup app-popup-show"}>
                <div className="padding-top-20px" />
                <div className="popup-content-small background-white border-radius">

                    <div className="padding-15px background-green grid grid-2x">
                        <div className="col-1">
                            <div className="txt-site txt-12 txt-bold post-center">
                                Pilih Pegawai
                            </div>
                        </div>
                        <div className="col-2 content-right">
                            <button
                                className="btn btn-circle background-green"
                                onClick={this.opChooseEmployee}
                            >
                                <i className="fa fa-lg fa-times" />
                            </button>
                        </div>
                    </div>

                    <div className="padding-15px"></div>

                    <div className="padding-15px border-top">
                        <div className="grid grid-2x">
                            <div className="col-1" />
                            <div className="col-2 content-right">
                                <button
                                    style={{ marginLeft: "15px" }}
                                    className="btn btn-white"
                                    type="button"
                                    onClick={this.opChooseEmployee}
                                >
                                    <span>CLOSE</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderDetail() {
        let {dataDetail} = this.state
        return (
            <div className={"app-popup app-popup-show"}>
                <div className="padding-top-20px" />
                <div className="popup-content-small background-white border-radius">
                    <div className="padding-15px background-green grid grid-2x">
                        <div className="col-1">
                            <div className="txt-site txt-12 txt-bold post-center">
                                {this.props.type === "create"
                                    ? "Tambah - Jadwal"
                                    : this.props.type === "update"
                                        ? "Edit - Jadwal"
                                        : "View - Jadwal"}
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
                        <div className="border-bottom padding-15px grid-mobile-none gap-20px">
                            <div className="margin-bottom-15px">
                                <div className="margin-5px">
                                    <span className="txt-site txt-11 txt-main txt-bold">
                                        Pilih Ruangan
                                    </span>
                                </div>
                                <div className="card-date-picker">
                                    <div className="double">
                                        <div className="input">
                                            <input
                                                style={{ backgroundColor: "#E6E6E6" }}
                                                type="text"
                                                className="ip"
                                                readOnly
                                                value={dataDetail.room.id}
                                            />
                                        </div>
                                        <button 
                                            type="button" 
                                            className="btn btn-grey border-left btn-no-radius" 
                                            onClick={this.opChooseRoom}>
                                            <i className="fa fa-lg fa-search" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="margin-bottom-15px">
                                <div className="margin-5px">
                                    <span className="txt-site txt-11 txt-main txt-bold">
                                        Pilih Pegawai
                                    </span>
                                </div>
                                <div className="card-date-picker">
                                    <div className="double">
                                        <div className="input">
                                            <input
                                                style={{ backgroundColor: "#E6E6E6" }}
                                                type="text"
                                                className="ip"
                                                readOnly
                                                value={dataDetail.employee.id}
                                            />
                                        </div>
                                        <button 
                                            type="button" 
                                            className="btn btn-grey border-left btn-no-radius" 
                                            onClick={this.opChooseEmployee}>
                                            <i className="fa fa-lg fa-search" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="margin-bottom-15px">
                                <div className="margin-5px">
                                    <span className="txt-site txt-11 txt-main txt-bold">
                                        Shift
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
                                                shift: e.target.value
                                            }
                                        })
                                    }}
                                    value={dataDetail.shift}
                                />
                            </div>
                            <div className="margin-bottom-15px">
                                <div className="margin-5px">
                                    <span className="txt-site txt-11 txt-main txt-bold">
                                        Deskripsi
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
                                                description: e.target.value
                                            }
                                        })
                                    }}
                                    value={dataDetail.description}
                                />
                            </div>
                            <div className="margin-bottom-20px">
                                <div className="margin-5px">
                                    <div className="txt-site txt-11 txt-main txt-bold">
                                        <h4>
                                            Start Time <span style={{ color: "red" }}>*</span>
                                        </h4>
                                    </div>
                                </div>
                                <TimePicker 
                                    time={dataDetail.startTime} 
                                    onChange={(e) => this.setState({
                                        dataDetail: {
                                            ...this.state.dataDetail,
                                            startTime: e
                                        }
                                    })} />
                            </div>
                            <div className="margin-bottom-20px">
                                <div className="margin-5px">
                                    <div className="txt-site txt-11 txt-main txt-bold">
                                        <h4>
                                            End Time <span style={{ color: "red" }}>*</span>
                                        </h4>
                                    </div>
                                </div>
                                <TimePicker 
                                    time={dataDetail.endTime} 
                                    onChange={(e) => this.setState({
                                        dataDetail: {
                                            ...this.state.dataDetail,
                                            endTime: e
                                        }
                                    })} />
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
                <div className="padding-bottom-20px" />
            </div>
        )
    }


    render() {
        return (
           <div>
               { this.renderDetail() }

               { this.state.visibleChooseRoom && this.renderChooseRoom() }

               { this.state.visibleChooseEmployee && this.renderChooseEmployee() }
           </div>
        );
    }

}

export default FormSchedule;