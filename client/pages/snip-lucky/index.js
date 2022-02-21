import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/SnipLucky.module.css";
import axios from "axios";
import TableNotify from "../../components/TableNotify";
import Link from "next/link";
const SnipLucky = () => {
  const [rotateStatus, setRotateStatus] = useState(`${styles.circle}`);
  const startRotation = () => {
    setRotateStatus(`${styles.circle} ${styles.start_rotate}`);
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
  const [count, setCount] = useState(true);
  const [reload,setReload]=useState([]);
  useEffect(() => {
    const getCount = async () => {
      try {
        let response = await axios.get(
          `http://localhost:5000/api/gifts/${info.phone}/count`
        );
        setCount(response.data.success);
        console.log(count);
      } catch (error) {
        console.log(error);
      }
    };
    getCount();
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setReload([...reload,reload.push(1)]);
    if (!count) {
      alert("Bạn đã quay đủ 5 lần, quay lại vào ngày mai !");
      return;
    }else
    {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/gifts/users",
          info
        );
        setGiftData(response.data.gift);
        console.log(response.data);
        startRotation();
        const time = Math.floor(Math.random() * 7000) + 1000;
        setTimeout(() => {
          setRotateStatus(
            `${styles.circle} ${styles.start_rotate} ${styles.stop_rotate}`
          );
        }, time);
        setTimeout(() => {
          clickToOff();
        }, time + 500);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const clickToOff = () => {
    setIsDisplay(!isDisplay);
  };
  return (
    <Layout>
      {isDisplay && (
        <TableNotify
          clickToOff={clickToOff}
          giftData={giftData ? giftData : " "}
        />
      )}
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
          <Link href={`/snip-lucky/history/${info.phone}`}>
            <button className={styles.spin_button}>Xem Lịch Sử</button>
          </Link>
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
