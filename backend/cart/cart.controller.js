const express = require('express');
const router = express.Router();
const cartService = require('./cart.service');

router.post('/add', add);
// router.post('/remove', login);
module.exports = router;

function add(req, res, next) {
    cartService.add(req.body)
        .then(p => { return res.json(p); })
        .catch((err) => { next(err); });
}
