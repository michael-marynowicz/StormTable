import { BaseWsExceptionFilter } from "@nestjs/websockets";
import { ArgumentsHost } from "@nestjs/common";
import { Socket } from "socket.io";
import TableError, { TableErrorTypes } from "../table-error";
import CoreError from "../../core/errors/core-error.error";

export default class SocketErrorFilter extends BaseWsExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const socket = host.switchToWs().getClient<Socket>()
    console.log("Error: " + JSON.stringify(exception))
    if(exception instanceof CoreError) {
      socket.emit('error', exception);
    } else {
      socket.emit('error', new TableError(TableErrorTypes.INTERNAL_ERROR, "Unhandled exception occured."))
    }
  }
}