import { Link } from "react-router-dom";

export default function FeedBar( props) {
    console.log(props,"i am not wrong")
    return <div className="flex bg-red-500">
        <div className="hover:border-b-2 hover:border-green-500 hover:text-green-500">
            <Link>Feed</Link></div>
        <div className="hover:border-b-2 hover:border-green-500 hover:text-green-500">
            <Link>Global</Link>
        </div>
        {
            props.tagSelected  && <div>
                
                <h1>#{props.tagSelected}</h1>
                </div>
        }
        
    </div>
}