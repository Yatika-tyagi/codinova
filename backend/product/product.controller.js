const express = require('express');
const router = express.Router();
const pService = require('./product.service');
// const querystring = require('querystring');

router.get('/', getProduct);

router.post('/', saveProduct);

module.exports = router;

function getProduct(req, res, next) {
    pService.getProduct()
        .then(p => { console.log(p); return res.json(p) })
        .catch((err) => { next(err); });
}
function saveProduct(req, res, next) {
  pService.saveP(req.body)
      .then(p => { console.log(p,'098uyt'); return res.json(p) })
      .catch((err) => { next(err); });
}
