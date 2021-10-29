const Actions = require('./actions-model');
 
async function validateActionId(req, res, next) {
     console.log('object------------validate-action-id-------------', req.body);
    try {
        const action = await Actions.get(req.params.id);
        if (!action) {
            res.status(404).json({
                message: 'action not found'
            });
        } else {
            req.action = action;
            next();
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error getting action'
        });
    }
}


function validateActions(req, res, next) {
    const { project_id, description, notes, completed } = req.body;
    if (!project_id || !description || !notes || typeof completed !== 'boolean') {
        console.log('--------if-------------rb', req.body);
        res.status(400).json({
            message: 'Project id, description, and notes are required'
        });
    } else {
        console.log('------------else---------rb', req.body);
        req.action = req.body;
        next();
    }
}


module.exports = { validateActionId, validateActions };