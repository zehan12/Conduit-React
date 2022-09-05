import Icon from "./Icon";
function ProfileHero({ viewProfile, ContextUser, loginUser, user, followAndUnfollowUser, loading }) {
    return <div className=" bg-gray-100 p-12 my-4">
        <img className="w-36 h-36 rounded-3xl mx-auto" src={viewProfile.image || "https://source.unsplash.com/random/200x200?sig=incrementingIdentifier"} alt={viewProfile.username} />
        <h2 className="text-center text-2xl font-semi"> {viewProfile.username} </h2>
        <h3 className="text-center">{viewProfile.bio}</h3>
        {
            loading ? <div className="float float-right flex border-2 p-2 bg-red-600"><Icon />loading... </div>
                : (ContextUser.isLogedIn && loginUser === user) ? <button className="float float-right mx-48 border-2 text-sm" >Edit Profile Settings</button>
                    : (ContextUser.isLogedIn && loginUser !== user) ? <button className="float float-right border-2 p-2  bg-red-600" onClick={() => followAndUnfollowUser(user, viewProfile.following)}> {viewProfile.following ? "unfollow"
                        : "follow"} </button>
                           : <button className="border-2 p-2 bg-red-800 text-white cursor-not-allowed hover:bg-purple-400 text-xs">Login to Follow {user}</button>
        }
    </div>
}

export default ProfileHero;