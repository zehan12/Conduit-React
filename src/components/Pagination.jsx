export default function Pagination( { articlesCount, articlePerPage,  activePageIndex, paginate } ) {

    const classes = "border border-gray-300 first:rounded-l-md last:rounded-r-md w-10 h-10 pt-1 text-center text-green-500 hover:bg-gray-200 hover:underline"
    const noOfPage = Math.floor(articlesCount/articlePerPage) || 0
    return <div style={{width:"100%"}} className="flex w-20 p-3 flex-wrap flex-row ">
        {
           Array.from(Array(noOfPage).keys()).map(( page )=> <div key={ page }
           onClick={ ()=> paginate( page +1) }
           className={ activePageIndex == page+1 ? ` ${classes} + paginate-active` : classes }>
                { page +1}
            </div>
            )
        }
    </div>
}