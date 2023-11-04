import { Link } from 'react-router-dom'
import React from 'react'
import { useLogout } from '../hooks/useLogout'

// styles & images
import './Navigation.css'
import StormWall from '../assets/stormwall-logo.svg'

export default function Navigation() {
    const { logout, isPending } = useLogout()

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
            {!isPending && <button className="btn" onClick={ logout }>Logout</button>}
            {isPending && <button className="btn" disabled >Logging Out...</button>}
        </li>
      </ul>
    </div>
  )
}
