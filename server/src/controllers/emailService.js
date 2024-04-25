const db = require("../db");
const mailChimp = require("@mailchimp/mailchimp_transactional");
const { MAILCHIMP_API_KEY } = require("../constants");

//configure mailChimp API key
const mailChimpApiKey = process.env.MAILCHIMP_API_KEY;
const client = mailChimp.createClient({ apiKey: mailChimpApiKey });

//function to send email with invoice
const sendInvoiceEmail = async (req, res) => {
	const { orderId } = req.body;

	const query1 = {
		text: "SELECT email , order_id , total_price FROM customers INNER JOIN orders ON customers.customer_id = orders.customer_id WHERE order_id = $1",
		values: [orderId],
	};
	try {
		const result = await db.query(query1);
		//email template
		const message = {
			from_email: "test@gmail.com",
			ro: [{ email: result.email }],
			subject: "Your order invoice",
			html: `<p>Thank you for your order!</p>
            <p>Order ID: ${orderId}</p>
            <p>Order Details:</p>
            <p>Total Amount: $${result.total_price}</p>`,
		};
		const emailResult = await client.messages.send({ message });
		console.log("invoice email sent succesfully", emailResult);
	} catch (error) {
		console.error("Error sending invoice email", error);
		throw new Error("Failed to send invoice email");
	}
};

module.exports = { sendInvoiceEmail };
