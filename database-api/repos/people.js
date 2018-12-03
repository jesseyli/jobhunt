const sql = require('../sql').people;

class PeopleRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  create() {
    return this.db.none(sql.create)
  }

  add(name) {
    return this.db.one(sql.add, { name });
  }
}

module.exports = PeopleRepository;