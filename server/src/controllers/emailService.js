const { createTransport } = require("nodemailer");
const { PASSWORD } = require("../constants");
const db = require("../db");

const transporter = createTransport({
	host: "smtp-relay.brevo.com",
	port: 587,

	auth: {
		user: "chiru.gadakary@gmail.com",
		pass: PASSWORD,
	},
});

const sendEmail = async (req, res) => {
	const { orderId } = req.body;
	const query1 = {
		text: "SELECT email , order_id , total_price FROM customers INNER JOIN orders ON customers.customer_id = orders.customer_id WHERE order_id = $1",
		values: [orderId],
	};
	try {
		const result = await db.query(query1);
		await transporter.sendMail({
			from: "test@gmail.com",
			to: "chiru.gadakary@gmail.com",
			subject: "Your tasty-tracks order invoice",
			html: `<p>Thank you for your order!</p>
		    			<p>Order ID: ${orderId}</p>
		    			<p>Order Details:</p>
		   				<p>Total Amount: $${result.total_price}</p>`,
		});
		return res.status(201).json({
			success: true,
		});
	} catch (error) {
		console.error("Error sending invoice email", error);
		throw new Error("Failed to send invoice email");
	}
};

//function to send email with invoice
// const sendInvoiceEmail = async (req, res) => {
// const { orderId } = req.body;
// const query1 = {
// 	text: "SELECT email , order_id , total_price FROM customers INNER JOIN orders ON customers.customer_id = orders.customer_id WHERE order_id = $1",
// 	values: [orderId],
// };
// 	try {
// 		const result = await db.query(query1);
// 		//email template
// 		const message = [
// 			{
// 				from_email: "test@gmail.com",
// 				to_email: result.email,
// 				html: `<p>Thank you for your order!</p>
//             			<p>Order ID: ${orderId}</p>
//             			<p>Order Details:</p>
//            				<p>Total Amount: $${result.total_price}</p>`,
// 			},
// 		];
// 		const mcData = JSON.stringify(message);
// 		const options = {
// 			url: "https://us22.api.mailchimp.com/3.0/lists/519eee8f54",
// 			method: "POST",
// 			headers: {
// 				Authorization: "auth a403b9b38b8d5b7712d083ce9514b37-us22",
// 			},
// 			body: mcData,
// 		};

// 		if (result.email) {
// 			request(options, (err, response, body) => {
// 				if (err) {
// 					res.json({ error: err });
// 				} else {
// 					if (js) {
// 						res.sendStatus(200);
// 					}
// 				}
// 			});
// 		}
// 	} catch (error) {
// 		console.error("Error sending invoice email", error);
// 		throw new Error("Failed to send invoice email");
// 	}
// };

module.exports = { sendEmail };
