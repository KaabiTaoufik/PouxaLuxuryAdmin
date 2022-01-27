// ** Reactstrap Imports
import {Row, Col, Modal, Label, Input, Button, ModalBody, ModalHeader} from 'reactstrap'
import { Check, X } from 'react-feather'

// ** Custom Components
import InputPreview from '@components/input-preview'

const CategoryModal = ({open, handleModal, edit, category, onSubmit}) => {

  const {_id, name, order, visibility, image} = category ? category : {}
  const LabelSizeStyle = {fontSize: "1rem"}

  return (
      <Modal
        isOpen={open}
        toggle={handleModal}
        backdrop="static"
        keyboard={false}
        className='modal-dialog-centered'
      >
        <ModalHeader className='bg-transparent' toggle={handleModal}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <h1 className='text-center mb-1'> {edit ? "Modifier " : "Ajouter"} une catégorie</h1> 
          <Row tag='form' className='gy-1 gx-2 mt-75' onSubmit={onSubmit}>
            <Col xs={12}>
              <Label className='form-label fw-bolder' style={LabelSizeStyle} for='name'>
                nom de la catégorie
              </Label>
              <Input 
                name='_id' 
                type='text'
                {...(category ? {defaultValue: _id} : {defaultValue: Math.random()})}
                hidden
              />
              <Input 
                placeholder='nom de la catégorie' 
                name='name' 
                type='text'
                {...(category ? {defaultValue: name} : {})}
              />
            </Col>
            <Col xs={12}>
              <div className='d-flex align-items-center'>
                <div className='form-switch w-100'>
                  <Input 
                    type='switch' 
                    name='visibility' 
                    id='visibility'
                    {...(category && visibility ? {defaultChecked: visibility} : {})}
                  />
                  <Label className='form-check-label' for='visibility'>
                    <span className='switch-icon-left'>
                      <Check size={14} />
                    </span>
                    <span className='switch-icon-right'>
                      <X size={14} />
                    </span>
                  </Label>
                  <Label className='form-check-label fw-bolder ms-1' for='visibility'>
                    visibilité de la catégorie
                  </Label>
                </div>
              </div>
            </Col>
              <Col xs={12}>
              <Label className='form-label fw-bolder ' style={LabelSizeStyle} for='order'>
                Ordre de l'affichage
              </Label>
              <Input 
                placeholder="ordre de l'affichage" 
                name='order' 
                type='number' 
                {...(category ? {defaultValue: order} : {})}
              />
            </Col>
            <Col xs={12}>
              <Label className='form-label fw-bolder' style={LabelSizeStyle} for='image'>
                Image de la catégorie
              </Label>
              <InputPreview {...(category ? {imageSrc: image} : {})} inputName='image'/>
            </Col>
            <Col className='text-center mt-1' xs={12}>
              <Button type='submit' className='me-1' color='primary'>
                Valider
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
  )
}

export default CategoryModal
