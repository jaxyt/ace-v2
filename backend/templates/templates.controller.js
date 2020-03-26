const express = require('express');
const router = express.Router();
const templateService = require('./template.service');

// routes
router.post('/register', register);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function register(req, res, next) {
    templateService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    templateService.getAll()
        .then(templates => res.json(templates))
        .catch(err => next(err));
}

function getById(req, res, next) {
    templateService.getById(req.params.id)
        .then(template => template ? res.json(template) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    templateService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    templateService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}