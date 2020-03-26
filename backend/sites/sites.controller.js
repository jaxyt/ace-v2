const express = require('express');
const router = express.Router();
const siteService = require('./site.service');

// routes
router.post('/register', register);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function register(req, res, next) {
    siteService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    siteService.getAll()
        .then(sites => res.json(sites))
        .catch(err => next(err));
}

function getById(req, res, next) {
    siteService.getById(req.params.id)
        .then(site => site ? res.json(site) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    siteService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    siteService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}