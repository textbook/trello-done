const http = require("http");

const app = require("./app");

const port = parseInt(process.env.PORT || "3000");

const server = http.createServer(app);

server.listen(port);

server.on("listening", () => {
	const addr = server.address();
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
	console.log(`Listening on ${bind}`);
});
