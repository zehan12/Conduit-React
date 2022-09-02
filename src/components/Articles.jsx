import { BsHeartFill } from 'react-icons/bs'
import SkeletonArticles from "../skeletons/SkeletonArticles"
import { Link } from 'react-router-dom'
import React from 'react'

const SkeletonArticlesOFArray = () => {
  return Array.from(Array(10).keys()).map(() => <SkeletonArticles />)
}

export default function Articles({ articles, error, isLoading, handleLikeDislike }) {

  if (!articles) {
    return <div> <SkeletonArticlesOFArray /> </div>
  }
  return (
    <div className="">

      {error && <p className='p-3 text-l font-mono'>{error}</p>}
      {articles.length === 0 ? <h1>No articles are here... yet.</h1> : ""}
      {
        isLoading ? <div> <SkeletonArticlesOFArray /> </div>
          :
          React.Children.toArray(articles.map((article) => <article className='mx-2 mb-6'>
            {console.log(article.favorited)}
            <div className='flex justify-between border-t-2 pt-7 '>

              <div className='flex mb-3'>
                <div>
                  <img className="w-12 h-12 rounded-3xl" src={article.author.image || "./images/profile.png"} alt={article.author.username} />
                </div>
                <div className=' ml-2'>
                  <h3 className="text-lg text-green-500 hover:underline hover:text-green-700 "> {article.author.username + "   " + article.favorited} </h3>
                  <p className='font-thin text-sm text-gray-400'>{String(new Date(article.createdAt)).slice(0, 16)} </p>
                </div>
              </div>

              <div onClick={() => handleLikeDislike(article.slug, article.favorited)}
                className=" flex pt-1 w-9 h-7 align-center border rounded-md m-2 mx-1 hover:bg-green-600 hover:text-white"
                >
                <BsHeartFill className="text-green-600 hover:text-white m-1 h-3" />
                <div className='font-thin text-sm'> {article.favoritesCount} </div>
              </div>
            </div>
            <div className='ml-4'>
              <h2 className="text-2xl">{article.title.substring(0, 65)}</h2>
              <p className='text-lg font-thin text-gray-500'> {article.description && article.description.substring(0, 200)} </p>
              <div className="flex justify-between mt-3 text-sm px-3 text-slate-400">
                <Link to={`/article/${article.slug}`}> Read more... </Link>
                <div className='border rounded-xl px-2'>{article.tagList}</div>
              </div>
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


