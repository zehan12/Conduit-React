import React from "react";
import url from "../utils/constants";
import { withRouter } from "react-router-dom";

class NewPost extends React.Component {
	state = {
		title: "",
		description: "",
		body: "",
		tags: "",
		tagList: [],
		errors: {},
		message: "",
	}

	handelChange = ({ target }) => {
		const { name, value } = target;
		const errors = this.state.errors
		errors[name] = value.length === 0 ? "field can not be empty" : "";
		this.setState({ [name]: value, errors })
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let { title, description, body, tagList } = this.state;
			if (this.state.tags) {
				tagList = [...tagList, this.state.tags.split(" ")].flat(Infinity)
			}

			const { user_token } = localStorage;
			const postArticle = url.globalFeed;
			const newPost = { article: { title, description, body, tagList } };

			const res = await fetch(postArticle, {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'authorization': `Token ${user_token}`
				},
				body: JSON.stringify(newPost)
			})

			const data = await res.json();

			//! any error occurs
            if ( data.errors ) this.setState({ message: data.errors.message } );

			//! resquset success redirect to  home page
            if ( res.status === 200 && res.ok ) this.props.history.push("/");

			//! error from api
            if ( !res.ok ) return Promise.reject( ( data && data.message ) || res.status );

			console.log("Result:",data)
		} catch (error) {
			console.log(error)
		}
	}

	handleKey = (event) => {
		if (event.keyCode === 13 || event.keyCode === 188) {
			let mergeArray = [...this.state.tagList, ...event.target.value.split(/(?:,| )+/)];
			let uniqueAndTrimTag = mergeArray
				.filter((x, i, a) => a
					.indexOf(x) === i && x
						.trim().length !== 0)
				.map((e) => e.trim());
			this.setState({ tagList: uniqueAndTrimTag, tags: "" });
		}
	}

	removeTag = (e) => {
		let filterdTag = this.state.tagList.filter((ele) => ele !== e);
		this.setState({ tagList: filterdTag })
	}

	render() {
		let { title, description, body } = this.state.errors;
		return (
			<div className="container bg-amber-200">
				<h3 className="text-red-600 font-mono text-xl" >
					{
						title ? `title:${title}` :
							description ? `description: ${description}` :
								body ? `body: ${body}` : ""
					}
				</h3>
				{this.state.message && <h2 className="text-red-700 text-3xl">{this.state.message}</h2>}
				<form onSubmit={this.handleSubmit} className="" >
					<input onChange={this.handelChange}
						value={this.state.name}
						name="title" type="text"
						placeholder="Article Title"
					// required
					/>
					<br />
					<input onChange={this.handelChange}
						value={this.state.description}
						name="description"
						type="text"
						placeholder="What's this article about?"
					// required
					/>
					<br />
					<textarea onChange={this.handelChange}
						value={this.state.body}
						name="body"
						rows="10" cols="100"
						placeholder="Write your article ( in Markdown )"
					// required
					/>
					<br />
					<input onChange={this.handelChange}
						onKeyUp={this.handleKey}
						value={this.state.tags}
						name="tags" type="text"
						placeholder="Enter your tags"
					/>
					<br />
					<div className="flex border-2">
						{
							this.state.tagList &&
							this.state.tagList.map((ele) =>
								<div key={ele} className="mr-2 my-2 bg-gray-500 text-white px-2 py-1 text-xs rounded-xl">
									<span onClick={() => this.removeTag(ele)}
										className="mr-1 cursor-pointer">x</span>
									{ele}
								</div>)
						}
					</div>
					<br />
					<button className="bg-primary px-6 rounded text-white h-10 bg-green-700"
						type="submit"
						disabled={
							title ||
							description ||
							body ||
							!this.state.title ||
							!this.state.description ||
							!this.state.body
						}
					>
						Publish Article
					</button>
				</form>
			</div>
		)
	}
}

export default withRouter(NewPost);