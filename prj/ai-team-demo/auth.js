// Simulated user store (demo only — no real security)
const DEMO_USERS = [
  { username: "alice", password: "pass1" },
  { username: "bob",   password: "pass2" },
];

const SESSION_KEY = "ai_demo_user";

export function getSession() {
  const raw = sessionStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

function setSession(username) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ username }));
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function initAuth({ onLogin, onLogout }) {
  const authScreen = document.querySelector("#auth-screen");
  const mainPage   = document.querySelector(".page");
  const loginForm  = document.querySelector("#login-form");
  const loginError = document.querySelector("#login-error");
  const logoutBtn  = document.querySelector("#logout-btn");
  const userLabel  = document.querySelector("#user-label");

  function showApp(username) {
    userLabel.textContent = username;
    authScreen.classList.add("hidden");
    mainPage.classList.remove("hidden");
    onLogin(username);
  }

  function showAuth() {
    mainPage.classList.add("hidden");
    authScreen.classList.remove("hidden");
    loginForm.reset();
    loginError.classList.add("hidden");
    onLogout();
  }

  const existing = getSession();
  if (existing) {
    showApp(existing.username);
  } else {
    showAuth();
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data     = new FormData(loginForm);
    const username = String(data.get("username")).trim();
    const password = String(data.get("password"));
    const match    = DEMO_USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (!match) { loginError.classList.remove("hidden"); return; }
    setSession(username);
    showApp(username);
  });

  logoutBtn.addEventListener("click", () => {
    clearSession();
    showAuth();
  });
}
