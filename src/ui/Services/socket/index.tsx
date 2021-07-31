import { io, Socket as SocketIoSocket } from "socket.io-client";

class Socket {
  connection: SocketIoSocket;

  public emit = (name: string, data: object | string = {}): void => {
    this.connection.emit(name, data);
  };

  public on = (name: string, cb: (...args: any[]) => void) =>
    this.connection.on(name, cb);

  constructor() {
    this.connection = io(process.env.STREAM_SERVER);
  }
}

export default Socket;
