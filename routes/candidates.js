var express = require('express');
var router = express.Router();

var candidates = [];

/* GET candidates listing. */
router.get('/', function(req, res, next) {
  res.send(candidates);
});

router.post('/', function(req, res, next) {
  candidates.push(req.body);
  res.sendStatus(200);
})


router.post('/')

module.exports = router;
