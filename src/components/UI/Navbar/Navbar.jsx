import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes, Switch, Redirect, Link } from 'react-router-dom';
import MyButton from '../button/MyButton';
import { AuthContext } from '../../../context';

const Navbar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);
    const logout = event => {
        event.preventDefault();
        setIsAuth(false);
        localStorage.removeItem('auth')
    }
  return (
    <div className='navbar'>
      
      <div className='navbar__links'>
          <Link className='navLink' to='/about'>Про сайт </Link>
          <Link className='navLink' to='/posts'>Пости </Link>
      </div>
      <MyButton onClick={logout}>
        Вийти
      </MyButton>
  </div>
  )
}

export default Navbar
