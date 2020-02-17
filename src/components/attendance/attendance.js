import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables-bitozen";
import LoadingBar from "react-top-loading-bar";
import PopUp from "../../pages/PopUpAlert";
import api from "../../services/Api";
import M from 'moment';

let ct = require("../../modules/custom/customTable")

class Attendance extends Component {
    constructor() {
        super()
        this.state = {
            rawData: [],
            dataTable: [],
            deletePopUpVisible: false,
            selectedIndex: 0,
            limit: 5,
            number: 0,
            table_query: "",
            positionCount: 0
        }
    }

    componentDidMount() {
        this.getData(this.state.limit, this.state.number)
        this.getCountData()
    }

    async getCountData() {

        let param = {
            pageLimit: 1000,
            pageNumber: 0
        }

        let response = await api.create('EMPLOYEE').getAllAttendance(param)
        if (response.status === 200) {
            this.setState({
                positionCount: response.data.length
            })
        }

        console.log(response)
    }

    async getData(limit, number) {
        let params = {
            pageLimit: limit,
            pageNumber: number
        }

        let response = await api.create('ATTENDANCE').getAllPagingAttendance(params)
        if (response.status == 200) {
            let dataTable = response.data.map((value, index) => {
                let {id,attendanceDate, employee, attendanceStatus, description, checkin, checkout} = value
                return [
                    index += 1,
                    id,
                    employee.firstName + ' ' + employee.lastName,
                    attendanceDate,
                    attendanceStatus,
                    description,
                    checkin,
                    checkout
                ]
            })
            this.setState({
                rawData: response.data,
                dataTable
            })
            this.onFinishFetch()
            // console.log('succ', response)
        } else {
            if (response.data && response.data.message) alert(response.data.message)
            this.onFinishFetch()
        }
        console.log(response)
    }

    openDeletePopup = (index) => {
        this.setState({ deletePopUpVisible: !this.state.deletePopUpVisible, selectedIndex: index })
    };

    startFetch = () => {
        this.LoadingBar.continousStart()
    }

    onFinishFetch = () => {
        if (typeof this.LoadingBar === "object") this.LoadingBar.complete()
    }

    getMuiTheme = () => createMuiTheme(ct.customTable());

    options = ct.customOptions()

    columns = [
        "No",
        "ID",
        "Nama",
        "Tanggal Absen",
        "Status Absen",
        "Deskripsi",
        "Check In",
        "Check Out"
        // {
        //     name: "Action",
        //     options: {
        //         customBodyRender: (val, tableMeta) => {
        //             return (
        //                 <div className="display-flex-normal">
        //                     <button
        //                         className="btn btn-green btn-small-circle"
        //                         style={{ marginRight: 5 }}
        //                         onClick={() => alert('ahuy')}
        //                     >
        //                         <i className="fa fa-lw fa-pencil-alt" />
        //                     </button>
        //                     <button
        //                         className="btn btn-red btn-small-circle"
        //                         onClick={() => this.openDeletePopup(tableMeta.rowIndex)}>
        //                         <i className="fa fa-lw fa-trash-alt" />
        //                     </button>
        //                 </div>
        //             )
        //         }
        //     }
        // }
    ]

    render() {
        let {positionCount, table_query} = this.state
        let tableOptions = {
            ...this.options,
            serverSide: true,
            count: positionCount,
            searchText: table_query,
            onTableChange: (action, tableState) => {
                switch (action) {
                    case 'changePage':
                        this.setState({ table_page: tableState.page })
                        this.getData(tableState.rowsPerPage, tableState.page);
                        break;
                    case 'changeRowsPerPage':
                        this.setState({ table_limit: tableState.rowsPerPage })
                        this.getData(tableState.rowsPerPage, tableState.page);
                        break;
                    case 'search':
                        let searchText = tableState.searchText ? tableState.searchText : ""
                        this.setState({ table_query: searchText }, () => {
                            this.getData(tableState.rowsPerPage, tableState.page)
                        })
                        break;
                    default:
                        break;
                }
            }
        }
        return (
            <div className="main-content">
                <LoadingBar onRef={ref => (this.LoadingBar = ref)} />
                <div className="padding-5px">
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={"Absensi"}
                            key={positionCount}
                            data={this.state.dataTable}
                            columns={this.columns}
                            options={tableOptions}
                            // buttonCreate={false}
                            // onCreate={() => {alert('ahuy')}}
                        />
                    </MuiThemeProvider>
                </div>

                {this.state.deletePopUpVisible && (
                    <PopUp
                        type={"delete"}
                        class={"app-popup app-popup-show"}
                        onClickDelete={this.handleDelete}
                        onClick={this.openDeletePopup}
                    />
                )}
            </div>
        )
    }
}

export default Attendance