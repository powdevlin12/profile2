import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import styles from "../../styles/Project.module.css";
const Projects = () => {
  const [count, setCount] = useState([]);
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/projects/${id}`
      );
      if (response.data.success) {
        alert("Xoa thanh cong !");
        setCount(count.push(1));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [projectsCurrent, setProjectCurrent] = useState([]);
  console.log(projectsCurrent);
  useEffect(() => {
    console.log("effect chay");
    async function getData() {
      const url = `http://localhost:5000/api/projects/`;
      axios
        .get(url)
        .then((res) => {
          const { project } = res.data;
          console.log(project);
          setProjectCurrent(project);
        })
        .catch((error) => console.log(error));
    }
    getData();
  }, [count]);
  return (
    <Layout>
      <div className={styles.project__container}>
        <table className={styles.table}>
          <tr>
            <th colSpan={3}>
              <h1>Danh sách project</h1>
            </th>
          </tr>
          {projectsCurrent.map((project) => {
            let url = `projects/${project._id}`;
            let urtE = `projects/update/${project._id}`;
            return (
              <tr key={project._id} className={styles.project_tr}>
                <td>
                  <Link href={url}>
                    <a className={styles.project__name}>{project.name}</a>
                  </Link>
                </td>
                <td>
                  <Link href={urtE}>
                    <button className={styles.project__update}>Sửa</button>
                  </Link>
                </td>
                <td>
                  <button
                    className={styles.project__delete}
                    onClick={() => handleDelete(project._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
        <Link href="/projects/create">
          <a>Click to create new project</a>
        </Link>
      </div>
    </Layout>
  );
};

export default Projects;
