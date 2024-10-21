// src/utils/myfetch.js

import HttpError from './HttpError';

const myfetch = {};  // Objeto vazio

// Lê o endereço do back-end a partir do arquivo .env.local e remove barras finais
const baseUrl = import.meta.env.VITE_API_BASE.replace(/\/+$/, ''); // Remove trailing slashes

function defaultOptions(body = null, method = 'GET') {
  const options = {
    method,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    credentials: 'include' // Incluindo credenciais
  };

  if (body) options.body = JSON.stringify(body);

  // Verifica se existe um token gravado no localStorage e o inclui nos headers
  const token = window.localStorage.getItem('auth_token'); // Corrigido para 'auth_token'

  if (token) options.headers.Authorization = `Bearer ${token}`; // Corrigido para 'Authorization'

  return options;
}

function getErrorDescription(response) {
  switch (response.status) {
    case 401:   // Unauthorized
      return 'ERRO: usuário ou senha incorretos';
    default:
      return `ERRO: HTTP ${response.status}: ${response.statusText}`;
  }
}

myfetch.post = async function (path, body) {
  const url = new URL(path, baseUrl).toString(); // Evita duplicação de barras
  const response = await fetch(url, defaultOptions(body, 'POST'));
  if (response.ok) {
    try {
      return await response.json();
    } catch (e) {
      return true; // Caso não haja corpo na resposta
    }
  }
  else throw new HttpError(response.status, getErrorDescription(response));
}

myfetch.put = async function (path, body) {
  const url = new URL(path, baseUrl).toString();
  const response = await fetch(url, defaultOptions(body, 'PUT'));
  if (response.ok) {
    try {
      return await response.json();
    } catch (e) {
      return true; // Caso não haja corpo na resposta
    }
  }
  else throw new HttpError(response.status, getErrorDescription(response));
}

myfetch.get = async function (path) {
  const url = new URL(path, baseUrl).toString();
  const response = await fetch(url, defaultOptions());
  if (response.ok) return response.json();
  else throw new HttpError(response.status, getErrorDescription(response));
}

myfetch.delete = async function (path) {
  const url = new URL(path, baseUrl).toString();
  const response = await fetch(url, defaultOptions(null, 'DELETE'));
  if (response.ok) return true;   // Não retorna json()
  else throw new HttpError(response.status, getErrorDescription(response));
}

myfetch.search = async function (path, query) {
  const url = new URL(path, baseUrl);
  url.searchParams.append('search', query);
  const response = await fetch(url.toString(), defaultOptions());
  if (response.ok) return response.json();
  else throw new HttpError(response.status, getErrorDescription(response));
}

export default myfetch;
