import Articles from "./Articles";
import FeedBar from "./FeedBar";
import Tags from "./Tags";

export default function FeedSection( props ){
    return <section className="container m-7 flex justify-evenly">
        <div style={{width:"75%"}}>
            <FeedBar />
            <Articles articles={props.articles} />
        </div>
        <div style={{width:"20%"}}>
            <Tags tags={props.tags} />
        </div>
    </section>
}