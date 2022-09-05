import React from "react";
import { UserContext } from "./userContext";
import url from "../utils/constants";
import { withRouter, NavLink, Link } from "react-router-dom"
import ProfileHero from "./ProfileHero";
import Post from "./Post";
import ProfileApi from "../APIs/profile";
import { toast } from "react-toastify";
import ArticleApi from "../APIs/article";
import SkeletonArticlesOFArray from "../skeletons/SkeletonArticlesOfArray";


class Profile extends React.Component {
    static contextType = UserContext;
    user = this.props?.location?.pathname.split("/")[2];
    loginUser = this.context?.user?.username

    state = {
        tabSelected: "MyArticle",
        viewProfile: {},
        articles: [],
        error: "",
        loading: false,
        articleLoading: false
    };

    componentDidMount() {
        if (this.loginUser && this.user === this.loginUser) {

            this.getProfile(this.loginUser)
        }
        if ((this.loginUser && this.user !== this.loginUser) || !this.loginUser) {

            this.getProfile(this.user)
        }
        if (this.state.tabSelected === "MyArticle") {
            console.log("here")
            this.fetchArticle(this.user, "author")
        }
        if (this.state.tabSelected === "favourites") {
            this.fetchArticle(this.user, "favorited")
        }
    }



    getProfile = async (user, token) => {
        try {
            const res = await ProfileApi.getProfile(user);
            const data = await res.json()
            if (!res.ok) return Promise.reject('Unable to fetch profile!');
            if (data.profile && res.ok && res.status === 200) return this.setState({ viewProfile: data.profile });
            if (data.error) this.setState({ error: data.error });
        } catch {
            toast.error("Something went Wrong in Loading Profile!!!")
        }
    }

    fetchArticle = async (profileUser, key) => {
        try {
            this.setState( { articles: [], articleLoading: true } )
            const res = key === "author" ? await ArticleApi.byAuthor(profileUser) : await ArticleApi.ByFavorited( profileUser )
            const data = await res.json()
            if (data.errors) toast.error("articles :" + data.errors.message)
            if (!res.ok) toast.error(`${res.status}: ${res.statusText}`);
            if ( res.ok ) toast.success("fetched Articles")
            if (data.articles) this.setState({ articles: data.articles });
        } catch (error) {
            toast.error(error.toString() || 'There was an error!')
        } finally {
            this.setState( ( prevState ) => ( { ...prevState, articleLoading: false } ) );
        }
    }

    followAndUnfollowUser = async (user, following) => {
        try {
            this.setState({ loading: true })
            const res = following ? await ProfileApi.unfollowUser(user) : await ProfileApi.followUser(user);
            const data = await res.json();
            if (res.status === 200 && res.ok) {
                const profile = { ...this.state.viewProfile };
                profile.following = data.profile.following;
                this.setState({ viewProfile: profile });
                if (data.profile.following) {
                    toast.success(`you start following ${data.profile.username}`)
                } else {
                    toast.success(`unfollowed ${data.profile.username}`)
                }
            }
            if (data.errors) {
                toast.error(data.errors.message)
            }
            if (!res.ok) {
                toast.error(`${res.status}: ${res.statusText}`);
            }
        } catch (error) {
            toast.error(error.toString() || 'There was an error!')
        } finally {
            this.setState((prevState) => ({ ...prevState, loading: false }));
        }
    }

    handleTab = (tab) => {
        if (tab === "My Articles") {
            this.setState({ tabSelected: "My Articles" },
                () => this.fetchArticle(this.user, "author")
            )
        }
        if (tab !== "My Articles") {
            this.setState({ tabSelected: "favourites" },
                () => this.fetchArticle(this.user, "favorited")
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
        // console.log(this.state.viewProfile)
        return (<>

            {/* //* Profile Hero */}
            <ProfileHero
                viewProfile={this.state.viewProfile}
                ContextUser={this.context}
                loginUser={this.loginUser}
                user={this.user}
                followAndUnfollowUser={this.followAndUnfollowUser}
                loading={this.state.loading}
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
                    this.state.articleLoading ?  <SkeletonArticlesOFArray/> :
                    this.state.articles.length === 0 ? <h3> No articles are here... yet. </h3> :
                    this.state.articles.map((article) => <Post article={article} handleLikeDislike={this.handleLikeDislike} />)
                }
            </div>
        </>
        )
    }
}

export default withRouter(Profile);