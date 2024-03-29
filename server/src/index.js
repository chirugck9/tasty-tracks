const express = require("express");
const { PORT } = require("./constants");

const app = express();

//initialize middlewares
app.use(express.json());

//import routes
const authRoutes = require("./routes/auth");

//initialize routes
app.use("/api", authRoutes);

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
