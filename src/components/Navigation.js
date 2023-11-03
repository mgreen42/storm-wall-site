import { Link } from 'react-router-dom'
import React from 'react'

// styles & images
import './Navigation.css'
import StormWall from '../assets/stormwall-logo.svg'

export default function Navigation() {
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
            <img src={StormWall} alt="stormwall logo" />
            <span>StormWall</span>
        </li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li>
            <button className="btn">Logout</button>
        </li>
      </ul>
    </div>
  )
}
