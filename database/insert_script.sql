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
  ('kevin moon', '7145005555', 'kmoon@gmail.com', 2);

INSERT INTO job_posting (
  company_name,
  post_link,
  job_description,
  salary_range_start,
  salary_range_end,
  position_level_id
)
VALUES
  (
    'google',
    'http://www.google.com',
    'looking for junior developers',
    90000,
    100000,
    1  
  );

INSERT INTO user_account (
  username,
  name,
  email,
  phone_number,
  position_level_id
)
VALUES
  (
    'pattruong',
    'patrick truong',
    'patrick@gmail.com',
    '7140009000',
    1
  );

INSERT INTO job_application (
  date_applied,
  user_id,
  referral_id
)
VALUES
  (
    '2018-11-15T03:24:00',
    1,
    1
  );

INSERT INTO contact_application (
  job_application_id,
  contact_id,
  description
)
VALUES
  (
    1,
    2,
    'applied through indeed'
  );