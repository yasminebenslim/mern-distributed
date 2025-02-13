const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://172.20.0.2:27017/mernApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
});
const Item = mongoose.model('Item', ItemSchema);

// GET routes
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.get('/items/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});

// POST routes
app.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

app.post('/items/update/:id', async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedItem);
});

app.listen(5000, '0.0.0.0', () => console.log('Server running on port 5000'));
