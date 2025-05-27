const { exec } = require('child_process');
const PG_USER = process.env.PGUSER || 'postgres';
const DB = process.env.PGDATABASE || 'securelog';
module.exports = {
  pgDump: (filepath) => new Promise((resolve, reject) => {
    exec(`pg_dump -U ${PG_USER} -d ${DB} > "${filepath}"`, (err) => {
      if (err) reject(err); else resolve();
    });
  }),
  pgRestore: (filepath) => new Promise((resolve, reject) => {
    exec(`psql -U ${PG_USER} -d ${DB} < "${filepath}"`, (err) => {
      if (err) reject(err); else resolve();
    });
  }),
};
