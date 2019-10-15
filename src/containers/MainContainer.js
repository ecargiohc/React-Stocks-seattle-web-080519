import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      stocks: [], 
      displayStocks: [],
      portfolioStocks: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
    .then(response => response.json())
    .then(json => this.setState({
      stocks: json,
      displayStocks: json
    }))
  };

  addToPortfolio = (stock) => {
    this.setState({
      portfolioStocks: [...this.state.portfolioStocks, stock]
    });
  };
  removeFromPortfolio = (stock) => {
    this.setState({
      portfolioStocks: this.state.portfolioStocks.filter(s => s !== stock)
    });
  };

  filterStock = (type) => {
    if (type !== "All") {
      this.setState({
        displayStocks: this.state.stocks.filter(stock=> stock.type === type)
      })
    }
    else {
      this.setState({
        displayStocks: this.state.stocks
      })
    }
  };
  
  alphabeticalStocks = (value) => {
    console.log("sortBy method fires")
    // if input value "alphabetical"..., if "price"...
    let arr = [];
    if (value === "Alphabetically") {
      arr = this.state.displayStocks.sort((a, b) => a.name > b.name ? 1 : -1)
    }
    else if (value === "Price") {
      arr = this.state.displayStocks.sort((a, b) => a.price > b.price ? 1 : -1)
    }
    this.setState({
      displayStocks: arr
    })
  }

  render() {
    return (
      <div>
        <SearchBar filterStock={this.filterStock} alphabeticalStocks={this.alphabeticalStocks}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.displayStocks} addToPortfolio={this.addToPortfolio}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.portfolioStocks} removeFromPortfolio={this.removeFromPortfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
