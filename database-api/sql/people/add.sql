/*

*/
INSERT INTO people(name)
VALUES
(${name})
RETURNING 
  id,
  name