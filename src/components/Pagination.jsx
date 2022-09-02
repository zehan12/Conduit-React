export default function Pagination( { articlesCount, articlePerPage,  activePageIndex, paginate } ) {
    const classes = " border border-gray-300 first:rounded-l-md last:rounded-r-md p-2 w-10  text-center  hover:bg-gray-200 hover:underline"
    const noOfPage = Math.floor(articlesCount/articlePerPage) || 33
    return <div style={{width:"100%"}} className="flex w-20 p-3 flex-wrap flex-row">
        {
           Array.from(Array(noOfPage).keys()).map(( page )=> <div key={ page }
           onClick={ ()=> paginate( page +1) }
           className={ activePageIndex == page+1 ? ` ${classes} + paginate-active + + text-white + hover:text-[#5CB85C]` : `${classes} + text-[#5CB85C]` }>
                { page +1}
            </div>
            )
        } 
    </div>
}