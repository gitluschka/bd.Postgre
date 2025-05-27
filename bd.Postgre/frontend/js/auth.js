const apiBase = "https://localhost:3000";
function setMsg(txt) { document.getElementById('msg').innerText = txt; }
document.getElementById('reg-btn').onclick = async function() {
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-pass').value;
  if (!name || !email || !password) return setMsg("Все поля регистрации обязательны");
  try {
    const res = await fetch(apiBase + "/api/register", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, email, password}),
    });
    const data = await res.json();
    if (data.ok) setMsg("Регистрация прошла успешно! Войдите ниже.");
    else setMsg(data.error || "Ошибка регистрации");
  } catch (e) { setMsg("Ошибка сети при регистрации"); }
};
document.getElementById('login-btn').onclick = async function() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-pass').value;
  if (!email || !password) return setMsg("Email и пароль обязательны");
  try {
    const res = await fetch(apiBase + "/api/login", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      window.location = "profile.html";
    } else setMsg(data.error || "Ошибка входа");
  } catch (e) { setMsg("Ошибка сети при входе"); }
};
