import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from "prop-types";

export default class  extends Component {
   
  static defaultProps ={
    country: "in",
    pageSize: 9,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(){
    super();
    console.log("This is constuctor");
    this.state={
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3706b4d3cdbd4948af996fc71bb0f8ed&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles:parsedData.articles})
  }

  handlePrevClick= async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3706b4d3cdbd4948af996fc71bb0f8ed&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page-1,
      articles:parsedData.articles
    })
  }

  handleNextClick= async ()=>{
    if(this.state.page+1 > Math.ceil(this.state.totalResults/this.state.pageSize)){

    }else{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3706b4d3cdbd4948af996fc71bb0f8ed&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page+1,
      articles:parsedData.articles
    })
  }
  }

  render() {
    return (
        <div className="container my-3">
          <h1 className='text-center' style={{ margin: "35px 0px" }}>NewsMonkey -- Top HeadLines</h1>
          <spinner/>
      <div className='row'>
          {this.state.articles.map((element)=>{
       return <div className="col-md-4" key={element.url}>
             <NewsItem title={element.title?element.title.slice(0,44):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} />
        </div>
          })}
      </div>
      <div className="container d-flex justify-content-between">
      <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
      <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
        </div>
    )
  }
}
