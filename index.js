const server = require("./API/server");

//POST CONST
const PORT = 1234;

server.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});

//DDD - Domain Driven Design..
