const express = require('express');
const {
    validateProjectId,
    validateProject,
} = require('./projects-middleware');

const Projects = require('./projects-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
        .then(project => {
            res.json(project);
        })
        .catch(next);
});

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project);
});

router.post('/', validateProject, (req, res, next) => {
    //  console.log("req---------", req.project);
    Projects.insert(req.project)
        .then(newProject => {
            // console.log('--------tuatua---------',newProject);
            res.status(201).json(newProject);
        })
        .catch(next);
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next,) => {
    res.status(500 || err.status).json({
        customMessage: 'project router error',
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router;
