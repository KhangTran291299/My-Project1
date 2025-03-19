const cardcontroller = require('../controllers/cardcontroll');

const router = require('express').Router();

//ADD CARD
router.post('/', cardcontroller.addCard);
router.get('/:id', cardcontroller.getCard);
router.put('/:id/add', cardcontroller.addPhoneToCard);
router.delete('/:id/remove', cardcontroller.deletePhoneInCard);

module.exports = router;