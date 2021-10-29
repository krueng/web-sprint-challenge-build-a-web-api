// const Actions = require('./actions-model');

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

module.exports = { validateActions };