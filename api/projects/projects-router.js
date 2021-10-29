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
    Projects.insert(req.project)
        .then(newProject => {
            res.status(201).json(newProject);
        })
        .catch(next);
});

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, req.project)
        .then(updatedProject => {
            res.json(updatedProject);
        })
        .catch(next);
});

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id);
        res.json(req.project);
    } catch (err) {
        next(err);
    }
});

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const result = await Projects.getProjectActions(req.params.id);
        res.json(result);
    } catch (err) {
        next(err);
    }
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
