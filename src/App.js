import React, { Component } from "react";
import axios from "axios";

import './App.css';

class App extends Component {

  state = {
    ticker: {
      buy: [],
      sell: []
    }
  }

  componentDidMount() {
    axios.get("https://indodax.com/api/btc_idr/depth")
      .then((result) => {
        this.setState({
          ticker: {
            buy: result.data.buy,
            sell: result.data.sell
          }
        })
      });
  }

  render() {
    function thousandSeparator(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const buyData = this.state.ticker.buy.map((val)=>{
      return <tr>
        <td>{thousandSeparator(val[0])}</td>
        <td>{val[1]}</td>
        <td>{thousandSeparator(Math.floor(val[0] * parseFloat(val[1])))}</td>
      </tr>;
     })

     const sellData = this.state.ticker.sell.map((val)=>{
      return <tr>
        <td>{thousandSeparator(val[0])}</td>
        <td>{val[1]}</td>
        <td>{thousandSeparator(Math.floor(val[0] * parseFloat(val[1])))}</td>
      </tr>;
     })
    
    return (
      <div className="tables">
        <div className="market sellmarket">
          <h3>Sell Market</h3>
          <table border="1">
            <tr>
              <th>Price</th>
              <th>BTC</th>
              <th>IDR</th>
            </tr>
            {sellData}
          </table>
        </div>
        <div className="market buymarket">
          <h3>Buy Market</h3>
          <table border="1">
            <tr>
              <th>Price</th>
              <th>BTC</th>
              <th>IDR</th>
            </tr>
            {buyData}
          </table>
        </div>
      </div>
    );
  }
}

export default App;