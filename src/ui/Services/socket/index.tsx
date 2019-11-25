import * as SocketIO from 'socket.io-client';

class Socket {
  connection: SocketIOClient.Socket;

  public emit = (name: string, data: object|string = {}): void => {
    this.connection.emit(name, data);
  }

  public on = (name: string, cb: Function) => this.connection.on(name, cb);

  constructor() {
    this.connection = SocketIO.connect(process.env.STREAM_SERVER);
  }
}

export default Socket;
