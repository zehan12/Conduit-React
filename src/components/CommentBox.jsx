import { FaTrash } from "react-icons/fa";
function CommentBox({ comment, logedUser, handleDeleteComment }) {
    let { id, body, createdAt } = comment;
    let { image, username } = comment.author
    return (
        <>
            <div className="border p-2 py-6 mt-4">
                <h4 className="m-4"> {body} </h4>
            </div>
            <div className="border bg-zinc-100 p-2 mb-4 flex justify-between">
                <div className="flex"> 
                    <img className="h-5 w-5 rounded-xl" src={image} alt="img" />
                     <h3 className="ml-3 text-xs text-[#5CB85C]"> {username} </h3>
                    <p className="ml-3 text-xs  text-slate-400"> {createdAt} </p> 
                </div>
                {
                    logedUser === username &&
                    <div className="cursor:pointer">
                        <FaTrash
                            className="hover:text-red-700 text-sm"
                            onClick={() => handleDeleteComment(id)} />
                    </div>
                }
            </div>
        </>

    )
}

export default CommentBox;