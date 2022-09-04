import SkeletonArticles from "../skeletons/SkeletonArticles"
import { Link } from 'react-router-dom'
import Post from "./Post"
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
          React.Children.toArray(articles.map((article) => <Post article={article}
           handleLikeDislike={handleLikeDislike}
          />
          ))
      }
    </div>

  )
}




