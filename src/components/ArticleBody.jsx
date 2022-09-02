import React from "react";


const Text = ({ params, className }) => {
    if (typeof params === "string") {
      return <p className={className} style={{ whiteSpace: "pre-line", wordSpacing: ".50rem" }}>
        {params.split("\n").join("\r\n")}
      </p>
    } else {
      return "";
    }
}


const ArticleBody = ( { body, tags } ) => {
    return (
        <div className="container my-20 ">
          <Text className="text-lg font-mono leading-[2rem] tracking-[.10rem] antialiased hover:subpixel-antialiased"
            params={body} />
            <div className="flex py-7">
          { tags.map((tag)=><div key={tag} className="border text-zinc-500 px-1 text-sm font-extralight  mx-1 rounded-xl">{tag}</div>) }
          </div>
        </div>

    )
}

export default ArticleBody;