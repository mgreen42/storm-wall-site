import { Link } from 'react-router-dom'
import React from 'react'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// styles & images
import './Navigation.css'
import StormWall from '../assets/stormwall-logo.svg'

export default function Navigation() {
    const { logout, isPending } = useLogout()
    const { user } = useAuthContext()

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
            <img src={StormWall} alt="stormwall logo" />
            <span>StormWall</span>
        </li>

        {!user && <li><Link to="/login">Login</Link></li>}
        {!user && <li><Link to="/signup">Sign Up</Link></li>}

        {user && (        
            <li>
            {!isPending && <button className="btn" onClick={ logout }>Logout</button>}
            {isPending && <button className="btn" disabled >Logging Out...</button>}
        </li>
        )}

      </ul>
    </div>
  )
}
