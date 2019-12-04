import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables-bitozen";
import LoadingBar from "react-top-loading-bar";

let ct = require("../../modules/custom/customTable")

class Position extends Component {
    constructor() {
        super()
        this.state = {
            clEditAble: '',
            editAble: false,
            rawData: [],
            dataTable: []
        }
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

    opDeleteAble = () => {
        alert('delete');
    }

    componentDidMount() {
        this.startFetch();
    }

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
        "Position Name",
        {
            name: "Action",
            options: {
                customBodyRender: () => {
                    return (
                        <div>
                            <button
                                className="btn btn-red btn-small-circle"
                                onClick={this.opDeleteAble}>
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
                            title={"Position"}
                            data={this.state.dataTable}
                            columns={this.columns}
                            options={this.options}
                        />
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}

export default Position