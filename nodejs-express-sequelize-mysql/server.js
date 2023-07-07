const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();


const allowedOrigins = ["http://localhost:8082", "http://localhost:8081"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const db = require("./app/models/index.js");

db.sequelize.sync();
// drop the table if already exist

//db.sequelize.sync({ force: true }).then(() => {
//  console.log("Drop and re-sync db.");
//});

dotenv.config();
// simple route
app.get("/", (req, res) => {
  res.json({ message: "successfully connected" });
});


require("./app/routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});