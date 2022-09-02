import { NavLink } from "react-router-dom";
import React from "react";
import PropTypes from 'prop-types';
import { UserContext } from "./userContext";

class FeedTabs extends React.Component {
  static contextType = UserContext;
  render() {
    const { tagSelected, removeTag, activeTab } = this.props;
    const classes = "ml-3 hover:border-b-2 text-g font-thin hover:border-bg-[#5CB85C] hover:text-[#5CB85C]  list-none"
    return <nav className="flex p-2 border ">
      {
        this.context.isLogedIn &&
        <li
          onClick={(e) => removeTag(e)}
          className={classes}>
          <NavLink to="/" activeClassName={(tagSelected === "" && activeTab !== "Global Feed") ? "text-[#5CB85C]  " : ""}>
            Your Feed
          </NavLink>
        </li>
      }

      <li
        onClick={(e) => removeTag(e)}
        className={classes}>
        <NavLink to="/" activeClassName={tagSelected === "" && activeTab !== "Your Feed" ? "text-[#5CB85C]  " : ""} >
          Global Feed
        </NavLink>
      </li>

      {
        tagSelected &&
        <nav className={classes}>
          <NavLink to="/" activeClassName={tagSelected ? "text-[#5CB85C]" : ""}>
            #{tagSelected.trim()}
          </NavLink>
        </nav>
      }

    </nav>
  }
}

FeedTabs.propTypes = {
  tagSelected: PropTypes.string,
  activeTab: PropTypes.string,
  removeTag: PropTypes.func
}

export default FeedTabs;