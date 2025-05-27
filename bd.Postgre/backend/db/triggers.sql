CREATE TABLE IF NOT EXISTS logs (
    id serial PRIMARY KEY,
    user_id integer REFERENCES users(id),
    action text,
    ts timestamptz DEFAULT now()
);
CREATE OR REPLACE FUNCTION log_user_update() RETURNS trigger AS $$
BEGIN
    IF NEW.email <> OLD.email THEN
        INSERT INTO logs(user_id, action) VALUES (OLD.id, 'update_email');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS trg_log_user_update ON users;
CREATE TRIGGER trg_log_user_update AFTER UPDATE ON users
    FOR EACH ROW EXECUTE PROCEDURE log_user_update();
