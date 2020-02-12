import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables-bitozen";
import LoadingBar from "react-top-loading-bar";
import PopUp from "../../pages/PopUpAlert";
import api from "../../services/Api";
import FormEmployee from "./formEmployee";
import M from 'moment';

let ct = require("../../modules/custom/customTable")

class Employee extends Component {
    constructor() {
        super()
        this.state = {
            rawData: [],
            dataTable: [],
            deletePopUpVisible: false,
            createVisible: false,
            editVisible: false,
            deletePopUpVisible: false,
            selectedIndex: 0,
            limit: 5,
            number: 0
        }
    }

    componentDidMount() {
        this.startFetch()
        this.getData(this.state.limit, this.state.number)
    }

    async getData(limit, number) {
        let params = {
            pageLimit: limit,
            pageNumber: number
        }

        let response = await api.create('EMPLOYEE').getAllEmployee(params)
        if (response.status == 200) {
            let dataTable = response.data.map((value, index) => {
                let {id, nik, firstName, lastName, email, contactNumber, address} = value
                return [
                    index += 1,
                    id,
                    nik,
                    firstName + ' ' + lastName,
                    email,
                    contactNumber,
                    address
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
    }

    handleSubmit = async (data) => {
        let payload = {
            ...data,
            birthDate: M(data.birthDate).format("YYYY-MM-DD")
        }
        let response = api.create('EMPLOYEE').postEmployee(payload)
        if (response.ok && response.status === 200) {
            this.setState({ createVisible: false, editVisible: false })
            this.getData(this.state.limit, this.state.number)
        } else {
            if (response.data && response.data.message) alert(response.data.message)
        }
        console.log(response)
    }

    handleUpdate = async (data) => {
        let payload = {
            ...data,
            birthDate: M(data.birthDate).format("YYYY-MM-DD")
        }
        let response = api.create('EMPLOYEE').putEmployee(payload)
        if (response.ok && response.status === 200) {
            this.setState({ createVisible: false, editVisible: false })
            this.getData(this.state.limit, this.state.number)
        } else {
            if (response.data && response.data.message) alert(response.data.message)
        }
        console.log(response)
    }

    handleDelete = async (data) => {
        let payload = {
            "id": this.state.rawData[this.state.selectedIndex].id,
        }
        let response = await api.create('EMPLOYEE').deleteEmployee(payload.id)
        if (response.ok && response.status === 200) {
            this.setState({ deletePopUpVisible: false })
            this.getData(this.state.limit, this.state.number)
        } else {
            if (response.data && response.data.message) alert(response.data.message)
        }
        console.log(payload)
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

    getMuiTheme = () => createMuiTheme(ct.customTable());

    options = ct.customOptions()

    columns = [
        "No",
        "ID",
        "NIK",
        "Nama",
        "Email",
        "No. Telpon",
        "Alamat",
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
                            title={"Pegawai"}
                            data={this.state.dataTable}
                            columns={this.columns}
                            options={this.options}
                            buttonCreate={true}
                            onCreate={this.openCreateForm.bind(this)}
                        />
                    </MuiThemeProvider>
                </div>

                {this.state.createVisible && (
                    <FormEmployee
                        type={"create"}
                        onClickClose={this.openCreateForm}
                        onSave={this.handleSubmit.bind(this)}
                    />
                )}
                {this.state.editVisible && (
                    <FormEmployee
                        type={"update"}
                        payload={this.state.rawData[this.state.selectedIndex]}
                        onClickClose={this.openEditForm}
                        onSave={this.handleUpdate.bind(this)}
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
        )
    }
}

export default Employee