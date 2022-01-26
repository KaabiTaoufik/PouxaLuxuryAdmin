// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell } from 'react-feather'

// ** Reactstrap Imports
import {  Badge, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown } from 'reactstrap'

const NotificationDropdown = () => {
  // ** Notification Array
  const notificationsArray = [
    {
      avatarContent: 'IC',
      color: 'light-success',
      subtitle: 'lorem ipsum',
      title: (
        <p className='media-heading'>
          <span className='fw-bolder'>lorem ipsum</span>
        </p>
      )
    },
    {
      avatarContent: 'NB',
      color: 'light-info',
      subtitle: 'lorem ipsum',
      title: (
        <p className='media-heading'>
          <span className='fw-bolder'>lorem ipsum</span>
        </p>
      )
    },
    {
      avatarContent: 'SBM',
      color: 'light-danger',
      subtitle: 'lorem ipsum',
      title: (
        <p className='media-heading'>
          <span className='fw-bolder'>lorem ipsum </span>
        </p>
      )
    }
  ]

  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        options={{
          wheelPropagation: false
        }}
      >
        {notificationsArray.map((item, index) => {
          return (
            <a key={index} className='d-flex' href='/' onClick={e => e.preventDefault()}>
              <div className='list-item d-flex align-items-start'>
                  <Fragment>
                    <div className='me-1'>
                      <Avatar
                        {...(item.img
                          ? { img: item.img, imgHeight: 32, imgWidth: 32 }
                          : item.avatarContent
                          ? {
                              content: item.avatarContent,
                              color: item.color
                            }
                          : item.avatarIcon
                          ? {
                              icon: item.avatarIcon,
                              color: item.color
                            }
                          : null)}
                      />
                    </div>
                    <div className='list-item-body flex-grow-1'>
                      {item.title}
                      <small className='notification-text'>{item.subtitle}</small>
                    </div>
                  </Fragment>
              </div>
            </a>
          )
        })}
      </PerfectScrollbar>
    )
  }
  /*eslint-enable */

  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item me-25'>
      <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
        <Bell size={21} />
        <Badge pill color='danger' className='badge-up'>
        {notificationsArray.length}
        </Badge>
      </DropdownToggle>
      <DropdownMenu end tag='ul' className='dropdown-menu-media mt-0'>
        <li className='dropdown-menu-header'>
          <DropdownItem className='d-flex' tag='div' header>
            <h4 className='notification-title mb-0 me-auto'>Notifications</h4>
            <Badge tag='div' color='light-primary' pill>
              {notificationsArray.length} New
            </Badge>
          </DropdownItem>
        </li>
        {renderNotificationItems()}
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
