// socket.js
const Server = require("socket.io");

let io;
let numUsers = 0;

module.exports = {
  init: (httpServer) => {
    io = Server(httpServer);
    io.on("connection", (socket) => {
      numUsers++;
      io.emit("numUsers", numUsers);
      socket.on("disconnect", () => {
        numUsers--;
        io.emit("numUsers", numUsers);
      });
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};
