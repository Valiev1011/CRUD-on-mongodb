const { Router } = require("express");
const {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  loginUser,
  deleUser,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/:id", updateUser);
// router.post("/login", loginUser);
router.delete("/:id", deleUser);

module.exports = router;
