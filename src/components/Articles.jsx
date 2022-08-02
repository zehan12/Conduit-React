import { BsHeartFill } from 'react-icons/bs'
import SkeletonArticles from "../skeletons/SkeletonArticles"
import { Link } from 'react-router-dom'

export default function Articles({ articles, tagArticles }) {

    // switch ( articles ) {
    //     case "global":
    //         console.log("global");
    //         break;
    //     case "feed":
    //         console.log("feed");
    //         break;
    //     case "tags":
    //         console.log("tags");
    //         break;
    //     default:
    //         break;
    // }
    console.log(tagArticles, "articles")
    return (
        <div className="border-2  border-fuchsia-400">

            {
                !tagArticles ?
                    articles.map((article) => <div key={article.slug}>
                        <img className="w-10 h-10 rounded-3xl" src={article.author.image} alt="" />
                        <h3 className="text-green-500 hover:underline hover:text-green-700 "> {article.author.username} </h3>
                        <div
                            className=" border-green-400 rounded text-green-500 flex w-12 align-center
                                    hover:text-white hover:bg-green-400">
                            <BsHeartFill className="text-green-600 m-1" />
                            <div> {article.favoritesCount} </div>
                        </div>
                        <p> {String(new Date(article.createdAt)).slice(0, 16)} </p>
                        <h2>{article.title}</h2>
                        <p> {article.description.substring(0, 200)} </p>
                        <Link to={`article/${article.slug}`}> Read more... </Link>
                        <div>{article.tagList}</div>
                    </div>)
                    :
                    tagArticles ?
                        tagArticles.map((article) => <div key={article.slug}>
                            <img className="w-10 h-10 rounded-3xl" src={article.author.image} alt="" />
                            <h3 className="text-green-500 hover:underline hover:text-green-700 "> {article.author.username} </h3>
                            <div
                                className=" border-green-400 rounded text-green-500 flex w-12 align-center
                            hover:text-white hover:bg-green-400">
                                <BsHeartFill className="text-green-600 m-1" />
                                <div> {article.favoritesCount} </div>
                            </div>
                            <p> {String(new Date(article.createdAt)).slice(0, 16)} </p>
                            <h2>{article.title}</h2>
                            <p> {article.description.substring(0, 200)} </p>
                            <Link to={`article/${article.slug}`}> Read more... </Link>
                            <div>{article.tagList}</div>
                        </div>)
                        :
                         Array.from(Array(10).keys()).map(() => <SkeletonArticles />)
                    
            }
        </div>
    
    )
}