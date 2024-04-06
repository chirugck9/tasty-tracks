const { Router } = require("express");
const { createCustomer, getAllCustomers } = require("../controllers/customers");

const router = Router();

//create customer
router.post("/customers", createCustomer);
router.get("/customers/:page_id/:limit", getAllCustomers);

module.exports = router;
