const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const url  = 'mongodb://localhost:27017/';
const dbName = 'lonergram';
const messageCollection = 'messages';

const store = {

  get(callback) {
      MongoClient.connect(url, (err, client) => {
        if (err) {
          throw err;
        }
        const db = client.db(dbName);
        db.collection(messageCollection).find({}).toArray(function(err, docs) {
          if (err) {
            throw err;
          }
          callback(docs);
        });
        client.close();
      })
    },

  add(message) {
    MongoClient.connect(url, (err, client) => {
      if (err) {
        throw err;
      }
      const db = client.db(dbName);
      db.collection(messageCollection).insertOne(message);
      client.close();
    })
  },

  put(message) {
    MongoClient.connect(url, (err, client) => {
      if (err) {
        throw err;
      }
      const db = client.db(dbName);
      console.log(message.filters);
      let success = db.collection(messageCollection).updateOne(
        {_id: message._id},
        { $set:
          {
            "edits": message.edits,
            "filters": message.filters,
            "text": message.text
          }
        },
        function (err, docs) {
          console.log(success);
        }
      );
      client.close();
    })
  },

  delete(messageId) {
    MongoClient.connect(url, (err, client) => {
      if (err) {
        throw err;
      }
      const db = client.db(dbName);
      console.log("NOT DELETING PROPERLY YET");
      //NEED TO CREATE A MONGOID with ID probably?
      db.collection(messageCollection).deleteOne({_id: messageId});
      client.close();
    })
  },

  clear() {
    MongoClient.connect(url, (err, client) => {
      if (err) {
        throw err;
      }
      const db = client.db(dbName);
      db.collection(messageCollection).drop();
    });
  }

}

module.exports = store;
