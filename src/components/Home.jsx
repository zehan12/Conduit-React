import React from "react";
import Hero from "./Hero";
import ArticleSection from "./ArticleSection";
import Tags from "./Tags";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      tags: [],
      tagSelected: "",
      isTagClicked:false,
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

  handleTags = (e) => {
    this.setState({ tagSelected: e, isTagClicked:true  }, () => console.log("callback", this.state.tagSelected));
  }

  componentDidMount() {
    this.fetchTags("https://mighty-oasis-08080.herokuapp.com/api/tags")

  }

  // componentDidUpdate() {
  //   console.log(this.state)
  // }


  fetchTags = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data) this.setState({ tags: data.tags });
      // console.log(this.state, "tags")

    } catch (err) {
      return err
    }
  }

  render() {

    return (
      <>
        <Hero />
        <section className="container m-7 flex justify-between">
          <div style={{ width: "75%" }}>
            <ArticleSection
              tagSelected={this.state.tagSelected}
              isTagClicked={this.state.isTagClicked}
            />
          </div>
          <div style={{ width: "23%" }}>
            <Tags
              tags={this.state.tags}
              handleTags={this.handleTags}
            />
          </div>
        </section>
        {/* <FeedSection 
         tagSelected={this.state.tagSelected}
         handleTags={this.handleTags}
         articles={ this.state.articles }
         articlesCounts={ this.state.articlesCount }
         tags={ this.state.tags }
         activeTabs={ this.state.activeTabs }
         toggleTabs={ this.toggleTabs }
         tabsNav={ this.state.tabsNav }
        /> */}
        {/* <Pagination articlesCount={ this.state.articlesCount } /> */}
      </>
    )
  }
}

export default Home;