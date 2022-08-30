import { Link } from "react-router-dom";
import { Component } from "react"
import url from "../utils/constants"
import { UserContext } from "./userContext";
import Loader from "./Loader";
import React from "react";

const Text = ({ para }) => {
  if (typeof para === "string") {
    return <div style={{ whiteSpace: "pre-line" }}>
      {para.split("\n").join("\r\n")}
    </div>
  } else {
    console.log(typeof para, "type of")
    return "";
  }
}

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

  handleComments = async (slug) => {
    const res = await fetch(url.globalFeed + "/" + slug + "/comments");
    const data = await res.json();
    if (data.comments) this.setState({ comments: data.comments, commentsLength: data.comments.length });
    if (!res.ok) return Promise.reject((data && data.message) || res.status);
  }

  handleChange = ({ target }) => {
    let { name, value } = target
    this.setState({ [name]: value })
  }

  handleCreateComment = async() => {
    const postData = { comment: { body: this.state.body } };
    try {
      this.setState({body:""});
      const res = await fetch(url.globalFeed + "/" + this.state.slug + "/comments",
        {
          method: "POST",
          headers:
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage["user_token"]}`
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
      if ( res.status === 204 && res.ok ) this.handleComments(this.state.slug)
      if (!res.ok) return Promise.reject(res.status);
    } catch (err) {
      console.log(err)
    }
  }


  updateState = () => {
    this.setState((state) => ({ commentsLength: state.commentsLength + 1 }))
  }

  render() {
    if (this.state.loading) {
      return <Loader />
    }
    return (
      <>
        <div className="flex flex-col bg-zinc-700 px-48 h-40">
          <div>
            <h1 className="my-5 text-white text-5xl">{this.state.article && this.state.article.title}</h1>
          </div>
          <div className="flex items-center">
            <div>
              <img className="h-10 w-10" src={this.state.article?.author.image} alt="img"></img>
            </div>
            <div>
              <h3 className="text-white text-l">{this.state.article?.author.username}</h3>
              <p className="text-white text-xs h-1">{this.state.article?.createdAt}</p>
            </div>
            <div>
              <button>Edit Profile</button>
              <button>Delete Article</button>
            </div>
          </div>
        </div>

        <div className="container my-7">
          <div>
            <Text className="text-l leading-[3rem] tracking-wide " para={this.state?.article?.body} />          \
          </div>
        </div>


        <div className="container">
          {
            <div className="mx-auto" style={{ width: "50%" }}>
              {
                !this.context.isLogedIn ? <p className="text-left"> <Link> Sign in</Link> or <Link>sign up</Link> to add comments on this article.</p>
                  :
                  <>
                    <textarea onChange={this.handleChange}
                      value={this.state.body}
                      name="body"
                      className="border w-full h-28 p-5" placeholder="write a comment...">
                    </textarea>
                    <div className="border-solid px-4 py-2 flex  justify-between">
                      <img className="h-8 w-8 rounded-3xl" src={this.state.article?.author.image} alt="profile" />
                      <button onClick={this.handleCreateComment} disabled={(this.state.body && this.state.body.trim().length) ? false : true}
                        className="">Post Comment</button>
                    </div>
                    <button onClick={this.updateState}>{this.state.commentsLength}</button>
                  </>
              }
            </div>
          }

          <div className="mx-auto" style={{ width: "50%" }}>
            {
              this.state.comments &&
              React.Children.toArray(this.state.comments.map((comment) => <>
                <div className="outline-1 p-2">
                  <h4 className="m-4"> {comment.body} </h4>
                </div>
                <div className="outline-1 p-2 mb-4 flex justify-between">
                  <div className="flex">
                    <img className="h-5 w-5 rounded-xl" src={comment.author.image} alt="img" />
                    <h3 className="ml-3"> {comment.author.username} </h3>
                    <p className="ml-3"> {comment.author.createdAt} </p>
                  </div>
                  {
                    this.context.user.username === comment.author.username &&
                    <div>
                      <button className="bg-green-400"
                        onClick={() => this.handleDeleteComment(comment.id)}>Delete</button>
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