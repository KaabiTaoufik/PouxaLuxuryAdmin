// ** Reactstrap Imports
import {Input, Label } from 'reactstrap'

const Switch = ({htmlFor, leftIcon, rightIcon }) => {
  return (
    <Label className='form-check-label' htmlFor={htmlFor}>
      <span className='switch-icon-left'>
        {leftIcon}
      </span>
      <span className='switch-icon-right'>
        {rightIcon}
      </span>
    </Label>
  )
}

const IconSwitch = ({ id, name, bsType, className, leftIcon, rightIcon, defaultChecked, onClick }) => {
    
    return (
    <div className={`form-switch form-check-${bsType} ${ className ? className : ''} `}>
        <Input type='switch' 
        id={id ? id : (`switch_icon_${Math.floor(Math.random() * 100)}`)}
        name={name} 
        onClick={onClick}
        {...(defaultChecked ? {defaultChecked: true} : {})}
        />
        <Switch htmlFor={name} leftIcon={leftIcon} rightIcon={rightIcon} />
    </div>
    )
}

export default IconSwitch