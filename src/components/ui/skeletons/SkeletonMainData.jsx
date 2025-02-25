import Skeleton from "./Skeleton";

function SkeletonMainData() {
  return (
    <div className="skeleton-main-data" style={{ backgroundColor: "#f3f3f3" }}>
      <Skeleton classes="title width-50" />
      <Skeleton classes="icon-circle width-100" />
      <Skeleton classes="title width-100" />
      <Skeleton classes="title width-100" />
      <Skeleton classes="title width-100" />
    </div>
  );
}

export default SkeletonMainData;
