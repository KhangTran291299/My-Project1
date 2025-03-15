const {Phone, Brand} = require('../models/models');

const phonecontroller = {
    //ADD A PHONE
    addPhone: async (req, res) => {
        try{
            const newPhone = new Phone(req.body);
            const savedPhone = await newPhone.save();
            if (req.body.brand) {
                const brand = Brand.findById(req.body.brand);
                await brand.updateOne({$push: { phones: savedPhone._id }});
            }
            res.status(200).json(savedPhone);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //GET ALL PHONES
    getAllPhones: async (req, res) => {
        try{
            const allphones = await Phone.find().populate("brand");
            res.status(200).json(allphones);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //GET A PHONE
    getAPhone: async (req, res) => {
        try{
            const phone = await Phone.findById(req.params.id).populate("brand");
            res.status(200).json(phone);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //UPDATE A PHONE
    updatePhone: async (req, res) => {
        try{
            const updatedPhone = await Phone.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).populate("brand");
            res.status(200).json(updatedPhone);
        }catch(err){
            res.status(500).json(err);
        }
    }
};
module.exports = phonecontroller;