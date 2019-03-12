const cookieSession = require('cookie-session');
const express = require('express');
const bodyParser = require('body-parser');
 
const app = express();

app.use(bodyParser.json());
 
app.use(cookieSession({
  name: 'session',
  keys: ['session'],
 
  // Cookie Options
  maxAge: 2 * 60 * 1000 // 2 minutes
}));

app.post('/add-click', (req,res) => {
  req.session.totalClicks = req.session.totalClicks || 0;
  req.session.totalClicks += 1;
  res.sendStatus(200);
});
app.post('/add-name', (req, res) => {
  console.log(req.body.user)
  req.session.user = req.session.user;
  req.session.user = req.body.user;
  res.sendStatus(200);
});

app.get('/get-clicks', (req, res) => {
  req.session.totalClicks = req.session && req.session.totalClicks || 0;
  const {totalClicks,user} = req.session;
  res.send({totalClicks,user});
});

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
