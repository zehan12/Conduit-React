import React from "react"

import Articles from "./Articles"
import Pagination from "./Pagination"
import Tabs from "./Tabs"


class ArticleSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles:[],
            articlesCount:0,
            tagArticles:[],
            activeTab:0,
        }
    }

    componentDidMount() {
        // this.setState((prevState)=>{sunny:prevState.sunny+1});
        console.log(this.props,"component")
        this.handleFetch("https://mighty-oasis-08080.herokuapp.com/api/articles");
        if ( this.props.isTagClicked ){
            console.log("clicked")
            this.handleFetchOnTag(`https://mighty-oasis-08080.herokuapp.com/api/articles?tag=${this.props.tagSelected}`)
        }
    }

    handleFetch = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json()
            console.log(json,"here")
            if (json) return this.setState({articles:json.articles,articlesCount:json.articlesCount})
            console.log(this.state.articles)
            if (json.errors) this.setState({ error: json.error })
            if (!response.ok) this.setState({ error: response.statusText })
        } catch (error) {
            console.log(error);
        }
    }

    handleFetchOnTag = async(url) => {
        try {
            const response = await fetch(url);
            const json = await response.json()
            console.log(json,"here")
            if (json) return this.setState({tagArticles:json.articles})
            if (json.errors) this.setState({ error: json.error })
            if (!response.ok) this.setState({ error: response.statusText })
        } catch (error) {
            console.log(error);
        }
    }

    render() {

        console.log(this.state,"under render")
        return <>
            <Tabs tagSelected={this.props.tagSelected} />
            <Articles articles={this.state.articles} 
                      tagSelected={ this.state.tagSelected }
                      tagArticles={this.state.tagArticles}
            />
            <Pagination articlesCount={this.state.articlesCount} />
        </>
    }
}

export default ArticleSection