import Shimmer from "./Shimmer"
import SkeletonElement from "./SkeletonElement"

const SkeletonArticles = () => {
    return <div className="skeleton skeleton-wrapper">
        <div className='flex justify-between'>
            <div className='flex'>
                <div>
                    <SkeletonElement type="avatar" />
                </div>
                <div className='ml-2 mt-2'>
                    <SkeletonElement type="text" />
                    <SkeletonElement type="para" />
                </div>
            </div>
            <div>
                <SkeletonElement type="box" />
            </div>
        </div>
        <SkeletonElement type="title" />
        <SkeletonElement type="para" />
        <SkeletonElement type="sm-text" />
        <Shimmer />
    </div>
}

export default SkeletonArticles