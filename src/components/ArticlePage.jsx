import React from "react";
import { Link } from "react-router-dom";
import { Component } from "react"
import url from "../utils/constants"
import { UserContext } from "./userContext";
import Loader from "./Loader";
import AritcleHero from "./ArticleHero";
import ArticleBody from "./ArticleBody";
import CommentForm from "./CommentForm";
import CommentBox from "./CommentBox";
import { FaTrash } from "react-icons/fa"


class ArticlePage extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      comments: null,
      error: "",
      loading: false,
      message: "",
      commentBody: "",
      commentsLength: 0,
      slug: this.props.match.params.slug
    }

  }

  componentDidMount() {
    this.handleArticle(this.state.slug);
    this.fetchComment(this.state.slug);
  }


  handleArticle = async (slug) => {
    this.setState({ loading: true })
    const res = await fetch(url.globalFeed + "/" + slug)
    const data = await res.json()
    // console.log(data, slug)
    if (data.article) this.setState({ article: data.article, loading: false })
    //! error from api
    if (!res.ok) return Promise.reject((data && data.message) || res.status);
    // console.log(data)
  }

  handleDeleteArticle = async (slug) => {
    console.log("handle delete article", slug)
    // try {
    const res = await fetch(url.globalFeed + `/${slug}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage["user_token"]}`
      }
    }
    )
    if (res.ok) console.log("DELETED SUCCESSFULLY")
    if (res.status === 204 && res.ok) this.props.history.push("/")

    // } catch (err) {
    //   console.log(err)
    // }

  }

  fetchComment = async () => {
    const { slug } = this.state
    const res = await fetch(url.globalFeed + "/" + slug + "/comments");
    const data = await res.json();
    if (data.comments) this.setState({ comments: data.comments, commentsLength: data.comments.length });
    if (!res.ok) return Promise.reject((data && data.message) || res.status);
  }

  handleChange = ({ target }) => {
    let { name, value } = target
    this.setState({ [name]: value })
  }

  handleCreateComment = async () => {
    const postData = { comment: { body: this.state.commentBody } };
    try {
      this.setState({ commentBody: "" });
      const res = await fetch(url.globalFeed + "/" + this.state.slug + "/comments",
        {
          method: "POST",
          headers:
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage["user_token"]}`
          },
          body: JSON.stringify(postData)
        }
      )
      const data = await res.json();
      console.log(data)
      if (data.comments) this.setState({ comments: data.comments });
      if (!res.ok) return Promise.reject((data && data.message) || res.status);
      this.fetchComment()
    } catch (err) {
      console.log(err)
    }
  }

  handleDeleteComment = async (id) => {
    console.log("you about to delete this comment", id, this.state.slug)
    try {
      console.log(id)
      const res = await fetch(url.globalFeed + "/" + this.state.slug + "/comments/" + id,
        {
          method: "DELETE",
          headers:
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage["user_token"]}`
          }
        }
      )
      if (res.status === 204 && res.ok) this.fetchComment(this.state.slug)
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