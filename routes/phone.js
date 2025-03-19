const phonecontroller = require("../controllers/phonecontroll");

const router = require("express").Router();

//ADD PHONE
router.post("/", phonecontroller.addPhone);
router.get("/", phonecontroller.getAllPhones);
router.get("/:id", phonecontroller.getAPhone)
router.put("/:id", phonecontroller.updatePhone)

module.exports = router;