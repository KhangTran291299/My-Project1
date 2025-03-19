const brandcontroller = require('../controllers/brandcontroll');

const router = require('express').Router();

router.post("/", brandcontroller.addBrand);

router.get("/", brandcontroller.getAllBrand);

router.get("/:id", brandcontroller.getAnBrand);

router.put("/:id/addphone", brandcontroller.addPhoneToBrand);

router.put("/:id/deletephone", brandcontroller.deletePhoneFromBrand);

module.exports = router;