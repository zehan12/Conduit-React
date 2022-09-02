import { Link } from "react-router-dom";
import { Component } from "react"
import url from "../utils/constants"
import { UserContext } from "./userContext";
import Loader from "./Loader";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi"
import AritcleHero from "./ArticleHero";
import ArticleBody from "./ArticleBody";
import CommentForm from "./CommentForm";


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
      body: "",
      commentsLength: 0,
      slug: this.props.match.params.slug
    }

  }

  componentDidMount() {
    this.handleArticle(this.state.slug);
    this.handleComments(this.state.slug);
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

  handleComments = async () => {
    const {slug} = this.state
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
    const postData = { comment: { body: this.state.body } };
    try {
      this.setState({ body: "" });
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
      this.handleComments(this.state.slug)
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
      if (res.status === 204 && res.ok) this.handleComments(this.state.slug)
      if (!res.ok) return Promise.reject(res.status);
    } catch (err) {
      console.log(err)
    }
  }


  render() {
    if (this.state.loading || !this.state.article) {
      return <Loader />
    }
    console.log(this.state.article)
    return (
      <>
        <AritcleHero article={this.state.article} />
        <ArticleBody
          body={this.state.article.body}
          tags={this.state.article.tagList}
        />
        <div className="container">
          <div className="mx-auto" style={{ width: "50%" }}>
            {
              !this.context.isLogedIn ?
                <p className="text-left">
                  <Link to="/signin"> Sign in</Link>
                  or <Link to="/signup">sign up</Link>
                  to add comments on this article.</p>
                :
                <>
                <CommentForm
                  slug={this.props.match.params.slug}
                 />
                  {/* <textarea onChange={this.handleChange}
                    value={this.state.body}
                    name="body"
                    className="border border-b-0 w-full h-28 p-5" placeholder="write a comment...">
                  </textarea>
                  <div className="border bg-zinc-100 p-4 flex justify-between">
                    <img className="h-8 w-8 rounded-3xl" src={this.context.user.image} alt="profile" />
                    <button onClick={this.handleCreateComment} disabled={(this.state.body && this.state.body.trim().length) ? false : true}
                      className="border bg-[#5CB85C] text-sm p-1 font-bold text-white">Post Comment</button>
                  </div> */}
                </>
            }
          </div>


          <div className="mx-auto" style={{ width: "50%" }}>
            {
              this.state.comments &&
              React.Children.toArray(this.state.comments.map((comment) => <>
                <div className="border p-2 py-6 mt-4">
                  <h4 className="m-4"> {comment.body} </h4>
                </div>
                <div className="border bg-zinc-100 p-2 mb-4 flex justify-between">
                  <div className="flex">
                    <img className="h-5 w-5 rounded-xl" src={comment.author.image} alt="img" />
                    <h3 className="ml-3 text-xs text-[#5CB85C]"> {comment.author.username} </h3>
                    <p className="ml-3 text-xs  text-slate-400"> {comment.createdAt} </p>
                  </div>
                  {
                    this.context.user.username === comment.author.username &&
                    <div>
                      <FaTrash
                        className="hover:text-red-700 text-sm"
                        onClick={() => this.handleDeleteComment(comment.id)} />
                    </div>
                  }
                </div>
              </>
              ))
            }
          </div>

        </div>

      </>

    )
  }
}

export default ArticlePage;