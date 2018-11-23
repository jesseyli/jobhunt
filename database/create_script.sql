DROP DATABASE jobhunt;
CREATE DATABASE jobhunt;
\c jobhunt;
CREATE EXTENSION citext;

-- Ex. `position_level`: junior / midlevel / senior / non-categorized
CREATE TABLE position_level (
  id      SERIAL PRIMARY KEY,
  role    TEXT UNIQUE
);

-- Ex. `contact_role`: recruiter, referral, hiring manager
CREATE TABLE contact_role (
  id      SERIAL PRIMARY KEY,
  role    TEXT UNIQUE
);

CREATE TABLE contact (
  id                  SERIAL PRIMARY KEY, 
  name                TEXT NOT NULL,
  phone_number        TEXT,
  email               CITEXT,
  contact_role_id     INTEGER REFERENCES contact_role (id)
);

CREATE TABLE job_posting (
  id                    SERIAL PRIMARY KEY,
  company_name          TEXT NOT NULL,
  post_link             TEXT NOT NULL UNIQUE,
  title                 TEXT NOT NULL,
  location              TEXT NOT NULL,
  description           TEXT,
  requirement           TEXT,
  salary_range_start    INTEGER,
  salary_range_end      INTEGER,
  position_level_id     INTEGER REFERENCES position_level (id)
);

CREATE TABLE user_account (
  id                  SERIAL PRIMARY KEY,
  username            TEXT UNIQUE NOT NULL,
  name                TEXT NOT NULL,
  email               CITEXT UNIQUE NOT NULL,
  password            TEXT NOT NULL,
  phone_number        TEXT,
  position_level_id   INTEGER REFERENCES position_level (id),
  UNIQUE (username, email, phone_number)
);

-- `ON DELETE CASCADE` makes it so that if you delete a user
-- all of their job apps get deleted as well
CREATE TABLE job_application (
  id              SERIAL PRIMARY KEY,
  date_applied    TIMESTAMPTZ,
  job_posting_id  INTEGER REFERENCES job_posting (id),
  user_id         INTEGER REFERENCES user_account (id) ON DELETE CASCADE,
  referral_id     INTEGER REFERENCES contact (id),
  offer           INTEGER,
  job_status_id   INTEGER NOT NULL
);


-- Ex. 'text', 'phone call', 'email', 'video chat'
CREATE TABLE contact_type (
  id      SERIAL PRIMARY KEY,
  type    TEXT UNIQUE
);

-- DECLINED, REJECTED, OFFER, SUBMITTED, INTERVIEW
CREATE TABLE job_status (
  id        SERIAL PRIMARY KEY,
  status    TEXT UNIQUE
);

-- Build a follow-up table; these are each encounters
CREATE TABLE interaction (
  id                    SERIAL PRIMARY KEY,
  contact_id            INTEGER REFERENCES contact (id) NOT NULL,
  job_application_id    INTEGER REFERENCES job_application (id) NOT NULL,
  contact_type_id       INTEGER REFERENCES contact_type (id) NOT NULL,
  follow_up_date        TIMESTAMPTZ,
  log                   TEXT
);

