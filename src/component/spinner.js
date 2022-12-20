import React, { Component } from 'react'
import loading1 from './loading1.gif'

export default class spinner extends Component {
  render() {
    return (
      <div>
        <img src={loading1} alt="loading" />
      </div>
    )
  }
}
