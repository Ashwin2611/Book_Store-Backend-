const express = require("express");
const Bookrouters = require("./router/BookRouter");
const userrouters = require("./router/UserRouter");
const Authenticationrouter = require("./router/AuthenticationRouter");
const cartrouters = require("./router/CartRouter");
const orderrouter = require("./router/OrderRouter");
const mongoose = require("mongoose");
const cors = require("cors");
const stripe = require("stripe")(process.env.SECRET_KEY);
// const http = require('http');
const app = express();
app.use(express.json());
// app.use(cors());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://book-store-w6ta.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Hello server started");
});

// http.globalAgent.maxSockets = Infinity; // No limit

app.use((err, req, res, next) => {
  console.error("Error occurred:", err.message);
  res.status(500).send("Internal Server Error");
});

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  next(err);
});

mongoose
  .connect(
    "mongodb+srv://ashwinmurugan818:rNJQisFGKsnRcsPl@cluster0.6wmom.mongodb.net/BookStore?retryWrites=true&w=majority&appName=Cluster0",
    {}
  )
  .then(() => {
    console.log("DB is Connected");
  })
  .catch(() => {
    console.log("DB connection failed");
  });

app.use("/api/v1/book", Bookrouters);
app.use("/api/v1/user", userrouters);
app.use("/api/v1/authentication", Authenticationrouter);
app.use("/api/v1/order", orderrouter);
app.use("/api/v1/cart", cartrouters);

app.listen(3000, "0.0.0.0", () => {
  console.log("Listening to 3000");
});

// server.timeout = 120000;

//ashwinmurugan818
//rNJQisFGKsnRcsPl
