const express = require("express");
const router = express.Router();

const { signup, signin } = require("../controller/userController");
const { validateToken } = require("../middleware/jwt");

router.post("/signup", signup);
router.post("/signin", signin);

router.get('/test', validateToken , () => {
  console.log('Test called');
})

module.exports = router;
