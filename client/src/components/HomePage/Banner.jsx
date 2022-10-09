import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.frameDiv}>
      <div className={styles.groupDiv}>
        <img
          className={styles.f8140faec46017976ce96ee20decfeIcon}
          alt=""
          src="/banner.png"
        />
      </div>
    </div>
  );
};

export default Banner;
