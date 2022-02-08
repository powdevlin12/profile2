const express = require("express");
const router = express.Router();
const Project = require('../models/projects')

// CREATE project 
// POST localhost:5000/api/projects
router.post('/', async(req, res) => {
    const { name, description, language, link, img } = req.body
    if (!name) {
        return res.status(400).json({ success: false, message: 'Empty name project' })
    }
    try {
        const newProject = new Project({ name, description, language, link, img, account: '620143c85d273c2744f29ee6' })
        await newProject.save()
        res.status(200).json({ success: true, message: 'Add Project completed !', newProject })
            // return res.redirect("http://localhost:3000/projects")
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: 'Fallure add project !' })
    }
})

//GET projects
//localhost:5000/api/projects
router.get('/', async(req, res) => {
    try {
        const project = await Project.find({ account: '620143c85d273c2744f29ee6' })
        return res.status(200).json({ success: true, message: 'Find Project completed !', project })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: 'Fallure find project !' })
    }
})

//GET 1 project 
//localhost:5000/api/projects/:id
router.get('/:id', async(req, res) => {
    try {
        const project = await Project.find({ account: '620143c85d273c2744f29ee6', _id: req.params.id })
        return res.status(200).json({ success: true, message: 'Find Project completed !', project })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: 'Fallure find project !' })
    }
})

//UPDATE project 
// PUT localhost:5000/api/projects/:id
router.put('/:id', async(req, res) => {
    const { name, description, language, link, img } = req.body
    if (!name) {
        return res.status(400).json({ success: false, message: 'Empty name project' })
    }
    try {
        const projectUpdate = { name, description, language, link, img, account: '620143c85d273c2744f29ee6' }
        const conditionUpdate = { _id: req.params.id }
        const updateProject = await Project.findByIdAndUpdate(conditionUpdate, projectUpdate, { new: true })
        return res.status(200).json({ success: true, message: 'Update Project completed !', updateProject })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: 'Fallure Update Project !' })
    }
})

// DELETE project
// DELETE localhost:5000/api/projects/:id
router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const deleteProject = await Project.findByIdAndDelete({ _id: id })
        return res.status(200).json({ success: true, message: 'Delete Project completed !', deleteProject })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: 'Fallure Delete Project !' })
    }
})
module.exports = router