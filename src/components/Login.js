// import React, { useState } from 'react';
// import axios from 'axios';
// import UploadForm from './UploadForm';
// import './Login.css';

// const Login = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/login', {
//         username,
//         password
//       });
//       if (response.status === 200) {
//         setIsAuthenticated(true);
//       }
//     } catch (error) {
//       alert('Invalid username or password');
//     }
//   };

//   if (isAuthenticated) {
//     return <UploadForm />;
//   }

//   return (
//     <div className="loginContainer">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
