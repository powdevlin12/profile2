import React, { useState } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/SnipLucky.module.css";
import axios from "axios";
import TableNotify from "../../components/TableNotify";
const SnipLucky = () => {
  const [rotateStatus, setRotateStatus] = useState(`${styles.circle}`);
  const startRotation = () => {
    setRotateStatus(`${styles.circle} ${styles.start_rotate}`);
    setTimeout(() => {
      setRotateStatus(
        `${styles.circle} ${styles.start_rotate} ${styles.stop_rotate}`
      );
    }, Math.floor(Math.random() * 7000) + 1000);
  };
  const [isDisplay, setIsDisplay] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const handleChangeInput = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const [giftData, setGiftData] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/gifts/users",
        info
      );
      setGiftData(response.data.gift);
      clickToOff();
      console.log(response.data);
      startRotation();
    } catch (error) {
      console.log(error);
    }
  };
  const clickToOff = () => {
    setIsDisplay(!isDisplay);
  };
  return (
    <Layout>
      {isDisplay && <TableNotify clickToOff={clickToOff} giftData={giftData ? giftData : " "}/>}
      <div className={styles.container}>
        <form
          className={styles.form_user}
          method="post"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Nhập họ và tên </label>
          <input type="text" name="name" onChange={handleChangeInput} />
          <label htmlFor="email">Email</label>
          <input type="text" name="email" onChange={handleChangeInput} />
          <label htmlFor="phone">Số điện thoại </label>
          <input type="text" name="phone" onChange={handleChangeInput} />
          <button type="submit" className={styles.spin_button}>
            Quay Thưởng
          </button>
          <button className={styles.spin_button}>
            Xem Lịch Sử
          </button>
        </form>
        <div className={styles.container_snip}>
          <div className={styles.arrow}></div>
          <ul className={rotateStatus}>
            <li className={styles.item}>
              <div className={styles.text}>1</div>
            </li>
            <li className={styles.item}>
              <div className={styles.text}>2</div>
            </li>
            <li className={styles.item}>
              <div className={styles.text}>3</div>
            </li>
            <li className={styles.item}>
              <div className={styles.text}>4</div>
            </li>
            <li className={styles.item}>
              <div className={styles.text}>5</div>
            </li>
            <li className={styles.item}>
              <div className={styles.text}>6</div>
            </li>
            <li className={styles.item}>
              <div className={styles.text}>7</div>
            </li>
            <li className={styles.item}>
              <div className={styles.text}>8</div>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default SnipLucky;
