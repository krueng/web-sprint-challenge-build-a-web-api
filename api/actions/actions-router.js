const express = require('express');
const {
    validateActionId,
    validateActions
} = require('./actions-middlware');

const Actions = require('./actions-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Actions.get()
        .then(project => {
            res.json(project);
        })
        .catch(next);
});

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action);
});

router.post('/', validateActions, (req, res, next) => {
    Actions.insert(req.action)
        .then(newAction => {
            res.status(201).json(newAction);
        })
        .catch(next);
});

router.put('/:id', validateActionId, validateActions, (req, res, next) => {
    Actions.update(req.params.id, req.action)
        .then(updatedAction => {
            res.json(updatedAction);
        })
        .catch(next);
});

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id);
        res.json(req.action);
    } catch (err) {
        next(err);
    }
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next,) => {
    res.status(500 || err.status).json({
        customMessage: 'action router error',
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router;
