const { Router } = require("express");
const {
	createCustomer,
	getAllCustomers,
	getCustomerById,
	updateCustomerById,
	deleteCustomerById,
} = require("../controllers/customers");

const router = Router();

//create customer
router.post("/customers", createCustomer);

//get all customers
router.get("/customers/:page_id/:limit", getAllCustomers);

//get customer by id
router.get("/customers/:customer_id", getCustomerById);

//update customer by id
router.put("/customers/:customer_id", updateCustomerById);

//delete customer by id
router.delete("/customers/:customer_id", deleteCustomerById);

module.exports = router;
