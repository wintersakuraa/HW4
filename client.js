const net = require("net");
const readline = require("readline");

// Create an interface to read input from the user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Connect to the server
const client = net.createConnection({ port: 3000 }, () => {
  console.log("Connected to server");

  // Function to send messages to the server
  const sendMessage = () => {
    rl.question(
      "Enter a message to send to the server (type 'exit' to quit): ",
      (message) => {
        if (message.toLowerCase() === "exit") {
          // If the user enters 'exit', close the connection and exit the program
          client.end();
        } else {
          // Send the message to the server
          client.write(message);
          // Continue to prompt for the next message
          sendMessage();
        }
      }
    );
  };

  // Start the message sending loop
  sendMessage();
});

// Handle incoming data from the server
client.on("data", (data) => {
  console.log(`Received from server: ${data}`);
});

// Handle connection close
client.on("end", () => {
  console.log("Disconnected from server");
  // Close the readline interface when the connection is closed
  rl.close();
});
