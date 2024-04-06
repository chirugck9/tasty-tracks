const express = require("express");
const { PORT, CLIENT_URL } = require("./constants");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");

const app = express();
//import passport middleware
require("./middlewares/passport-middleware");

//initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
//import routes
const authRoutes = require("./routes/auth");
const customers = require("./routes/customers");
const restaurantOwners = require("./routes/restaurant-owners");
const { userAuth } = require("./middlewares/auth-middleware");

//initialize routes
app.use("/api", authRoutes);
app.use("/api", userAuth, customers);
app.use("/api", userAuth, restaurantOwners);
//app start
const appStart = () => {
	try {
		app.listen(PORT, () => {
			console.log(`The app is running at http://localhost:${PORT}`);
		});
	} catch (error) {
		console.log(`Error:${error.message}`);
	}
};
appStart();
