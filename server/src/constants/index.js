const { config } = require("dotenv");
config();

// module.exports = {
// 	PORT: process.env.PORT,
// 	SERVER_URL: process.env.SERVER_URL,
// 	CLIENT_URL: process.env.CLIENT_URL,
// 	SECRET: process.env.SECRET,
// };

module.exports = {
	PORT: 8000,
	SECRET: "QWERTY123456UIOP789",

	CLIENT_URL: "http://localhost:3000",
	SERVER_URL: "http://localhost:8000",
};
