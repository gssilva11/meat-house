// import Cookies from 'js-cookie';

// const API_URL = 'http://localhost:3000'; // Ajuste a URL conforme necessário

// export const login = async (email, password) => {
//   const response = await fetch(`${API_URL}/auth/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!response.ok) {
//     throw new Error('Falha na autenticação');
//   }

//   const data = await response.json();
//   Cookies.set('token', data.token, { expires: 7 });
//   return data.user;
// };

// export const register = async (userData) => {
//   const response = await fetch(`${API_URL}/auth/register`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//   });

//   if (!response.ok) {
//     throw new Error('Falha no cadastro');
//   }

//   return await response.json();
// };

// export const getUser = () => {
//   const token = Cookies.get('token');
//   if (!token) {
//     return null;
//   }

//   return fetch(`${API_URL}/auth/me`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => response.json())
//     .catch(() => null);
// };

// export const logout = () => {
//   Cookies.remove('token');
// };
