import { BsHeartFill } from 'react-icons/bs'
import SkeletonArticles from "../skeletons/SkeletonArticles"
import { Link } from 'react-router-dom'

export default function Articles({ articles, error, isLoading }) {

  if (!articles) {
    return Array.from(Array(10).keys()).map(() => <SkeletonArticles />)
  }
  return (
    <div className="border-2  border-fuchsia-400">

      {error && <p className='p-3 text-l font-mono'>{error}</p>}
      { articles.length === 0 ? <h1>No articles are here... yet.</h1> : "" }
      {
        isLoading ? Array.from(Array(10).keys()).map(() => <SkeletonArticles />)
          :
          articles.map((article) => <article key={article.slug}>
            <img className="w-10 h-10 rounded-3xl" src={article.author.image || "./images/profile.png"} alt="article.author.username" />
            <h3 className="text-green-500 hover:underline hover:text-green-700 "> {article.author.username} </h3>
            <div
              className=" border-green-400 rounded text-green-500 flex w-12 align-center
                                    hover:text-white hover:bg-green-400">
              <BsHeartFill className="text-green-600 m-1" />
              <div> {article.favoritesCount} </div>
            </div>
            <p> {String(new Date(article.createdAt)).slice(0, 16)} </p>
            <h2>{article.title}</h2>
            <p> { article.description && article.description.substring(0, 200)} </p>
            <Link to={`/article/${article.slug}`}> Read more... </Link>
            <div>{article.tagList}</div>
          </article>)
      }
    </div>

  )
}




