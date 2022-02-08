import Layout from "../components/Layout";
import { getContact } from "../lib/lib";
import styles from "../styles/Contact.module.css";

const Contact = ({ contact }) => {
  return (
    <Layout>
      <div className={styles.contact}>
        <div className={styles.contact__list}>
          <p className={styles.contact__item}>
            Github : <a href={contact[0].github}>{contact[0].github}</a>
          </p>
          <p className={styles.contact__item}>Phone : {contact[0].phone}</p>
          <p className={styles.contact__item}>Gmail : {contact[0].gmail}</p>
        </div>
      </div>
    </Layout>
  );
};
export const getStaticProps = async () => {
  const contact = await getContact();
  return {
    props: {
      contact,
    },
  };
};

export default Contact;
