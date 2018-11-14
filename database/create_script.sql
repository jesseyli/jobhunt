CREATE EXTENSION citext;

-- Ex. `position_level`: junior / midlevel / senior / non-categorized
CREATE TABLE position_level (
  id      SERIAL PRIMARY KEY,
  role    TEXT
);

-- Ex. `contact_role`: recruiter, referral, hiring manager
CREATE TABLE contact_role (
  id      SERIAL PRIMARY KEY,
  role    TEXT 
);

CREATE TABLE contact (
  id                  SERIAL PRIMARY KEY, 
  name                TEXT NOT NULL,
  phone_number        TEXT UNIQUE,
  email               CITEXT UNIQUE,
  contact_role_id     INTEGER REFERENCES contact_role (id)
);

CREATE TABLE job_posting (
  id                    SERIAL PRIMARY KEY,
  company_name          TEXT NOT NULL,
  post_link             TEXT NOT NULL,
  job_description       TEXT,
  salary_range_start    INTEGER,
  salary_range_end      INTEGER,
  position_level_id     INTEGER REFERENCES position_level (id)
);

CREATE TABLE user_account (
  id                  SERIAL PRIMARY KEY,
  username            TEXT,
  name                TEXT NOT NULL,
  email               CITEXT,
  phone_number        TEXT,
  position_level_id   INTEGER REFERENCES position_level (id),
  UNIQUE (username, email, phone_number)
);

-- `ON DELETE CASCADE` makes it so that if you delete a user
-- all of their job apps get deleted as well
CREATE TABLE job_application (
  id              SERIAL PRIMARY KEY,
  date_applied    TIMESTAMPTZ,
  user_id         INTEGER REFERENCES user_account (id) ON DELETE CASCADE,
  referral_id     INTEGER REFERENCES contact_role (id)
);

-- Only create a `contact_application` if there is someone who assisted or contacted you
CREATE TABLE contact_application (
  id                    SERIAL PRIMARY KEY,
  job_application_id    INTEGER REFERENCES job_application (id),
  contact_id            INTEGER REFERENCES contact (id) NOT NULL,
  description           TEXT
);