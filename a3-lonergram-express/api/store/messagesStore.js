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
  }

}

module.exports = store;
