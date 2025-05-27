const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const db = require('../db');
module.exports = async function (fastify, opts) {
  fastify.post('/register', async (req, reply) => {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await db.query('SELECT create_user($1, $2, $3)', [name, email, hash]);
    reply.send({ ok: true });
  });
  fastify.post('/login', async (req, reply) => {
    const { email, password } = req.body;
    const { rows } = await db.query('SELECT * FROM users WHERE email=$1', [email]);
    const user = rows[0];
    if (user && await bcrypt.compare(password, user.password_hash)) {
      const token = jwt.sign({ userId: user.id });
      reply.send({ token });
    } else {
      reply.code(401).send({ error: 'Invalid credentials' });
    }
  });
};
