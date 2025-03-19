const {Brand, Phone} = require('../models/models');

const brandcontroller = {
    //add brand
    addBrand: async (req, res) => {
        try{
            const newBrand = new Brand(req.body); // tạo new brand
            const savedBrand = await newBrand.save(); // lưu brand
            res.status(200).json(savedBrand); // http request code
        }catch(err){
            res.status(500).json(err); // http request code
        }
    },
    //get all brand
    getAllBrand: async (req, res) => {
        try{
            const brands = await Brand.find(); // tìm tất cả brand
            res.status(200).json(brands); // http request code
        }catch(err){
            res.status(500).json(err); // http request code
        }
    },
    //get an brand
    getAnBrand: async (req, res) => {
        try{
            const brand = await Brand.findById(req.params.id).populate("phones") ; // tìm brand theo id
            res.status(200).json(brand); // http request code
        }catch(err){
            res.status(500).json(err); // http request code
        }
    },
    //add phone to brand by id phone
    addPhoneToBrand: async (req, res) => {
        try{
            const brand = await Brand.findById(req.params.id);
            const phone = await Phone.findById(req.body.phoneId);
            brand.phones.push(phone);
            await brand.save();
            res.status(200).json(brand); // http request code
        }catch(err){
            res.status(500).json(err); // http request code
        }
    },
    //delete phone from brand by id phone
    deletePhoneFromBrand: async (req, res) => {
        try{
            const brand = await Brand.findById(req.params.id);
            const phone = await Phone.findById(req.body.phoneId);
            brand.phones.pull(phone);
            await brand.save();
            res.status(200).json(brand); // http request code
        }catch(err){
            res.status(500).json(err); // http request code
        }
    }

};

module.exports = brandcontroller;