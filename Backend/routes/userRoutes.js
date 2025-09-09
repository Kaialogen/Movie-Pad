const express = require("express");
const {
  updateUsername,
  updatePassword,
  deleteAccount,
} = require("../controllers/userController");

const router = express.Router();

router.put("/update-username", updateUsername);
router.put("/update-password", updatePassword);
router.delete("/delete-account", deleteAccount);

module.exports = router;
