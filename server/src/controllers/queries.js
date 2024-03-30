const registerUser =
	"INSERT INTO users(username,email,password,first_name,last_name,phone_number,role_type) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
module.exports = { registerUser };
