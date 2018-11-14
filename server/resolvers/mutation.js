const db = require("../config/db");

const addReferral = async (_, args) => {

}

const addContactRole = async (_, args) => {
  try {
    const insertStr = `
    INSERT INTO contact_role(role)
    VALUES
      ($(role))
    RETURNING id, role
    `
    const { id, role } = await db.one(insertStr, { role: args.role });

    return { roleId: id, role };

  } catch (err) {

    console.error(err.message || err);

  }
}

const addContact = async (_, args) => {

  try {
    const insertStr = `
    INSERT INTO contact(name, phone_number, email, contact_role_id)
    VALUES
      ($(name), $(phoneNumber), $(email), $(roleId))
    RETURNING id
    `
    const { id: contactId } = await db.one(insertStr, args);

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
      WHERE contact.id = $(contactId)
    `;

    const { id, name, phone_number, email, role } = await db.one(queryStr, { contactId });

    return {
      referenceId: id,
      name,
      phoneNumber: phone_number,
      email,
      role
    };

  } catch (err) {

    console.error(err.message || err);

  }
}

const addJobPosting = async (_, args) => {

}

const addJobApplication = async (_, args) => {

}

const addInteraction = async (_, args) => {

}

module.exports = {
  addReferral,
  addContactRole,
  addContact,
  addJobPosting,
  addJobApplication,
  addInteraction
}