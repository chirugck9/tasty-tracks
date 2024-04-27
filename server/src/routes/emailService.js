const { Router } = require("express");
const { sendInvoiceEmail, sendEmail } = require("../controllers/emailService");

const router = Router();

router.post("/email", sendEmail);

module.exports = router;
