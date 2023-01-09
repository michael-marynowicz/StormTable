import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server} from "socket.io";
import * as fs from "fs";

@WebSocketGateway()
export class DirectoryGateway{

    @WebSocketServer()
    server : Server;
    @SubscribeMessage('directory')
    onNewDocument(){
        var acc=1;
        var dir = './dir'+acc;
        while (fs.existsSync(dir)){
            dir = './dir'+ (++acc);

        }
        if(!fs.existsSync(dir))fs.mkdirSync(dir);
    }
}