import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/SnipLucky.module.css";
const History = ({ phone,turnOffHistory }) => {
  const [data, setData] = useState();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const getList = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/gifts/${phone}`
      );
      setData(response.data.list);
      setUserName(response.data.user.name);
    };
    getList();
  }, []);
  return (
    <div className={styles.history_container}>
      <div className={styles.tb_modal} onClick={turnOffHistory}></div>
      <div className={styles.round_table}>
        <table className={styles.table}>
      <button className={styles.btn_close} onClick={turnOffHistory}>X</button>

          <tr className={styles.tabletr}>
            <td colspan="2">
              <h2>Khách hàng {userName}</h2>
            </td>
          </tr>
          <tr colspan="2" className={styles.tabletr}>
            <td colspan="2">
              <h3>Lịch sử quay thưởng</h3>
            </td>
          </tr>
          <tr className={styles.tabletr}>
            <th style={{ width: "40%" }}>Thời Gian</th>
            <th>Giải thưởng</th>
          </tr>

          {data
            ? data.map((item, index) => {
                return (
                  <tr className={styles.tabletr}>
                    <td>{item.createAt}</td>
                    <td>{item.gift.description}</td>
                  </tr>
                );
              })
            : ""}
        </table>
      </div>
    </div>
  );
};

export default History;
