import React, { useState, useEffect } from 'react';
import { useStore } from '../Context/Context';
import "./Home.css";
import axios from 'axios';
import { toast } from 'react-toastify';

const Home = () => {
  const { auth, url } = useStore();
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });

  useEffect(() => {
    if (auth.user) {
      setFormData((prevData) => ({
        ...prevData,
        email: auth.user.email,
      }));
    }
  }, [auth.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/user/message`, formData);
      if (response.data.success) {
        setFormData((prevData) => ({
          ...prevData,
          message: ""
        }));
        toast.success('Message sent!', {
          className: 'custom-toast', // Apply custom class
        });
      } else {
        toast.error('Error', {
          className: 'custom-toast', // Apply custom class
        });
      }
    } catch (error) {
      console.error("Error");
      toast.error('Error', {
        className: 'custom-toast', // Apply custom class
      });
    }
  };

  return (
    <div className='home'>
      {auth.token ? (
        <>
         <div className='home-top'>
         <div className='heading'>
          <h1>Hi {auth.user.username}</h1>
          <p>WHAT DO YOU WANT TO SAY?</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label><br/>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label><br/>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
         </div>
        </>
      ) : (
        <>
          <h4>Hi, I'M "M BILAL SAJID".<br/><br/> Please, Login to connect with me!</h4>
        </>
      )}
    </div>
  );
};

export default Home;
