import React from "react";
import { UserContext } from "../components/userContext"
import url from "../utils/constants";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: ""
    }
  }
  static contextType = UserContext;

  handleChange = ({ target }) => {
    let { name, value } = target
    console.log(target.value)
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

  render() {
     console.log(this.state)
    return (
      <>
        <textarea onChange={this.handleChange}
          value={this.state.body}
          name="body"
          className="border border-b-0 w-full h-28 p-5" placeholder="write a comment...">
        </textarea>
        <div className="border bg-zinc-100 p-4 flex justify-between">
          <img className="h-8 w-8 rounded-3xl" src={this.context.user.image} alt="profile" />
          <button onClick={this.handleCreateComment} disabled={(this.state.body && this.state.body.trim().length) ? false : true}
            className="border bg-[#5CB85C] text-sm p-1 font-bold text-white">Post Comment</button>
        </div>
      </>
    )
  }
}

export default CommentForm;