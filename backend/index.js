const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const brandRouter = require('./routes/brand');
const phoneRouter = require('./routes/phone');
const cardRouter = require('./routes/card');
const session = require('express-session');
const { Phone } = require('./models/models'); // Import model Phone
const { Brand } = require('./models/models'); // Import model Brand
const { Card } = require('./models/models'); // Import model Card


// connet to db
dotenv.config();
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


// gioi han tai trong
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(morgan('common'));

// routes
app.use("/brand", brandRouter);
app.use("/phone", phoneRouter);
app.use("/card", cardRouter);

//set view engine to EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/product', async (req, res) => {
    try {
        const phones = await Phone.find().populate('brand');
        console.log('Fetched phones:', phones); // Log dữ liệu điện thoại
        res.render('product', { phones });
    } catch (err) {
        console.error('Error fetching phones:', err); // Log lỗi chi tiết
        res.status(500).json(err);
    }
});

app.get('/search', async (req, res) => {
    try {
        const searchQuery = req.query.q;
        const phones = await Phone.find({
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { 'brand.name': { $regex: searchQuery, $options: 'i' } }
            ]
        }).populate('brand');
        
        res.render('product', { phones });
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).send('Error performing search');
    }
});

app.get('/product/:id', async (req, res) => {
    try {
        const phone = await Phone.findById(req.params.id).populate('brand');
        res.render('details', { phone });
    } catch (err) {
        console.error('Error fetching phone details:', err);
        res.status(500).json(err);
    }
});

app.get('/cart-count', async (req, res) => {
    try {
        const cart = await Card.findById('67c2fc076712ec146f26fa6f');
        const count = cart ? cart.phones.length : 0;
        res.json({ count });
    } catch (err) {
        console.error('Error fetching cart count:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/cart', async (req, res) => {
    try {
        const cart = await Card.findById('67c2fc076712ec146f26fa6f').populate({
            path: 'phones',
            populate: { path: 'brand' }
        });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.json(cart); // ✅ Trả về JSON thay vì HTML
    } catch (err) {
        console.error('Error fetching cart:', err);
        res.status(500).json({ error: err.message });
    }
});


app.listen(8000, () => {
    console.log('Server is running on port 8000');
});