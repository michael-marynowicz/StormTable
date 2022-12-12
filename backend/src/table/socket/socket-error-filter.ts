import { BaseWsExceptionFilter } from "@nestjs/websockets";
import { ArgumentsHost } from "@nestjs/common";
import { Socket } from "socket.io";
import TableError, { TableErrorTypes } from "../table-error";

export default class SocketErrorFilter extends BaseWsExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const socket = host.switchToWs().getClient<Socket>()
    if(exception instanceof TableError) {
      socket.emit('error', exception);
    } else {
      socket.emit('error', new TableError(TableErrorTypes.INTERNAL_ERROR, "Unhandled exception occured."))
    }
  }
}