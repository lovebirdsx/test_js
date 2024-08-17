import figlet from 'figlet';

const server = Bun.serve({
  port: 3000,
  fetch() {
    const body = figlet.textSync('lovebird');
    return new Response(body);
  },
});

console.log(`Server running at http://localhost:${server.port}`);
