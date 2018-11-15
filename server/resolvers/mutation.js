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

const addJobPosting = async (_, { jobPost }) => {
  try {
    const insertStr = `
      INSERT INTO job_posting(
        company_name,
        post_link,
        title,
        description,
        requirement,
        salary_range_start,
        salary_range_end,
        position_level_id      
      )
      VALUES
      (
        $(companyName),
        $(postLink),
        $(title),
        $(description),
        $(requirement),
        $(salaryRangeStart),
        $(salaryRangeEnd),
        $(positionLevelId)
      )
      RETURNING 
        id, 
        company_name,
        post_link,
        title,
        description,
        requirement,
        salary_range_start,
        salary_range_end,
        position_level_id
    `;

    const {
      id,
      company_name: companyName,
      post_link: postLink,
      title,
      description,
      requirement,
      salary_range_start: salaryRangeStart,
      salary_range_end: salaryRangeEnd,
      position_level_id
    } = await db.one(insertStr, jobPost);

    const queryStr = `
      SELECT 
        id,
        role
      FROM 
        position_level
      WHERE id = $(position_level_id)
      `;

    let { role: positionLevel } = await db.one(queryStr, { position_level_id });

    return {
      id,
      companyName,
      postLink,
      title,
      description,
      requirement,
      salaryRangeStart,
      salaryRangeEnd,
      positionLevel
    }

  } catch (err) {
    console.error(err.message || err);
  }
}


const addPositionLevel = async (_, args) => {
  try {
    const insertStr = `
      INSERT INTO position_level(role)
      VALUES
        ($(position))
      RETURNING id, role
    `
    const { id: positionId, role: position } = await db.one(insertStr, { position: args.position });
    console.log(positionId, position)
    return { positionId, position };
  } catch (err) {
    console.error(err.message || err);
  }
}

const addJobApplication = async (_, args) => {

}


const addInteraction = async (_, args) => {

}

const addUser = async (_, args) => {
  try {
    // name, username, phoneNumber, email, positionId
    const insertStr = `
      INSERT INTO user_account(
        username,
        name,
        email,
        phone_number,
        position_level_id
      )
      VALUES
        ($(username), $(name), $(email), $(phoneNumber), $(positionId))
      RETURNING 
        id,
        username,
        name,
        email,
        phone_number
    `;

    let {
      id: userId,
      username,
      name,
      email,
      phone_number: phoneNumber
    } = await db.one(insertStr, args)

    const queryStr = `
      SELECT 
        id,
        role
      FROM 
        position_level
      WHERE id = $(positionId)
      `;
    let { role: position } = await db.one(queryStr, { positionId: args.positionId })
    
    return {
      userId,
      username,
      name,
      email,
      phoneNumber,
      position
    }

  } catch (err) {
    console.error(err.message || err);
  }
}

module.exports = {
  addReferral,
  addContactRole,
  addContact,
  addJobPosting,
  addJobApplication,
  addInteraction,
  addPositionLevel,
  addUser
}