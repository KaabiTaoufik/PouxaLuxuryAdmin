import { User, X, Moon, Sun } from 'react-feather'
import IconSwitch from '../ui-elements/Form/IconSwitch'

// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText, Form} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const AddNewModal = ({ open, handleModal }) => {
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>Nouvelle Catégorie</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <Form>
        <div className='mb-1'>
          <Label className='form-label' for='name'>
            Nom :
          </Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='name' placeholder='Nom de la catégorie' />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='visibility'>
            Visibilité :
          </Label>
          <InputGroup>
              <Input type='radio' id='visible' name='visible'  />
              <Label className='form-check-label' for='visible'>
                Visible
              </Label>
              <Input type='radio' id='invisible' name='invisible'  />
              <Label className='form-check-label' for='invisible'>
                Invisible
              </Label>
          </InputGroup>
        </div>
        <Button className='me-1' color='primary' onClick={handleModal}>
          Submit
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          Cancel
        </Button>
      </Form>
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal
