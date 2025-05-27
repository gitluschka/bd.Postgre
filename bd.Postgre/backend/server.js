const fastify = require('fastify')({ 
  logger: true,
  https: {
    key: require('fs').readFileSync('./localhost-key.pem'),
    cert: require('fs').readFileSync('./localhost.pem'),
  }
});
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const backupRoutes = require('./routes/backup');
fastify.register(require('@fastify/cors'), { origin: true });
fastify.register(authRoutes, { prefix: '/api' });
fastify.register(usersRoutes, { prefix: '/api' });
fastify.register(backupRoutes, { prefix: '/api' });
fastify.listen({ port: 3000 }, err => {
  if (err) throw err;
  console.log('SecureLog backend running on https://localhost:3000');
});
