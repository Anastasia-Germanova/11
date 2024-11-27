const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });
let clients = [];
wss.on("connection", (ws) => {
  console.log("Новый клиент подключен");
  clients.push(ws);
  ws.send("Добро пожаловать в чат!");
  ws.on("message", (message) => {
    console.log(`Получено сообщение: ${message}`);
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  ws.on("close", () => {
    console.log("Клиент отключился");
    clients = clients.filter((client) => client !== ws);
  });
});
console.log("Сервер WebSocket запущен на порту 8080");
