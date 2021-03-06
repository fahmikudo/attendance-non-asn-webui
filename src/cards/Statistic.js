import React, { Component } from 'react'

class Statistic extends Component {
  render() {
    return (
      <div className="card">
        <div className="padding-10px background-white border-bottom">
          <div className="txt-site txt-bold text-main txt-12">Statistik</div>
        </div>
        <div className="padding-15px">
          <div className="margin-10px txt-site txt-primary txt-12">
              Customers
          </div>
          <div className="margin-15px txt-site txt-main txt-40 txt-bold">
              36,254
          </div>
          <div className="margin-top-10px txt-site txt-green txt-11">
              <i className="fa fa-lw fa-arrow-up"></i>
              5.27%
          </div>
          <div className="margin-bottom-10px txt-site txt-primary txt-11">
              Since last month
          </div>
        </div>
      </div>
    )
  }
}

export default Statistic