const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let secretNumber = Math.floor(Math.random() * 100) + 1;
let gameActive = true;

io.on("connection", (socket) => {
  console.log(`Player connected: ${socket.id}`);

  socket.emit("message", "Welcome! Guess a number between 1 and 100.");

  socket.on("guess", (num) => {
    if (!gameActive) return;

    if (num == secretNumber) {
      io.emit("message", `🎉 Player ${socket.id} guessed correctly! The number was ${secretNumber}.`);
      gameActive = false;

      setTimeout(() => {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        gameActive = true;
        io.emit("message", "🔄 New round started! Guess a number between 1 and 100.");
      }, 5000);
    } else if (num < secretNumber) {
      socket.emit("message", "Too low! Try again.");
    } else {
      socket.emit("message", "Too high! Try again.");
    }
  });

  socket.on("disconnect", () => {
    console.log(`Player disconnected: ${socket.id}`);
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`🎯 Server running on http://localhost:${PORT}`));
