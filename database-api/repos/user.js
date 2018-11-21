const sql = require('../sql').user;

class UserRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }
}