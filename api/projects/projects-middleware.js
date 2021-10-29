const Projects = require('./projects-model');

async function validateProjectId(req, res, next) {
    // console.log('object------------xxx-------------', req.body);
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
    const { name, description } = req.body;
    if (!name || !name.trim() || !description) {
        // console.log('object-------------------------', req.body);
        res.status(400).json({
            message: 'name and description are required'
        });
    } else {
        // console.log('object---------eeee----------------', req.body);
        // req.name = name.trim();
        req.project = req.body;
        next();
    }
}

module.exports = {
    validateProjectId,
    validateProject
};
