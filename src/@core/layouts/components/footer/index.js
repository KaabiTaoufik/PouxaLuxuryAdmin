// ** Icons Import
import { Heart } from 'react-feather'

const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-start d-block d-md-inline-block mt-25'>
        <span className='d-none d-sm-inline-block'></span>
      </span>
      <span className='float-md-end d-none d-md-block'>
        Made with
        <Heart size={14} /> {" "} NadSamIso
      </span>
    </p>
  )
}

export default Footer
