const db = require("../config/db");

const getContactById = async (_, args) => {
  try {
    const queryStr = `
    SELECT 
      contact.id,
      name,
      phone_number,
      email,
      contact_role.role
    FROM 
      contact
    INNER JOIN contact_role ON contact_role.id = contact.contact_role_id
    WHERE contact.id = $(id)
    `;

    const { id, name, phone_number, email, role } = await db.one(queryStr, { id: args.id });
    
    return {
      referenceId: id,
      name,
      phoneNumber: phone_number,
      email,
      role
    }

  } catch (err) {

    console.error(err.message || err);

  }
}

const getContactRoles = async () => {
  try {
    const queryStr = `
      SELECT 
        id,
        role
      FROM 
        contact_role
      `;
    const roles = await db.any(queryStr);
    console.log(roles)
    return roles.map(({ id, role }) => ({ roleId: id, role }))

  } catch (err) {
    console.error(err.message || err);
  }
}


const getContacts = async () => {
  try {
  } catch (err) {
    console.error(err.message || err);
  }
}

module.exports = {
  getContacts,
  getContactById,
  getContactRoles
}