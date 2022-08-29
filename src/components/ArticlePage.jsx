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
      body:"",
    }
  }

  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.handleArticle(slug);
    this.handleComments(slug)
  }


  handleArticle = async (slug) => {
    this.setState({ loading: true })
    const res = await fetch(url.globalFeed + "/" + slug)
    const data = await res.json()
    console.log(data, slug)
    if (data.article) this.setState({ article: data.article, loading: false })
    //! error from api
    if (!res.ok) return Promise.reject((data && data.message) || res.status);
    console.log(data)
  }

  handleComments = async (slug) => {
    const res = await fetch(url.globalFeed + "/" + slug + "/comments");
    const data = await res.json();
    if (data.comments) this.setState({ comments: data.comments });
    if (!res.ok) return Promise.reject((data && data.message) || res.status);
  }

  handleChange = ( { target } ) => {
    let { name, value } = target
    this.setState( {[name]:value} )
  }

  handleCreateComment = () => {
    console.log("you are here to create comment");
    console.log("commmet",this.state.body)
  }

  handelDeleteComment = () => {
    console.log("you about to delete this comment")
  }

  render() {
    console.log(this.state.article?.author.username, "here")
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
            <Text para={this.state?.article?.body} />
            <p>{this.state.article?.body}</p>
            {/* <p className="text-l leading-[3rem] tracking-wide "> {this.state.article?.body} </p> */}
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
                      <button onClick={this.handleCreateComment} className="">Post Comment</button>
                    </div>
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
                  <div>
                    <button onClick={this.handelDeleteComment}>Delete</button>
                  </div>
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