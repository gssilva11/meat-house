// // services/authService.js

// import myfetch from '../../utils/myfetch';

// const authService = {
//   login: async (email, password) => {
//     return await myfetch.post('/auth/login', { email, password });
//   },
//   forgotPassword: async (email) => {
//     return await myfetch.post('/auth/forgot-password', { email });
//   },
//   resetPassword: async (token, newPassword) => {
//     return await myfetch.post('/auth/reset-password', { token, newPassword });
//   }
// };

// export default authService;