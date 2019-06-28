var express = require('express');
var router = express.Router();
var store = require('../store/messagesStore');

router.get('/', function(req, res, next) {
    store.get((results) => {
      res.send(results);
    });
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

router.delete('/:messageId/', function(req, res, next){
  store.delete(req.params.messageId);
  res.send(req.params.messageId);
});

module.exports = router;
