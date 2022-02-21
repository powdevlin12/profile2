import React from "react";
import styles from "../styles/SnipLucky.module.css"
const TableNotify = ({clickToOff,giftData}) => {
  return (
    <div className={styles.tb_container}>
      <div className={styles.tb_modal}></div>
      <div className={styles.tb_notify}>
        <h2>Giải Thưởng</h2>
        <h3>{giftData.name}</h3>
        <p>{giftData.description}</p>
        <button onClick={clickToOff}>OK</button>
      </div>
    </div>
  );
};

export default TableNotify;
