const Projects = require('./projects-model');
const { isNotEmptyString } = require('../utils');

async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id);
        if (!project) {
            res.status(404).json({
                message: 'project not found'
            });
        } else {
            req.project = project;
            next();
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error getting project'
        });
    }
}

function validateProject(req, res, next) {
    const { name, description, completed } = req.body;

    if (!isNotEmptyString(name) ||
        !isNotEmptyString(description) ||
        typeof completed !== 'boolean') {
        res.status(400).json({
            message: 'Proper name and description are required'
        });
    } else {
        next();
    }
}

module.exports = {
    validateProjectId,
    validateProject
};
