import React, { useState  } from 'react';
import './Registeration.css';
import axios from "axios"
import { useStore } from '../Context/Context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Registration = () => {

  const navigate = useNavigate()

  const {url} = useStore()

  const [data, setData] = useState({
    username: '',
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
    console.log(data);
    try {
      const response = await axios.post(`${url}/api/user/register` , data)
      if(response.data.success){
    
        setData({
          username : "",
          email :"",
          password : ""
      })
      navigate("/login")
      toast.success('Registered', {
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
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={data.username}
            onChange={handleChange}
            required
          />
        </div>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
