import React, { useEffect } from 'react';
import {useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { demoLogin } from '../store/session';
import { useDispatch, useSelector } from 'react-redux';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();

  const history = useHistory()

  useEffect(() => {
    const dropdownNodes = document.querySelectorAll('.dropdown-item')
    dropdownNodes.forEach(node => (
        node.addEventListener('click', () => setShowDropdown(false))
      ))
  })


  async function handleClick(e) {
    e.preventDefault();
    await dispatch(demoLogin())
    .then(history.push('/'))
  }

  return (
    <nav>
      <ul id='nav-elements'>
        <li>
          <NavLink to='/splashpage' exact={true} activeClassName='active'>
            <img src='/static/images/humanitsy_nav_logo.png' alt='logo'></img>
          </NavLink>
        </li>
        {!sessionUser && (
          <>
          <li>
            <button id={'demo-login'} onClick={handleClick}>Demo Login</button>
          </li>
          </>
        )}
        {sessionUser && (
          <>
            <li>
              Praise The Sun, {sessionUser.username}
            </li>
            <li id='cart-burger'>
              <div id='dropdown-button'>
                <NavLink to='/cart' exact={true} activeClassName='active'>
                  <i class="fa-solid fa-cart-shopping"></i>
                </NavLink>
              </div>
              <div id='dropdown-button' onClick={() => showDropdown ? setShowDropdown(false) : setShowDropdown(true)}>
                <i className='fa-solid fa-bars'></i>
              </div>
            </li>
          </>
        )}
      </ul>
      {showDropdown && (
        <div id='dropdown-menu-wrapper'>
          <ul id='dropdown-menu'>
            <li id='dropdown-item-name'>{sessionUser.username}</li>
            <li className='dropdown-item'>
              <NavLink to='/' exact={true} activeClassName='active'>
                  Home
              </NavLink>
            </li>
            <li className='dropdown-item'>
              <NavLink to='/products/forms/newproductform' exact={true} activeClassName='active'>
                  New Product
              </NavLink>
            </li>
            <li className='dropdown-item'>
              Cart
            </li>
            <li className='dropdown-item'>
              <LogoutButton />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
