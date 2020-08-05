const express = require('express');
const router = express.Router();
const userService = require('./user.service');

router.post('/login', login);
module.exports = router;

function login(req, res, next) {
    userService.login(req.body)
        .then(p => { return res.json(p)[0]; })
        .catch((err) => { next(err); });
}
