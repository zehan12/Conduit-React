import SkeletonArticles from "../skeletons/SkeletonArticles"
import { Link } from 'react-router-dom'
import Post from "./Post"
import React from 'react'

const SkeletonArticlesOFArray = () => {
  return Array.from(Array(10).keys()).map((i) => <SkeletonArticles key={i} />)
}

export default function Articles({ articles, error, isLoading, handleLikeDislike }) {

  if (!articles) {
    return <div> <SkeletonArticlesOFArray /> </div>
  }
  return (
    <div className="">

      {error && <p className='p-3 text-l font-mono'>{error}</p>}
      { !isLoading && articles.length === 0 ? <h1>No articles are here... yet.</h1> : ""}
      {
        isLoading ? <div> <SkeletonArticlesOFArray /> </div>
          :
          articles.map((article) => <Post key={article.slug} article={article}
          handleLikeDislike={handleLikeDislike}
          />
          )
      }
    </div>

  )
}




