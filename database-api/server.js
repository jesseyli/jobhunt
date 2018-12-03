const db = require('./db');

const express = require('express');
const app = express();

require('dotenv').load();

// generic GET handler; useful for demos
// we could replace this for a traditional controller-route setup
const GET = (url, handler) => {
  app.get(url, async (req, res) => {
    try {
      let data = await handler(req);
      res.json({
        success: true,
        data
      })
    } catch (error) {
      res.json({
        success: false,
        error: error.message || error
      })
    }
  })
}


// -------- routes --------
GET('/people/create', () => db.people.create());
GET('/people/add/:name', req => db.people.add(req.params.name));

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`🚀 Server ready at http://localhost:${port}`)
);