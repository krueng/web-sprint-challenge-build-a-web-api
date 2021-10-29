const express = require('express');
const {
    validateProjectId,
    validateProject,
} = require('./projects-middleware');

const Projects = require('./projects-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.json(projects);
        })
        .catch(next);
});

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project);
});

router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject);
        })
        .catch(next);
});

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(updatedProject => {
            res.json(updatedProject);
        })
        .catch(next);
});

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        const deleted = await Projects.remove(req.params.id);

        if (deleted) {
            res.json(req.project);
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
});

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id);
        res.json(actions);
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
