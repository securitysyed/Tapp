var express = require("express"); //Step 1
var app = express();
var PORT = 8080; // default port 8080

app.set("view engine", "ejs"); //Step 2

// serving public assets
// serve STATIC files from the filesystem like images, css, javascript, erc.

var urlDatabase = { //part of Step 1
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

// Route HANDLER
app.get("/", (req, res) => { //part of Step 1
  let templateVars = { urls: urlDatabase, variable:"test" }
  // Looks in the filesystem for a file system at ./views/... called urls.ejs (because the view engine is ejs)
  res.render("urls_index", templateVars);
});

app.get("/urls/:var/and/:xyz", (req, res) => {
  res.send(req.params.xyz)
});

app.get("/urls.json", (req, res) => { //Step 3 (look for step 4 too), here we are adding a new route. Important: Any change in this file which is the 'server' requires us to restar the server in the cmd.
  res.json(urlDatabase);
});

app.get("/urls/:shortURL", (req, res) => {
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("urls_show", templateVars);
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase, variable:"test" };
  res.render("urls_index", templateVars);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

// part of Step 1. This part starts the server process that listens on the port. This should be written in the bottom to make it look clean and easier to find.
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});


// Step 4 and so on: Make sure every step is tested via the cmd. and chrome: http://localhost:8080/
//We should inspect this with curl too by: curl -i http://localhost:8080/hello, when the server is up. To tabs of cmd, one for server up and the second to test in curl.