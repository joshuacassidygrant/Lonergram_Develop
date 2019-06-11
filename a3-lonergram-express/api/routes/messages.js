var express = require('express');
var router = express.Router();
var store = require('../store/messagesStore');

store.init();

router.get('/', function(req, res, next) {
    res.send(store.get());
});

router.post('/', function(req, res, next) {
  store.add(req.body);
  res.send(store.get());
});

router.delete('/', function(req,res, next) {
  console.log("del");
  store.clear();
  res.send("Cleared");
});

module.exports = router;
