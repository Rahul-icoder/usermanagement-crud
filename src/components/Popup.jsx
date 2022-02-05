import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import React from 'react'

const Popup = ({isModal,setIsModal,title,children}) => {
  return (
     <Modal isOpen={isModal} onClose={setIsModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
  )
}

export default Popup