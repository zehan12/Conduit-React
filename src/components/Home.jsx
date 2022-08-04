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
      activeTab: ""
    }
  }

  // toggleTabs = (index) => {
  //   this.setState(
  //     {
  //       activeTabs: index,
  //     },
  //     () => console.log(index, this.state.activeTabs));
  //   console.log(index,this.state.activeTabs)
  // }


  componentDidMount() {
    this.fetchTags("https://mighty-oasis-08080.herokuapp.com/api/tags")

  }

  // componentDidUpdate() {
  //   console.log(this.state)
  // }


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
    this.setState({ tagSelected: e, isTagClicked: true }, () => console.log("callback", this.state.tagSelected));
  }

  removeTag = () => {
    this.setState({ tagSelected: "", isTagClicked: true }, () => console.log("callback", this.state.tagSelected));
  }

  render() {

    return (
      <>
        <Hero />
        <section className="container m-7 flex justify-between">
          <div style={{ width: "75%" }}>
            <FeedTabs 
              removeTag={this.removeTag}
              tagSelected={this.state.tagSelected}
            />
            <ArticleSection
              tagSelected={this.state.tagSelected}
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