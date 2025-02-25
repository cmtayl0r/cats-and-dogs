import styles from "./Skeleton.module.css";

function Skeleton({ classes }) {
  const classNames = `${styles["skeleton"]} ${classes} ${styles["animate-pulse"]}`;
  return <div className={classNames}></div>;
}

export default Skeleton;
