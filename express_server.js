var express = require("express");
var app = express();
var PORT = 8080; // default port 8080

app.set("view engine", "ejs");

// serving public assets
// serve STATIC files from the filesystem like images, css, javascript, erc.

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

// Route HANDLER
app.get("/", (req, res) => {
  // Looks in the filesystem for a file system at ./views/... called urls.ejs (because the view engine is ejs)
  res.render("urls_index", { variable: 'Something else' });
});

app.get("/urls/:var/and/:xyz", (req, res) => {
  res.send(req.params.xyz)
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/urls/:shortURL", (req, res) => {
  let templateVars = { shortURL: req.params.shortURL, longURL: /* What goes here? */ };
  res.render("urls_show", templateVars);
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase, variable:"test" };
  res.render("urls_index", templateVars);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

// Starts the server process that listens on the port
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});