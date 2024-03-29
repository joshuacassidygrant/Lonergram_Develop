var express = require('express');
var router = express.Router();
var store = require('../store/messagesStore');

store.init();

router.get('/', function(req, res, next) {
    res.send(store.get());
});

router.post('/', function(req, res, next) {
  store.add(req.body);
  res.send(req.body);
});

router.delete('/', function(req, res, next) {
  store.clear();
  res.send("Cleared");
});

router.put('/:messageId/', function(req, res, next) {
  store.put(req.body);
  res.send(req.body);
});

module.exports = router;
