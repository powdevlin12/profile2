import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import axios from "axios";
import styles from '../../../styles/Project.module.css'
const Update = () => {
  const router = useRouter();
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    language: "",
    link: "",
    img: "",
  });
  const [projects, setProjects] = useState([]);
  let { name, description, language, link, img } = newProject;
  useEffect(() => {
    async function getData() {
      const url = `http://localhost:5000/api/projects/${router.query.id}`;
      axios
        .get(url)
        .then((res) => {
          const { project } = res.data;
          setProjects({ project });
        })
        .catch((error) => console.log(error));
    }
    getData();
}, []);


  const onChangeNewProjectForm = (event) =>
    setNewProject({ ...newProject, [event.target.name]: event.target.value });

    const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/projects/${router.query.id}`,
        newProject
      );    
      if (response.data.success) {
        alert("Update success");
      }
    } catch (error) {
        alert(error);
    }
  };
  
  return (
    <Layout>
      <h1 className={styles.project_cr_name}>Update Project</h1>
      {projects['project'] ? (
        <form className={styles.project_cr_form} onSubmit={onSubmit}>
          <label className={styles.project_cr_label} htmlFor="name">Name</label>
          <input
          className={styles.project_cr_input}
            id="name"
            type="text"
            name="name"
            onChange={onChangeNewProjectForm}
            value={name}
            placeholder={projects['project'][0].name}
          />
          <label htmlFor="desc">Description</label>
          <input
          className={styles.project_cr_input}
            id="desc"
            type="text"
            name="description"
            onChange={onChangeNewProjectForm}
            value={description}
            placeholder={projects['project'][0].description}
          />
          <label htmlFor="language">Language</label>
          <input
          className={styles.project_cr_input}
            id="language"
            type="text"
            name="language"
            onChange={onChangeNewProjectForm}
            value={language}
            placeholder={projects['project'][0].language}

          />
          <label htmlFor="link">Link github</label>
          <input
          className={styles.project_cr_input}
            id="link"
            type="text"
            name="link"
            onChange={onChangeNewProjectForm}
            value={link}
            placeholder={projects['project'][0].link}

/>
          <label htmlFor="img">Link image</label>
          <input
          className={styles.project_cr_input}
            id="img"
            type="text"
            name="img"
            onChange={onChangeNewProjectForm}
            value={img}
            placeholder={projects['project'][0].img}

/>
          <button className={styles.project_cr_submit} type="submit">Update</button>
        </form>
      ) : (
        ""
      )}
    </Layout>
  );
};

export default Update;
