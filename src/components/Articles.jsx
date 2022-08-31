import { BsHeartFill } from 'react-icons/bs'
import SkeletonArticles from "../skeletons/SkeletonArticles"
import { Link } from 'react-router-dom'
import React from 'react'

export default function Articles({ articles, error, isLoading }) {

  if (!articles) {
    return Array.from(Array(10).keys()).map(() => <SkeletonArticles />)
  }
  return (
    <div className="border-2  border-fuchsia-400">

      {error && <p className='p-3 text-l font-mono'>{error}</p>}
      {articles.length === 0 ? <h1>No articles are here... yet.</h1> : ""}
      {
        isLoading ? Array.from(Array(10).keys()).map(() => <SkeletonArticles />)
          :
          React.Children.toArray(articles.map((article) => <article>
            <div className='flex justify-between'>
              <div className='flex'>
                <div>
                  <img className="w-10 h-10 rounded-3xl" src={article.author.image || "./images/profile.png"} alt="article.author.username" />
                </div>
                <div className=' ml-2'>
                  <h3 className="text-green-500 hover:underline hover:text-green-700 "> {article.author.username} </h3>
                  <p> {String(new Date(article.createdAt)).slice(0, 16)} </p>
                </div>
              </div>
              <div
                className=" flex pt-1 w-9 h-7 align-center bg-red-400">
                <BsHeartFill className="text-green-600 m-1" />
                <div className=' text-sm'> {article.favoritesCount} </div>
              </div>
            </div>
            <h2 className="text-2xl">{article.title}</h2>
            <p className='text-xl text-slate-400'> {article.description && article.description.substring(0, 200)} </p>
            <div className="flex justify-between">
              <Link to={`/article/${article.slug}`}> Read more... </Link>
              <div>{article.tagList}</div>
            </div>
          </article>
          ))
      }
    </div>

  )
}



// {
//   "border - green - 400 rounded text-green-500 hover:text-white hover:bg-green-400"
// }


