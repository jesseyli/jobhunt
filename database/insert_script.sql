INSERT INTO position_level (role)
VALUES
  ('junior developer'),
  ('midlevel developer'),
  ('senior developer');

INSERT INTO contact_role (role)
VALUES
  ('recruiter'),
  ('referral'),
  ('hiring manager');

INSERT INTO contact (name, phone_number, email, contact_role_id)
VALUES
  ('phillip ngo', '7145555555', 'nago@gmail.com', 2),
  ('jason yee', '7146663333', 'jyee@gmail.com', 1),
  ('kevin moon', '7145005555', 'kmoon@gmail.com', 2),
  ('doug nguyen', '6460002222', 'dougie@gmail.com', 3);

INSERT INTO job_posting (
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
  ('Google', 'http://www.google.com', 'Associate Software Engineer', 'Looking for developers with MERN background', 'BA/BS or equivalent education', 90000, 100000, 1),
  ('Facebook', 'http://www.facebook.com', 'Midlevel Software Engineer', 'MERN, MERN, MERN!', 'BA/BS/MS/PHD', 120000, 130000, 2);

INSERT INTO user_account (
  username,
  name,
  email,
  phone_number,
  position_level_id
)
VALUES
  ('pattruong', 'patrick truong', 'patrick@gmail.com', '7140009000', 1),
  ('wyang', 'william yang', 'wyang@gmail.com', '6464646464', 2);

INSERT INTO job_application (
  date_applied,
  job_posting_id,
  user_id,
  referral_id,
  offer,
  job_status_id
)
VALUES
  (to_timestamp(1542329612904 / 1000.0), 2, 1, NULL, NULL, 3),
  (to_timestamp(1542329759122 / 1000.0), 1, 2, NULL, NULL, 3);

INSERT INTO contact_type (type)
VALUES
  ('TEXT'),
  ('PHONE'),
  ('EMAIL'),
  ('VIDEO CHAT'),
  ('IN-PERSON INTERVIEW');

INSERT INTO job_status (status)
VALUES
  ('INTERVIEW'),
  ('OFFER'),
  ('SUBMITTED'),
  ('REJECTED'),
  ('DECLINED'),
  ('ACCEPTED');

INSERT INTO interaction (
  contact_id,
  job_application_id,
  contact_type_id,
  follow_up_date,
  log
)
VALUES
  (2, 1, 4, to_timestamp(1542330214963 / 1000.0), 'Had a short chat with Jason over what I want out of work life.'),
  (4, 2, 3, to_timestamp(1542330305982 / 1000.0), 'Got a quick rejection email.');