require('dotenv').config()

const mongoose = require('mongoose')
const express = require("express");
const { default: axios } = require("axios");
const Room = require('./models/RoomInf');
const roommateRoutes = require('./routes/roommates')
const cors = require("cors");

//express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

//middleware
app.use(express.json());
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
//Routes
app.use('/api/roommates', roommateRoutes)
app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    const r = await axios.put(
      'https://api.chatengine.io/users/',
      { username: username, secret: username, first_name: username },
      { headers: { "private-key": "53d32cf5-88d8-413b-a5c3-6d72352f9f79" } }
    )
    return res.status(r.status).json(r.data)
  } catch (error) {
    return res.status(error.response.status).json(e.response.data)
  }

  return res.json({ username: username, secret: "sha256..." });
});

// Add your create data route here
app.post('/room', async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Failed to create room' });
  }
});

app.get('/room', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching room listings:', error);
    res.status(500).json({ error: 'Failed to fetch room listings' });
  }
});

//listen for request
app.listen(process.env.PORT, () => {
  console.log('connected to db & listening on port', process.env.PORT)
})