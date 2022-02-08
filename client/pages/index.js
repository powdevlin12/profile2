import Layout from "../components/Layout";
import { getAccount } from "../lib/lib";
import styles from "../styles/Home.module.css";
import Image from 'next/image'

export default function Home({account}) {
  console.log(account)
  return (
      <Layout>
        <div className={styles.account}>
          <div className={styles.account__img}>
            <img src={account[0].img} />
          </div>
          <div className={styles.account__info}>
            <p className={styles.account__item}>Họ và tên : {account[0].name}</p>
            <p className={styles.account__item}>Quê Quán :{account[0].homeTown}</p>
            <p className={styles.account__item}>Học tại : {account[0].school}</p>
            <p className={styles.account__item}>Sở Thích : {account[0].favourite}</p>
            <p className={styles.account__item}>Tuổi : {account[0].age}</p>
          </div>
        </div>
      </Layout>
  );
}
export const getStaticProps = async () => {
    const account = await getAccount();
    return {
      props: {
        account,
      },
    };
};
