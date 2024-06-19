import React, { useState } from 'react';
import axios from 'axios';
import  '../styles/login.css';
import HeaderLogin from './headerLogin';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
     userName:'',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/login', loginData);
      console.log(response.data);
      if (response.status === 200) {
        alert('Login successful!');
        // Redirect or perform other actions upon successful login
      } else {
        alert('Login failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        alert(`Sorry, login failed. Server responded with: ${error.response.status} - ${error.response.data.message}`);
      } else if (error.request) {
        alert('Sorry, login failed. No response from server.');
      } else {
        alert('Sorry, login failed. Error setting up the request.');
      }
    }
  };

  return (
<div>
  <HeaderLogin/>
<div className="login-form-container">
      <h2>Login Form</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">User Name</label>
          <input type="userName" id="userName" name="userName" value={loginData.userName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={loginData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={loginData.password} onChange={handleChange} required />
        </div>
        <button className='loginBtn' type="submit">Login</button>
      </form>
      <div className='tempofooter'></div>
    </div>
</div>  
  );
};
export default LoginForm


// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import  '../styles/login.css';
// // import { FaBackward } from "react-icons/fa";
// import HeaderLogin from './headerLogin';

// export default function LoginForm() {
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const navigate = useNavigate();

//   async function loginHandler(e) {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:4000/api/login", {
//         email: loginEmail,
//         password: loginPassword
//       });

//       // Store JWT token in localStorage
//       localStorage.setItem('token', response.data.token);

//       setSuccessMessage("Login successful! Redirecting...");
//       setTimeout(() => {
//         navigate("/booking");
//       }, 2000);
//     } catch (err) {
//       setError(err.response.data.message);
//       setTimeout(() => setError(""), 4000); // Clear error message after 4 seconds
//     }
//   }

//   return (
//     <>
//       <HeaderLogin />
//       <div className="loginAndRegister">
//         <form onSubmit={loginHandler}>
//           <div className="registerLoginForm">
//             <Link to="/UserRegister">
//               {/* <FaBackward /> */}
//             </Link>
//             <h2>Login</h2>
//            <div className="form-group" style={{"width":"400px","margin":"auto"}}>

//            <label>Email Address:</label><br />
//             <input
//               className="loginEmail"
//               type="text"
//               placeholder="Enter Email Account"
//               value={loginEmail}
//               onChange={(e) => setLoginEmail(e.target.value)}
//             />
//            </div>
           
//             <br />

//             <label>Password:</label><br />
//             <input
//               className="loginPassword"
//               type="password"
//               placeholder="Enter password"
//               value={loginPassword}
//               onChange={(e) => setLoginPassword(e.target.value)}
//             />
//             <br />

//             <button className="loginButton" type="submit">
//               Login
//             </button>

//             {error && <p className="error">{error}</p>}
//             {successMessage && <p className="success">{successMessage}</p>}
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }