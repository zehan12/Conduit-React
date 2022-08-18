import { NavLink } from "react-router-dom";
import React from "react";
import PropTypes from 'prop-types';
import { UserContext } from "./userContext";

class FeedTabs extends React.Component {
  static contextType = UserContext;
  render() {
    const { tagSelected, removeTag, activeTab } = this.props;
    // console.log(this.context,"contedt")
    return <nav className="flex p-2 border ">

      {
        this.context.isLogedIn &&
        <li
          onClick={(e) => removeTag(e)}
          className="ml-3 hover:border-b-2 text-lg font-semibold hover:border-green-700 hover:text-green-500 list-none">
          <NavLink to="/" activeClassName={(tagSelected === "" && activeTab !== "Global Feed") ? "text-green-400" : ""}>
            Your Feed
          </NavLink>
        </li>
      }

      <li
        onClick={(e) => removeTag(e)}
        className="ml-3 hover:border-b-2 text-lg font-semibold hover:border-green-700 hover:text-green-500 list-none">
        <NavLink to="/" activeClassName={tagSelected === "" && activeTab !== "Your Feed" ? "text-green-400" : ""} >
          Global Feed
        </NavLink>
      </li>

      {
        tagSelected &&
        <nav className="ml-3 hover:border-b-2 text-lg font-semibold hover:border-green-700 hover:text-green-500 list-none">
          <NavLink to="/" activeClassName={tagSelected ? "text-green-400" : ""}>
            #{tagSelected.trim()}
          </NavLink>
        </nav>
      }

    </nav>
  }
}

FeedTabs.PropoTypes = {
  tagSelected: PropTypes.string,
  activeTab: PropTypes.string,
  removeTag: PropTypes.func
}

export default FeedTabs;