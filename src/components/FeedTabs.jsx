import { NavLink } from "react-router-dom";

function FeedTabs(props) {
    return <nav className="flex p-2 border ">
        <li
            onClick={props.removeTag}
            className="ml-3 hover:border-b-2 text-lg font-semibold hover:border-green-700 hover:text-green-500 list-none"> 
            <NavLink to="/" activeClassName={ props.tagSelected === "" ? "text-green-400" : ""}>Global Feed</NavLink>
        </li>
        {
            props.tagSelected &&
            <nav className="ml-3 hover:border-b-2 text-lg font-semibold hover:border-green-700 hover:text-green-500 list-none">
                <NavLink to="/" activeClassName={ props.tagSelected ? "text-green-400" : ""}>
                #{props.tagSelected.trim()}
                </NavLink>
            </nav>
        }
    </nav>
}

export default FeedTabs;