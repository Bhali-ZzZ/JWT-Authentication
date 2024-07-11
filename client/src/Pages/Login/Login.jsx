import React, { useState } from 'react';
import './Login.css';
import axios from "axios"
import { useStore } from '../Context/Context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const {url , login} = useStore()

  const navigate = useNavigate()

  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/user/login`,data)
      if(response.data.success){
        login(response.data.user, response.data.token);
        setData({
          email :"",
          password : ""
      })
      toast.success('Login successful', {
        // position: toast.POSITION.TOP_CENTER,
        className: 'custom-toast', // Apply custom class
      });
      navigate("/")
      }else{
        toast.error('Incorrect email or password', {
          // position: toast.POSITION.TOP_CENTER,
          className: 'custom-toast', // Apply custom class
        });
      }
    } catch (error) {
      console.log(error)
      toast.error('Error', {
        // position: toast.POSITION.TOP_CENTER,
        className: 'custom-toast', // Apply custom class
      });
    }
  
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
