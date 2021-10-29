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
    const { text } = req.body;
    if (!text || !text.trim()) {
        res.status(400).json({
            message: 'missing required action field'
        });
    } else {
        req.text = text.trim();
        next();
    }

}

module.exports = { validateActionId, validateActions };