const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const url  = 'mongodb://localhost:27017/';
const dbName = 'lonergram';

const store = {

  importSampleContent() {
    let data = fs.readFileSync('sampleContent.json');
    this.content = JSON.parse(data);
  },

  init() {
    this.importSampleContent();
    return JSON.stringify(this.content);
  },

  /*get() {
    return this.content;
  },*/
  get(callback) {
      MongoClient.connect(url, (err, client) => {
        if (err) {
          throw err;
        }
        const db = client.db(dbName);
        db.collection('inserts').find({}).toArray(function(err, docs) {
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
      db.collection('inserts').insertOne(message);
      client.close();
    })
  },

  put(message) {
    MongoClient.connect(url, (err, client) => {
      if (err) {
        throw err;
      }
      const db = client.db(dbName);
      db.collection('inserts').updateOne({_id: message._id},  message);
      client.close();
    })
  },

  removeAt(id) {
    this.content = this.content.filter((value, index, arr) => {
      return id != value.id;
    })
  },

  clear() {
    this.content = [];
    return this.content;
  },

  async test() {
    console.log("hi");
    const client = new MongoClient(url);

    try {
      await client.connect();
      console.log("connected");

      const db = client.db(dbName);
      let r = await db.collection('inserts').insertOne({a:1});
    } catch (err) {
      console.log(err);
    }

    client.close();
  }

}

module.exports = store;
