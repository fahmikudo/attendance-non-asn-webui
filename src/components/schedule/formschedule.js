import React, { Component } from "react";
import TimePicker from "../../modules/popup/Time";


class FormSchedule extends Component {
    constructor(props) {
        super(props)
    }
    render() {
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
                    <form action="#">
                        <div className="border-bottom padding-15px grid-mobile-none gap-20px">
                            <div className="margin-bottom-15px">
                                <div className="margin-5px">
                                    <span className="txt-site txt-11 txt-main txt-bold">
                                        Pilih Ruangan
                                    </span>
                                </div>
                                <input
                                    style={{ backgroundColor: "#E6E6E6", padding: 12, width: '85%' }}
                                    className='txt txt-sekunder-color'
                                    type="text"
                                    placeholder=""
                                    required
                                    readOnly
                                />
                                <button
                                    type="button"
                                    className="btn btn-grey border-left btn-no-radius"
                                >
                                    <i className="fa fa-lg fa-search"></i>
                                </button>
                            </div>
                            <div className="margin-bottom-15px">
                                <div className="margin-5px">
                                    <span className="txt-site txt-11 txt-main txt-bold">
                                        Pilih Pegawai
                                    </span>
                                </div>
                                <input
                                    style={{ backgroundColor: "#E6E6E6", padding: 12, width: '85%' }}
                                    className='txt txt-sekunder-color'
                                    type="text"
                                    placeholder=""
                                    required
                                    readOnly
                                />
                                <button
                                    type="button"
                                    className="btn btn-grey border-left btn-no-radius"
                                >
                                    <i className="fa fa-lg fa-search"></i>
                                </button>
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
                                <TimePicker/>
                            </div>
                            <div className="margin-bottom-20px">
                                <div className="margin-5px">
                                    <div className="txt-site txt-11 txt-main txt-bold">
                                        <h4>
                                            End Time <span style={{ color: "red" }}>*</span>
                                        </h4>
                                    </div>
                                </div>
                                <TimePicker/>
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
                                            type="button"
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
        );
    }

}

export default FormSchedule;