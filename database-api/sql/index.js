const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

const sql = file => {

  // http://vitaly-t.github.io/pg-promise/QueryFile.html

  const fullPath = path.join(__dirname, file);

  return new QueryFile(fullPath, { minify: true });
}

module.exports = {
  people: {
    add: sql('people/add.sql'),
    create: sql('people/create.sql'),
  }
}