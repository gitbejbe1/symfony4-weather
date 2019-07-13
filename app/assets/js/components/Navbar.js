import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => (
  <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
	<div className='container'>
	  <Link className='navbar-brand' to='/'>Dashboard</Link>
	  <Link className='navbar-brand' to='/history'>History</Link>
	</div>
  </nav>
)

export default Header