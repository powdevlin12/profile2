import Link from "next/link";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { getProject } from "../../lib/lib";
import axios from 'axios';
import styles from '../../styles/Project.module.css'
const Projects = ({ projects }) => {
  const [value, setValue] = useState(0); // integer state
  const handleDelete = async (id) =>{
      console.log(id)
      try {
        const response = await axios.delete(`http://localhost:5000/api/projects/${id}`)
        if (response.data.success)
        {
            alert('Xoa thanh cong !')
        }
        setValue(value => value + 1); // update the state to force render
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <Layout>
      <div className={styles.project__container}>
        <h1 className={styles.project__header}>Danh sách Project</h1>
        <ul className={styles.project__list}>
          {projects.map((project) => {
            let url = `projects/${project._id}`;
            let urtE =`projects/update/${project._id}`
            return (
              <li>
                <Link href={url} key={project._id}>
                  <a className={styles.project__name}>{project.name}</a>
                </Link>
                <Link href={urtE}>
                  <button className={styles.project__update}>Sửa</button>
                </Link>
                <button className={styles.project__delete} onClick={()=>handleDelete(project._id)}>Xóa</button>
              </li>
            );
          })}
        </ul>
        <Link href="/projects/create">
        <a>Click to create new project</a>
      </Link>
      </div>
    </Layout>
  );
};
export const getStaticProps = async () => {
  const projects = await getProject();
  return {
    props: {
      projects,
    },
  };
};
export default Projects;
