import React from "react";
import Hero from "./Hero";
import ArticleSection from "./ArticleSection";
import Tags from "./Tags";
import FeedTabs from "./FeedTabs";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      tags: [],
      tagSelected: "",
      isTagClicked: false,
      activeTab: "",
    }
  }

  componentDidMount() {
    this.setState({ activeTab:this.props.isLogedIn ? "Your Feed": "Global Feed" });
    this.fetchTags("https://mighty-oasis-08080.herokuapp.com/api/tags")
  }

  fetchTags = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      const data = await res.json();
      if (data) this.setState({ tags: data.tags });
    } catch (error) {
      return this.setState({ error: "NOT ABLE TO FETCH" })
    }
  }

  addTag = (e) => {
    this.setState({ tagSelected: e}, () => console.log("callback", this.state.tagSelected));
  }

  removeTag = (e) => {
    console.log(e.target.innerText)
    this.setState({ tagSelected: "", activeTab: e.target.innerText }, () => console.log("callback", this.state.tagSelected));
  }

  render() {

    return (
      <>
        <Hero />
        <section className="container m-7 flex justify-between">
          <div style={{ width: "75%" }}>
            <FeedTabs 
              isLogedIn={this.props.isLogedIn}
              removeTag={this.removeTag}
              tagSelected={this.state.tagSelected}
              activeTab={this.state.activeTab}
            />
            <ArticleSection
              isLogedIn={this.props.isLogedIn}
              tagSelected={this.state.tagSelected}
              activeTab={this.state.activeTab}
              user={this.props.user}
            />
          </div>
          <div style={{ width: "23%" }}>
            <Tags
              tags={this.state.tags}
              addTag={this.addTag}
              error={this.state.error}
            />
          </div>
        </section>
      </>
    )
  }
}

export default Home;