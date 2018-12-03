require('dotenv').load();

const repos = require('../repos');

const initOptions = {

  // pg-promise initialization options...

  connect(client, dc, useCount) {
    const cp = client.connectionParameters;
    console.log(`
✈️   Connected to database: ${cp.database}
🍵  Connection String: postgresql://${cp.host}:${cp.port}/${cp.database}`
    );
  },
  query(e) {
    console.log('DB QUERY:', e.query);
  },
  extend(obj, dc) {
    obj.people = new repos.People(obj, pgp);
  },
  error(error, e) {
    if (e.cn) {
      // A connection-related error;
      //
      // Connections are reported back with the password hashed,
      // for safe errors logging, without exposing passwords.
      console.log('CN:', e.cn);
      console.log('EVENT:', error.message || error);
    }
  }
};


const pgp = require('pg-promise')(initOptions);
const db = pgp(process.env.DB_URL);

const checkConnection = async () => {
  try {
    let obj = await db.connect();
    obj.done();
  } catch (error) {
    console.log('ERROR:', error.message || error);
  }
}
checkConnection();

module.exports = db;