import React from "react";
import { UserContext } from "./userContext";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi"
class AritcleHero extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props)
  }

  render( ) {
    let { title, author, slug, createdAt } = this.props.article;
    return (
      <div className="flex flex-col bg-[#292524] px-48 py-5 ">
        <div>
          <h1 className="my-5 text-white font-semibold text-4xl">{title}</h1>
        </div>
        <div className="flex items-center pb-7">
          <div className="mr-3">
            <img className="h-10 w-10 rounded-3xl" src={author.image} alt="img"></img>
          </div>
          <div className="pb-3">
            <h3 className="text-white pb-1 text-l">{author.username}</h3>
            <p className="text-zinc-400 text-xs h-1">{createdAt}</p>
          </div>
          {
            this.context.user.username === author.username &&
            <div className="flex">
              <button className="border border-zinc-400 text-xs p-1 ml-3 mr-1 text-zinc-400 hover:bg-green-600 hover:text-white">
                <Link className="flex"
                  to={
                    {
                      pathname: `/editor/${this.state.article.slug}`,
                      state: {
                        article: this.props.article
                      }
                    }

                  } > <FiEdit className="mr-1 mt-[.10rem]" /> Edit Profile</Link></button>
              <div className="border border-red-700 hover:bg-red-600 hover:text-white text-xs p-1 py-2 mx-3 text-red-700 flex cursor-pointer">
                <FaTrash className="mr-1 mt-[.10rem]" />
                <button
                  onClick={() => this.handleDeleteArticle(slug)}>
                  Delete Article</button>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default AritcleHero;