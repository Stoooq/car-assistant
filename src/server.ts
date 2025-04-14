import express from "express";
import { createServer } from "http";
import { DefaultEventsMap, Server, Socket } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "*",
	},
});

io.on(
	"connection",
	(
		socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
	) => {
        console.log("connected")
    }
);

httpServer.listen(3001, () => {
	console.log("listening");
});
