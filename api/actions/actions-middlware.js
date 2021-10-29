const Actions = require('./actions-model');
const { isNotEmptyString } = require('../utils');
 
async function validateActionId(req, res, next) {
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

    if (typeof project_id !== 'number') {
        res.status(400).json({
            message: 'Project ID must be a number'
        });
    } else if (!isNotEmptyString(description) ||
        !isNotEmptyString(notes) ||
        typeof completed !== 'boolean'
    ) {
        res.status(400).json({
            message: 'Malformed project completed, description, or notes'
        });
    } else {
        next();
    }
}

module.exports = { validateActionId, validateActions };
