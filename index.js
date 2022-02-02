const express = require("express");
const app = express();
require("dotenv").config();
require("./config/mogoDB").connect();
const httpServer = require("http").Server(app);
const socketIO = require("socket.io")(httpServer);
const Chat = require("./models/chatModel");
const bodyParser = require("body-parser");
const chatRouter = require("./routes/chatDataRoute");
app.use(bodyParser.json());
app.use("/chat", chatRouter);
app.get("/", (req, res) => {
  console.log("Hereee");
});

socketIO.on("connection", function (client) {
  console.log("Connected...", client.id);

  client.on("forceDisconnect", () => {
    console.log("Disconnected   ", client.id);
    client.disconnect(true);
  });

  client.on("signIn", (data) => {
    console.log(data);
    console.log("Hereeee");
  });
  client.on("sendMessage", async (data) => {
    console.log("New Message Came");
    var chatMessage = new Chat(data);
    await chatMessage.save().then(() => {
      console.log("saved");
      Chat.find({}).then((chat) => {
        console.log(chat);
        client.emit("receivedMessage", chat);
      });
    });
  });
  client.on("SendFile", async (data) => {
    console.log("Here Fileeee");
    console.log(data);
  });
});

var port = process.env.PORT || 3000;
httpServer.listen(port, function (err) {
  if (err) console.log(err);
  console.log("Listening on port", port);
});
