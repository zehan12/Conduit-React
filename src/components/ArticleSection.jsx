import React from "react"
import url from "../utils/constants"
import Articles from "./Articles"
import Pagination from "./Pagination"
import FeedTabs from "./FeedTabs"


class ArticleSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: null,
            isLoading: false,
            articlesCount: 0,
            activePageIndex: 1,
            articlePerPage: 10,
            tagArticles: [],
            activeTab: 0,
            error: ""
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/?limit=${this.state.articlePerPage}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            }).then((data) => {
                this.setState({
                    articles: data.articles,
                    articlesCount: data.articlesCount,
                    isLoading: false
                })
            }).catch((err) => {
                console.error(err)
                this.setState({ error: "NOT ABLE TO FETCH ARTICLES", isLoading: false })
            })
    }

    // componentDidUpdate(_prevProps,prevState){
    //     if ( prevState.activePageIndex !== this.activePageIndex || 
    //         this.tagSelected !== this.tagSelected ) {
    //             this.handleFetchOn()
    //     }
    // }

    fetchArticles = async () => {
        this.setState({ isLoading: true })
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/?limit=${this.state.articlePerPage}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            }).then((data) => {
                this.setState({
                    articles: data.articles,
                    articlesCount: data.articlesCount,
                    isLoading: false
                })
            }).catch((err) => {
                console.error(err)
                this.setState({ error: "NOT ABLE TO FETCH ARTICLES", isLoading: false })
            })
    }

    // handleFetch = async (url) => {
    //     try {
    //         const response = await fetch(url + "articles/?limit=10");
    //         const json = await response.json()
    //         console.log(json, "here")
    //         if (json) return this.setState({ articles: json.articles, articlesCount: json.articlesCount })
    //         console.log(this.state.articles)
    //         if (json.errors) this.setState({ error: json.error })
    //         if (!response.ok) this.setState({ error: response.statusText })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    handleFetchOn = () => {
        const limit = this.state.articlePerPage;
        const offset = (this.state.activePageIndex - 1) * limit;
        this.setState({ isLoading: true })
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/?offset=${offset}&limit=${limit}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            }).then((data) => {
                this.setState({
                    articles: data.articles,
                    articlesCount: data.articlesCount,
                    isLoading: false
                })
            }).catch((err) => {
                console.error(err)
                this.setState({ error: "NOT ABLE TO FETCH ARTICLES", isLoading: false })
            })
    }

    componentDidUpdate( _prevProps, prevState){
        console.log(_prevProps,prevState)
        if ( _prevProps.tagSelected !== this.props.tagSelected ){
            this.handleFetchOnTag(this.props.tagSelected)
        }
    }


    handleFetchOnTag = ( tag ) => {
        this.setState({ isLoading: true, articles:null })
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/?limit=${10}` + ( tag && `&tag=${tag}`))
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            }).then((data) => {
                this.setState({
                    articles: data.articles,
                    articlesCount: data.articlesCount,
                    isLoading: false
                })
            }).catch((err) => {
                console.error(err)
                this.setState({ error: "NOT ABLE TO FETCH ARTICLES", isLoading: false })
            })
    }

    // change page
    paginate = (page) => {
        this.setState({ activePageIndex: page }, () => this.handleFetchOn())
    }




    render() {
        return <>
            {/* <FeedTabs 
            removeTag={this.props.removeTag}
            tagSelected={this.props.tagSelected} /> */}
            <Articles
               articles={this.state.articles}
                error={this.state.error}
                isLoading={this.state.isLoading}

                tagSelected={this.state.tagSelected}
                tagArticles={this.state.tagArticles}
                isTagClicked={this.props.isTagClicked}
            />
            <Pagination articlesCount={this.state.articlesCount}
                activePageIndex={this.state.activePageIndex}
                articlePerPage={this.state.articlePerPage}
                paginate={this.paginate}
            />
        </>
    }
}

export default ArticleSection