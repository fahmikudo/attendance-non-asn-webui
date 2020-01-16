import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables-bitozen";
import LoadingBar from "react-top-loading-bar";
import PopUp from "../../pages/PopUpAlert";
import FormSchedule from "./formschedule";

let ct = require("../../modules/custom/customTable")

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "https://radiant-temple-76163.herokuapp.com/pertamina/";

class Schedule extends Component {
    constructor() {
        super()
        this.state = {
            clEditAble: '',
            editAble: false,
            rawData: [],
            dataTable: [],
            createVisible: false,
            editVisible: false
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
        this.getData();
    }

    handleDelete = async () => {
        this.setState({ deletePopUpVisible: false })
    }


    getMuiTheme = () => createMuiTheme(ct.customTable());

    options = ct.customOptions()

    getData() {
        fetch(proxyurl + url + 'purchase_requisition')
            .then((response) => response.json())
            .then((responseJson) => {
                this.onFinishFetch()
                let dataTable = responseJson.map((value, index) => {
                    const { plant } = value;
                    return [
                        index += 1,
                        plant
                    ]
                })

                this.setState({
                    rawData: responseJson,
                    dataTable
                })
            })
    }

    columns = [
        "No",
        "Nama Ruangan",
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
        return (
            <div className="main-content">
                <LoadingBar onRef={ref => (this.LoadingBar = ref)} />
                <div className="col-2 content-right">
                    <button
                        type="button"
                        className="btn btn-circle background-green"
                        style={{ marginRight: 5 }}
                        onClick={this.openCreateForm.bind(this)}
                    >
                        <i className="fa fa-1x fa-plus" />
                    </button>
                </div>
                <div className="padding-5px">
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={"Jadwal"}
                            data={this.state.dataTable}
                            columns={this.columns}
                            options={this.options}
                        />
                    </MuiThemeProvider>
                </div>
                {this.state.createVisible && (
                    <FormSchedule
                        type={"create"}
                        onClickClose={this.openCreateForm}
                    />
                )}
                {this.state.editVisible && (
                    <FormSchedule
                        type={"update"}
                        onClickClose={this.openEditForm}
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