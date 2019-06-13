const fs = require('fs');

const store = {

  importSampleContent() {
    let data = fs.readFileSync('sampleContent.json');
    this.content = JSON.parse(data);
  },

  init() {
    this.importSampleContent();
    return JSON.stringify(this.content);
  },

  get() {
    return this.content;
  },

  add(message) {
    this.content.push(message);
  },

  put(message) {
    try {
      this.removeAt(message.id);
      this.add(message);
    } catch (e) {
      console.log(e);
    }
  },

  removeAt(id) {
    this.content = this.content.filter((value, index, arr) => {
      return id != value.id;
    })
  },

  clear() {
    this.content = [];
    return this.content;
  }

}

module.exports = store;
