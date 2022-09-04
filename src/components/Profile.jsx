import React from "react";
import { UserContext } from "./userContext";
import url from "../utils/constants";
import { withRouter, NavLink, Link } from "react-router-dom"
import ProfileHero from "./ProfileHero";
import Post from "./Post";


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

    handleLikeDislike = async (slug, favorited) => {
        console.log(slug, favorited, "like or  dislike");
        const method = favorited ? "DELETE" : "POST";
        const urls = url.globalFeed + `/${slug}/favorite`
        console.log(method, urls);
        try {
            const res = await fetch(urls, {
                method, headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage["user_token"]}`,
                }

            });
            console.log(res);
            const data = res.json();
            if (res.ok) console.log("done")
            console.log(data)
        } catch (err) {
            console.log(err)
        }

    }

    render() {
        return (<>

            {/* //* Profile Hero */}
            <ProfileHero
              viewProfile={this.state.viewProfile}
              ContextUser={this.context}
              loginUser={this.loginUser}
              user={this.user}
              followAndUnfollowUser={this.followAndUnfollowUser}
             />

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
                    this.state.articles === null ? <h3>ON Article Yet...</h3> :
                    this.state.articles.map((article) => <Post article={article} handleLikeDislike={this.handleLikeDislike} />)
                }
            </div>
        </>
        )
    }
}

export default withRouter(Profile);