if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Importing Libraies that we installed using npm
const express = require("express");
const app = express();
const axios = require("axios");

const bcrypt = require("bcrypt"); // Importing bcrypt package to encrypt the password
// to login using goole or facebook or ..
const passport = require("passport");
const initializePassport = require("./passport-config");
// to disply some flash messages such as "You are logged in"
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const users = [];
// send the form data to the server in the request body not as a query string
app.use(express.urlencoded({ extended: false }));

app.use(flash());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // We wont resave the session variable if nothing is changed
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
const cors = require("cors");
const { response } = require("express");
app.use(cors());

app.use(express.json());

// Configuring the register post functionality
app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// Configuring the register post functionality
// After submitting the form, this function will run
app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log("register request recieved");
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log(users);
    res.send({ registeredUser: req.body.name });
    // Display newly registered in the console
    // res.redirect("/login");
  } catch (e) {
    console.log(e);
    // res.redirect("/register");
  }
});

// Routes
app.get("/", checkAuthenticated, (req, res) => {
  res.render("index.ejs", { name: req.user.name });
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});

// for find atm page, just sends locations back
app.post("/atms", (req, res) => {
  const apiKey = process.env.GOOGLE_MAP_KEY;

  let locationCurr;
  let latitude;
  let longitude;
  let atms = [];
  let address = req.body.address;
  const radius = 10000; // in meters
  console.log(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
  //get user location
  let url2;
  axios
    .get(url)
    .then((data) => {
      console.log(data.data);
      locationCurr = data.data.results[0].geometry.location;
      latitude = locationCurr.lat;
      longitude = locationCurr.lng;
      console.log(locationCurr);
      atms.push(locationCurr);
      console.log("here");
      url2 = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=bank&keyword=chase&key=${apiKey}`;
      atm();
    })
    .catch((error) => {
      console.log(error);
    });

  let atm = function () {
    axios
      .get(url2)
      .then((response) => {
        // console.log(response.data.results[0]);

        for (let i = 0; i < response.data.results.length; i++) {
          atms.push(response.data.results[i].geometry.location);
        }
        res.send(JSON.stringify(atms));
      })
      .catch((error) => {
        console.log(error);
      });
  };
});

// End Routes

// app.delete('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/login')
//   })

app.delete("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

app.listen(5001);
