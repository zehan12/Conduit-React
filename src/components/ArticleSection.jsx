import React from "react"
import { toast } from "react-toastify";
import ArticleApi from "../APIs/article";
import url from "../utils/constants"
import Articles from "./Articles"
import Pagination from "./Pagination"
// import FeedTabs from "./FeedTabs"
// let newDate = new Date(date).toISOString().split("T")[0];
class ArticleSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            isLoading: false,
            articlesCount: 0,
            activePageIndex: 1,
            articlePerPage: 10,
            tagArticles: [],
            error: ""
        }
    }

    componentDidMount() {
        if ( this.props.isLogedIn) {
            console.log("her")
            this.fetchArticle(this.props.user.username, "logedInUser")
        } else {
            this.fetchArticle(this.state.articlePerPage, "global page");
        }
    }

    fetchArticle = async (param, what) => {
        console.log(what,"eh")
        const getApi = (what) => {
            switch (what) {
                case "global page":
                    return ArticleApi.getAllArticle;
                case "tags":
                    return ArticleApi.byTags;
                case "logedInUser":
                    return ArticleApi.byFeed;
                case "page":
                    return ArticleApi.byPagination;
                default:
                    return ArticleApi.getAllArticle;
            }
        }
        try {
            this.setState({ isLoading: true, articles: [], error: "" })
            const api = getApi(what);
            const res = await api(param);
            const data = await res.json();
            if (!res.ok) {
                toast.error(`${res.status}: ${res.statusText}`);
            }
            if (data.articles) {
                toast.success("fetched Articles")
                this.setState({
                    articles: data.articles,
                    articlesCount: data.articlesCount,
                    isLoading: false
                })
            }
        } catch (error) {
            // this.setState({ error: "NOT ABLE TO FETCH ARTICLES" })
            toast.error("Unable Fetched Articles");
        } finally {
            this.setState((prevState) => ({ ...prevState, isLoading: false }))
        }
    }


    componentDidUpdate(_prevProps, prevState) {
        if (_prevProps.tagSelected !== this.props.tagSelected) {
            this.fetchArticle(this.props.tagSelected, "tags");
        }
        if (_prevProps.activeTab !== this.props.activeTab) {
            if (this.props.activeTab === "Your Feed") {
                this.fetchArticle(this.props.user.username, "logedInUser")
            } else {
                this.fetchArticle()
            }
        }
    }


    paginate = (page) => {
        let offset = (page - 1) * 10;
        this.setState({ activePageIndex: page }, () => this.fetchArticle(offset, "page"))
    }


    handleLikeDislike = async (slug, favorited) => {
        const res = favorited ? await ArticleApi.dislikeArticle(slug) : await ArticleApi.likeArticle(slug)
        const data = await res.json();
        if (res) console.log(res)
        if (data) console.log(data)
        if (res.ok){

        }
        if (data.article) {
            if (data.article.favorited) {
                toast.success(`you liked article ${data.article.title} by ${data.article.author.username}`)
            } else {
                toast.success(`you dislike article ${data.article.title} by ${data.article.author.username}`)
            }
        }
    }

    // handleLikeDislike = async (slug, favorited) => {

    //     if (!this.props.isLogedIn) return toast.error("you are not loged In")
    //     console.log(slug, favorited, "like or  dislike");
    //     const method = favorited ? "DELETE" : "POST";
    //     const urls = url.globalFeed + `/${slug}/favorite`
    //     console.log(method, urls);
    //     try {
    //         const res = await fetch(urls, {
    //             method, headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Token ${localStorage["user_token"]}`,
    //             }

    //         });
    //         console.log(res);
    //         const data = res.json();
    //         if (res.ok) console.log("done")
    //         console.log(data)
    //     } catch (err) {
    //         console.log(err)
    //     }

    // }



    render() {
        return <>
            <Articles
                articles={this.state.articles}
                error={this.state.error}
                isLoading={this.state.isLoading}
                handleLikeDislike={this.handleLikeDislike}
                tagSelected={this.state.tagSelected}
                tagArticles={this.state.tagArticles}
                isTagClicked={this.props.isTagClicked}
            />
            {
                this.state.articles?.length >= 10 ?
                    <Pagination articlesCount={this.state.articlesCount}
                        activePageIndex={this.state.activePageIndex}
                        articlePerPage={this.state.articlePerPage}
                        paginate={this.paginate}
                    />
                    : ""
            }
        </>
    }
}

export default ArticleSection