import React from "react";

function Tags(props) {
    return (
        <div className="bg-gray-200 p-2">
            <h3>Popular Tags</h3>
            { props.error && <p>{props.error}</p> }
            {
                props.tags.map((tag) => <button key={tag}
                    onClick={() => props.addTag(tag)}
                    style={{ backgroundColor: "#818A91" }}
                    className="rounded-xl px-2 text-xs text-white m-1 p-1">
                    {tag}
                </button>)
            }
        </div>
    )
}


export default Tags;