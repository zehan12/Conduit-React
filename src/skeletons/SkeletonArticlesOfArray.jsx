import SkeletonArticles from "./SkeletonArticles";
const SkeletonArticlesOFArray = () => {
    return Array.from(Array(10).keys()).map(() => <SkeletonArticles />)
  }

export default SkeletonArticlesOFArray;