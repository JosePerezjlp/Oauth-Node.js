const express = require("express");
const session = require("express-session");
const passport = require("passport")
const MongoStore = require("connect-mongo");
const { SECRET, MONGODB_URI } = require("./config");

const app = express();
require("./strategies/discordStrategy")

// Middlewares
app.use(
  session({
    secret: SECRET,
    cookie: {
      maxAge: 60000 * 60 * 24, // 1 day
    },
    saveUninitialized: false,
    resave: false,
    name: "johanna",
    store: MongoStore.create({
      mongoUrl: MONGODB_URI,
    }),
  })
);
app.use(passport.initialize())
app.use(passport.session())

// Global variables
app.use((req, res, next) => {
  app.locals.user = req.user
  next()
})

// Routes
app.use("/", require("./routes/index.routes"));
app.use("/auth", require("./routes/auth.routes"));
app.use("/dashboard", require("./routes/dashboard.routes"));

module.exports = app;
