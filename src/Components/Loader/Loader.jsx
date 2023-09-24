import styles from "./Loader.module.scss";
import loaderImg from "../../assets/Images/loader.gif";
import ReactDOM from "react-dom";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export const Spinner = () => {
  <div className="--center-all">
     <img src={loaderImg} alt="Loading..." />
  </div>
}

export default Loader;