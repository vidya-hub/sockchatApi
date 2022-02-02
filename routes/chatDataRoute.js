require("dotenv").config();
const express = require("express");
const router = express.Router();
const Chat = require("../models/chatModel");
router.use(express.json());

router.post("/chatdata", (req, res) => {
  const userName = req.body.userName;
  Chat.find({}).then((chat) => {
    // console.log(chat);
    res.json(chat);
  });
});
module.exports = router;
