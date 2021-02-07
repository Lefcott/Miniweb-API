import { Server as SocketIoServer } from 'socket.io';
import RedisAdapter from 'socket.io-redis';

import { server } from './middlewares';

const socket_io = new SocketIoServer(server, { cors: { ori: '*' } });

socket_io.adapter(RedisAdapter(process.env.REDISCLOUD_URL));

export { socket_io };
