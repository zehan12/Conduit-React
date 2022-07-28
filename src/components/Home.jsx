import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import FeedSection from "./FeedSection";
import Pagination from "./Pagination";


class Home extends React.Component {
  constructor(){
    super();
    this.state = {
      articles:[],
      articlesCount: 0,
      error:"",
      tags:  []
    }
  }

 componentDidMount() {
    this.fetchArticles()
  }

  fetchArticles = async() => {
    try {
        const url = ["https://mighty-oasis-08080.herokuapp.com/api/articles", "https://mighty-oasis-08080.herokuapp.com/api/tags"];
        const response = await Promise.all( url.map((e)=> fetch(e) ) );
        const json = await Promise.all(response.map((e)=> e.json()));
        if ( json ) this.setState( { articles: json[0].articles, articlesCount: json[0].articlesCount, tags: json[1].tags } )
        if ( json.errors )  this.setState( { error: json.error } )
        if (!response.ok)  this.setState({error:response.statusText})
      } catch (error) {
        console.log(error);
      }
  }
  

  render() {
      return [
        <Header />,
        <Hero />,
        <FeedSection 
         articles={ this.state.articles }
         articlesCounts={ this.state.articlesCount }
         tags={ this.state.tags }
        />,
        <Pagination articlesCount={ this.state.articlesCount } />
      ]
  }
}

export default Home;