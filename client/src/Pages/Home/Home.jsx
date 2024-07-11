import React from 'react'
import { useStore } from '../Context/Context'
import "./Home.css"

const Home = () => {
    const {auth} = useStore()
  return (
    <div className='home'>
      {auth.token ? 
        <h1>Hi {auth.user.username}</h1> :
        <><h1>Hi, This is home page</h1></>}
    </div>
  )
}

export default Home
