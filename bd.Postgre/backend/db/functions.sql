CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL UNIQUE,
    password_hash text NOT NULL
);
CREATE OR REPLACE FUNCTION create_user(name text, email text, password_hash text)
RETURNS VOID AS $$
BEGIN
    INSERT INTO users (name, email, password_hash) VALUES (name, email, password_hash);
END; $$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION get_user_by_id(uid integer)
RETURNS TABLE(id integer, name text, email text) AS $$
    SELECT id, name, email FROM users WHERE id=uid;
$$ LANGUAGE sql;
CREATE OR REPLACE FUNCTION recent_logs(uid integer)
RETURNS TABLE(action text, ts timestamptz) AS $$
    SELECT action, ts FROM logs WHERE user_id=uid ORDER BY ts DESC LIMIT 5;
$$ LANGUAGE sql;
CREATE OR REPLACE FUNCTION search_users(name_pattern text)
RETURNS TABLE(id integer, name text, email text) AS $$
    SELECT id, name, email FROM users WHERE name ILIKE '%'||name_pattern||'%';
$$ LANGUAGE sql;
