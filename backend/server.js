require("dotenv").config(); // this helps access secret environment variables in .env

// Now lets get our required modules
const express = require("express");
const cors = require("cors"); // this helps in the frontend talking with backend when both exist at different ports

//Lets get our pool which is in simple terms our database access key variable
const pool = require("./db/connection.js"); //made in connection.js

//Lets import our routes
const authRoutes = require("./routes/authRoutes");
const groundRoutes = require("./routes/groundRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes.js");

// initializing our app
const app = express();
app.use(cors());
app.use(express.json());

//Now lets divert the upcoming requests to the routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/grounds", groundRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT; // 8000 most probably

app.listen(PORT, () => {
  console.log("\n");
  console.log(`Backend on http://localhost:${PORT} \n`);
});
