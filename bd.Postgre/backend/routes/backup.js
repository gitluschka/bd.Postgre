const shell = require('../utils/shell');
const path = require('path');
module.exports = async function (fastify, opts) {
  fastify.post('/backup', async (req, reply) => {
    const filename = `backup-${new Date().toISOString().slice(0, 10)}.sql`;
    const filepath = path.join(__dirname, '../../backups', filename);
    await shell.pgDump(filepath);
    reply.send({ ok: true, filename });
  });
  fastify.post('/restore', async (req, reply) => {
    const filepath = path.join(__dirname, '../../backups', req.body.filename);
    await shell.pgRestore(filepath);
    reply.send({ ok: true });
  });
};
