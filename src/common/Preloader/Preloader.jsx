import React from "react";
import preloader from "../../images/loader.gif";
import styles from "./Preloader.module.css";

const Preloader = () => (
        <div className={styles.preloader}>
            <img src={ preloader } alt="preloader"/>
        </div>
);

export default Preloader;


