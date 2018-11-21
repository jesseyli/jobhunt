/*

*/
INSERT INTO user_account(
  username,
  name,
  email,
  password,
  phone_number,
  position_level_id
)
VALUES
(${username}, ${name}, ${email}, ${password}, ${phoneNumber}, ${positionId})
RETURNING 
  id,
  username,
  name,
  email,
  phone_number