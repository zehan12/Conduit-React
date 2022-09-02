import React from "react";
import { UserContext } from "./userContext";
import url from "../utils/constants";
import { withRouter, NavLink, Link } from "react-router-dom"


class Profile extends React.Component {
    static contextType = UserContext;
    user = this.props?.location?.pathname.split("/")[2];
    loginUser = this.context?.user?.username

    state = {
        tabSelected: "MyArticle",
        viewProfile: {},
        articles: null,
        error: ""
    };

    componentDidMount() {
        if (this.loginUser && this.user === this.loginUser) {
            let token = localStorage["token_user"]
            this.getProfile(this.loginUser, token)
        }
        if ((this.loginUser && this.user !== this.loginUser) || !this.loginUser) {
            let token = localStorage["user_token"] ? `Token ${localStorage["user_token"]}` : '';
            this.getProfile(this.user, token)
        }
        if (this.state.tabSelected === "MyArticle") {
            console.log("here")
            this.handleArticle(this.user, "author")
        }
        if (this.state.tabSelected === "favourites") {
            this.handleArticle(this.user, "favorited")
        }
    }

    getProfile = async (user, token) => {
        const res = await fetch(url.userProfiles + '/' + user, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        })
        const data = await res.json()
        if (!res.ok) return Promise.reject('Unable to fetch profile!');
        if (data.profile && res.ok && res.status === 200) return this.setState({ viewProfile: data.profile }, () => console.log(this.state.viewProfile, "p"));
        if (data.error) this.setState({ error: data.error });
    }

    handleArticle = async (profileUser, key) => {
        const res = await fetch(url.globalFeed + `?${key}=${profileUser}`);
        const data = await res.json();
        if (data.articles) this.setState({ articles: data.articles });
    }

    followAndUnfollowUser = async (user, following) => {
        const method = following === true ? "DELETE" : "POST";
        const res = await fetch(url.userProfiles + "/" + user + "/follow", { method, headers: { 'Content-Type': 'application/json', Authorization: `Token ${localStorage["user_token"]}` } });
        const data = await res.json();
        const profile = { ...this.state.viewProfile };//need to know
        profile.following = data.profile.following;// need to know
        this.setState({ viewProfile: profile });
    }

    handleTab = (tab) => {
        if (tab === "My Articles") {
            this.setState({ tabSelected: "My Articles" },
                () => this.handleArticle(this.user, "author")
            )
        }
        if (tab !== "My Articles") {
            this.setState({ tabSelected: "favourites" },
                () => this.handleArticle(this.user, "favorited")
            )
        }
    }

    render() {
        return (<>

            {/* //* Profile Hero */}
            <div className=" bg-gray-100 h-full py-7">
                <img className="w-36 h-36 rounded-3xl mx-auto" src={this.state.viewProfile.image || "https://source.unsplash.com/random/200x200?sig=incrementingIdentifier"} alt={this.state.viewProfile.username} />
                <h2 className="text-center text-2xl font-semi"> {this.state.viewProfile.username} </h2>
                <h3 className="text-center">{this.state.viewProfile.bio}</h3>
                {this.context.isLogedIn ? <h1>logedIn: true && following: {this.state.viewProfile.following ? "true" : "false"}</h1> : <h1>logedIn: false</h1>}
                {
                    (this.context.isLogedIn && this.loginUser === this.user) ? <button className="border-2 p-2" >Edit Profile Settings</button>


                        : (this.context.isLogedIn && this.loginUser !== this.user) ? <button
                            className="border-2 p-2" onClick={() => this.followAndUnfollowUser(this.user, this.state.viewProfile.following)}>
                            {this.state.viewProfile.following ? "unfollow" : "follow"
                            }</button>
                            : <button className="border-2 p-2 bg-red-800 text-white cursor-not-allowed hover:bg-purple-400 text-xs">Login to Follow {this.user}</button>

                }
            </div>

            {/* //*Profile FeedBar */}
            <div className="container flex" style={{ width: "75%" }}>
                <li className="m-2 list-none" onClick={(e) => this.handleTab(e.target.innerText)}>
                    <NavLink to={`/profile/${this.user}`} activeClassName={this.props.location.pathname.includes("favorites") ? "" : "text-green-400"} >
                        My Articles
                    </NavLink>
                </li>
                <li className="m-2 list-none" onClick={(e) => this.handleTab(e.target.innerText)}>
                    <NavLink to={`/profile/${this.user}/favorites`} activeClassName={"text-green-400"} >
                        Favorited Articles
                    </NavLink>
                </li>
            </div>


            {/* //*prdfile Posts  */}
            <div className="container flex flex-col" style={{ width: "75%" }}>

                {
                    this.state.articles === null ? <h3>OH NO MY ARTICLES!!!</h3> :
                        this.state.articles.map((article) => <article key={article.slug}>
                            <div className="flex justify-between">
                                <div className="flex" >
                                    <div>
                                        <img className="w-10 h-10 rounded-3xl" src={article.author.image || "./images/profile.png"} alt="article.author.username" />
                                    </div>
                                    <div className="bg-red-500 ml-2">
                                        <h3 className="text-green-500 hover:underline hover:text-green-700 "> {article.author.username} </h3>
                                        <p> {String(new Date(article.createdAt)).slice(0, 16)} </p>
                                    </div>
                                </div>

                                <div
                                    className=" border-green-400 rounded text-green-500 flex w-12 align-center
                                    hover:text-white hover:bg-green-400">
                                    {/* <BsHeartFill className="text-green-600 m-1" /> */}
                                    <div>{article.favoritesCount} </div>
                                </div>
                            </div>
                            <h2 className="text-2xl">{article.title}</h2>
                            <p className="text-xl text-slate-400"> {article.description && article.description.substring(0, 200)} </p>
                            <div className="flex justify-between">
                                <Link to={`/article/${article.slug}`}> Read more... </Link>
                                <div>{article.tagList}</div>
                            </div>
                            <div className="border-black"></div>
                        </article>)
                }
            </div>

        </>
        )
    }
}

export default withRouter(Profile);