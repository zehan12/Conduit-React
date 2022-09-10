import React from "react";
import { Link } from "react-router-dom";
import { Component } from "react"
import { UserContext } from "./userContext";
import Loader from "./Loader";
import AritcleHero from "./ArticleHero";
import ArticleBody from "./ArticleBody";
import CommentForm from "./CommentForm";
import CommentBox from "./CommentBox";
import ArticleApi from "../APIs/article";
import { toast } from "react-toastify";
import CommentApi from "../APIs/comment";


class ArticlePage extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      article: null, comments: null, error: "",
      loading: false, message: "", commentBody: "",
      commentsLength: 0, slug: this.props.match.params.slug
    }
  }

  componentDidMount() {
    this.handleArticle(this.state.slug);
    this.fetchComment(this.state.slug);
  }

  handleArticle = async (slug) => {
    console.log("render")
    this.setState({ loading: true })
    // try  {
    const res = await ArticleApi.getSingleArticle(slug);
    const data = await res.json();
    if (data.article) {
      this.setState({ article: data.article, loading: false })
      toast.success(`${data.article.title} is fetched`)
    }
    //! error from api
    if (!res.ok) {
      toast.error(`${res.status}: ${res.statusText}`);
    }
    // } catch {

    // } finally {

    // }
  }

  handleDeleteArticle = async (slug) => {
    console.log("handle delete article", slug)
    // try {
    const res = await ArticleApi.deleteArticle(slug);
    if (res.ok) toast.success(" Article Deleted Successfully ")
    if (res.status === 204 && res.ok) this.props.history.push("/")
    // } catch (err) {
    //   console.log(err)
    // } finally {}
  }

  fetchComment = async (slug = this.state.slug) => {
    const res = await CommentApi.getSingleArticleComment(slug);
    const data = await res.json();
    if (data.comments) {
      this.setState({ comments: data.comments, commentsLength: data.comments.length })
      toast.success("comment fetched")
    }
    if (!res.ok) {
      toast.error("no comment fetched")
    }
  }

  handleChange = ({ target }) => {
    let { name, value } = target
    this.setState({ [name]: value })
  }

  handleCreateComment = async () => {
    const body = this.state.commentBody;
    const { slug } = this.state;
    // try {
    this.setState({ commentBody: "" });
    const res = await CommentApi.createComment(body, slug)
    const data = await res.json();
    if (res.ok) {
      toast.success("comment created")
    }
    if (data.comments) {
      this.setState({ comments: data.comments });
    }
    // if (!res.ok) return Promise.reject((data && data.message) || res.status);
    this.fetchComment()
    // } catch (err) {
    //   console.log(err)
    // }
  }

  handleDeleteComment = async (id) => {
    console.log("you about to delete this comment", id, this.state.slug)
    try {
      const res = await CommentApi.deleteComment(this.state.slug, id);
      if (res.status === 204 && res.ok) {
        toast.success("comment deleted")
        this.fetchComment(this.state.slug)
      }
      if (!res.ok) return Promise.reject(res.status);
    } catch (err) {
      console.log(err)
    }
  }


  render() {
    if (this.state.loading || !this.state.article) {
      return <Loader />
    }
    return (
      <>
        <AritcleHero
          logedInUser={this.context.user.username || false}
          title={this.state.article.title}
          article={this.state.article}
          slug={this.state.article.slug}
          authorImage={this.state.article.author.image}
          authorName={this.state.article.author.username}
          articleCreatedAt={this.state.article.createdAt}
          handleDeleteArticle={this.handleDeleteArticle}
        />
        <ArticleBody
          body={this.state.article.body}
          tags={this.state.article.tagList}
        />
        <div className="container">
          <div className="mx-auto" style={{ width: "50%" }}>
            {
              !this.context.isLogedIn ?
                <p className="text-left">
                  <Link to="/signin"> Sign in</Link>  or
                  <Link to="/signup">sign up</Link>
                  to add comments on this article.
                </p>
                :
                <CommentForm
                  img={this.context.user.image}
                  commentBody={this.state.commentBody}
                  handleChange={this.handleChange}
                  handleCreateComment={this.handleCreateComment}
                />
            }
          </div>
          <div className="mx-auto" style={{ width: "50%" }}>
            {
              this.state.comments && this.state.comments.map((comment) =>
                <CommentBox
                  comment={comment} logedUser={this.context.user.username || false}
                  handleDeleteComment={this.handleDeleteComment}
                />)
            }
          </div>
        </div>
      </>
    )
  }
}

export default ArticlePage;