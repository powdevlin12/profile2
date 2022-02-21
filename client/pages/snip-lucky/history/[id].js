import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import styles from "../../../styles/SnipLucky.module.css";
import Router, { useRouter } from "next/router";
import axios from "axios";
const History = () => {
  const router = useRouter();
  const [data, setData] = useState();
  const [userName,setUserName]=useState("");
  useEffect(() => {
    const getList = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/gifts/${router.query.id}`
      );
      setData(response.data.list);
      setUserName(response.data.user.name);
    };
    getList();
  }, []);
  return (
    <Layout>
      <table className={styles.table}>
        <tr className={styles.tabletr}>
          <td colspan="2"><h2>Khách hàng {userName}</h2></td>
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
        {/* {data ? (
          <tr className={styles.tabletr}>
            <td>{data.createAt}</td>
            <td>{data.gift}</td>
          </tr>
        ) : (
          " "
        )} */}

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
    </Layout>
  );
};

export default History;
