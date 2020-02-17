import React, { Component } from "react"
import api from "../../services/Api"
import CalendarPicker from '../../modules/popup/Calendar'
import M from 'moment'

class Report extends Component {
    constructor() {
        super()
        this.state = {
            rawData: [],
            dataTable: [],
            roomName: '',
            startDate: '',
            endDate: ''
        }
    }

    componentDidMount() {
        this.getAllPagingRoom()
    }

    async getAllPagingRoom(){
        let param = {
            pageLimit: 1000,
            pageNumber: 0
        }

        let response = await api.create('ROOM').getAllPagingRoom(param)
        if(response.status === 200){
            let dataTable = response.data.map((value, index) => {
                const { id, roomName } = value;
                return [
                    index += 1,
                    id,
                    roomName
                ]
            })
            this.setState({
                rawData: response.data,
                dataTable
            })
            // this.onFinishFetch()
        } else {
            // this.onFinishFetch()
        }

        console.log(response)
    }

    async downloadReport() {
        let {roomName, startDate, endDate} = this.state
        let payload = '?roomName='+roomName+'&startDate='+startDate+'&endDate='+endDate
        let response = await api.create('REPORT').downloadReport(payload)
        if (response && response.status === 200) {
            
        } else {
            alert(response.data.message)
        }
        console.log(response)
    }

    render() {
        return (
            <div className="main-content">
                <div className="display-flex-normal">
                    <div className="width width-all">
                        <div className="margin-bottom-15px">
                            <div className="margin-5px">
                                <span className="txt-site txt-11 txt-main txt-bold">
                                    Nama Ruangan
                                </span>
                            </div>
                            <div>
                                <select 
                                    id="room-name" 
                                    className="txt txt-sekunder"
                                    onChange={(e) => {
                                        this.setState({
                                            roomName: e.target.value
                                        })
                                    }}>
                                    {this.state.rawData.map((data) => {
                                        return (
                                            <option value={data.roomName}>
                                                { data.roomName }
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="width width-all">
                        <div className="margin-bottom-15px">
                            <div className="margin-5px">
                                <span className="txt-site txt-11 txt-main txt-bold">
                                    Tanggal Mulai
                                </span>
                            </div>
                            <div>
                                <CalendarPicker
                                    date={this.state.startDate ? M(this.state.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD') : ''}
                                    onChange={e => {
                                        let newTgl = M(e).format('DD/MM/YYYY')
                                        this.setState({
                                            startDate: newTgl
                                        })
                                    }} />
                            </div>
                        </div>
                    </div>
                    <div className="width width-all">
                        <div className="margin-bottom-15px">
                            <div className="margin-5px">
                                <span className="txt-site txt-11 txt-main txt-bold">
                                    Tanggal Akhir
                                </span>
                            </div>
                            <div>
                                <CalendarPicker
                                    date={this.state.endDate ? M(this.state.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD') : ''}
                                    onChange={e => {
                                        let newTgl = M(e).format('DD/MM/YYYY')
                                        this.setState({
                                            endDate: newTgl
                                        })
                                    }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="width width-all content-right">
                    <button className="btn btn-green" type="button" onClick={() => this.downloadReport()}>
                        <i className="fa fa-1x fa-print margin-right-5px" />
                        DOWNLOAD LAPORAN
                    </button>
                </div>
            </div>
        )
    }
    
}

export default Report