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
app.use("/api/post", require("./routes/routes"));

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

app.get('/room/:Room_ID', async (req, res) => {
  try {
    const { Room_ID } = req.params;
    console.log("Im here in backend!");
    console.log(Room_ID);

    /*if (!mongoose.Types.ObjectId.isValid(Room_ID)) {
      return res.status(400).json({ error: 'Invalid Room ID' });
    }*/

    console.log("Im here in backend 2!");

    const room = await Room.findOne({ Room_ID: Room_ID });
    console.log(room.Room_ID);
    console.log(room.propertyName);
    console.log("Im here!");

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.status(200).json(room);
  } catch (error) {
    console.error('Error fetching room details:', error);
    res.status(500).json({ error: 'Failed to fetch room details' });
  }
});

// Serve static files from the 'upload' folder
app.use('/uploads', express.static('uploads'));

//listen for request
app.listen(process.env.PORT, () => {
  console.log('connected to db & listening on port', process.env.PORT)
})