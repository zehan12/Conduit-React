import { BsHeartFill } from 'react-icons/bs'
import { Link } from "react-router-dom"
function Post({article, handleLikeDislike}) {
let Style = "parent flex pt-1 w-9 h-7 align-center border rounded-md m-2 mx-1 hover:bg-[#5CB85C]  hover:text-white cursor-pointer"
    return (<article className='mx-2 mb-6'>
        <div className='flex justify-between border-t-2 pt-7 '>
            <div className='flex mb-3'>
                <div>
                    <img className="w-12 h-12 rounded-3xl" src={article.author.image || "./images/profile.png"} />
                </div>
                <Link to={`/profile/${article.author.username}`} className=' ml-2'>
                    <h3 className="text-lg text-green-500 hover:underline hover:text-green-700 "> {article.author.username + "   " + article.favorited} </h3>
                    <p className='font-thin text-sm text-gray-400'>{String(new Date(article.createdAt)).slice(0, 16)} </p>
                </Link>
            </div>

            <div onClick={() =>handleLikeDislike(article.slug, article.favorited) }
                className={ article.favorited ?  Style + " bg-[#5CB85C] parent-active" : Style  }
            >
                <BsHeartFill className="text-[#5CB85C] hover:text-white m-1 h-3 child" />
                <div className='font-thin text-[#5CB85C] text-sm child'> {article.favoritesCount} </div>
            </div>
        </div>
        <div className='ml-4'>
            <h2 className="text-2xl">{article.title.substring(0, 60)}</h2>
            <p className='text-lg font-thin text-gray-500'> {article.description && article.description.substring(0, 200)} </p>
            <div className="flex justify-between mt-3 text-sm px-3 text-slate-400">
                <Link to={`/article/${article.slug}`}> Read more... </Link>
                <div className='border rounded-xl px-2'>{article.tagList}</div>
            </div>
        </div>
    </article>)
}

export default Post;