import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {OnModuleInit} from "@nestjs/common";
import {Server} from "socket.io";

@WebSocketGateway()
export class DocumentGateway implements OnModuleInit{
    @WebSocketServer()
    server : Server;
    onModuleInit(): any {
        this.server.on('connection',(socket)=>{
            console.log("Connection : "+ socket.id)
        })

    }
    @SubscribeMessage('document')
    onNewDocument(){
        console.log("get event and send to table")
        this.server.emit("document", {})
    }



}
