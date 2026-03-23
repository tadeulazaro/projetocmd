// src/services/api.js
// Serviço de integração com backend para autenticação e cadastro

const API_URL = "https://projetocmd.onrender.com"; // URL do backend em produção

export async function registerUser({ name, email, password }) {
  const response = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao cadastrar usuário");
  }
  return response.json();
}

export async function loginUser({ email, password }) {
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);
  const response = await fetch(`${API_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });
  if (!response.ok) {
    let error;
    try {
      error = await response.json();
    } catch {
      error = { message: "Erro ao fazer login" };
    }
    throw new Error(error.message || "Erro ao fazer login");
  }
  return response.json();
}
