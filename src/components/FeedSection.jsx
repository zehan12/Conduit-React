import Articles from "./Articles";
import FeedBar from "./FeedBar";
import Tags from "./Tags";

export default function FeedSection( props ){
    return <section className="container m-7 flex justify-between">
        <div style={{width:"75%"}}>
            <FeedBar tagSelected={props.tagSelected} />
            <Articles articles={props.articles}
            tagSelected={props.tagSelected} 
            />
        </div>
        <div style={{width:"23%"}}>
            <Tags tags={props.tags} 
            tagSelected={props.tagSelected} 
            handleTags={props.handleTags}
            />
        </div>
    </section>
}