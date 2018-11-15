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
    `;
    const contacts = await db.any(queryStr);

    return contacts.map(({ phone_number, id, ...rest }) => ({
      referenceId: id,
      phoneNumber: phone_number,
      ...rest
    }));

  } catch (err) {
    console.error(err.message || err);
  }
}

const getPositionLevels = async () => {
  try {
    const queryStr = `
      SELECT 
        id,
        role
      FROM 
        position_level
      `;
    const positionLevels = await db.any(queryStr);

    return positionLevels.map(({ id, role }) => ({ positionId: id, position: role }));

  } catch (err) {
    console.error(err.message || err);
  }
}

const getJobPostings = async () => {
  try {
    const queryStr = `
      SELECT 
        job_posting.id,
        company_name,
        post_link,
        title,
        description,
        requirement,
        salary_range_start,
        salary_range_end,
        position_level.role
      FROM 
        job_posting
      INNER JOIN position_level ON job_posting.position_level_id = position_level.id
    `;

    const jobPostings = await db.any(queryStr);

    return jobPostings.map(({
      company_name,
      post_link,
      salary_range_start,
      salary_range_end,
      role,
      ...rest
    }) => ({
      companyName: company_name,
      postLink: post_link,
      salaryRangeStart: salary_range_start,
      salaryRangeEnd: salary_range_end,
      positionLevel: role,
      ...rest
    }));

  
  } catch (err) {
    console.error(err.message || err);
  }
}

module.exports = {
  getContacts,
  getContactById,
  getContactRoles,
  getPositionLevels,
  getJobPostings
}