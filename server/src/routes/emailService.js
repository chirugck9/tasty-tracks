const { Router } = require("express");
const { sendInvoiceEmail } = require("../controllers/emailService");

const router = Router();

router.post("/email", sendInvoiceEmail);

module.exports = router;
