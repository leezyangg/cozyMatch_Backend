require('dotenv').config()

const mongoose = require('mongoose')
const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");


const app = express();

//middleware
app.use(express.json());
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

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

//connect to db
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    //listen to request
  })
  .catch((error) => {
    console.log(error)
  })

//listen for request
app.listen(process.env.PORT, () => {
  console.log('connected to db & listening on port', process.env.PORT)
})