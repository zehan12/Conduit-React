function Tabs(props) {
    return <div className="flex p-2 border ">
        <div className="ml-3 hover:border-b-2 hover:border-green-500 hover:text-green-500"
        > Global Feed
        </div>
        {
            props.tagSelected && 
            <div className="ml-3 hover:border-b-2 hover:border-green-500 hover:text-green-500">
                #{ props.tagSelected.trim() }
                </div>
        }
    </div>
}

export default Tabs;