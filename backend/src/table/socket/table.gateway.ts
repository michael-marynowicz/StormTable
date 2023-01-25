import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {Socket} from "socket.io";
import TableError, {TableErrorTypes} from "../table-error";
import {SessionService} from "../../core/session/session.service";
import {UseFilters} from "@nestjs/common";
import SocketErrorFilter from "./socket-error-filter";
import {v4 as new_guid} from "uuid";
import DocumentModel from "../../core/models/document.model";
import DirectoryModel from "../../core/models/directory.model";

@WebSocketGateway({
    cors: {
        origin: "*"
    }
})
export class TableGateway {

    private sessions: { [socketId: string]: string } = {}

    constructor(private sessionService: SessionService) {
    }


    @SubscribeMessage('create_session')
    @UseFilters(new SocketErrorFilter())
    createSession(@MessageBody() content: { tableId: string, meetingId: string }, @ConnectedSocket() socket: Socket) {
        const session = this.sessionService.createSession({id: content.tableId, spots: []}, content.meetingId);
        this.sessions[socket.id] = session.sessionId;
        this.sessionService.sessionChanged.subscribe(s => {
            if (s.sessionId === session.sessionId) {
                socket.emit("session", {session: this.sessionService.getAggregatedSession(session)})
            }
        })
        socket.emit('session_created', {session: this.sessionService.getAggregatedSession(session)})
    }

    @SubscribeMessage('create_spot')
    @UseFilters(new SocketErrorFilter())
    createSpot(@MessageBody() body: { location: { x: number, y: number }, rotation: number }, @ConnectedSocket() socket) {
        const sessionId = this.sessions[socket.id];
        console.log(socket.id)
        if (!sessionId)
            throw new TableError(TableErrorTypes.SESSION_NOT_FOUND, "Session not found.")
        var qr_code = {
            id: new_guid(),
            location: body.location,
            rotation: body.rotation
        }
        this.sessionService.updateSession(sessionId, socket, session => {

            session.table.spots.push(qr_code)
            setTimeout(()=>{
                this.sessionService.updateSession(sessionId, socket, session => {
                    console.log("icicici")
                    session.table.spots.splice(session.table.spots.indexOf(qr_code),1)
                })
            },1000)

        })

    }

    @SubscribeMessage('document-position')
    @UseFilters(new SocketErrorFilter())
    moveDocument(@MessageBody() payload: { id: string, position: { x: number, y: number }, rotation: number }) {
        this.sessionService.changeDocumentPosition(payload.id, payload.position, payload.rotation);
    }

    @SubscribeMessage('share-document')
    @UseFilters(new SocketErrorFilter())
    shareDocument(@MessageBody() payload: { id: string, user: string, rotation: number }) {
        this.sessionService.sendDocumentTo(payload.id, payload.user, payload.rotation);
    }

    @SubscribeMessage('sendToDirectory')
    sendToDirectory(@MessageBody() body: { file: DocumentModel, directory:DirectoryModel }){
        this.sessionService.sendToDirectory(body.file,body.directory);
    }

    @SubscribeMessage('reload-file')
    reloadFile(@MessageBody() body: { file: DocumentModel, directory:DirectoryModel }){
        this.sessionService.reloadFile(body.file,body.directory);
    }

    @SubscribeMessage('set_user_position')
    setUserPosition(@MessageBody() body: { userId: string, position: { x: number, y: number }, rotation: number }, @ConnectedSocket() socket) {
        this.sessionService.setUserPosition(body.userId, body.position, body.rotation)
    }



}
