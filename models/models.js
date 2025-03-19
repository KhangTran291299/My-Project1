// tạo khung database
const mongoose = require('mongoose');

// 1. Brand
const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    phones: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Phone'
        },
    ],
});


// 2. Phone
const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    price: Number,
    color: {
        type: [String],
    },
    description: String,
    image: {
        type: [String],
        required: true 
    },
    ram:{
        type: Number,
        required: true 
    },
    rom:{
        type: Number,
        required: true 
    },
    description: String,
    brand: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
    },
});

// 3. Card
const cardSchema = new mongoose.Schema({
    phones: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Phone',
        },
    ],
});


let Phone = mongoose.model('Phone', phoneSchema);
let Brand = mongoose.model('Brand', brandSchema);
let Card = mongoose.model('Card', cardSchema);

module.exports = { Phone, Brand, Card };