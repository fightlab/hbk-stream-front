import * as SocketIO from 'socket.io-client';

class Socket {
  connection: SocketIOClient.Socket;

  constructor () {
    this.connection = SocketIO.connect(process.env.STREAM_SERVER);
  }
}

export default Socket;
