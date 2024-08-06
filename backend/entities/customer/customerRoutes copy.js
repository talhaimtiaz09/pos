const express = require("express");
const router = express.Router();
const customerController = require("./customerController");

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management
 */

/**
 * @swagger
 * /customer/test:
 *   get:
 *     summary: Route tester
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/test", (req, res) => {
  res.send("Hello from customer route");
});

/**
 * @swagger
 * /customer/all:
 *   get:
 *     summary: List all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The customer ID
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The customer's name
 *                     example: John Doe
 */
router.get("/all", customerController.renderAllcustomers);

/**
 * @swagger
 * /customer/{id}:
 *   get:
 *     summary: View a single customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The customer ID
 *     responses:
 *       200:
 *         description: A single customer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The customer ID
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The customer's name
 *                   example: John Doe
 */
router.get("/:id", customerController.rendercustomerById);

/**
 * @swagger
 * /customer/new:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The customer's name
 *                 example: John Doe
 *               address:
 *                 type: string
 *                 description: The customer's address
 *                 example: 123 Main St
 *               phone:
 *                 type: string
 *                 description: The customer's phone number
 *                 example: "555-555-5555"
 *     responses:
 *       200:
 *         description: The created customer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The customer ID
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The customer's name
 *                   example: John Doe
 */
router.post("/new", customerController.createNewcustomer);

/**
 * @swagger
 * /customer/update/{id}:
 *   put:
 *     summary: Update a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The customer's name
 *                 example: John Doe
 *               address:
 *                 type: string
 *                 description: The customer's address
 *                 example: 123 Main St
 *               phone:
 *                 type: string
 *                 description: The customer's phone number
 *                 example: "555-555-5555"
 *     responses:
 *       200:
 *         description: The updated customer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The customer ID
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The customer's name
 *                   example: John Doe
 */
router.put("/update/:id", customerController.updatecustomer);

/**
 * @swagger
 * /customer/delete/{id}:
 *   delete:
 *     summary: Delete a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The customer ID
 *     responses:
 *       200:
 *         description: The deleted customer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The customer ID
 *                   example: 1
 */
router.delete("/delete/:id", customerController.deletecustomer);

module.exports = router;
