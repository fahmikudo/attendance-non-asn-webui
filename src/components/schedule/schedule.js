import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables-bitozen";
import LoadingBar from "react-top-loading-bar";
import PopUp from "../../pages/PopUpAlert";
import FormSchedule from "./formschedule";
import api from "../../services/Api";

let ct = require("../../modules/custom/customTable")

class Schedule extends Component {
    constructor() {
        super()
        this.state = {
            clEditAble: '',
            editAble: false,
            rawData: [],
            dataTable: [],
            rawDataRoom: [],
            createVisible: false,
            editVisible: false,
            table_limit: 100,
            table_page: 0,
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    opEditAble = () => {
        if (this.state.editAble === false) {
            this.setState({
                clEditAble: 'edit-able',
                editAble: true,
            })
        } else {
            this.setState({
                clEditAble: '',
                editAble: false,
            })
        }
    }

    openCreateForm = () => {
        this.setState({ createVisible: !this.state.createVisible })
    };

    openEditForm = (index = null) => {
        this.setState({ editVisible: !this.state.editVisible, selectedIndex: index })
    };
 
    openDeletePopup = (index) => {
        this.setState({ deletePopUpVisible: !this.state.deletePopUpVisible, selectedIndex: index })
    };

    startFetch = () => {
        this.LoadingBar.continousStart()
    }

    onFinishFetch = () => {
        if (typeof this.LoadingBar === "object") this.LoadingBar.complete()
    }

    componentDidMount() {
        this.startFetch();
        this.getData(this.state.table_limit, this.state.table_page);
        this.getDataRoom(this.state.table_limit, this.state.table_page);
    }

    handleDelete = async () => {
        let payload = {
            "id": this.state.rawData[this.state.selectedIndex].id,
        }
        // console.info('payload ==> ', payload)
        let response = await api.create('SCHEDULE').deleteSchedule(payload.id)
        if (response.ok && response.status === 200) {
            this.setState({ deletePopUpVisible: false })
            this.getData(this.state.table_limit, this.state.table_page)
        } else {
            if (response.data && response.data.message) alert(response.data.message)
        }
    }

    handleSubmit = async (data) => {
        let payload = {
            ...data
        }

        // console.log(payload)

        let response = await api.create('SCHEDULE').postSchedule(payload)
        if (response.ok && response.status === 200) {
            this.setState({ createVisible: false, editVisible: false })
            this.getData(this.state.table_limit, this.state.table_page)
        } else {
            if (response.data && response.data.message) alert(response.data.message)
        }
    }

    getMuiTheme = () => createMuiTheme(ct.customTable());

    options = ct.customOptions()

    async getData(limit, number) {
        let param = {
            pageLimit: limit,
            pageNumber: number
        }

        let response = await api.create('SCHEDULE').getAllPagingSchedule(param)
        if (response.status === 200) {
            let dataTable = response.data.map((value, index) => {
                let { shift, startTime, endTime, employee, room } = value
                return [
                    index += (1 + (this.state.table_page * this.state.table_limit)),
                    employee.firstName + ' ' + employee.lastName,
                    room.roomName,
                    shift,
                    startTime,
                    endTime
                ]
            })
            this.setState({
                rawData: response.data,
                dataTable
            })
            this.onFinishFetch()
        } else {
            this.onFinishFetch()
        }
    }

    async getDataRoom(limit, number) {
        let param = {
            pageLimit: limit,
            pageNumber: number
        }

        let response = await api.create('ROOM').getAllPagingRoom(param)
        if (response.status === 200) {
            this.setState({
                rawDataRoom: response.data
            })
            this.onFinishFetch()
        } else {
            this.onFinishFetch()
        }
    }

    // async getDataEmployee(limit, number) {
    //     let param = {
    //         pageLimit: limit,
    //         pageNumber: number
    //     }

    //     let response = await api.create('EMPLOYEE').getAllPagingRoom(param)
    //     if (response.status === 200) {
    //         let dataTableRoom = response.data.map((value, index) => {
    //             let { id } = value
    //             return [
    //                 index += (1 + (this.state.table_page * this.state.table_limit)),
    //             ]
    //         })
    //         this.setState({
    //             rawDataRoom: response.data,
    //             dataTableRoom
    //         })
    //         this.onFinishFetch()
    //     } else {
    //         this.onFinishFetch()
    //     }
    // }

    columns = [
        "No",
        "Nama Pegawai",
        "Nama Ruangan",
        "Shift",
        "Jam Masuk",
        "Jam Pulang",
        {
            name: "Action",
            options: {
                customBodyRender: (val, tableMeta) => {
                    return (
                        <div className="display-flex-normal">
                            <button
                                className="btn btn-green btn-small-circle"
                                style={{ marginRight: 5 }}
                                onClick={() =>
                                    this.openEditForm(tableMeta.rowIndex)
                                }
                            >
                                <i className="fa fa-lw fa-pencil-alt" />
                            </button>
                            <button
                                className="btn btn-red btn-small-circle"
                                onClick={() => this.openDeletePopup(tableMeta.rowIndex)}>
                                <i className="fa fa-lw fa-trash-alt" />
                            </button>
                        </div>
                    )
                }
            }
        }
    ]

    render() {
        return (
            <div className="main-content">
                <LoadingBar onRef={ref => (this.LoadingBar = ref)} />
                <div className="padding-5px">
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={"Jadwal"}
                            data={this.state.dataTable}
                            columns={this.columns}
                            options={this.options}
                            buttonCreate={true}
                            onCreate={this.openCreateForm.bind(this)}
                        />
                    </MuiThemeProvider>
                </div>
                {this.state.createVisible && (
                    <FormSchedule
                        type={"create"}
                        payloadRoom={this.state.rawDataRoom}
                        onClickClose={this.openCreateForm}
                        onSave={this.handleSubmit.bind(this)}
                    />
                )}
                {this.state.editVisible && (
                    <FormSchedule
                        type={"update"}
                        payload={this.state.rawData[this.state.selectedIndex]}
                        payloadRoom={this.state.rawDataRoom}
                        onClickClose={this.openEditForm}
                        onSave={this.handleSubmit.bind(this)}
                    />
                )}
                {this.state.deletePopUpVisible && (
                    <PopUp
                        type={"delete"}
                        class={"app-popup app-popup-show"}
                        onClickDelete={this.handleDelete}
                        onClick={this.openDeletePopup}
                    />
                )}
            </div>
        );
    }
}

export default Schedule