const db = require("../db");

//create menu items
const createMenuItem = async (req, res) => {
	const {
		restaurant_id,
		item_name,
		description,
		price,
		category,
		availability,
	} = req.body;
	try {
		const query = {
			text: "INSERT INTO menu_items(restaurant_id,item_name,description,price,category,availability) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
			values: [
				restaurant_id,
				item_name,
				description,
				price,
				category,
				availability,
			],
		};
		const result = await db.query(query);

		return res.status(201).json({
			success: true,
			message: "Menu item added succesfully",
			data: result.rows[0],
		});
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while creating menu item");
	}
};

//get all menu items
const getAllMenuItems = async (req, res) => {
	const page_id = req.params.page_id;
	const limit = req.params.limit;
	const offset = (page_id - 1) * limit;
	const query = {
		text: "SELECT * FROM menu_items ORDER BY created_at OFFSET($1) LIMIT($2)",
		values: [offset, limit],
	};
	try {
		const result = await db.query(query);
		if (!(result.rowCount === 0)) {
			return res.status(200).json({
				success: true,
				message: "All Menu items",
				data: result.rows,
			});
		} else {
			return res.status(200).json({
				success: true,
				message: "Data limit reached",
				data: [],
			});
		}
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while fetching all menu items ");
	}
};

//get menu item by id
const getMenuItemById = async (req, res) => {
	try {
		const query = {
			text: "SELECT * FROM menu_items WHERE item_id = $1",
			values: [req.params.item_id],
		};
		const result = await db.query(query);
		if (result.rows[0]) {
			return res.status(200).json({
				success: true,
				message: "Menu item retrived succesfully",
				data: result.rows[0],
			});
		} else {
			throw new Error("Menu item not found");
		}
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while fetching menu item by id");
	}
};

//update menu item by id
const updateMenuItemById = async (req, res) => {
	const {
		restaurant_id,
		item_name,
		description,
		price,
		category,
		availability,
	} = req.body;
	const menuItemId = req.params.item_id;
	try {
		const query = {
			text: "UPDATE menu_items SET restaurant_id = $1 , item_name= $2 , description = $3 ,price = $4 , category = $5, availability = $6 WHERE item_id = $7 RETURNING *",
			values: [
				restaurant_id,
				item_name,
				description,
				price,
				category,
				availability,
				menuItemId,
			],
		};
		const result = await db.query(query);

		if (result.rowCount === 1) {
			return res.status(200).json({
				success: true,
				message: "Menu item updated succesfully",
				data: result.rows[0],
			});
		} else {
			throw new Error("Menu item not found");
		}
	} catch (error) {
		console.error(error);
		throw new Error("An error has occured while updating the menu item");
	}
};

//delete menu item by id
const deleteMenuItemById = async (req, res) => {
	try {
		const query = {
			text: "DELETE FROM menu_items WHERE item_id = $1",
			values: [req.params.item_id],
		};
		const result = await db.query(query);
		if (result.rowCount === 1) {
			return res.status(200).json({
				success: true,
				message: "Menu item deleted succesfully",
				data: result.rows[0],
			});
		} else {
			throw new Error("Menu item not found");
		}
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while deleting the menu item");
	}
};

module.exports = {
	createMenuItem,
	getAllMenuItems,
	getMenuItemById,
	updateMenuItemById,
	deleteMenuItemById,
};
