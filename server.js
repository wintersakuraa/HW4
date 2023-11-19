const net = require("net");

const server = net.createServer((socket) => {
  console.log("Client connected");

  // Handle incoming data from the client
  socket.on("data", (data) => {
    console.log(`Received from client: ${data}`);
  });

  // Handle connection close
  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

// Listen on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
