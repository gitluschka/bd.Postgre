const jwt = require('../utils/jwt');
const db = require('../db');
async function authMiddleware(req, reply) {
  const header = req.headers.authorization;
  if (!header) return reply.code(401).send({ error: 'No token' });
  try {
    req.user = jwt.verify(header.replace('Bearer ', ''));
  } catch {
    return reply.code(401).send({ error: 'Invalid token' });
  }
}
module.exports = async function (fastify, opts) {
  fastify.get('/me', { preHandler: authMiddleware }, async (req, reply) => {
    const { rows } = await db.query('SELECT * FROM get_user_by_id($1)', [req.user.userId]);
    reply.send(rows[0]);
  });
  fastify.post('/me/email', { preHandler: authMiddleware }, async (req, reply) => {
    await db.query('UPDATE users SET email=$1 WHERE id=$2', [req.body.email, req.user.userId]);
    reply.send({ ok: true });
  });
  fastify.get('/me/logs', { preHandler: authMiddleware }, async (req, reply) => {
    const { rows } = await db.query('SELECT * FROM recent_logs($1)', [req.user.userId]);
    reply.send(rows);
  });
  fastify.get('/search', { preHandler: authMiddleware }, async (req, reply) => {
    const { name } = req.query;
    const { rows } = await db.query('SELECT * FROM search_users($1)', [name]);
    reply.send(rows);
  });
  fastify.get('/search_insecure', { preHandler: authMiddleware }, async (req, reply) => {
    const { name } = req.query;
    const { rows } = await db.query(`SELECT * FROM users WHERE name LIKE '%${name}%'`);
    reply.send(rows);
  });
};
