\c jobhunt;
INSERT INTO position_level (role)
VALUES
  ('internship'),
  ('junior developer'),
  ('midlevel developer'),
  ('senior developer'),
  ('architect');

INSERT INTO contact_role (role)
VALUES
  ('recruiter'),
  ('referral'),
  ('HR'),
  ('hiring manager');

INSERT INTO contact (name, phone_number, email, contact_role_id)
VALUES
  ('tailor tomas', '9491231829', 'ttomas@gmail.com', 1),
  ('adrian white', '9493331029', 'awhite@gmail.com', 1),
  ('patricia ng', '7145555555', 'png@gmail.com', 2),
  ('eric young', '8089871643', 'eyoung@gmail.com', 2),
  ('karol adil', '9493211231', 'kadil@gmail.com', 3),
  ('sophia wang', '6263331736', 'swang@gmail.com', 3),
  ('phoebe ryan', '3102187293', 'pryan@gmail.com', 4),
  ('jennifer smith', '9094827643', 'jsmith@gmail.com', 4);

INSERT INTO job_posting (
  company_name,
  post_link,
  title,
  location,
  description,
  requirement,
  salary_range_start,
  salary_range_end,
  position_level_id
)
VALUES
  (
    'ACME Company',
    'http://www.acme.com',
    'Web Developer Intern',
    'ACME City, ACME',
    'looking for interns to teach!',
    '0-1 years',
     30000,
     50000,
     1  
  ),
  (
    'google',
    'http://www.google.com',
    'Junior Web Developer',
    'Mountain View, California',
    'looking for junior developers',
    '0-2 years',
     90000,
     100000,
     2  
  ),
  (
    'microsoft',
    'http://www.microsoft.com',
    '.NET Developer',
    'Seattle, Washington',
    'looking for .NET developers',
    '3+ years',
     100000,
     120000,
     3  
  ),
  (
    'uber',
    'http://www.uber.com',
    'Front End Developer',
    'San Francisco, California',
    'looking for front end developers',
    '3+ years',
     100000,
     120000,
     3  
  ),
  (
    'facebook',
    'http://www.facebook.com',
    'Senior React Developer',
    'Menlo Park, California',
    'looking for seasoned react developers',
    '3+ years',
     125000,
     150000,
     4 
  ),
  (
    'amazon',
    'http://www.amazon.com',
    'AWS Architect',
    'Irvine, California',
    'looking for people who know AWS',
    '10+ years',
     150000,
     200000,
     5  
  );

INSERT INTO user_account (username, name, email, phone_number, position_level_id)
VALUES
  ('pattruong', 'patrick truong', 'patrick@gmail.com','7140009000', 3),
  ('jpaark', 'james park', 'jpark@gmail.com','3104938901', 1),
  ('pngo', 'phillip ngo', 'pngo@gmail.com','7148982199', 1),
  ('kmoon', 'kevin moon', 'kmoon@gmail.com','7147321238', 1),
  ('wyang', 'william yang', 'wyang@gmail.com','6263137876', 2);

INSERT INTO job_application (date_applied, job_posting_id, user_id, referral_id, offer)
VALUES
  ('2018-11-14T17:11:00', 1, 3, 3, 90000),
  ('2018-11-14T17:11:00', 1, 3, 3, 90000),
  ('2018-11-14T17:11:00', 1, 3, 3, 90000),
  ('2018-11-15T03:24:00', 1, 1, 3, 50000),
  ('2018-11-16T11:11:00', 1, 2, 4, 95000),
  ('2018-11-16T17:11:00', 2, 2, 4, 90000);

INSERT INTO contact_type (type)
VALUES
  ('phone'),
  ('text'),
  ('email'),
  ('video call');

INSERT INTO job_status (status)
VALUES
  ('not submitted'),
  ('submitted'),
  ('need follow up'),
  ('phone interview'),
  ('in person interview'),
  ('skype interview'),
  ('rejected'),
  ('offer made'),
  ('accepted'),
  ('declined');

INSERT INTO interaction (
  contact_id,
  job_application_id,
  contact_type_id,
  job_status_id,
  follow_up_date,
  log
)
VALUES
  (1, 1, 2, 2, '2018-11-14T08:11:00', 'submitted application on indeed'),
  (1, 1, 2, 4, '2018-11-15T11:11:00', 'just had phone interview with director of software'),
  (1, 1, 2, 7, '2018-11-16T16:11:00', 'application was rejected');