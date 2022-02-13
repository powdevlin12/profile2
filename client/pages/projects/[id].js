import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import styles from "../../styles/Project.module.css"

const Project = () => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    async function getData() {
      const url = `http://localhost:5000/api/projects/${router.query.id}`;
      axios.get(url)
      .then(res => {
          console.log(res.data)
        const {project} = res.data;
        console.log(project)
        setProjects({ project });
      })
      .catch(error => console.log(error));
    }
    getData();
  }, []);

    return <Layout>
        {projects['project'] ? <div className={styles.project_des}>
            <h1 className={styles.project_des__name}>{projects['project'][0].name}</h1>
            <p className={styles.project_des__item}>Viết bằng ngôn ngữ : {projects['project'][0].language}</p>
            <p className={styles.project_des__item}>Chi tiết : {projects['project'][0].description}</p>
            <p className={styles.project_des__item}>Link github : {projects['project'][0].link}</p>
            <img src={projects['project'][0].img} alt="img" />
        </div>: ""}
        
    </Layout>
};

export default Project;
