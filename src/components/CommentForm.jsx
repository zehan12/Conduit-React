function CommentForm( { handleChange, commentBody, img, handleCreateComment } ) {
  return (
    <>
      <textarea 
      onChange={handleChange}
        value={commentBody}
        name="commentBody"
        className="border border-b-0 w-full h-28 p-5" placeholder="write a comment...">
      </textarea>
      <div className="border bg-zinc-100 p-4 flex justify-between">
        <img className="h-8 w-8 rounded-3xl" src={img} alt="profile" />
        <button onClick={handleCreateComment} disabled={( commentBody &&  commentBody.trim().length) ? false : true}
          className="border bg-[#5CB85C] text-sm p-1 font-bold text-white">Post Comment</button>
      </div>
    </>
  )
}

export default CommentForm;