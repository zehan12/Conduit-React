import { BsHeartFill } from 'react-icons/bs'

export default function Articles({ articles }) {

    const handelLike = ( event ) => {
        event.target.children[0].className.baseVal = "text-white m-1"
    }

    return(
        <div className="border-2 border-fuchsia-400">
            
            {
                !articles && <h1 className='m-20 h-20'>Loading...</h1>
            }
            {   articles &&
                articles.map((article) => <div key={article.slug}>
                    <img className="w-10 h-10 rounded-3xl" src={article.author.image} alt="" />
                    <h3 className="text-green-500 hover:underline hover:text-green-700 "> {article.author.username} </h3>
                    <div onMouseEnter={ handelLike } 
                         onMouseLeave={ (event)=> event.target.children[0].className.baseVal = "text-green-400 m-1" }
                         className="border border-green-400 rounded text-green-500 flex w-12 align-center
                                    hover:text-white hover:bg-green-400">
                        <BsHeartFill className="text-green-600 m-1" />
                        <div> {article.favoritesCount} </div>
                    </div>
                    <p> {String(new Date(article.createdAt)).slice(0, 16)} </p>
                    <h2>{article.title}</h2>
                    <p> { article.description.substring(0,200) } </p>
                    <button> Read more... </button>
                    <div>{article.tagList}</div>
                </div>)
            }
        </div>
    )
}