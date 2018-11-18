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
  ('phillip ngo', '7145555555', 'nago@gmail.com', 2),
  ('jason yee', '7146663333', 'jyee@gmail.com', 1),
  ('kevin moon', '7145005555', 'kmoon@gmail.com', 2),
  ('doug nguyen', '6460002222', 'dougie@gmail.com', 3),
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
  ('ACME Company', 'http://www.acme.com', 'Web Developer Intern', 'ACME City, ACME', 'looking for interns to teach!', '0-1 years', 30000, 50000, 1),
  ('Google', 'http://www.google.com', 'Junior Web Developer', 'Mountain View, California', 'looking for junior developers', '0-2 years', 90000, 100000, 2),
  ('Microsoft', 'http://www.microsoft.com', '.NET Developer', 'Seattle, Washington', 'looking for .NET developers', '3+ years', 100000, 120000, 3),
  ('Uber', 'http://www.uber.com', 'Front End Developer', 'San Francisco, ', 'looking for front end developers', '3+ years', 100000, 120000, 3),
  ('Facebook', 'http://www.facebook.com', 'Senior React Developer', 'Menlo Park, California', 'looking for seasoned react developers', '3+ years', 125000, 150000, 4),
  ('Amazon', 'http://www.amazon.com', 'AWS Architect', 'Irvine, California', 'looking for people who know AWS', '10+ years', 150000, 200000, 5);


INSERT INTO user_account (username, name, email, phone_number, position_level_id)
VALUES
  ('pattruong', 'patrick truong', 'patrick@gmail.com','7140009000', 3),
  ('jpaark', 'james park', 'jpark@gmail.com','3104938901', 1),
  ('pngo', 'phillip ngo', 'pngo@gmail.com','7148982199', 1),
  ('kmoon', 'kevin moon', 'kmoon@gmail.com','7147321238', 1),
  ('wyang', 'william yang', 'wyang@gmail.com','6263137876', 2);

INSERT INTO job_application (date_applied, job_posting_id, user_id, referral_id, offer, job_status_id)
VALUES
  ('2018-11-14T17:11:00', 1, 3, 3, NULL, 2),
  ('2018-11-14T17:11:00', 1, 3, NULL, NULL, 2),
  ('2018-11-14T17:11:00', 1, 3, 3, NULL, 2),
  ('2018-11-15T03:24:00', 1, 1, NULL, NULL, 2),
  ('2018-11-16T11:11:00', 1, 2, 4, 95000, 8),
  ('2018-11-16T17:11:00', 2, 2, 4, 90000, 9),
  (to_timestamp(1542329612904 / 1000.0), 2, 1, NULL, NULL, 2),
  (to_timestamp(1542329759122 / 1000.0), 1, 2, NULL, NULL, 2);


INSERT INTO contact_type (type)
VALUES
  ('TEXT'),
  ('PHONE'),
  ('EMAIL'),
  ('VIDEO CHAT'),
  ('IN-PERSON INTERVIEW');

INSERT INTO job_status (status)
VALUES
  ('NOT SUBMITTED'),
  ('SUBMITTED'),
  ('NEED FOLLOW UP'),
  ('PHONE INTERVIEW'),
  ('IN PERSON INTERVIEW'),
  ('VIDEO CALL INTERVIEW'),
  ('REJECTED'),
  ('OFFER'),
  ('ACCEPTED'),
  ('DECLINED');

INSERT INTO interaction (
  contact_id,
  job_application_id,
  contact_type_id,
  follow_up_date,
  log
)
VALUES
  (2, 1, 4, to_timestamp(1542330214963 / 1000.0), 'Had a short chat with Jason over what I want out of work life.'),
  (4, 2, 3, to_timestamp(1542330305982 / 1000.0), 'Got a quick rejection email.'),
  (1, 1, 2, '2018-11-14T08:11:00', 'submitted application on indeed'),
  (1, 1, 2, '2018-11-15T11:11:00', 'just had phone interview with director of software'),
  (1, 1, 2, '2018-11-16T16:11:00', 'application was rejected');