const db = require("../config/db");

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

const addContactType = async (_, args) => {
  try {
    const insertStr = `
    INSERT INTO contact_type(type)
    VALUES ($(type))
    RETURNING id, type
    `
    const { id: typeId, type } = await db.one(insertStr, { type: args.type });
    return {
      typeId,
      type
    }
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
        location,
        description,
        requirement,
        salary_range_start,
        salary_range_end,
        position_level_id,      
      )
      VALUES
      (
        $(companyName),
        $(postLink),
        $(title),
        $(location),
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
        location,
        description,
        requirement,
        salary_range_start,
        salary_range_end,
        position_level_id
    `;

    const {
      company_name: companyName,
      post_link: postLink,
      salary_range_start: salaryRangeStart,
      salary_range_end: salaryRangeEnd,
      ...rest
    } = await db.one(insertStr, jobPost);

    const queryStr = `
      SELECT 
        id,
        role
      FROM 
        position_level
      WHERE id = $(position_level_id)
      `;

    let { role: positionLevel } = await db.one(queryStr, { position_level_id: rest.position_level_id });

    return {
      companyName,
      postLink,
      salaryRangeStart,
      salaryRangeEnd,
      positionLevel,
      ...rest
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


const addInteraction = async (_, { details }) => {
  try {
    const insertStr = `
      INSERT INTO interaction(
        contact_id,
        job_application_id,
        contact_type_id,
        job_status_id,
        follow_up_date,
        log
      )
      VALUES
        ($(contactId), $(appId), $(contactTypeId), $(statusId), $(followUpDate), $(description))
      RETURNING
      id,
      contact_id,
      job_application_id,
      contact_type_id,
      job_status_id,
      follow_up_date,
      log
    `;
    const {
      id: interactionId,
      contact_id,
      job_application_id: appId,
      contact_type_id,
      job_status_id,
      follow_up_date: followUpDate,
      log: description
    } = await db.one(insertStr, details);

    const contactQueryStr = `
    SELECT 
      id,
      name,
      phone_number,
      email,
      contact_role_id
    FROM contact
    WHERE id = $(contact_id)
    `
    const contact = await db.one(contactQueryStr, { contact_id });

    const contactTypeQueryStr = `
    SELECT 
      id, 
      type
    FROM contact_type
    WHERE id = $(contact_type_id)
    `
    const contactType = await db.one(contactTypeQueryStr, { contact_type_id });

    const statusQueryStr = `
    SELECT 
      id,
      status
    FROM job_status
    WHERE id = $(job_status_id)
    `
    const status = await db.one(statusQueryStr, { job_status_id });

    return {
      interactionId,
      appId,
      contact,
      contactType,
      description,
      status,
      followUpDate,
    }
  } catch (err) {
    console.error(err.message || err);
  }
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

const addStatus = async (_, args) => {
  try {
    const insertStr = `
      INSERT INTO job_status(status)
      VALUES
        ($(newStatus))
      RETURNING id, status
    `;

    const { id: statusId, status } = await db.one(insertStr, { newStatus: args.newStatus })

    return {
      statusId,
      status
    }

  } catch (err) {
    console.error(err.message || err);
  }
}

const addReferral = async (_, args) => {
  try {
    const { name, phoneNumber, email, jobAppId } = args;

    // find id of 'reference'; you can hardcode this later if you wish (?)
    const queryStr = `
      SELECT id
      FROM contact_role
      WHERE role = 'reference'
    `;

    let { id: contactRoleId } = await db.one(queryStr);

    const insertStr = `
      INSERT INTO contact(name, phone_number, email, contact_role_id)
      VALUES
        ($(name), $(phoneNumber), $(email), $(contactRoleId))
      RETURNING
        id, name, phone_number, email, contact_role_id
    `;

    let { id: referralId, ...rest } = await db.one(insertStr, { name, phoneNumber, email, contactRoleId });

    const updateStr = `
      UPDATE job_application
      SET referral_id = $(referralId)
      WHERE id = $(jobAppId)
    `;

    await db.none(updateStr, { referralId, jobAppId });

    return {
      referenceId: referralId,
      name: rest.name,
      phoneNumber: rest.phoneNumber,
      email: rest.email,
      role: 'reference'
    }

  } catch (err) {
    console.error(err.message || err);
  }
}
const addJobApplication = async (_, args) => {
  try {
    const insertStr = `
      INSERT INTO job_application(
        user_id,
        job_posting_id,
        date_applied,
        referral_id,
        offer,
        job_status_id
      )
      VALUES(
        $(userId),
        $(postingId),
        $(time),
        $(referralId),
        $(offer),
        $(jobStatusId)
      )
      RETURNING
        id,
        user_id,
        job_posting_id,
        date_applied,
        referral_id,
        offer,
        job_status_id
    `;
    let jobApplication = await db.one(insertStr, args);

    let {
      id,
      user_id,
      job_posting_id,
      date_applied,
      referral_id,
      offer,
      job_status_id
    } = jobApplication;

    const contactQuery = `
    SELECT 
    contact.id,
    name,
    phone_number,
    email,
    contact_role_id,
    contact_role.role
    FROM contact
    INNER JOIN contact_role ON contact_role.id = contact.contact_role_id
    WHERE contact.id = $(contactId)
    `;
    let contactReferral = await db.one(contactQuery, { contactId: referral_id });
    
    let contactReferralObject = {
      referenceId: contactReferral.id,
      name: contactReferral.name,
      phoneNumber: contactReferral.phone_number,
      email: contactReferral.email,
      role: contactReferral.role
    }

    let jobPostingQuery = `
    SELECT
    company_name,
    post_link,
    title,
    location,
    description,
    requirement,
    salary_range_start,
    salary_range_end
    FROM job_posting
    WHERE 
    job_posting.id = $(job_posting_id)
    `;

    let jobPosting = await db.one(jobPostingQuery, { job_posting_id });

    let {
      company_name,
      post_link,
      title,
      location,
      description,
      requirement,
      salaryRangeStart,
      salaryRangeEnd,
      positionLevel 
    } = jobPosting;

    let jobPostingObject = {
      companyName: company_name,
      postLink: post_link,
      title,
      location,
      description,
      requirement,
      salaryRangeStart,
      salaryRangeEnd,
      positionLevel,
    }

    const userQuery = `
    SELECT
    username,
    name,
    email,
    phone_number,
    position_level_id
    FROM 
    user_account
    WHERE
    user_account.id = $(user_id)
    `;

    let user = await db.one(userQuery, { user_id })

    let {
      name,
      phone_number,
      email,
      position_level_id
    } = user

    let userObject = {
      name,
      email,
      phoneNumber: phone_number,
      position: position_level_id
    }

    const jobStatusQuery = `
    SELECT
    status
    FROM
    job_status
    WHERE
    job_status.id = $(job_status_id)
    `;

    const jobStatus = await db.one(jobStatusQuery, { job_status_id });

    return {
      id,
      dateApplied: date_applied,
      referral: contactReferralObject,
      jobPosting: jobPostingObject,
      user: userObject,
      status: jobStatus,
      offer
    }

  } catch (err) {
    console.error(err.message || err);
  }
}


module.exports = {
  addReferral,
  addContactRole,
  addContact,
  addContactType,
  addJobPosting,
  addJobApplication,
  addInteraction,
  addPositionLevel,
  addUser,
  addStatus,
}