const httpServer = require("http").createServer();
const socketIO = require("socket.io")(httpServer);

socketIO.on("connection", function (client) {
  console.log("Connected...", client.id);
  client.on("disconnect", () => {
    console.log("Disconnected   ", client.id);
  });
  client.on("sendMessage", (data) => {
    console.log(data);
    client.broadcast.emit("receivedMessage", data);
  });
});

var port = process.env.PORT || 3000;
httpServer.listen(port, function (err) {
  if (err) console.log(err);
  console.log("Listening on port", port);
});
