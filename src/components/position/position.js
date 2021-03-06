import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables-bitozen";
import LoadingBar from "react-top-loading-bar";
import FormPosition from "./formposition";
import PopUp from "../../pages/PopUpAlert";
import api from "../../services/Api";

let ct = require("../../modules/custom/customTable")
const options = ct.customOptions();

class Position extends Component {
    constructor() {
        super()
        this.state = {
            clEditAble: '',
            editAble: false,
            rawData: [],
            dataTable: [],
            createVisible: false,
            editVisible: false,
            savePopUpVisible: false,
            table_limit: 5,
            table_page: 0,
            table_query: "",
            positionCount: 0,
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

    openSavePopUp = () => {
        this.setState({ savePopUpVisible: !this.state.savePopUpVisible })
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
    }

    handleDelete = async () => {
        this.setState({ deletePopUpVisible: false })
    }

    handleSubmit = async (data) => {
        let payload = {
            "positionName": data
        }
        console.info('payload ==> ', payload)
        let response = await api.create('POSITION').postPosition(payload)
        if (response.ok && response.status === 200) {
            this.openSavePopUp()
            this.getData(this.state.table_limit, this.state.table_page)
        } else {
            if (response.data && response.data.message) alert(response.data.message)
        }
    }

    handleUpdate = async (data) => {
        let payload = {
            "id": this.state.rawData[this.state.selectedIndex].id,
            "positionName": data
        }
        console.info('payload ==> ', payload)
        let response = await api.create('POSITION').postPosition(payload)
        if (response.ok && response.status === 200) {
            this.openSavePopUp()
            this.getData(this.state.table_limit, this.state.table_page)
        } else {
            if (response.data && response.data.message) alert(response.data.message)
        }
    }

    handleDelete = async (data) => {
        let payload = {
            "id": this.state.rawData[this.state.selectedIndex].id,
            "positionName": data
        }
        console.info('payload ==> ', payload)
        let response = await api.create('POSITION').deletePosition(payload.id)
        if (response.ok && response.status === 200) {
            this.setState({ deletePopUpVisible: false })
            this.getData(this.state.table_limit, this.state.table_page)
        } else {
            if (response.data && response.data.message) alert(response.data.message)
        }
    }

    handlePopUp = () => {
        this.getData()
        this.setState({
            savePopUpVisible: false,
            createVisible: false,
            editVisible: false
        })
    }


    getMuiTheme = () => createMuiTheme(ct.customTable());

    options = ct.customOptions()

    async getData(limit, number) {

        let param = {
            pageLimit: limit,
            pageNumber: number
        }

        let response = await api.create('POSITION').getAllPagingPosition(param)
        if (response.status === 200) {
            let dataTable = response.data.map((value, index) => {
                const { positionName } = value;
                return [
                    // index += 1,
                    index += (1 + (this.state.table_page * this.state.table_limit)),
                    positionName
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
        this.getCountData()
        console.log(response)
    }

    async getCountData() {

        let param = {
            pageLimit: 1000,
            pageNumber: 0
        }

        let response = await api.create('POSITION').getAllPagingPosition(param)
        if (response.status === 200) {
            this.setState({
                positionCount: response.data.length
            })
        }
    }

    columns = [
        "No",
        "Nama Jabatan",
        {
            name: "Action",
            options: {
                customBodyRender: (val, tableMeta) => {
                    return (
                        <div>
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
        let { positionCount, table_query } = this.state
        let tableOptions = {
            ...options,
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
                {/* <div className="col-2 content-right">
                    <button
                        type="button"
                        className="btn btn-circle background-green"
                        style={{ marginRight: 5 }}
                        onClick={this.openCreateForm.bind(this)}
                    >
                        <i className="fa fa-1x fa-plus" />
                    </button>
                </div> */}
                <div className="padding-5px">
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={"Jabatan"}
                            key={positionCount}
                            data={this.state.dataTable}
                            columns={this.columns}
                            options={tableOptions}
                            buttonCreate={true}
                            onCreate={this.openCreateForm.bind(this)}
                        />
                    </MuiThemeProvider>
                </div>
                {this.state.createVisible && (
                    <FormPosition
                        type={"create"}
                        onClickClose={this.openCreateForm}
                        onClickSave={this.handleSubmit.bind(this)}
                    />
                )}
                {this.state.editVisible && (
                    <FormPosition
                        type={"update"}
                        data={this.state.rawData[this.state.selectedIndex]}
                        onClickClose={this.openEditForm}
                        onClickSave={this.handleUpdate.bind(this)}
                    />
                )}
                {this.state.savePopUpVisible && (
                    <PopUp
                        type={"save"}
                        class={"app-popup app-popup-show"}
                        onClick={this.handlePopUp.bind(this)}
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

export default Position