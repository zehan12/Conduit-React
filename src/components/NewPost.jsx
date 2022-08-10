import React from "react";

class NewPost extends React.Component {
    state = {

    }

    handelChange = () =>{

    }
    
    render() {
        return (
            <div className="container bg-amber-200">
                <form >
                    <input type="text" placeholder="Article Title" />
                    <br />
                    <input type="text" placeholder="What's this article about?" />
                    <br />
                    <textarea rows="10" cols="100" placeholder="Write your article ( in Markdown )" />
                    <br />
                    <input type="text" placeholder="Enter your tags" />
                    <br />
                    <button>Publish Article</button>
                </form>

            </div>
        )
    }
}

export default NewPost;