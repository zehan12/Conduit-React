export default function Tags ( { tags } ) {
    return (
        <div className="bg-gray-200 p-2">
            <h3>Popular Tags</h3>
            { 
                tags.map((tag)=><button key={tag+1} 
                    style={ { backgroundColor: "#818A91" } }
                    className="rounded-xl px-2 text-xs text-white m-1 p-1">
                    {tag}
                    </button>)
            }
        </div>
    )
}