import React from "react";
import Hero from "./Hero";
import ArticleSection from "./ArticleSection";
import Tags from "./Tags";
import FeedTabs from "./FeedTabs";
import PropTypes from "prop-types";
import TagApi from "../APIs/tag";
import { toast } from "react-toastify"

// toast.configure();
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      tags: [],
      tagSelected: "",
      activeTab: "",
    }
  }

  componentDidMount() {
    this.setState({ activeTab: this.props.isLogedIn ? "Your Feed" : "Global Feed" });
    this.fetchTags();
  }


  fetchTags = async (url) => {
    try {
      const res = await TagApi.getAll();

      if (!res.ok) {
        throw new Error(res.statusText)
      }
      const data = await res.json();
      console.log(data)
      console.log(res)
      if (data && res.ok) {
        this.setState({ tags: data.tags });
        toast.success("Fetched Tags");
      }
    } catch (error) {
      this.setState({ error: "NOT ABLE TO FETCH" })
      toast.error(error)
    }
  }

  addTag = (e) => {
    this.setState({ tagSelected: e }, () => console.log("callback", this.state.tagSelected));
  }

  removeTag = (e) => {
    console.log(e.target.innerText)
    this.setState({ tagSelected: "", activeTab: e.target.innerText }, () => console.log("callback", this.state.tagSelected));
  }
  notify = () => toast("Wow so easy!");

  render() {
    // console.log(this.fe())
    return (
      <>
        <Hero />
        <section className="container m-7 flex justify-between">
          <div style={{ width: "75%" }}>
            <FeedTabs
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

Home.propTypes = {
  isLogedIn: PropTypes.bool.isRequired,
  user: PropTypes.object
}


export default Home;