require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));
const validator = require("validator");
const compression = require("compression");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
const { nodeMailer } = require("./modelMail");
app.use(express.json());
const router = express.Router();

app.use(compression());

async function receiveEmail(req, res) {
  await nodeMailer(
    `message received from ${req.body.name}`,
    `${req.body.message} from ${req.body.email}`,
    process.env.EMAIL_RECEIVER,
    res
  );
}

function checkLengthInput(req, res, next) {
  const input = [req.body.name, req.body.message, req.body.email];
  if (!input.some((el) => el.trim().length === 0)) next();
  else return res.send("something went wrong");
}

function checkValidEmail(req, res, next) {
  if (!validator.isEmail(req.body.email)) {
    res.emailValid = false;
    return res.send("email is not valid");
  }
  next();
}

function renderHomePage(req, res) {
  res.render("home");
}

function postHomePage(req, res) {
  receiveEmail(req, res);
}

router
  .route("/")
  .get(renderHomePage)
  .post(checkLengthInput, checkValidEmail, postHomePage);
app.use("/", router);

app.all("*", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server started");
});
