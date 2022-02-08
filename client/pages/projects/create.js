import { Router } from "next/router";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import styles from "../../styles/Project.module.css"
const Create = () => {
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    language: "",
    link: "",
    img: "",
  });
  const { name, description, language, link, img } = newProject;
  const onChangeNewProjectForm = (event) =>
    setNewProject({ ...newProject, [event.target.name]: event.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/projects",
        newProject
      );
      if (response.data.success) {
        alert("Add success");
        setNewProject({
          name: "",
          description: "",
          language: "",
          link: "",
          img: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <h1 className={styles.project_cr_name}>Create New Project</h1>
      <form className={styles.project_cr_form} onSubmit={onSubmit}>
        <label className={styles.project_cr_label} htmlFor="name">Name</label>
        <input
          className={styles.project_cr_input}
          id="name"
          type="text"
          name="name"
          onChange={onChangeNewProjectForm}
          value={name}
        />
        <label htmlFor="desc">Description</label>
        <input
          className={styles.project_cr_input}
          id="desc"
          type="text"
          name="description"
          onChange={onChangeNewProjectForm}
          value={description}
        />
        <label htmlFor="language">Language</label>
        <input
          className={styles.project_cr_input}
          id="language"
          type="text"
          name="language"
          onChange={onChangeNewProjectForm}
          value={language}

        />
        <label htmlFor="link">Link github</label>
        <input
          className={styles.project_cr_input}
          id="link"
          type="text"
          name="link"
          onChange={onChangeNewProjectForm}
          value={link}
        />
        <label htmlFor="img">Link image</label>
        <input
          className={styles.project_cr_input}
          id="img"
          type="text"
          name="img"
          onChange={onChangeNewProjectForm}
          value={img}
        />
        <button className={styles.project_cr_submit} type="submit">Submit</button>
      </form>
    </Layout>
  );
};

export default Create;
