import React from "react";
import url from "../utils/constants";
import { withRouter } from "react-router-dom";

class NewEditPost extends React.Component {
	state = {
		title: "",
		description: "",
		body: "",
		tags: "",
		tagList: [],
		errors: {},
		message: "",
	}

	updateState = ( state ) =>{
		this.setState( {
			title: state.title,
			description: state.description,
			body: state.body,
			tagList:  state.tagList
		} )
	}

	componentDidMount(){
		if ( this.props.location.state ) this.updateState(this.props.location.state.article)
	}

	handleArticleSlug = async ( slug ) => {
		try {
			const res = await fetch()
			const data = await res.json()
		} catch (err) {
			console.log(err)
		}
	}

	handelChange = ({ target }) => {
		const { name, value } = target;
		const errors = this.state.errors
		errors[name] = value.length === 0 ? "field can not be empty" : "";
		this.setState({ [name]: value, errors })
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		// try {
			console.log(this.state)
			let { title, description, body, tagList } = this.state;
			if (this.state.tags) {
				tagList = [...tagList, this.state.tags.split(" ")].flat(Infinity)
			}

			console.log(title, description, body)

			const { user_token } = localStorage;
			const postArticle = url.globalFeed;
			const newPost = { article: { title, description, body, tagList } };
			const slug =  this.props.location.state ? this.props.location.state.article.slug : "";
			const method = this.props.location.state === null ? "POST" : "PUT" 

			console.log(method)

			const res = await fetch(postArticle+`/${slug}`, {
				method,
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Token ${user_token}`
				},
				body: JSON.stringify(newPost)
			})

			console.log(res)
			const data = await res.json();
             console.log(data)
			//! any error occurs
			if (data.errors) this.setState({ message: data.errors.message });

			//! resquset success redirect to  home page
			if (res.status === 200 && res.ok) this.props.history.push("/");

			//! error from api
			if (!res.ok) return Promise.reject((data && data.message) || res.status);

			console.log("Result:", data)
		// } catch (error) {
		// 	console.log(error)
		// }
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
		// console.log(this.state)
		// console.log(this.props)
		let { title, description, body } = this.state.errors;
		return (
			<div className="mx-auto bg-amber-200 " style={{ width: "70%" }}>
				<h3 className="text-red-600 font-mono text-xl" >
					{
						title ? `title:${title}` :
							description ? `description: ${description}` :
								body ? `body: ${body}` : ""
					}
				</h3>
				{this.state.message && <h2 className="text-red-700 text-3xl">{this.state.message}</h2>}
				<form onSubmit={this.handleSubmit} className="bg-red-300 p-5">
					<input onChange={this.handelChange}
						value={this.state.title }
						name="title" type="text"
						placeholder="Article Title"
						className="w-full h-10 pl-3 mb-4"
					// required					
					/>
					<br />
					<input onChange={this.handelChange}
						value={this.state.description}
						name="description"
						type="text"
						placeholder="What's this article about?"
						className="w-full h-10 pl-3 py-2 mb-4"
					// required
					/>
					<br />
					<textarea onChange={this.handelChange}
						value={this.state.body}
						name="body"
						// rows="10" cols="10"
						className="w-full h-48 pl-3 py-2 mb-4"
						placeholder="Write your article ( in Markdown )"
					// required
					/>
					<br />
					<input onChange={this.handelChange}
						onKeyUp={this.handleKey}
						value={this.state.tags}
						name="tags" type="text"
						placeholder="Enter your tags"
						className="w-full h-10 pl-3 py-2 mb-1"
					/>
					<br />
					<div className="flex">
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
					<button
						className="text-right 
							 my-2 px-6 rounded
							 text-white h-10
							 bg-green-700 btn 
							 btn-small btn-secondary"
						type="submit"
						// disabled={
						// 	title ||
						// 	description ||
						// 	body ||
						// 	!this.state.title ||
						// 	!this.state.description ||
						// 	!this.state.body
						// }
					>
						{ !this.props.location.state ?  "Publish Article" : "Update Article" }
					</button> 
				</form>
			</div>
		)
	}
}

export default withRouter(NewEditPost);