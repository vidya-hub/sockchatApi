const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    expire_at: { type: Date, default: Date.now, expires: "2m" },
    message: {
      type: String,
    },
    userName: {
      type: String,
    },
    dateTime: {
      type: String,
    },
    messageType: {
      type: String,
    },
    fileDetails: {
      fileName: {
        type: String,
      },
      fileArray: {
        type: Array,
      },
    },
  },
  {
    timestamps: true,
  }
);

let Chat = mongoose.model("SockChat-Messages", chatSchema);
console.log("Heree");
// console.log(Chat.length);
module.exports = Chat;
