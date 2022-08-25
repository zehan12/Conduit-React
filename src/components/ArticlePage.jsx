import { Link } from "react-router-dom";
import { Component } from "react"
import url from "../utils/constants"
import { UserContext } from "./userContext";

class ArticlePage extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            article: [],
            error:""
        }
    }

    componentDidMount() {
        const slug = this.props.match.params.slug;
        this.handelArticle(slug)
    }


    handelArticle = async ( slug ) => {
        const res = await fetch( url.globalFeed + "/"  + slug  )
        const data = await res.json();
        console.log(data,slug)
        if ( data.article )  this.setState({article:data.article})
        const res1 = await fetch( url.globalFeed + "/"  + slug+"/comments"  )
        const data1 = await res.json();
        console.log(data1)

    }


    render() {
        console.log(this.state)
        // let { title, description, body,  } = title.state.article
        return (
            <>
                <div className="flex flex-col bg-zinc-700 px-48 h-40">
                    <div>
                        <h1 className="my-5 text-white text-5xl">new article</h1>
                    </div>
                    <div className="flex items-center">
                        <div>
                            <img src="" alt="img"></img>
                        </div>
                        <div>
                            <h3 className="text-white text-l">name</h3>
                            <p className="text-white text-xs h-1">222 03003</p>
                        </div>
                    </div>
                </div>

                <div className="container my-7">
                    <div className="">
                        <p className="text-xl">JSFuck is an esoteric and educational programming style based on the atomic parts of JavaScript. It uses only six different characters to write and execute code.

                            It does not depend on a browser, so you can even run it on Node.js.

                            Example:

                            [][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]][([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])+!+[]][+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+([][[]]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+!+[]]+(+[![]]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+!+[]]]+(!![]+[])[!+[]+!+[]+!+[]]+(+(!+[]+!+[]+!+[]+[+!+[]]))[(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([]+[])[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]][([][[]]+[])[+!+[]]+(![]+[])[+!+[]]+((+[])[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]+[])[+!+[]+[+!+[]]]+(!![]+[])!+[]+!+[]+!+[]]]+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]])()((![]+[])[+!+[]]+(![]+[])[!+[]+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]+(!![]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[+!+[]+[!+[]+!+[]+!+[]]]+[+!+[]]+([+[]]+![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[!+[]+!+[]+[+[]]])

                        </p>
                    </div>
                </div>


                <div className="containe bg-red-500">
                    <div className="mx-auto bg-green-300" style={{ width: "50%" }}>
                       { !this.context.isLogedIn && <p className="text-left"> <Link> Sign in</Link> or <Link>sign up</Link> to add comments on this article.</p> }

                    </div>

                    <div className="mx-auto bg-purple-300" style={{ width: "50%" }}>
                        <div className="border-2">
                            <h4 className="m-4">Thanks bro</h4>
                        </div>
                        <div className="border-2 flex">
                            <image className="m-2" src="" alt="img"></image>
                            <h3 className="ml-3">zehan</h3>
                            <p className="ml-3">p24309</p>
                        </div>
                    </div>
                </div>
            
            </>

        )
    }
}

export default ArticlePage;