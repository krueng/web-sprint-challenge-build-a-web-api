const express = require('express');
const {
    validateActions,
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

module.exports = router;
