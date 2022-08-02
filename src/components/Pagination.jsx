export default function Pagination( { articlesCount } ) {
 
    const noOfPage = parseInt((articlesCount/10) + .5) || 0
    return <div style={{width:"55%",marginLeft:"13.3%"}} className="flex w-40  flex-wrap flex-row ">
        {
           Array.from(Array(noOfPage).keys()).map((e)=> <div key={e}
           className="border border-gray-300 first:rounded-l-md last:rounded-r-md w-10 h-10 pt-1 text-center text-green-500
            hover:bg-gray-200 hover:underline">
                {e+1}
            </div>
            )

        }
    </div>
}