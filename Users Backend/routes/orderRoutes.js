const express = require("express");
const { submitOrder } = require("../controllers/orderController");

const router = express.Router();

router.post("/", submitOrder);

module.exports = router;
