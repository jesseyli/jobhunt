const db = require("../config/db");

const gqlGetJobPostingById = async id => {
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
      FROM job_posting
      INNER JOIN position_level ON job_posting.position_level_id = position_level.id
      WHERE job_posting.id = $(id)
    `;

    let {
      company_name: companyName,
      post_link: postLink,
      salary_range_start: salaryRangeStart,
      salary_range_end: salaryRangeEnd,
      role: positionLevel,
      ...rest
    } = await db.one(queryStr, { id });

    return {
      companyName,
      postLink,
      salaryRangeStart,
      salaryRangeEnd,
      positionLevel,
      ...rest
    }

  } catch (err) {
    console.error(err.message || err)
  }
}

const gqlGetUserById = async id => {
  try {
    const queryStr = `
      SELECT 
        user_account.id,
        username,
        name,
        email,
        phone_number,
        position_level.role
      FROM user_account
      INNER JOIN position_level ON user_account.position_level_id = position_level.id
      WHERE user_account.id = $(id)
    `;

    let {
      id: userId,
      role: position,
      ...rest
    } = await db.one(queryStr, { id });

    return {
      userId,
      position,
      ...rest
    }
  } catch (err) {
    console.error(err.message || err)
  }
}

const gqlGetContactById = async id => {
  try {
    const queryStr = `
      SELECT 
        contact.id,
        name,
        phone_number,
        email,
        contact_role.role
      FROM contact
      INNER JOIN contact_role ON contact.contact_role_id = contact_role.id
      WHERE contact.id = $(id)
    `;

    let {
      id: referenceId,
      phone_number: phoneNumber,
      ...rest
    } = await db.one(queryStr, { id })

    return {
      referenceId,
      phoneNumber,
      ...rest
    }

  } catch (err) {
    console.error(err.message || err)
  }
}

const gqlGetInteractionById = async id => {
  try {
    const queryStr = `
      SELECT
        interaction.id,
        contact_id,
        job_application_id,
        contact_type.type,
        follow_up_date,
        log
      FROM interaction
      INNER JOIN contact_type ON interaction.contact_type_id = contact_type.id
      WHERE interaction.id = $(id)
    `;

    let {
      id: interactionId,
      contact_id: contact,
      job_application_id: appId,
      type: contactType,
      follow_up_date: followUpDate,
      log: description
    } = await db.one(queryStr, { id })

    console.log({
      interactionId,
      contact,
      appId,
      contactType,
      followUpDate,
      description
    })

    return {
      interactionId,
      contact,
      appId,
      contactType,
      followUpDate,
      description
    }

  } catch (err) {
    console.error(err.message || err)
  }
}

// promise returning
const gqlGetInteractionIdsByJobApp = async jobAppId => {
  try {
    const queryStr = `
      SELECT
        interaction.id
      FROM interaction
      INNER JOIN job_application on job_application.id = interaction.job_application_id
      WHERE interaction.job_application_id = $(jobAppId)
    `;

    let interactions = await db.any(queryStr, { jobAppId });

    return interactions.map(i => i.id);
  } catch (err) {
    console.error(err.message || err);
  }
}

// promise returning
const gqlGetContactIdsByJobApp = async jobAppId => {
  try {
    const queryStr = `
      SELECT
        interaction.contact_id
      FROM interaction
      INNER JOIN job_application on job_application.id = interaction.job_application_id
      WHERE interaction.job_application_id = $(jobAppId)
    `;

    let contacts = await db.any(queryStr, { jobAppId });

    contacts = contacts.map(c => c.contact_id);

    return [...new Set(contacts)];

  } catch (err) {
    console.error(err.message || err)
  }
}

// Includes "offer" even though it is not used in 'JobApplication'
// but it is used in 'JobAppStatus'
const gqlGetJobApplicationById = async jobAppId => {
  try {
    const queryStr = `
      SELECT 
        job_application.id,
        date_applied,
        job_posting_id,
        user_id,
        referral_id,
        job_status.status,
        offer
      FROM job_application
      INNER JOIN job_status ON job_application.job_status_id = job_status.id
      WHERE job_application.id = $(jobAppId)
    `;

    let {
      id,
      date_applied: dateApplied,
      job_posting_id,
      user_id,
      referral_id,
      status,
      offer
    } = await db.one(queryStr, { jobAppId });

    let [jobPosting, user, referral, interactions, contacts] = await Promise.all([
      gqlGetJobPostingById(job_posting_id),
      gqlGetUserById(user_id),
      gqlGetContactById(referral_id),
      gqlGetInteractionIdsByJobApp(jobAppId),
      gqlGetContactIdsByJobApp(jobAppId)
    ]);

    console.log("INTERACTIONS:", interactions)

    return {
      id,
      dateApplied,
      referral,
      jobPosting,
      user,
      offer,
      status,
      interactions,   // interaction Ids that will be handled in resolver
      contacts        // contact Ids that will be handled in resolver
    }

  } catch (err) {
    console.error(err.message || err)
  }
}




module.exports = {
  gqlGetJobApplicationById,
  gqlGetContactById,
  gqlGetInteractionById
}