const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const socketIo = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join-room', (roomId) => {
      socket.join(roomId);
      console.log(`User joined room ${roomId}`);
    });

    socket.on('update-carousel', (data) => {
      socket.to(data.roomId).emit('carousel-updated', data.carouselState);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  server.listen(3002, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3002');
  });
});