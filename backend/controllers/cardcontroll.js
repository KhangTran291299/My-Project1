const { populate } = require('dotenv');
const {Brand, Phone, Card} = require('../models/models');

const cardcontroller = {
    // add card
    addCard: async (req, res) => {
        try{
            const newCard = new Card(req.body); // tạo new card
            const savedCard = await newCard.save(); // lưu card
            res.status(200).json(savedCard); // http request code
        }catch(err){
            res.status(500).json(err); // http request code
        }
    },

    // get a card
    getCard: async (req, res) => {
        try{
            const card = await Card.findById(req.params.id).populate("phones") ; // tìm card
            res.status(200).json(card); // http request code
        }
        catch(err){
            res.status(500).json(err); // http request code
        }
    },
    
    // add phone to card by id phone
    addPhoneToCard: async (req, res) => {
        try {
            const card = await Card.findById(req.params.id);
            if (!card) {
                return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
            }
    
            // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            if (card.phones.includes(req.body.phoneId)) {
                return res.status(400).json({ message: "Sản phẩm đã có trong giỏ hàng" });
            }
    
            const phone = await Phone.findById(req.body.phoneId);
            if (!phone) {
                return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
            }
    
            card.phones.push(phone._id);
            await card.save();
            
            const updatedCard = await Card.findById(card._id).populate('phones');
            res.status(200).json(updatedCard);
        } catch (err) {
            console.error('Error adding phone to cart:', err);
            res.status(500).json({ message: err.message });
        }
    },
    
    // delete phone from card by id phone
    deletePhoneInCard: async (req, res) => {
        try{
            const card = await Card.findById(req.params.id);
            const phone = await Phone.findById(req.body.phoneId);
            card.phones.pull(req.body.phoneId);
            await card.save();
            const updatedCard = await Card.findById(card._id).populate('phones');
            res.status(200).json(card); // http request code
        }catch(err){
            res.status(500).json(err); // http request code
        }
    }
};

module.exports = cardcontroller;