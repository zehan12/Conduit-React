import Shimmer from "./Shimmer"
import SkeletonElement from "./SkeletonElement"

const SkeletonArticles = () => {
   return <div className="skeleton skeleton-wrapper">
    <SkeletonElement type="avatar" />
    <SkeletonElement type="box" />
    <SkeletonElement type="text" />
    <SkeletonElement type="para" />
    <SkeletonElement type="title" />
    <SkeletonElement type="para" />
    <SkeletonElement type="sm-text" />
    <Shimmer />
    </div>
}

export default SkeletonArticles