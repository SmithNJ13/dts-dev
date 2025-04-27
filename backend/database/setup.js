const fs = require("fs");
require("dotenv").config(); // load env config

// load in the sql statements
const sql = fs.readFileSync("./database/setup.sql").toString();
const db = require("./database.js");

db.query(sql)
    .then(data => console.log("Setup complete!"))
    .catch(error => console.log(error));
