// ** React Imports
import { Link } from 'react-router-dom'
import { useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
// import { isUserLoggedIn } from '@utils'

// ** Third Party Components
import { User, Settings, Power, Sun, Moon } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

// ** Default Avatar Image
//import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'

const UserDropdown = props => {
  // ** State
  const [userData] = useState(null)
  const {skin, setSkin}  = props

  // ** Function to toggle Theme (Light/Dark)
  const changeTheme = () => {
    if (skin === 'dark') setSkin('light')
    else setSkin('dark')
  }


  const ThemeToggler = () => {
    if (skin === 'dark') {
      return (
        <>
          <Sun className='ficon me-75'/>
          <span className='align-middle'>Light mode</span>
        </>
      )
    } else {
      return (
        <>
          <Moon className='ficon me-75' />
          <span className='align-middle'>Dark mode</span>
        </>
      )
    }
  }

  //** ComponentDidMount
  // useEffect(() => {
  //   if (isUserLoggedIn() !== null) {
  //     setUserData(JSON.parse(localStorage.getItem('userData')))
  //   }
  // }, [])

  //** Vars
  //const userAvatar = (userData && userData.avatar) || defaultAvatar
  const userName = (userData && userData['username']) || 'Pouxa Admin'

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{userName}</span>
          <span className='user-status'>{(userData && userData.role) || 'Admin'}</span>
        </div>
        <Avatar  initials content={userName} contentStyles={ { height:40, width:40 } } color={"light-success"} />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag='a' href='/pages/profile' onClick={e => e.preventDefault()}>
          <User size={14} className='me-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>
        <DropdownItem tag='a' href='/pages/account-settings' onClick={e => e.preventDefault()}>
          <Settings size={14} className='me-75' />
          <span className='align-middle'>Settings</span>
        </DropdownItem>
        <DropdownItem tag='div' onClick={changeTheme}>
          <ThemeToggler />
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to='/'>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
