const db = require("../config/db");
const bcrypt = require('bcrypt');

const createUser = async user => {
  try {
    const insertStr = `
      INSERT INTO user_account(
        username,
        name,
        email,
        password,
        phone_number,
        position_level_id
      )
      VALUES
        ($(username), $(name), $(email), $(password), $(phoneNumber), $(positionId))
      RETURNING 
        id,
        username,
        name,
        email,
        phone_number
    `;

    return db.one(insertStr, user)

  } catch (err) {
    console.error(err.message || err);
  }
}

const getUser = username => {
  try {
    const queryStr = `
      SELECT 
        id,
        username,
        name,
        email,
        password,
        phone_number,
        position_level_id
      FROM user_account
      WHERE username = $(username)
    `;
    return db.one(queryStr, { username });
  } catch (err) {
    return err;
  }
}

const isValidLogin = async (username, password) => {
  try {
    let { password: hashedPassword } = await getUser(username);
    return bcrypt.compare(password, hashedPassword);  
  } catch (err) {
    return err;
  }
}


module.exports = { isValidLogin, createUser, getUser }