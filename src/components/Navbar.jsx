import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../store/features/authSlice'
import { Link } from 'react-router-dom'

function Navbar() {
  const dispatch = useDispatch()
  return (
    <div className='w-full h-[7vh] flex align-middle justify-around'>
      <Link to="https://github.com/prateeksinghsaini">Prateek Singh Saini</Link>
      <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  )
}

export default Navbar